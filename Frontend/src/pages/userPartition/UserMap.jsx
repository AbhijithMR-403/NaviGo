import React, { useEffect, useState } from 'react'
import { AuthUserAxios, UserAxios } from '../../components/api/api_instance';
import MapUsers from '../../utils/maps/MapUsers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserMap() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.9);
    const [BusStopList, setBusStopList] = useState([])
    const [StartStop, setStartStop] = useState(null)
    const [EndStop, setEndStop] = useState(null)
    const [BestAvailableStop, setBestAvailableStop] = useState([])
    const [MidAvailableStop, setMidAvailableStop] = useState([])
    const user = useSelector(state => state.authentication_user)
    const navigate = useNavigate()


    const showBusRoute = async() =>{

        await UserAxios.get(`/user/filter/bus/${StartStop ? StartStop.id : 0}/${EndStop ? EndStop.id : 0}`).then((res) => {
            setBestAvailableStop(res.data.start_routes)
            setMidAvailableStop(res.data.waypoint_routes)
        })
    }


    useEffect(() => {

        UserAxios.get("/bus/stop/list").then((res) => {
            setBusStopList(res.data)

        }).catch((err) => console.log(err))

        const handleResize = () => {
            setMapHeight(window.innerHeight * 0.8);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (data) => {
        if (!user.isAuthenticated) {
            TInfo('Login Required', 'Please Login First')
            navigate('/login')
        }
        const formData = {
            bus_detail: data.bus_detail.id,
            user_id: user.userId,
            start_stop: data.origin.id,
            end_stop: data.destination.id,
            end_time: data.ending_time,
            start_time: data.starting_time,
            route_id: data.id,
        }
        AuthUserAxios.post('/user/create/order', formData).then((res) => {
            navigate(`/confirm/${res.data.ticket_order_id}`)
        }).catch((err) => console.log(err))
    }


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
                        <select id="countries" onChange={(e) => { setStartStop(BusStopList.find((val) => e.target.value == val.id)); showBusRoute() }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} value='' selected>Choose a stop</option>
                            {BusStopList.filter((val) => val != EndStop).map((res) => {
                                return (
                                    <option style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>)
                            })}
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Ending stop</label>
                        <select id="countries" onChange={(e) => { setEndStop(BusStopList.find((val) => e.target.value == val.id)); showBusRoute() }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} selected>Choose a country</option>
                            {BusStopList.filter((val) => val != StartStop).map((res) => {
                                return (
                                    <option style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                {/* To show the available buses */}
                {BestAvailableStop.map((res, ind) => {

                    return (
                        <div key={ind} className='flex justify-evenly mt-4 bus-list-card cursor-pointer' onClick={() => handleSubmit(res)}>
                            <section id="card1 bg-yellow-400" class="card">
                                {res.origin.stop_name} - {res.destination.stop_name}
                                <div class="card__content bg-yellow-400">
                                    <p class="card__title">{res.bus_detail.bus_name}</p>
                                <p class="">{res.starting_time} - {res.ending_time}</p>
                                    <p class="card__description">
                                        ₹{res.price}  | Available Seats : {res.bus_detail.available_seats}
                                    </p>
                                </div>
                            </section>
                        </div>)

                })}
                {MidAvailableStop.map((res, ind) => {

                    return (
                        <div className='flex justify-evenly mt-4 bus-list-card cursor-pointer' key={ind} onClick={() => handleSubmit(res)}>
                            <section id="card1 bg-yellow-400" class="card">
                                {res.origin.stop_name} - {res.destination.stop_name}
                                <div class="card__content bg-green-400">
                                    <p class="card__title">{res.bus_detail.bus_name}</p>
                                    <p class="">{res.starting_time} - {res.ending_time}</p>
                                    <p class="card__description">
                                        ₹{res.price}  | Available Seats : {res.bus_detail.available_seats}
                                    </p>
                                </div>
                            </section>
                        </div>)

                })}

            </div>
            {/* </nav> */}
            <div className='mt-20 w-full'>
                <MapUsers PointA={StartStop} PointB={EndStop} dimension={{ width: 'Auto', height: mapHeight + 'px' }} />
            </div>
        </div>
    )
}

export default UserMap