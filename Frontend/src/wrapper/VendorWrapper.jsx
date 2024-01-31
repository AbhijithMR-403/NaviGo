import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Approval from '../components/vendor/vendor_auth/Approval';
import VendorAuth from '../pages/vendorPartition/Authentication';
// import VendorHome from '../pages/vendorPartition/VendorPanel';
import VendorPanel from '../pages/vendorPartition/VendorPanel';
import VendorRoute from '../routes/VendorRouter';

function VendorWrapper() {

  const routes = useRoutes([
    {
      element: (
        <>
          <VendorRoute>
            <VendorPanel>
              <Outlet />
            </VendorPanel>
          </VendorRoute>

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
      element: <VendorRoute><Approval /></VendorRoute>,
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