import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constant/api';
import { TSuccess } from '../toastify/Toastify';

function VendorRegister() {
    const [error, setFormError] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    const [name, setname] = useState('')
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [company, setcompany] = useState('')
    const [phone, setphone] = useState('')
    const navigate = useNavigate()

    const handleRegSubmit = async (event) => {
        event.preventDefault();
        

        if (!username) {
            setFormError(['Please enter a username'])
        }
        if (username.indexOf(' ') !== -1) {
            setFormError(['Enter a valid username'])
        }
        else if (!email) {
            setFormError(['Please enter an email address'])
        }
        else if (username.replaceAll(/\s/g, '').length < 3) {
            setFormError('Type more')
        }
        else if (password.trim() === "") {
            setFormError(['Invalid Password'])
        }
        else if (confirmPassword !== password) {
            setFormError(['Passwords do not match'])
        }
        else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            setFormError(['Invalid email address'])

        }
        else {
            const formData = {
                'name': name,
                'username': username,
                'email': email,
                'password': password,
                'phone': phone,
                'company_name': company,
                'is_vendor': true,
                'is_active': true
            }

            //add user to database here
            setFormError([])

            try {
                const res = await axios.post(API_BASE_URL + '/auth/vendor/reg', formData)
                if (res.status === 201) {
                    console.log("Saved successfully man");
                    TSuccess('Successfully Registered')
                    navigate('/vendor/login')
                    return res
                }
            }
            catch (error) {
                alert(error)
            }
        }
    }


    return (
        <div>
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
                            <div className="flex flex-col sm:flex-row gap-3">
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
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    value={company}
                                    onChange={(e) => setcompany(e.target.value)}
                                    placeholder="Company name"
                                    name="company"
                                />
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
                            <ul className='text-red-700'>
                                <li>{error}</li>
                            </ul>
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