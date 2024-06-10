import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TError, TWarning } from '../../toastify/Toastify';
import { useDispatch } from 'react-redux';
import { set_vendor } from '../../../redux/authentication/VendorSlice';
import { AuthAxios, UserAxios, VendorAuth } from '../../api/api_instance';
import { validatePassword } from '../../../utils/validation/passwordValidation';

function VendorRegister() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [darkMode, setDarkMode] = useState(false);

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [file, setFile] = useState(null);
    const [FileImg, setFileImg] = useState([])


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
        else if(isNaN(phone)){
            TError('Enter a valid number')
        }
        else if (validatePassword(password)) {
            TError(validatePassword(password))
        }
        else if (confirmPassword !== password) {
            TError(['Passwords do not match'])
        }
        else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            TError(['Invalid email address'])
        }
        else if (!file) {
            TError('Upload your image')
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('is_vendor', true);
            formData.append('is_active', false);
            formData.append('profile_img', file);
            await VendorAuth.post('/auth/register', formData).then((res) => {
                dispatch(
                    set_vendor({
                        userID: res.data.user_id,
                    })
                )
                navigate('/vendor/details/' + res.data.user_id + '/')

            }).catch((err) => {
                console.log(err);
                if (err.response.status == 400) {
                    if (err.response.data.error.username)
                        TWarning('This  username is already taken')
                    // navigate('/vendor/register');
                }
                if (err.response.status == 409) {
                    if (err.response.data.error)
                        TWarning('This email already exist')
                    // navigate('/vendor/register');
                }
                console.log(err);
            })
        }
    }



    // Store the validation Documentation image
    function handleChange(e) {
        console.log(e.target.files[0].type);
        if (e.target.files[0].type.includes('image')) {
            setFile(e.target.files[0]);
            setFileImg(URL.createObjectURL(e.target.files[0]))
        }
        else
        TError('Not a valid Image')
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
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name='username'
                                />
                            </div>
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPhone(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    name='cpassword'
                                />

                            </div>
                            <label className='font-mono text-sm mt-2 -mb-3'>Upload profile pic</label>
                            <input type="file" onChange={handleChange} accept="image/png, image/gif, image/jpeg" inputProps={{ accept: 'image/*' }} />
                            <img className='max-w-56 max-h-44' src={FileImg} />

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