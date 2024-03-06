import React from 'react'
import VendorNav from '../../components/vendor/navbar/VendorNav'

function VendorPanel({children}) {
  return (
    
    <>
    <VendorNav />
    <div className='md:pl-64 pt-8'>
      <div className='md:p-8'>
    {children}

      </div>
    </div>
    </>
  )
}

export default VendorPanel