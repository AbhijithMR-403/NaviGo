import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from "three";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from '../components/auth/Login';
import Signup from '../components/auth/signup';
import "../Style/auth.scss"



function Authenticator() {
    
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 850.00,
          minWidth: 250.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xff00,
          backgroundColor: 0x0,
          points: 14.00,
          maxDistance: 8.00,
          spacing: 13.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className='auth' ref={vantaRef}>
      <p style={{ color: "#fff", paddingTop: "20px" }}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup /> } />
        </Routes>

      </p>
    </div>
  );
}

export default Authenticator