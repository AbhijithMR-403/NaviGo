import React from 'react'

import { Route, Routes } from 'react-router-dom';

function AdminWrapper() {
    console.log("reached in admin wrapper");
  return (
    <div>
        {/* <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      /> */}
        <Routes>
        <Route element={<AdminLayout />}>

          <Route  path="" element={ <AdminHome />} />
          </Route>
        </Routes> 
    </div>
  )
}

export default AdminWrapper