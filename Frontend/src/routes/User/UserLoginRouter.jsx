
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import IsAuthUser from '../../utils/IsAuthUser';
import Loader from '../../components/loader/Loader';

function UserLoginRouter({ children }) {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await IsAuthUser();
      setIsAuthenticated(authInfo.isAuthenticated);
      setLoading(false);
      
    };
    fetchData();
  }, []);
  

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <Loader />
  }
  if (isAuthenticated) {
    // If  authenticated, redirect to Home page with the return URL
    return <Navigate to="/" />;
  }

  return (children);
}

export default UserLoginRouter