import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Approval from '../components/vendor/vendor_auth/Approval';
import VendorAuth from '../pages/vendorPartition/Authentication';
import VendorHome from '../pages/vendorPartition/AdminPanel';
import AdminPanel from '../pages/vendorPartition/AdminPanel';

function VendorWrapper() {

  const routes = useRoutes([
    {
      element: (
        <>
          <AdminPanel>
            <Outlet />
          </AdminPanel>
        </>
      ),
      children: [
        { element: <div>Hellooo</div>, index: true },
      ],
    },
    {
      path: '/*',
      element: <VendorAuth />,
    },
    {
      path: '/wating',
      element: <Approval />,
    },

    {
      path: '404',
      element: <div>Not Found</div>
    },
    {
      path: '*',
      element: <Navigate to="/admin/404" replace />,
    },
  ]);

  return routes;
}

export default VendorWrapper