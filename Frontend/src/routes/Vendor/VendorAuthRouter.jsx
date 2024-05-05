import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/Loader';

function VendorAuthRouter({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setIsVendor] = useState(false)
  const [isVendorActive, setIsVendorActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      setIsVendor(authInfo.is_vendor)
      setIsVendorActive(authInfo.is_vendorActive)
      setIsAuthenticated(authInfo.isAuthenticated);
      setIsAdmin(authInfo.is_admin)
      setLoading(false);
    };
    fetchData();
  }, []);
  

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <Loader />
  }
  if (isAdmin){

  return <Navigate to='/admin' />
}

  if (isAuthenticated && isVendor) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/vendor" />
  }

  console.log(isAuthenticated, isVendor, isVendorActive, isAuthenticated && isVendor && isVendorActive);
  // If authenticated, render the child components
  return children;
}

export default VendorAuthRouter