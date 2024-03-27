import React from 'react'

function StopListModal({handleSubmit, origin, waypoints, destination, setChosen}) {
    return (

        <div className="absolute w-full md:w-3/4 h-full backdrop-blur-sm z-50">
            <ol className="relative pb-4 rounded-xl top-1/4 left-1/4 w-1/2 sm:w-1/3 text-gray-900 border-s border-gray-200 dark:border-gray-700 bg-slate-200 ">
                <h1 className='font-bold mb-7 text-center'>Bus Route Details</h1>


                {/* Starting point */}
                <li className="mb-10 ms-6 flex">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full  ring-1 ring-white dark:ring-gray-900 dark:bg-green-900">
                        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span>
                    <h3 className="font-medium pl-12 leading-tight ">{origin.stop_name}</h3>
                </li>
                
                {/* Waypoints */}
                {waypoints.map((res)=>{

                return (
                <li className="mb-10 ms-6 flex" key={res.id}>
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full  ring-1 ring-white dark:ring-gray-900 dark:bg-black">
                        
                        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ffffff" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </span>
                    <h3 className="font-medium pl-12 leading-tight ">{res.stop_name}</h3>
                </li>
                )
                })}

                {/* Ending Points */}
                <li className="mb-10 ms-6 flex">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full ring-white dark:ring-white dark:bg-gray-200">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#f20707" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                    </span>
                    <h3 className="font-medium pl-12 leading-tight ">{destination.stop_name}</h3>
                </li>
                <button onClick={()=>setChosen(null)} type="button" className="focus:outline-none ml-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Close</button>
                <button onClick={()=>handleSubmit()} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Confirm</button>

            </ol>

        </div>
    )
}

export default StopListModal