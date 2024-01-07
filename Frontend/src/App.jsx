import React from 'react'
import Authenticator from './pages/Authenticator'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/authenticator/*" element={<Authenticator />} />
      </Routes>
    </Router>
    
  )
}

export default App