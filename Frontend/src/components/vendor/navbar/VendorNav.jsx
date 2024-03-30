import React from 'react'
import NavConfig from './config-navigation'
import { AuthAxios } from '../../api/api_instance';
import { Link } from 'react-router-dom';

const VendorNav = () => {
    const token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');

    const logout = async () => {
        await AuthAxios.post('/logout', { refresh_token: refresh_token }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
        localStorage.removeItem("access");
        window.location.reload();
    }
    return (
        <div>
            <aside id="logo-sidebar" className="text-white fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  dark:border-gray-700" aria-label="Sidebar" style={{ backgroundColor: '#0E1111' }}>
                <div className="h-full px-3 pb-4 overflow-y-auto " >
                    <img className='w-28 h-10 mb-9' src="/assets/Logo/navigo-logo-white-transparent.png" alt="" srcSet="" />
                    <ul className="space-y-2 font-medium">
                        {/* DO from here man */}
                        {NavConfig.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" to={item.path}>
                                    {/* <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> */}
                                        {item.img()}
                                        <span className="ms-3">{item.title}</span>
                                    {/* </a> */}
                                    </Link>
                                </li>)
                        })}
                        <li onClick={logout}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="ms-3">Log out</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default VendorNav