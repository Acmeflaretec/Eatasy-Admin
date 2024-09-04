import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Messes from 'pages/messes';
import ProtectedRoute from './ProtectedRoutes';
import CreateMess from 'pages/messes/CreateMess';
import EditMess from 'pages/messes/EditMess';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute
          element={DashboardDefault}
        />
      )
    },
    {
      path: 'color',
      element: (
        <ProtectedRoute
          element={Color}
        />
      )
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute
          element={DashboardDefault}
        />
      )
    },
    {
      path: 'sample-page',
      element: (
        <ProtectedRoute
          element={SamplePage}
        />
      )
    },
    {
      path: 'messes',
      element: (
        <ProtectedRoute
          element={Messes}
        />
      )
    },
    {
      path: '/messes/create',
      element: (
        <ProtectedRoute
          element={CreateMess}
        />
      )
    },
    {
      path: '/messes/edit/:id',
      element: (
        <ProtectedRoute
          element={EditMess}
        />
      )
    },
    {
      path: 'shadow',
      element: (
        <ProtectedRoute
          element={Shadow}
        />
      )
    },
    {
      path: 'typography',
      element: (
        <ProtectedRoute
          element={Typography}
        />
      )
    }
  ]
};

export default MainRoutes;
