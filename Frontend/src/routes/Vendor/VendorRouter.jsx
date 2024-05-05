
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/Loader';

function VendorRoute({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setIsVendor] = useState(false)
  const [isVendorActive, setIsVendorActive] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      setIsVendor(authInfo.is_vendor)
      setIsVendorActive(authInfo.is_vendorActive)
      setIsAuthenticated(authInfo.isAuthenticated);
      setAdmin(authInfo.is_admin);
      setTimeout(() => { setLoading(false); }, 60);
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
    return <Navigate to="login" />
  }
  if (!isVendorActive){
    return <Navigate to='waiting' />
  }

  return children;
}

export default VendorRoute