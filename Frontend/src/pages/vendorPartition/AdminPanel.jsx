import React from 'react'
import VendorNav from '../../components/vendor/navbar/VendorNav'

function AdminPanel({children}) {
  return (
    
    <>
    <VendorNav />
    {children}
    </>
  )
}

export default AdminPanel