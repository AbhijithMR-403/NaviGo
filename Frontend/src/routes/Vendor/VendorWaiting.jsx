


// ! Not in use


import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/Loader';

function VendorWaiting({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setisVendor] = useState(false)
  const [isVendorActive, setisVendorActive] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      console.log(authInfo);
      setisVendorActive(authInfo.is_vendorActive)
      setisVendor(authInfo.is_vendor)
      setIsAuthenticated(authInfo.isAuthenticated);
      setLoading(false);
    };
    fetchData();
  }, []);
  

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <Loader />
  }

  if (isAuthenticated && isVendor && isVendorActive) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/vendor" />
  }
  else if (!isAuthenticated ){
    return <Navigate to='/vendor/login' />
  }

  // If authenticated, render the child components
  return children;
}

export default VendorWaiting