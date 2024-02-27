import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../constant/api';
import axios from 'axios';
import Map from '../../utils/maps/Map';

function UserMap() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.9);

    useEffect(() => {
        const handleResize = () => {
            setMapHeight(window.innerHeight * 0.8);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className='relative bg-gray-100'>
            {/* <nav> */}

            {/* If At any point you felt to change the color of side nav bar 
            style={{backgroundColor:'#7DFFCE'}} */}
            <div className='bg-blue-100 h-full sm:w-96 absolute z-50'>
                <div className='flex justify-evenly mt-10'>
                    
                    {/* Origin */}
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                        <input
                         style={{ backgroundColor: '#51E08F' }}
                            type="text"
                            list="countries1"
                            // placeholder="Search for a country"
                            className="bg-black border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <datalist id="countries1">
                            <option style={{ backgroundColor: '#C2FCC6' }} value="usa" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="canada" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="france" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="dutch" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="US" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="CA" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="FR" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="DE" />
                        </datalist>
                    </div>

                    {/* Destination */}
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                        <input
                         style={{ backgroundColor: '#51E08F' }}
                            type="text"
                            list="countries1"
                            // placeholder="Search for a country"
                            className="bg-black border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <datalist id="countries1">
                            <option style={{ backgroundColor: '#C2FCC6' }} value="usa" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="canada" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="france" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="dutch" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="US" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="CA" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="FR" />
                            <option style={{ backgroundColor: '#C2FCC6' }} value="DE" />
                        </datalist>
                    </div>
                    
                </div>
            </div>
            {/* </nav> */}
            <div className='mt-20 w-full'>
                <Map dimension={{ width: 'Auto', height: mapHeight + 'px' }} />
            </div>
        </div>
    )
}

export default UserMap