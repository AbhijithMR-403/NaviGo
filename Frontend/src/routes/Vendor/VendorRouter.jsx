
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/loader';

function VendorRoute({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setisVendor] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('yooo man');
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      console.log(authInfo);
      setisVendor(authInfo.is_vendor)
      console.log(isVendor);
      setIsAuthenticated(authInfo.isAuthenticated);
      setAdmin(authInfo.is_admin);
      setTimeout(() => { setLoading(false); }, 2000);
    };
    fetchData();
  }, []);
  

  if (isLoading) {
    return <Loader />
  }
  if (isAdmin){
    return <Navigate to='/admin' />
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="login" />
  }
  if (!isVendor){
    return <Navigate to='waiting' />
  }

  // If authenticated, render the child components
  return children;
}

export default VendorRoute