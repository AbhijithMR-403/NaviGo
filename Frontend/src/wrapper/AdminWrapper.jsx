import React from 'react'

import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/adminPartition/Dashboard';
import ThemeProvider from '../components/admin/theme';
import Dashboard from '../components/admin/view/dashboard';
import NotFoundView from '../pages/error/NotFoundView';
import Loginpage from '../pages/adminPartition/AdminLogin';

function AdminWrapper() {
    console.log("reached in admin wrapper");
    const routes = useRoutes([
      {
        element: (
          <ThemeProvider>
          <DashboardLayout>
            {/* <Suspense> */}
              <Outlet />
            {/* </Suspense> */}
          </DashboardLayout>
          </ThemeProvider>
        ),
        children: [
          { element: <Dashboard />, index: true },
        ],
      },
      {
        path: 'login',
        element: <Loginpage />,
      },
      {
        path: '404',
        element: <NotFoundView />,
      },
      {
        path: '*',
        element: <Navigate to="/admin/404" replace />,
      },
    ]);
  
    return routes;
}

export default AdminWrapper