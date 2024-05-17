import React, { lazy, useEffect, useState } from 'react'
import Home from '../pages/userPartition/Home';
import { Outlet, useLocation, useRoutes } from 'react-router-dom';
import UserRoute from '../routes/User/UserRoute';
import { useDispatch, useSelector } from 'react-redux';
import IsAuthUser from '../utils/IsAuthUser';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
import Chat from '../pages/userPartition/Chat.jsx';
import { AuthUserAxios } from '../components/api/api_instance.jsx';

const Login = lazy(() => import('../components/auth/Login'));
const SignUp = lazy(() => import('../components/auth/SignUp'));
const Authenticator = lazy(() => import('../pages/userPartition/Authenticator'));
const Header = lazy(() => import('../components/user/Header'));

const UserMap = lazy(() => import('../pages/userPartition/UserMap'));
const UserBus = lazy(() => import('../pages/userPartition/UserBus'));
const UserProfile = lazy(() => import('../components/user/views/UserProfile.jsx'));
const BookingConfirm = lazy(() => import('../pages/userPartition/BookingConfirm'));
const PaymentSuccess = lazy(() => import('../pages/userPartition/PaymentSuccess'));
const Order = lazy(() => import('../pages/userPartition/Order'));


function UserWrapper() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();


  const authentication_user = useSelector(state => state.authentication_user)
  const [scrollWheel, setScrollWheel] = useState(99)

  const checkAuth = async () => {
    const isAuthenticated = await IsAuthUser();
    dispatch(
      Set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        userId: isAuthenticated.user_id,
      })
    );
  };

  useEffect(() => {
    // Interceptor
    AuthUserAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    console.log(localStorage.getItem('access'));
    if (!authentication_user.name) {
      checkAuth();
    }
  }, [authentication_user, pathname])




  const routes = useRoutes([
    {
      element: (
        <div className='h-full w-full'>
        
          <Header scrollWheel= {scrollWheel} />
            
          <Outlet />
        </div>
      ),
      children: [
        { element: <Home />, index: true },
        { element: <UserMap />, path: '/map' },
        { element: <UserBus />, path: '/bus' },
        { element: <UserProfile />, path: '/profile' },
        { element: <BookingConfirm />, path: '/confirm/:uuid' },
        { element: <PaymentSuccess />, path: '/success' },
        { element: <Order />, path: '/order' },
        { element: <Chat />, path: '/chat' },
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
        { element: <SignUp />, path: "/signup" },
      ],
    },
  ]);

  return routes;
}

export default UserWrapper