import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Approval from '../components/vendor/Approval';
import VendorAuth from '../pages/vendorPartition/Authentication';

function VendorWrapper() {
  
    const routes = useRoutes([
        {
          element: (
                <Outlet />
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