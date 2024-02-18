import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../constant/api';
import { TError, TSuccess } from '../../toastify/Toastify';
import OTPModal from './element/OTPModal';

function VendorDetails() {
    const [darkMode, setDarkMode] = useState(false);


    const [Company, setCompany] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [company, setcompany] = useState('')
    const [phone, setphone] = useState('')
    
    const [file, setFile] = useState([]);


    const handleRegSubmit = async (event) => {
        event.preventDefault();

    }
    

    // Store the validation Documentation image
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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
                    Register for a free account
                </h1>
                <div className="w-full mt-8">
                    <form className="form" method='POST' onSubmit={handleRegSubmit}>
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Enter your email"
                                name='email'
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Company Name"
                                    value={Company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    name='company'
                                />
                                
                                {/* <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Company Name"
                                    value={Company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    name='company'
                                /> */}
                            </div>
                            
                            
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="tel"

                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                                placeholder="Enter your phone"
                                name='phone'
                            />
                            <div className="flex flex-col sm:flex-row gap-3">

                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="Password"
                                    name='password'
                                />

                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    name='cpassword'
                                />

                            </div>
                            <label className='font-mono text-sm mt-2 -mb-3'>Upload profile pic</label>
                            <input type="file" onChange={handleChange} />
                            <img className='max-w-56 max-h-44' src={file} />

                            {/* <ul className='text-red-700'>
                                <li>{error}</li>
                            </ul> */}
                            <button type='submit' className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                                <span className="ml-3">Register</span>
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