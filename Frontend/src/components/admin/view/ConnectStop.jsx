import React, { useEffect, useState } from 'react'
import AdminMap from '../../../utils/maps/AdminMap'
import axios from 'axios'
import { AdminBusAxios } from '../../api/api_instance'

function ConnectStop() {
    const [stopNames, setStopNames] = useState([])
    const [stop1, setStop1] = useState('')
    const [stop2, setStop2] = useState('')
    useEffect(() => {
        AdminBusAxios.get('/bus/list').then(res => {
            console.log(res.data);
            setStopNames(res.data)
        }).catch((err) => {
            console.log("Error: " + err)
        });
    }, [])

    return (
        <>
            <h1 className='text-center font-bold text-2xl m-6'>Connect stop</h1>
            <div className='absolute w-full xl:w-3/4 z-50 top-48'>
                <div className='justify-evenly flex'>
                    <div>
                        <select className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' onChange={(e) => { setStop1(stopNames.find((val)=>e.target.value==val.id)); }} name="place1">
                            <option className='text-center outline-none' value="">Choice a place</option>
                            {stopNames.filter((value) => value != stop2).map((val, index) => (
                                <option className='text-center outline-none' selected={stop1 == val} value={val.id} key={val.id}>{val.stop_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className='sm:w-56 text-center w-32 h-11 appearance-none focus:outline-none rounded-xl shadow-xl' onChange={(e) => { setStop2(stopNames.find((val)=>e.target.value==val.id)); }} name="place2">
                        <option className='text-center outline-none' value="">Choice a place</option>
                            {stopNames.filter((value) => value != stop1).map((val, index) => (
                                <option className='text-center outline-none' selected={stop2 == val} value={val.id} key={val.id}>{val.stop_name}</option>
                            ))}
                        </select>

                    </div>
                </div>
            </div>
            <AdminMap PointA={stop1} PointB={stop2} />
        </>
    )
}

export default ConnectStop