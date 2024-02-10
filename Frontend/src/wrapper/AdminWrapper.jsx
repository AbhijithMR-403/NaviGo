import React, { useEffect } from 'react'

import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/adminPartition/Dashboard';
import ThemeProvider from '../components/admin/elements/theme';
import Dashboard from '../components/admin/view/dashboard';
import NotFoundView from '../pages/error/NotFoundView';
import Loginpage from '../pages/adminPartition/AdminLogin';
import { API_BASE_URL } from '../constant/api';
import { useDispatch, useSelector } from 'react-redux';
import isAuthAdmin from '../utils/isAuthAdmin';
import AdminRouter from '../routes/Admin/AdminRouter';
import UserManagement from '../components/admin/view/UserManagement';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import axios from 'axios';
import BusStop from '../components/admin/view/busStop';
import StopList from '../components/admin/view/StopList';
import Approval from '../components/admin/view/Approval';
import AdminAuthRouter from '../routes/Admin/AdminAuthRouter';
import DirectionsMap from '../utils/maps/DirectionsMap';
import { useLoadScript } from '@react-google-maps/api';

function AdminWrapper() {

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
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, []);


  // const libraries = ['places']

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
  //   libraries,
  // });

  // if(loadError) return 'Error loading maps';
  // if(!isLoaded) return 'Loading Maps';


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
        { element: <BusStop />, path: '/busstop' },
        { element: <StopList />, path: '/stoplist' },
        { element: <Approval />, path: "/approval" },
        // {
        //   element: <DirectionsMap
        //   origin={origin} 
        //   destination={destination}
        // />, path: "/map"
        // },

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