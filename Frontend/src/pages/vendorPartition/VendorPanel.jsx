import React from 'react'
import VendorNav from '../../components/vendor/navbar/VendorNav'

function VendorPanel({children}) {
  return (
    
    <>
    <VendorNav />
    {children}
    </>
  )
}

export default VendorPanel