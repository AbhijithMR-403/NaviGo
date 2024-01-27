import React from 'react'
import NavConfig from './config-navigation'

const VendorNav = () => {
    return (
        <div>
            <aside id="logo-sidebar" class="text-white fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  dark:border-gray-700" aria-label="Sidebar" style={{backgroundColor: '#0E1111'}}>
                <div class="h-full px-3 pb-4 overflow-y-auto " >
                    <img className='w-28 h-10 mb-9' src="/public/assets/Logo/navigo-logo-white-transparent.png" alt="" srcset="" />
                    <ul class="space-y-2 font-medium">
                        {/* DO from here man */}
                        {NavConfig.map((item, index)=>{
                            return(
                            <li key={index}>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {item.img()}
                                <span class="ms-3">{item.title}</span>
                            </a>
                        </li>)
                        })}
                        
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default VendorNav