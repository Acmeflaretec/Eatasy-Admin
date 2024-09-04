import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { QueryClient, QueryClientProvider } from "react-query";
import CustomToaster from 'components/CustomToaster';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeCustomization>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ScrollTop>
            <CustomToaster />
            <RouterProvider router={router} />
          </ScrollTop>
        </QueryClientProvider>
      </Provider>
    </ThemeCustomization>
  );
}
