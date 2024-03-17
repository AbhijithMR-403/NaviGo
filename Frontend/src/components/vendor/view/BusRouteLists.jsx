import React, { useEffect, useState } from 'react'
import { VendorAxios } from '../../api/api_instance'
import { useSelector } from 'react-redux'

function BusRouteLists() {
    const [busRoutes, setBusRoutes] = useState([])
    const { userId } = useSelector(state => state.authentication_user)

    useEffect(() => {
        VendorAxios.get(`/vendor/view/bus/route/${userId}`).then(res => {
            console.log(res)
            setBusRoutes(res.data)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className='relative h-full w-full rounded-md border-t'>

                <form className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <div>
                <div className="container mx-auto bg-gray-50 min-h-screen p-8 antialiased">
                    <div>

                        {/* <div class="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30">
                            <div class="flex p-3 border-l-8 border-yellow-600">
                                <div class="space-y-1 border-r-2 pr-3">
                                    <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal text-gray-500"> Release #</span> LTC08762304</div>
                                    <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal text-gray-500 pr"> BOL #</span> 10937</div>
                                    <div class="text-sm leading-5 font-semibold">JUN 14. 9:30 PM</div>
                                </div>
                                <div class="flex-1">
                                    <div class="ml-3 space-y-1 border-r-2 pr-3">
                                        <div class="text-base leading-6 font-normal">KROGER MEMPHIS</div>
                                        <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal text-gray-500"> Carrier</span> PAPER TRANSPORT INC.</div>
                                        <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal text-gray-500"> Destination</span> WestRock Jacksonville - 9469 Eastport Rd, Jacksonville, FL 32218</div>
                                    </div>
                                </div>
                                <div class="border-r-2 pr-3">
                                    <div >
                                        <div class="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                                            <div class="uppercase text-xs leading-4 font-medium">Trailer</div>
                                            <div class="text-center text-sm leading-4 font-semibold text-gray-800">89732</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="ml-3 my-5 bg-yellow-600 p-1 w-20">
                                        <div class="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">Loaded</div>
                                    </div>
                                </div>
                                <div>
                                    <button class="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        {busRoutes.map((res)=>{
                            console.log(res);
                            return(
                        <div className="bg-gray-100 mx-auto border-gray-500 border rounded-sm  text-gray-700 mb-0.5">
                            <div className="flex p-3  border-l-8 border-green-600">
                                <div className="space-y-1 border-r-2 pr-3">
                                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500"> ID #</span> {res.id}</div>
                                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500 pr"> Starting time #</span> {res.starting_time}</div>
                                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500 pr"> Ending time #</span> {res.ending_time}</div>
                                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500 pr"> Number Plate #</span> {res.bus_detail.bus_number}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="ml-3 space-y-1 border-r-2 pr-3">
                                        <div className="text-base leading-6 font-normal">{res.bus_detail.bus_name}</div>
                                        <div className="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Origin</span> {res.origin.stop_name}</div>
                                        <div className="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Destination</span> {res.destination.stop_name} </div>
                                    </div>
                                </div>
                                <div className="border-r-2 pr-3">
                                    <div >
                                        <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                                            <div className="uppercase text-xs leading-4 font-medium">Trailer</div>
                                            <div className="text-center text-sm leading-4 font-semibold text-gray-800">89732</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="ml-3 my-5 bg-green-600 p-1 w-20">
                                        <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100">Picked UP</div>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        )})}

                        {/* <div class="bg-gray-100 mx-auto border-gray-500 border rounded-sm  text-gray-700 mb-0.5">
                            <div class="flex p-3  border-l-8 border-red-600">
                                <div class="space-y-1 border-r-2 pr-3">
                                    <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal text-gray-500"> Release #</span> LTC08762304</div>
                                    <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal text-gray-500 pr"> BOL #</span> 10937</div>
                                    <div class="text-sm leading-5 font-semibold">JUN 14. 9:30 PM</div>
                                </div>
                                <div class="flex-1">
                                    <div class="ml-3 space-y-1 border-r-2 pr-3">
                                        <div class="text-base leading-6 font-normal">KROGER MEMPHIS</div>
                                        <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal text-gray-500"> Carrier</span> PAPER TRANSPORT INC.</div>
                                        <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal text-gray-500"> Destination</span> WestRock Jacksonville - 9469 Eastport Rd, Jacksonville, FL 32218</div>
                                    </div>
                                </div>
                                <div class="border-r-2 pr-3">
                                    <div >
                                        <div class="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                                            <div class="uppercase text-xs leading-4 font-medium">Trailer</div>
                                            <div class="text-center text-sm leading-4 font-semibold text-gray-800">89732</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="ml-3 my-5 bg-red-600 p-1 w-20">
                                        <div class="uppercase text-xs leading-4 font-semibold text-center text-red-100">Canceled</div>
                                    </div>
                                </div>
                                <div>
                                    <button class="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BusRouteLists