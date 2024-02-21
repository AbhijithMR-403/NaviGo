import React, { useEffect } from 'react'
import Home from '../pages/userPartition/Home';
import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import UserRoute from '../routes/User/UserRoute';
import { useDispatch, useSelector } from 'react-redux';
import IsAuthUser from '../utils/IsAuthUser';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Authenticator from '../pages/userPartition/Authenticator';
import Header from '../components/user/Header';
import UserMap from '../pages/userPartition/UserMap';


function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)


  const checkAuth = async () => {
    const isAuthenticated = await IsAuthUser();
    console.log(isAuthenticated);
    dispatch(
      Set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated
      })
    );
  };

  useEffect(() => {
    if (!authentication_user.name) {

      checkAuth();

    }

  }, [authentication_user])




  const routes = useRoutes([
    {
      element: (
        <>
        
          <Header />
          <Outlet />
        </>
      ),
      children: [
        { element: <Home />, index: true },
        { element: <UserMap />, path: '/map' },
      ],
    },
    {
      element: (
        <Authenticator >
          <UserRoute>
            <Outlet />
          </UserRoute>
        </Authenticator>
      ),
      children: [
        { element: <Login />, path: "/login" },
        { element: <Signup />, path: "/signup" },
      ],
    },
  ]);

  return routes;
}

export default UserWrapper