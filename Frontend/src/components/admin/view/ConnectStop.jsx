import React, { useEffect, useState } from 'react'
import Map from '../../../utils/maps/Map'
import axios from 'axios'
import { AdminBusAxios } from '../../api/api_instance'
import { TError, TSuccess } from '../../toastify/Toastify'

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

    const submitBusConnection = (event) =>{
        event.preventDefault();
        const formData = new FormData();

        console.log(formData);
        if (stop1 === '' || stop2 ==='') return alert("Please enter both stops") 
        {
        formData.append("bus_stop_1", stop1.id);
        formData.append("bus_stop_2", stop2.id);
        }

        AdminBusAxios.post("/bus/connect", formData).then(response=>{
            console.log(response);
            TSuccess('Successful Connection')
        }).catch((err)=>{
            console.log(err);
            if(err.response.status == 401){
                TError('There is an issue with Refesh token');
            }
            else if(err.response.status == 400){
                console.log(err);
            }
            else{
            console.log(err);
            TError(err.response.data.error)}
        })
    }

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
            <div className='mx-7'>
            <Map PointA={stop1} PointB={stop2} />
            </div>
            <form onSubmit={submitBusConnection}>
            <input className="ml-8 mt-8 shadow appearance-none border rounded sm:w-1/2 w-3/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='distance' placeholder='Distance' id="distance" type="number" step=".01" />

            <input className="ml-8 mt-8 shadow appearance-none border rounded sm:w-1/2 w-3/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='time' placeholder='Time(minute)' id="time" type="number" />

            <button className="ml-8 mt-10 w-1/12 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-600 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Add Stop
          </button>
          </form>
        </>
    )
}

export default ConnectStop