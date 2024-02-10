import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../constant/api';
import { TError, TSuccess } from '../../toastify/Toastify';
import OTPModal from './element/OTPModal';

function VendorRegister() {
    const [darkMode, setDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [OtpVerify, setOtpVerify] = useState(null)
    const [OtpTyped, setOtpTyped] = useState(null)
    const [name, setname] = useState('')
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [company, setcompany] = useState('')
    const [phone, setphone] = useState('')
    const [file, setFile] = useState([]);

    const navigate = useNavigate()

    const handleRegSubmit = async (event) => {
        event.preventDefault();

        if (!username) {
            TError(['Please enter a username'])
        }
        else if (username.indexOf(' ') !== -1) {
            TError(['Enter a valid username'])
        }
        else if (!email) {
            TError(['Please enter an email address'])
        }
        else if (username.replaceAll(/\s/g, '').length < 3) {
            TError('Not a valid Username')
        }
        else if (password.trim() === "") {
            TError(['Invalid Password'])
        }
        else if (confirmPassword !== password) {
            TError(['Passwords do not match'])
        }
        else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            TError(['Invalid email address'])
        }
        else {

            sent_otp()

        }
    }

    const sent_otp = async () => {
        {
            var data = { "email": email }
            await axios.post(API_BASE_URL + '/auth/otp', data).then((res) => {
                setOtpVerify(res.data['OTP'])
                setShowModal(true)
            }
            ).catch((err) => console.log(err))
        }
    }
    const RegisterUser = async(event) => {
        event.preventDefault()
        if (OtpTyped ==  OtpVerify){
        const formData = {
            'name': name,
            'username': username,
            'email': email,
            'password': password,
            'phone': phone,
            'company_name': company,
            'identify_img': file,
            'is_vendor': true,
            'is_active': true
        }
        await axios.post(API_BASE_URL + '/auth/vendor/reg', formData).then((res) => {
            console.log(res);
            navigate('/vendor/login')

        }).catch((err) => {
            console.log(err);
        })}
        else{
            TError('Wrong OTP')
        }
    }



    // Store the validation Documentation image
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>

            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    OTP
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form class="p-4 md:p-5">
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <div class="col-span-2">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter OTP:  </label><p>{email}</p>
                                            <input value={OtpTyped} onChange={(e)=>setOtpTyped(e.target.value)} type="text" name="otp" id="name" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="OTP" required="" />
                                        </div>

                                        <a href="">
                                            <span className="text-[#E9522C] font-semibold">Resend otp?</span>

                                        </a>
                                    </div>

                                </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                {/* <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button> */}
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={RegisterUser}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}



            <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
                <div className="flex">
                    <h3 className="text-white">Dark Mode : &nbsp;</h3>
                    <label class="inline-flex relative items-center mr-5 cursor-pointer">
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
                    <form class="form" method='POST' onSubmit={handleRegSubmit}>
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    name='username'
                                />
                                {/* <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    value={company}
                                    onChange={(e) => setcompany(e.target.value)}
                                    placeholder="Company name"
                                    name="company"
                                /> */}
                            </div>
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="text"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                placeholder="Enter your Full name"
                                name='name'
                            />
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

export default VendorRegister