import React, { lazy, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/adminPartition/Dashboard';
import ThemeProvider from '../components/admin/elements/theme';
import { useDispatch, useSelector } from 'react-redux';
import isAuthAdmin from '../utils/isAuthAdmin';
import AdminRouter from '../routes/Admin/AdminRouter';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import AdminAuthRouter from '../routes/Admin/AdminAuthRouter';
import axios from 'axios';
import { AdminAxios, AdminBusAxios } from '../components/api/api_instance';


const NotFoundView = lazy(() => import('../pages/error/NotFoundView'));
const Loginpage = lazy(() => import('../pages/adminPartition/AdminLogin'));
const UserManagement = lazy(() => import('../components/admin/view/UserManagement'));
const BusStop = lazy(() => import('../components/admin/view/busStop'));
const StopList = lazy(() => import('../components/admin/view/StopList'));
const Approval = lazy(() => import('../components/admin/view/Approval'));
const ConnectStop = lazy(() => import('../components/admin/view/ConnectStop'));
const ListBusConnection = lazy(() => import('../components/admin/view/ListBusConnection'));
const Dashboard = lazy(() => import('../components/admin/view/dashboard'));


function AdminWrapper() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const authentication_user = useSelector(state => state.authentication_user);

  const token = localStorage.getItem('access');

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        Set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('sddads');
    // Interceptor
    AdminAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    AdminBusAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, [pathname]);


  const routes = useRoutes([
    {
      element: (
        <ThemeProvider>
          <DashboardLayout>
            <AdminRouter >
              <Outlet />
            </AdminRouter>
          </DashboardLayout>
        </ThemeProvider>
      ),
      children: [
        { element: <Dashboard />, index: true },
        { element: <UserManagement />, path: '/user' },
        { element: <BusStop />, path: '/bus/stop' },
        { element: <StopList />, path: '/stoplist' },
        { element: <Approval />, path: "/approval" },
        { element: <ConnectStop />, path: "/bus/connection" },
        { element: <ListBusConnection />, path: "/bus/connection/list" },

      ],
    },
    {
      path: 'login',
      element: <AdminAuthRouter> <Loginpage /> </AdminAuthRouter>,
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