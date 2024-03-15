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
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Starting stop</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} selected>Choose a country</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="US">United States</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="CA">Canada</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="FR">France</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="DE">Germany</option>
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Ending stop</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} selected>Choose a country</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="US">United States</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="CA">Canada</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="FR">France</option>
                            <option style={{ backgroundColor: '#C2FCC6' }} value="DE">Germany</option>
                        </select>
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