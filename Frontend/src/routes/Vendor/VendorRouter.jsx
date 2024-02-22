
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/loader';

function VendorRoute({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendor, setisVendor] = useState(false)
  const [isVendorActive, setisVendorActive] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Vendor Router start here:\n\n\n');
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      console.log(authInfo);
      setisVendor(authInfo.is_vendor)
      setisVendorActive(authInfo.is_vendorActive)
      console.log(isVendor);
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
  if (isVendorActive){
    return <Navigate to='waiting' />
  }

  return children;
}

export default VendorRoute