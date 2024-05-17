import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom';
import Approval from '../components/vendor/vendor_auth/Approval';
import VendorAuth from '../pages/vendorPartition/Authentication';
// import VendorHome from '../pages/vendorPartition/VendorPanel';
import VendorPanel from '../pages/vendorPartition/VendorPanel';
import VendorRoute from '../routes/Vendor/VendorRouter';
import VendorWaiting from '../routes/Vendor/VendorWaiting';
import VendorAuthRouter from '../routes/Vendor/VendorAuthRouter';
import VendorProfile from '../components/vendor/view/VendorProfile';
import BusListCreate from '../components/vendor/view/BusListCreate';
import RouteManagement from '../components/vendor/view/RouteManagement';
import BusRouteLists from '../components/vendor/view/BusRouteLists';
import { useDispatch, useSelector } from 'react-redux';
import { VendorAxios, VendorImgAxios } from '../components/api/api_instance';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import IsAuthUser from '../utils/IsAuthUser';

function VendorWrapper() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  
  const authentication_user = useSelector(state => state.authentication_user)
  
  const checkAuth = async () => {
    const isAuthenticated = await IsAuthUser();
    dispatch(
      Set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        userId: isAuthenticated.user_id,
        isVendor: isAuthenticated.is_vendor,
      })
    );
  };

  useEffect(() => {
    // Interceptor
    VendorImgAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    VendorAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    if (!authentication_user.name) {
      checkAuth();
    }
    console.log(authentication_user);
  }, [pathname])

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
        { element: <VendorProfile />, index: true },
        { element: <BusListCreate />, path: '/bus' },
        { element: <RouteManagement />, path: '/route' },
        { element: <BusRouteLists />, path: '/route/list' },

      ],
    },
    {
      path: '/*',
      element: <VendorAuthRouter> <VendorAuth /> </VendorAuthRouter>,
    },
    {
      path: '/waiting',
      element: <VendorWaiting> <Approval /> </VendorWaiting>,
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