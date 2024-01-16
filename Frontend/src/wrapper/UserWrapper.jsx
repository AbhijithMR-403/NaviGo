import React, { useEffect } from 'react'
import Home from '../pages/userPartition/Home';
import { Route, Routes } from 'react-router-dom';
import UserRoute from '../routes/UserRoute';
import { useDispatch, useSelector } from 'react-redux';
import IsAuthUser from '../utils/IsAuthUser';
import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';


function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)
  

  const fetchUserData = async () => {
    try {
        // const res = await axios.post(baseURL+'/api/accounts/user/details/',{headers: {Authorization: `Bearer ${token}`}})
        const res = await axios.get(baseURL+'/api/accounts/user/details/',{headers: {
          'authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }})
        .then(res => {
            
            dispatch(
              set_user_basic_details({
                name : res.data.first_name,
                profile_pic : res.data.profile_pic
              })
            );
          })
    }
    catch (error) {
      console.log(error);
      
    }

  };

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
    if(!authentication_user.name)
    {
     
      checkAuth();
    
    }
    if(authentication_user.isAuthenticated)
    {
      fetchUserData();
    }

  }, [authentication_user])


  return (
    <>
   
      <Routes>
          {/* <Route  path="/" element={<Home />}></Route>

          <Route  path="login" element={<UserLogin/>}></Route>
          <Route  path="register" element={<UserRegister/>}></Route> */}

          <Route  index element={
            <UserRoute>
                <Home/>
            </UserRoute>
          }>

          </Route>

        </Routes> 
    
    </>
  );
}

export default UserWrapper