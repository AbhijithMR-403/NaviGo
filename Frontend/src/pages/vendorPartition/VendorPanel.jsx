import React from 'react'
import VendorNav from '../../components/vendor/navbar/VendorNav'

function VendorPanel({children}) {
  return (
    
    <>
    <VendorNav />
    <div className='sm:pl-64 pt-8'>
      <div className='p-8'>

    {children}

      </div>
    </div>
    </>
  )
}

export default VendorPanel