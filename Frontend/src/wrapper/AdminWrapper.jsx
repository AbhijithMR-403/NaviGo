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
import AdminRouter from '../routes/AdminRouter';
import UserManagement from '../components/admin/view/UserManagement';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import axios from 'axios';
import BusStop from '../components/admin/view/busStop';
import StopList from '../components/admin/view/StopList';
import Approval from '../components/admin/view/Approval';
import AdminAuthRouter from '../routes/AdminAuthRouter';

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

      // if (isAuthenticated.isAuthenticated) {
      //   const res = await axios.get(API_BASE_URL + '/auth/details', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   });

      //   dispatch(
      //     set_user_basic_details({
      //       name: res.data.first_name,
      //       profile_pic: res.data.profile_pic,
      //     })
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, []);


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
        { element: <UserManagement />, path:'/user' },
        { element: <BusStop />, path:'/busstop' },
        { element: <StopList />, path:'/stoplist' },
        { element: <Approval />, path:"/approval" },

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