import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../utils/isAuthAdmin';
import Loader from '../components/loader/loader';


function AdminRouter({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    'is_authenticated' : false,
    'is_admin' : false,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthAdmin();
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  if(!isAuthenticated.is_authenticated)
  {
    return <Navigate to="/admin/login" />;
  }

  if ((!isAuthenticated.is_admin)) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, render the child components
  return children;
}


export default AdminRouter;