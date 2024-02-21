import React, { Suspense, lazy } from 'react'
import "./Style/loader.scss"
import Loader from './components/loader/loader';
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import reduxStore from './redux/reduxStore';
const UserWrapper = lazy(() => import('./wrapper/UserWrapper'));
const AdminWrapper = lazy(() => import('./wrapper/AdminWrapper'));
const VendorWrapper = lazy(() => import('./wrapper/VendorWrapper'));



function App() {
  console.log(import.meta.env.VITE_GOOGLE_AUTH_API);
  return (
    <Provider store={reduxStore}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API}>
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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/admin/*' element={<AdminWrapper />} />
            <Route path='/vendor/*' element={<VendorWrapper />} />
            <Route path="/*" element={<UserWrapper />} />
          </Routes>
        </Suspense>
      </GoogleOAuthProvider>

    </Provider>
  )
}

export default App