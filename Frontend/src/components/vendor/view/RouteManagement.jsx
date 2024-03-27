import React, { useEffect, useState } from 'react'
import Map from '../../../utils/maps/Map'
import axios from 'axios'
import { AdminBusAxios, VendorAxios } from '../../api/api_instance'
import { TError, TSuccess } from '../../toastify/Toastify'
import RouteCard from './elements/RouteCard'
import StopListModal from './elements/StopListModal'
import TimePicker from './elements/TimePicker'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RouteManagement() {
  const [stopNames, setStopNamesList] = useState([])
  const [BusNames, setBusNames] = useState([])
  // origin
  const [stop1, setStop1] = useState(null)
  // destination
  const [stop2, setStop2] = useState(null)
  const { userId } = useSelector(state => state.authentication_user)


  const [AvailableRoutes, setAvailableRoutes] = useState(null)
  const [chosen, setChosen] = useState(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    price: '',
    bus_name: ''
  })
  const [fromTime, setFromTime] = useState('')
  const [endTime, setEndTime] = useState('')
  useEffect(() => {
    AdminBusAxios.get('/bus/stop/list').then(res => {
      setStopNamesList(res.data)
      console.log(res.data);
    }).catch((err) => {
      if(err.response.status == 401)
        window.location.reload();
      console.log("Error: " + err)
    });
    AdminBusAxios.get(`/vendor/bus/list/${userId}`).then(res => {
      setBusNames(res.data)
    }).catch((err) => {
      console.log("Error: " + err)
    });
  }, [])


  const AvailableRoutesFn = async () => {

    if (stop1 && stop2) {
      const formData = {
        'origin': stop1.id,
        'destination': stop2.id,
      }
      await VendorAxios.get('/bus/route/available', { params: formData }).then(res => {
        setAvailableRoutes(res.data)
        if (res.data.wayPoint.length == 0) {
          TError('There is no route through those bus stops')
        }

      }).catch(err => console.error(err))
    }
  }
  const validateSetChosen = (waypoint) => {
    
    if (formData.bus_name === '') {
      TError('Select the bus that will operate this route');
    }
    else if (formData.price == '') {
      TError('Please enter a fare')
    }
    else if (!Number(formData.price)) {
      TError('Fare must be a number')
    }
    else if (fromTime >=  endTime) {
      TError('Departure time should be earlier than arrival time');
    }
    else {
      setChosen(waypoint)
    }
  }
  const handleSubmit = async() => {
    const form_data = {
      'origin': stop1.id,
      'destination': stop2.id,
      'price': formData.price,
      'bus_detail': formData.bus_name,
      'starting_time':fromTime,
      'ending_time':endTime
    }
    await VendorAxios.post(`/vendor/route/create`, form_data).then((response)=>{
      
        const wayPointData = {
          'route':response.data.id,
          'stop':chosen,
        }
         VendorAxios.post('/vendor/waypoint/bulk/create' ,wayPointData).then((res)=>{
          console.log(res);
          TSuccess("Route and Waypoints created successfully");
          // setFormData({price: '', bus_name: ''})
          setChosen(null)
        }).catch((err)=>{
          console.log(err);
        })
        console.log(wayPointData);
    })
    .catch((errors)=>{
      if (errors.response.status = 400)
      TError(errors.response.data.error)
      console.log(errors)
    });
  }


  return (
    <>
      {chosen && AvailableRoutes &&
        <StopListModal handleSubmit={handleSubmit} origin={AvailableRoutes.origin} setChosen={setChosen} destination={AvailableRoutes.destination} waypoints={chosen} />
      }
      <h1 className='text-center font-bold text-2xl m-6'>Connect stop</h1>
      <div className='mb-8 w-full lG:w-3/4 z-50 top-48'>
        <div className='m-8 justify-evenly flex'>
          <div>
            <select className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' value={formData.bus_name} onChange={(e) => { setFormData({ ...formData, bus_name: e.target.value }) }} name="place1">
              <option className='text-center outline-none' value="">Choice the Bus</option>
              {BusNames.map((val, index) => (
                <option className='text-center outline-none' selected={stop1 == val} value={val.id} key={val.id}>{val.bus_name}</option>
              ))}
            </select>
          </div>
          <div>
            <input placeholder='Price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className=' text-center sm:w-56 w-32 h-11 focus:outline-none appearance-none rounded-xl shadow-xl' />
          </div>
        </div>


        <div className='m-8 justify-evenly flex'>
          <div>
            <h1>Starting time</h1>
            <TimePicker setTime={setFromTime} />
          </div>
          <div>
            <h1>Ending Time</h1>
            <TimePicker setTime={setEndTime} />
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
            <p className='text-right mr-5 mt-3 text-blue-500 cursor-pointer' onClick={() => AvailableRoutesFn()}>Refresh</p>
          </div>
        </div>


        <div className='m-5 mt-8 justify-evenly flex flex-wrap'>
          {AvailableRoutes && AvailableRoutes.wayPoint.map((res, index) => {
            return (
              <RouteCard validateSetChosen={validateSetChosen} Waypoint={res} key={index} />
            )
          })}

        </div>
      </div>

      <div className='mx-7'>
        <Map />
      </div>
    </>
  )
}

export default RouteManagement