import React from 'react'
import Authenticator from './pages/userPartition/Authenticator'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from './pages/userPartition/Home';
import reduxStore from './redux/reduxStore';
import UserWrapper from './wrapper/UserWrapper';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_AUTH_API } from './constant/api';
import AdminWrapper from './wrapper/AdminWrapper';

function App() {
  return (
      <Provider store={reduxStore}>
        <GoogleOAuthProvider clientId={GOOGLE_AUTH_API}>

          <Routes>

            <Route path="/auth/*" element={<Authenticator />} />
            <Route path="*" element={<UserWrapper />} />
            <Route path='/admin/*' element={<AdminWrapper />} />
            {/* <Route path="*" element={<h1>404 Not Found</h1>}/> */}
          </Routes>
        </GoogleOAuthProvider>;

      </Provider>
  )
}

export default App