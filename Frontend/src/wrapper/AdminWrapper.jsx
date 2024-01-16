import React, { useEffect } from 'react'

import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/adminPartition/Dashboard';
import ThemeProvider from '../components/admin/theme';
import Dashboard from '../components/admin/view/dashboard';
import NotFoundView from '../pages/error/NotFoundView';
import Loginpage from '../pages/adminPartition/AdminLogin';
import { API_BASE_URL } from '../constant/api';
import { useDispatch, useSelector } from 'react-redux';
import isAuthAdmin from '../utils/isAuthAdmin';
import AdminRouter from '../routes/AdminRouter';

function AdminWrapper() {
  
  const dispatch = useDispatch()
  const authentication_user = useSelector(state => state.authentication_user);

  const token = localStorage.getItem('access');

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(API_BASE_URL + '/auth/details/', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        dispatch(
          set_user_basic_details({
            name: res.data.first_name,
            profile_pic: res.data.profile_pic,
          })
        );
      }
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
            {/* <Suspense> */}
            <AdminRouter >
              <Outlet />
            </AdminRouter>
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