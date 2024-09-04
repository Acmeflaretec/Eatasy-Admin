// axiosInstance.js
import axios from "axios";
import { logout } from "redux/actions";
import { store } from "redux/store";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}`,
  withCredentials: false,
});

// Set default headers
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "multi-part/formdata";

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    // Handle 401 errors
    if (
      error?.code === "ERR_BAD_REQUEST" &&
      error?.response?.status === 401 &&
      !originalConfig._retry // Check if the request has already been retried
    ) {
      console.warn("401 Unauthorized error detected");

      // Check if the error message indicates an unauthorized request
      if (error?.response?.data?.message === "Unauthorized") {
        originalConfig._retry = true;

        try {
          const token = JSON.parse(localStorage.getItem("token"));

          // Check if refresh token exists before trying to refresh
          if (token?.refreshToken) {
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_APP_SERVER_URL}/auth/refresh/`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token.refreshToken}`,
                },
              }
            );

            // Handle successful token refresh
            if (refreshResponse.status === 201) {
              const { data, message } = refreshResponse?.data;
              console.warn(message);

              localStorage.setItem("token", JSON.stringify(data));

              originalConfig.headers.Authorization = `Bearer ${data?.accessToken}`;
              return axiosInstance(originalConfig);
            }
          }

          // If no refresh token is available, log the user out
          store.dispatch(logout());
          console.warn("Refresh token missing, logging out");

        } catch (refreshError) {
          // If refreshing fails, log the user out and reject the promise
          console.warn("Failed to refresh token, logging out", refreshError);
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
    } else if (error?.response?.status === 500) {
      // Handle 500 errors specifically if needed
      originalConfig._retry = true;
    }

    return Promise.reject(error); // Reject other errors
  }
);

export { axiosInstance };
