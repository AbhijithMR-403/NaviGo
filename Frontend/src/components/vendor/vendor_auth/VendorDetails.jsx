import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputField from './element/InputField';
import {
    CitySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from 'axios';
import { API_BASE_URL } from '../../../constant/api';

function VendorDetails() {
    const [darkMode, setDarkMode] = useState(false);
    const [Company, setCompany] = useState('')
    const [otp, setotp] = useState('')
    const [GSTIN, setGSTIN] = useState('')
    const [address, setaddress] = useState('')
    const [PinCode, setPinCode] = useState('')
    const [file, setFile] = useState([]);
    const imgRef = useRef()
    const [stateid, setstateid] = useState({});
    const [cityid, setCityid] = useState({});
    const [ShowOTPInput, setShowOTPInput] = useState(true)
    
    useEffect(()=>{
        const userID = localStorage.getItem('userID')
        console.log('this is userID', userID);

        axios.patch(API_BASE_URL+'/auth/otp', {'userID':userID}).then((res)=>{
            if(res.status == 208){
                setShowOTPInput(false)
            }
            console.log((res));

        }
        ).catch((err)=>console.log(err))
    },[])


    // Store the validation Documentation image
    function handleimgChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const activateImg = (e) => {
        console.log('active image log');
        imgRef.current.click();
    }


    const HandleSubmit = async (event) =>{
        const val = await CheckOTP()
        console.log(Company, otp, GSTIN, address, PinCode, file, stateid);
}

const CheckOTP = async() =>{
    await axios.patch(API_BASE_URL+'/auth/otp/verify', {'OTP':otp, 'UserID':localStorage.getItem('userID')}).then((res)=>{
        console.log(res);
        return res
    }).catch((err)=>{

        console.log('this reach here man\n\n\n', err);
        return err
    })
}



    return (
        <div>
            <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
                <div className="flex">
                    <h3 className="text-white">Dark Mode : &nbsp;</h3>
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                    </label>
                </div>
            </div>
            <div
                className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"
                    }  w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                        }`}
                >
                    Enter Details
                </h1>
                <div className="w-full mt-8">
                    <form className="form">
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <InputField type="text" placeholder="Company Name" name="Company" value={Company} setValue={setCompany} />
                                {ShowOTPInput?
                                <InputField type="number" placeholder="Enter OTP" name="otp" value={otp} setValue={setotp} />
                            :null}
                            </div>
                            <InputField type="text" placeholder="GSTIN" name="GSTIN" value={GSTIN} setValue={setGSTIN} />
                            <InputField type="text" placeholder="Enter Your address" name="address" value={address} setValue={setaddress} />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <StateSelect
                                    countryid={101}
                                    onChange={(e) => {
                                        setstateid(e);
                                    }}
                                    placeHolder="Select State"
                                />
                                <CitySelect
                                    countryid={101}
                                    stateid={stateid.id}
                                    onChange={(e) => {
                                        setCityid(e);
                                    }}
                                    placeHolder="Select City"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">

                                <div className="overflow-hidden relative w-64 mt-1 mb-4 rounded-lg">
                                    <button
                                        onClick={activateImg}
                                        className="bg-blue-700 hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center z-0">
                                        <svg
                                            fill="#FFF"
                                            height={18}
                                            viewBox="0 0 24 24"
                                            width={18}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span className="ml-2">Upload Document</span>

                                    </button>
                                    <input
                                        className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t z-50"
                                        type="file"
                                        name="documents[]"
                                        accept="image/*"
                                        ref={imgRef}
                                        onChange={handleimgChange}
                                    />
                                </div>


                                {/* <label className='font-mono text-sm mt-2 -mb-3'>Upload profile pic</label> */}
                                {/* <input type="file" onChange={handleimgChange} placeholder='adslk'/> */}

                                {/* <InputField type="text" placeholder="City" name="Company Name" value={City} setValue={setCity} /> */}
                                <InputField type="number" placeholder="Pin code" name="Company Name" value={PinCode} setValue={setPinCode} />
                            </div>

                            <img className='max-w-56 max-h-44' src={file} />


                            {/* <ul className='text-red-700'>
                                <li>{error}</li>
                            </ul> */}
                            <button onClick={()=>HandleSubmit()} type='button' className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3" >Continue</span>
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                Already have an account?{" "}
                                <a href="">
                                    <Link to={'/vendor/login'}> <span className="text-[#E9522C] font-semibold">Login</span></Link>

                                </a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VendorDetails