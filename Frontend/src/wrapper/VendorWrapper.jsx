import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Approval from '../components/vendor/vendor_auth/Approval';
import VendorAuth from '../pages/vendorPartition/Authentication';
// import VendorHome from '../pages/vendorPartition/VendorPanel';
import VendorPanel from '../pages/vendorPartition/VendorPanel';
import VendorRoute from '../routes/Vendor/VendorRouter';
import VendorWaiting from '../routes/Vendor/VendorWaiting';

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
      path: '/waiting',
      element: <VendorWaiting> <Approval /></VendorWaiting>,
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