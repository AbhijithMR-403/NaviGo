import React, { useEffect, useState } from 'react'
import Map from '../../../utils/maps/Map'
import axios from 'axios'
import { AdminBusAxios } from '../../api/api_instance'
import { TError, TSuccess } from '../../toastify/Toastify'

function RouteManagement() {
  const [stopNames, setStopNames] = useState([])
  const [BusNames, setBusNames] = useState([])
  const [stop1, setStop1] = useState('')
  const [stop2, setStop2] = useState('')
  console.log(stop1, stop2);
  useEffect(() => {
    AdminBusAxios.get('/bus/list').then(res => {
      setStopNames(res.data)
    }).catch((err) => {
      console.log("Error: " + err)
    });
    AdminBusAxios.get('/vendor/bus/list').then(res => {
      console.log(res.data);
      setBusNames(res.data)
    }).catch((err) => {
      console.log("Error: " + err)
    });
  }, [])


  return (
    <>
      <h1 className='text-center font-bold text-2xl m-6'>Connect stop</h1>
      <div className='mb-8 w-full xl:w-3/4 z-50 top-48'>
        <div className='m-8 justify-evenly flex'>
          <div>
            <select className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' onChange={(e) => { setStop1(stopNames.find((val) => e.target.value == val.id)); }} name="place1">
              <option className='text-center outline-none' value="">Choice the Bus</option>
              {BusNames.map((val, index) => (
                <option className='text-center outline-none' selected={stop1 == val} value={val.id} key={val.id}>{val.bus_name}</option>
              ))}
            </select>
          </div>
          <div>
            <input placeholder='Price' className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' />
          </div>
        </div>
        <div className='justify-evenly flex'>
          <div>
            <select className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' onChange={(e) => { setStop1(stopNames.find((val) => e.target.value == val.id)); }} name="place1">
              <option className='text-center outline-none' value="">Choice a place</option>
              {stopNames.filter((value) => value != stop2).map((val, index) => (
                <option className='text-center outline-none' selected={stop1 == val} value={val.id} key={val.id}>{val.stop_name}</option>
              ))}
            </select>
          </div>
          <div>
            <select className='sm:w-56 text-center w-32 h-11 appearance-none focus:outline-none rounded-xl shadow-xl' onChange={(e) => { setStop2(stopNames.find((val) => e.target.value == val.id)); }} name="place2">
              <option className='text-center outline-none' value="">Choice a place</option>
              {stopNames.filter((value) => value != stop1).map((val, index) => (
                <option className='text-center outline-none' selected={stop2 == val} value={val.id} key={val.id}>{val.stop_name}</option>
              ))}
            </select>

          </div>
        </div>
      </div>
      <div className='mx-7'>
        <Map />
      </div>
    </>
  )
}

export default RouteManagement