import { createAsyncThunk } from '@reduxjs/toolkit';
import request from 'axios/request';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await request('/auth/signin', "POST", user);
      if (response) {
        const data = response?.data;
        localStorage.setItem('token', JSON.stringify(data));
        return data;
      } else throw new Error("Something went wrong ! please check your credentials")
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

// Async thunk to check if the user is logged in
export const isUserLoggedIn = createAsyncThunk(
  'auth/isUserLoggedIn',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      return { token, user };
    } else {
      return { token: null, user: null };
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  // Remove items from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return;
});