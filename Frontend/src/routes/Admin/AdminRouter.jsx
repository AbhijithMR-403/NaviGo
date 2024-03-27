import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../../utils/isAuthAdmin';
import Loader from '../../components/loader/Loader';


function AdminRouter({ children }) {
  
  const [authInfo, setAuthInfo] = useState({
    // isAuthenticated: true,
    // isAdmin: true,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const info = await isAuthAdmin();
      setAuthInfo(info);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  
  if (!authInfo.isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (!authInfo.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}


export default AdminRouter;