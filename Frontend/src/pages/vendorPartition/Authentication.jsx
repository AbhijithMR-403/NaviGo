import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import VendorRegister from "../../components/vendor/VendorRegister";
import VendorLogin from "../../components/vendor/VendorLogin";
const FormRegistration = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
        <Routes>
            <Route path="/register" element={<VendorRegister/>} />
            <Route path="/login" element={<VendorLogin/>} />
        </Routes>

    </div>
  );
};
export default FormRegistration;
