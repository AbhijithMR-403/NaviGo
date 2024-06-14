import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TError, TSuccess, TWarning } from '../../toastify/Toastify'
import { AuthUserAxios, UserAxios } from '../../api/api_instance'
import { validatePassword } from '../../../utils/validation/passwordValidation'

function UserProfile() {

    const [UserDetails, setUserDetails] = useState({})
    const [ShowOldPassword, setShowOldPassword] = useState(true)
    const [ShowNewPassword, setShowNewPassword] = useState(true)
    const navigate = useNavigate()
    const userID = localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).user_id : null

    useEffect(() => {
        if (!localStorage.getItem('access')) {
            // if (!localStorage.getItem('loginWarningShown')) {
            //     localStorage.setItem('loginWarningShown', true);
            // }
            TWarning('Needs to Login');
            navigate('/')
            return;
        }


        console.log('this is here first use effect somthings like that ');
        UserAxios.get(`/user/details/${userID}/`).then((res) => {
            console.log(res);
            setUserDetails(res.data)
        }).catch((err) => {
            console.error("Error: ", err)
        })
    }, [])


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        AuthUserAxios.patch(`/user/details/update/${userID}/`, formData).then((res) => {
            setUserDetails(res.data)
        }).catch((err) => {
            console.error("Error: ", err)
        })
    }

    const submitPassword = async (e) => {
        e.preventDefault()
        const formData = { password: e.target.old_password.value, new_password: e.target.new_password.value, user: userID }

        const validationError = validatePassword(formData.new_password);
        if (validationError) {
            TError(validationError);
            return;
        }
        await AuthUserAxios.patch('/auth/update/password', formData).then((res) => {
            TSuccess('password updated')
            console.log(res);
        }).catch((err) => {
            if (err.response.status == 403)
                TError('Wrong current password')
        })
    }

    return (
        <div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-white rounded-xl">
                <div className="mb-4 mt-4 col-span-full xl:mb-2">

                    <h1 className="text-xl font-semibold text-white sm:text-2xl dark:text-white">
                        User settings
                    </h1>
                </div>
                {/* Right Content */}

                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            General information
                        </h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        USERNAME
                                    </label>
                                    <input
                                        type="text"
                                        // name="username"
                                        id="username"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={UserDetails ? UserDetails.username : ""}
                                        required=""
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="last-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="last-name"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter name"
                                        defaultValue={UserDetails ? UserDetails.name : ''}
                                        required=""
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={UserDetails ? UserDetails.email : ''}
                                        required=""
                                        readonly
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="phone-number"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        name="phone_number"
                                        id="phone-number"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="e.g. +(12)3456 789"
                                        defaultValue={UserDetails ? UserDetails.phone_number : ''}
                                        required=""
                                    />
                                </div>

                                <div className="col-span-6 sm:col-full">
                                    <button
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        type="submit"
                                    >
                                        Save all
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            Password information
                        </h3>
                        <form onSubmit={submitPassword}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="current-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Current password
                                    </label>
                                    <div className='relative'>

                                        <input
                                            type={ShowOldPassword?'password':'text'}
                                            name="old_password"
                                            id="current-password"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter your current password"
                                            required=""
                                        />
                                        {ShowOldPassword ?
                                            // Eye open
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowOldPassword(false)} className='absolute w-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' viewBox="0 0 24 24" id="eye"><g><path d="M12,5C7.68,5,4,8.33,1.94,11.45L1.59,12l.36.55C4,15.67,7.68,19,12,19s8-3.33,10.06-6.45l.36-.55-.36-.55C20,8.33,16.32,5,12,5Zm0,12c-3.28,0-6.21-2.49-8-5,1.8-2.51,4.73-5,8-5s6.21,2.49,8,5C18.21,14.51,15.28,17,12,17Z"></path><path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path></g></svg>
                                            :
                                            // Eye close
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowOldPassword(true)} className='absolute w-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' viewBox="0 0 20 20" id="eye"><path d="M18.521 1.478a1 1 0 0 0-1.414 0L1.48 17.107a1 1 0 1 0 1.414 1.414L18.52 2.892a1 1 0 0 0 0-1.414zM3.108 13.498l2.56-2.56A4.18 4.18 0 0 1 5.555 10c0-2.379 1.99-4.309 4.445-4.309.286 0 .564.032.835.082l1.203-1.202A12.645 12.645 0 0 0 10 4.401C3.44 4.4 0 9.231 0 10c0 .423 1.057 2.09 3.108 3.497zm13.787-6.993l-2.562 2.56c.069.302.111.613.111.935 0 2.379-1.989 4.307-4.444 4.307-.284 0-.56-.032-.829-.081l-1.204 1.203c.642.104 1.316.17 2.033.17 6.56 0 10-4.833 10-5.599 0-.424-1.056-2.09-3.105-3.495z"></path></svg>
                                        }
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        New password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            data-popover-target="popover-password"
                                            data-popover-placement="bottom"
                                            type={ShowNewPassword?'password':'text'}
                                            name='new_password'
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your new password"
                                            required=""
                                        />
                                        {ShowNewPassword ?
                                            // Eye open
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowNewPassword(false)} className='absolute w-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' viewBox="0 0 24 24" id="eye"><g><path d="M12,5C7.68,5,4,8.33,1.94,11.45L1.59,12l.36.55C4,15.67,7.68,19,12,19s8-3.33,10.06-6.45l.36-.55-.36-.55C20,8.33,16.32,5,12,5Zm0,12c-3.28,0-6.21-2.49-8-5,1.8-2.51,4.73-5,8-5s6.21,2.49,8,5C18.21,14.51,15.28,17,12,17Z"></path><path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path></g></svg>
                                            :
                                            // Eye close
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowNewPassword(true)} className='absolute w-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' viewBox="0 0 20 20" id="eye"><path d="M18.521 1.478a1 1 0 0 0-1.414 0L1.48 17.107a1 1 0 1 0 1.414 1.414L18.52 2.892a1 1 0 0 0 0-1.414zM3.108 13.498l2.56-2.56A4.18 4.18 0 0 1 5.555 10c0-2.379 1.99-4.309 4.445-4.309.286 0 .564.032.835.082l1.203-1.202A12.645 12.645 0 0 0 10 4.401C3.44 4.4 0 9.231 0 10c0 .423 1.057 2.09 3.108 3.497zm13.787-6.993l-2.562 2.56c.069.302.111.613.111.935 0 2.379-1.989 4.307-4.444 4.307-.284 0-.56-.032-.829-.081l-1.204 1.203c.642.104 1.316.17 2.033.17 6.56 0 10-4.833 10-5.599 0-.424-1.056-2.09-3.105-3.495z"></path></svg>
                                        }
                                    </div>
                                    {/* <div
                                        data-popover=""
                                        id="popover-password"
                                        role="tooltip"
                                        className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                                    >
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                Must have at least 6 characters
                                            </h3>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                                                <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                                                <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                                                <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                                            </div>
                                            <p>It’s better to have:</p>
                                            <ul>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Upper &amp; lower case letters
                                                </li>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    A symbol (#$&amp;)
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    A longer password (min. 12 chars.)
                                                </li>
                                            </ul>
                                        </div>
                                        <div data-popper-arrow="" />
                                    </div> */}
                                </div>
                                {/* <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="text"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="••••••••"
                                        required=""
                                    />
                                </div> */}
                                <div className="col-span-6 sm:col-full">
                                    <button
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        type="submit"
                                    >
                                        Save all
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserProfile