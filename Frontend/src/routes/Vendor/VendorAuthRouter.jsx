import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/loader';

function VendorAuthRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setisVendor] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('yooo man');
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      console.log(authInfo);
      setisVendor(authInfo.is_vendor)
      setIsAuthenticated(authInfo.isAuthenticated);
      setisAdmin(authInfo.is_admin)
      setTimeout(() => { setLoading(false); }, 2000);
    };
    fetchData();
  }, []);
  

    if (isAdmin){
    return <Navigate to='/admin' />
  }
  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <Loader />
  }

  if (isAuthenticated && isVendor) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/vendor" />
  }

//   if (!isVendor  ){
//     return <Navigate to='/vendor/waiting' />
//   }


  // If authenticated, render the child components
  return children;
}

export default VendorAuthRouter