import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../constant/api';
// import { APIProvider, AdvancedMarker, InfoWindow, Map } from '@vis.gl/react-google-maps';
import axios from 'axios';

function UserMap() {
    // const [data, setData] = React.useState([]);
    // useEffect(() => {
    //     axios.get(API_BASE_URL + '/bus/list').then((res) => {
    //         console.log('Bus List: ', res.data)
    //         setData(res.data)
    //     }).catch((err) => {
    //         console.log('Error:', err);
    //     })
    // }, [])
    // const center = {
    //     lat: 10.0905715,
    //     lng: 76.2989896,
    // };
    return (
        <div className='mt-20'>
            {/* <APIProvider apiKey={GOOGLE_MAP_API} >
                <label class="block text-gray-700 text-sm font-bold mb-2 mt-9" for="username">
              Stop Location
            </label>
                <div className='w-full h-80' >

                    <Map zoom={12} center={center} mapId={'7eded6b9224bb80'}>

                        <AdvancedMarker position={center} >
                        </AdvancedMarker>
                        {data.map((item, index) => {
                            const point = {

                                lat: item.lat,
                                lng: item.lon,
                            }
                            console.log(point);
                            return (<>
                                
                                <AdvancedMarker position={point} >
                                </AdvancedMarker>
                            </>
                            )
                        })}

                    </Map>
                </div>
            </APIProvider> */}
        </div>
    )
}

export default UserMap