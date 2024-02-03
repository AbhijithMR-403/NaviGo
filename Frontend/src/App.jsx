import React, { useEffect } from 'react'
import Authenticator from './pages/userPartition/Authenticator'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import Home from './pages/userPartition/Home';
import UserWrapper from './wrapper/UserWrapper';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminWrapper from './wrapper/AdminWrapper';
import VendorWrapper from './wrapper/VendorWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reduxStore from './redux/reduxStore';

function App() {
  console.log(import.meta.env.VITE_GOOGLE_AUTH_API);
  return (
    <Provider store={reduxStore}>
      <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_AUTH_API }>

        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce />
        <Routes>
          {/* <Route path="/auth/*" element={<Authenticator />} /> */}
          <Route path="*" element={<UserWrapper />} />
          <Route path='/admin/*' element={<AdminWrapper />} />
          <Route path='/vendor/*' element={<VendorWrapper />} />
          {/* <Route path="*" element={<h1>404 Not Found</h1>}/> */}
        </Routes>
      </GoogleOAuthProvider>

    </Provider>
  )
}

export default App