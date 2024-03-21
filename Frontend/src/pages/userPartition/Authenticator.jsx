import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from "three";
import "../../Style/auth.scss"



function Authenticator({ children }) {

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
      <div className='vantojsdiv' style={{ color: "#fff"}}>

        {children}

      </div>
    </div>
  );
}

export default Authenticator