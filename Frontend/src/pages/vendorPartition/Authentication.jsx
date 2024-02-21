import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import VendorRegister from "../../components/vendor/vendor_auth/VendorRegister";
import VendorLogin from "../../components/vendor/vendor_auth/VendorLogin";
import VendorDetails from "../../components/vendor/vendor_auth/VendorDetails";

const VendorAuth = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[110vh] bg-[#282D2D] px-5">
        <Routes>
            <Route path="/register" element={<VendorRegister/>} />
            <Route path="/login" element={<VendorLogin/>} />
            <Route path="/details" element={<VendorDetails/>} />
        </Routes>

    </div>
  );
};
export default VendorAuth;
