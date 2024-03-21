import React, { lazy, useEffect } from 'react'
import Home from '../pages/userPartition/Home';
import { Outlet, useRoutes } from 'react-router-dom';
import UserRoute from '../routes/User/UserRoute';
import { useDispatch, useSelector } from 'react-redux';
import IsAuthUser from '../utils/IsAuthUser';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';

const Login = lazy(() => import('../components/auth/Login'));
const Signup = lazy(() => import('../components/auth/Signup'));
const Authenticator = lazy(() => import('../pages/userPartition/Authenticator'));
const Header = lazy(() => import('../components/user/Header'));

const UserMap = lazy(() => import('../pages/userPartition/UserMap'));
const UserBus = lazy(() => import('../pages/userPartition/UserBus'));
const UserProfile = lazy(() => import('../pages/userPartition/UserBus'));
const BookingConfirm = lazy(() => import('../pages/userPartition/BookingConfirm'));
const PaymentSuccess = lazy(() => import('../pages/userPartition/PaymentSucess'));
const Order = lazy(() => import('../pages/userPartition/Order'));


function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)


  const checkAuth = async () => {
    const isAuthenticated = await IsAuthUser();
    console.log(isAuthenticated);
    dispatch(
      Set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        userId: isAuthenticated.user_id,
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
        <div className='h-full w-full'>
        
          <Header />
          {/* <div className=''> */}
            
          <Outlet />
          {/* </div> */}
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