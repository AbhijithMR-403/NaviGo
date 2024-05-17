import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Set_Authentication } from '../../../redux/authentication/AuthenticationSlice';
import { jwtDecode } from 'jwt-decode';
import { TError, TInfo, TSuccess, TWarning } from '../../toastify/Toastify';
import { useDispatch } from 'react-redux';
import { AuthAxios } from '../../api/api_instance';

function VendorLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    const handleLogin = async () => {
        const formData = {
            'email': email,
            'password': password
        }
        try {
            const res = await AuthAxios.post('/login', formData)
            if (!res.data.is_vendor) {
                TInfo('Only for Vendors')
                navigate('/')
            }
            else if (!res.data.vendor_details) {
                TInfo('Complete your Detail')
                localStorage.setItem('userID', res.data.user_id);
                dispatch(
                    set_vendor({
                        userID: res.data.user_id,
                    })
                )
                navigate('/vendor/details')
            }
            else if (res.status === 200) {
                if (!res.data.is_vendor) {
                    TWarning('You are not an vendor')
                    navigate('/vendor/login')
                    return res
                }

                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
                dispatch(
                    Set_Authentication({
                        name: jwtDecode(res.data.access).name,
                        isAuthenticated: true,
                        isAdmin: res.data.isAdmin,
                        isVendor: res.data.is_vendor
                    })
                );
                if (!res.data.is_vendor_active) {
                    TInfo('Your approval is under process')
                    navigate('/vendor/waiting')
                    return res
                }
                TSuccess("You have successfully login")
                navigate('/vendor/')
            }
            return res
        }
        catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                TWarning('Activate your account')
                navigate('/vendor/details/' + error.response.data.user + '/')
            }
            TError(error.response.data.error)
        }
    }


    const [darkMode, setDarkMode] = useState(false);
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
                    {"✨            "}Welcome to NaviGo{"                  ✨"}
                </h1>
                <div className="w-full mt-8">
                    <form className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                        </div>
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                ? "bg-[#302E30] text-white focus:border-white"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            autoComplete="on"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                ? "bg-[#302E30] text-white focus:border-white"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            type="password"
                            autoComplete="on"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        <button type='button' onClick={handleLogin} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                            <span className="ml-3">Login</span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Don't have an account?{" "}
                            <Link to={'/vendor/register'}> <span className="text-[#E9522C] font-semibold" >Register</span></Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VendorLogin