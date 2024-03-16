import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../../utils/isAuthAdmin';
import Loader from '../../components/loader/Loader';


function AdminRouter({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    'is_authenticated' : true,
    'is_admin' : true,
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

  if(isAuthenticated.is_authenticated)
  {
    return <Navigate to="/admin/" />;
  }

  // If authenticated, render the child components
  return children;
}


export default AdminRouter;