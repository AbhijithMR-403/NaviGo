import React, { useEffect, useState } from 'react'
import { AuthUserAxios, UserAxios } from '../../components/api/api_instance';
import MapUsers from '../../utils/maps/MapUsers';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TInfo, TWarning } from '../../components/toastify/Toastify';
import { RxCross1 } from "react-icons/rx";

function UserMap() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.9);
    const [BusStopList, setBusStopList] = useState([])
    const [StartStop, setStartStop] = useState(null)
    const [EndStop, setEndStop] = useState(null)
    const [showPoint, setShowPoint] = useState({ 'origin': null, 'destination': null })
    const user = useSelector(state => state.authentication_user)
    const [RouteList, setRouteList] = useState([])
    const [AvailableDate, setAvailableDate] = useState(null)
    const [RouteDetail, setRouteDetail] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const showBusRoute = async () => {
            console.log(StartStop);
            console.log(EndStop);
            await UserAxios.get(`/user/filter/bus/${StartStop ? StartStop.id : 0}/${EndStop ? EndStop.id : 0}`).then((res) => {
                console.log(res);
                setRouteList(res.data)
            }).catch((err) => {
                console.log("Error: " + err)
            })
        }
        if (StartStop && EndStop)
            showBusRoute()
    }, [StartStop, EndStop]);


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

    const handleSubmit = (start, end) => {
        if (!user.isAuthenticated) {
            TInfo('Login Required')
            navigate('/login');
        }
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();
        // console.log(today + "" + end.reaching_time);
        // today = yyyy + '-' + mm + '-' + dd;
        const formData = {
            bus_detail: RouteDetail.bus_detail.id,
            user_id: user.userId,
            start_stop: StartStop.id,
            end_stop: EndStop.id,
            start_time: start,
            end_time: end,
            route_id: RouteDetail.id,
            // Not using this 
            starting_stop: RouteDetail.origin.id,
            ending_stop: RouteDetail.destination.id,
        }
        AuthUserAxios.post('/user/create/order', formData).then((res) => {
            console.log('you are here');
            navigate(`/confirm/${res.data.ticket_order_id}`)
        }).catch((err) => {
            console.log(err)
            if (err.response.status == 401) {
                TWarning('Sorry Trying to verify')
                window.location.reload()
            }
        })
    }

    const AvailDate = async (res) =>{
        console.log(res);
        setRouteDetail(res)
        await UserAxios.get(`/user/avail/date/${res.id}?start_stop=${StartStop.id}&end_stop=${EndStop.id}`).then((res)=>{
            setAvailableDate(res.data)
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='relative bg-gray-100'>
            {/* Modal */}
           {AvailableDate && <div className="absolute w-full h-72 z-40">
                <div className="rounded border-2 ring-offset-2 border-gray-600 absolute top-1/2 left-1/2 w-96 -translate-x-1/2 p-4 bg-blue-200">
                    <div className="flex justify-between">
                        <div className='inline-flex'>
                        <p>Time Taken:</p> <p>12:43</p>
                        </div>
                        <div className='cursor-pointer' onClick={()=>setAvailableDate(null)}>
                        <RxCross1 />
                        </div>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        {AvailableDate.map((res) => {
                            const date = res.date_time.split('T')[0]
                            return (
                                <div class="m-2" onClick={()=>handleSubmit(res.date_time, res.end_date_time)}>
                                    <div class="rounded border-2 border-gray-600 p-4 bg-blue-300 hover:bg-blue-400 cursor-pointer min-w-32 text-center">
                                        {date.split('-')[2]}-{date.split('-')[1]}
                                        <br />
                                        {res.day}
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>}
            {/* <nav> */}

            {/* If At any point you felt to change the color of side nav bar 
            style={{backgroundColor:'#7DFFCE'}} */}
            <div className='bg-blue-100 h-full sm:w-96 absolute z-10'>
                <div className='flex justify-evenly mt-10'>

                    {/* Origin */}
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Starting stop</label>
                        <select id="countries" onChange={(e) => { setStartStop(BusStopList.find((val) => e.target.value == val.id)) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} value=''>Choose a stop</option>
                            {BusStopList.map((res, ind) => {
                                return (
                                    <option key={ind} style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Ending stop</label>
                        <select id="countries" onChange={(e) => { setEndStop(BusStopList.find((val) => e.target.value == val.id)) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }}>Choose a stop</option>
                            {BusStopList.map((res, ind) => {
                                return (
                                    <option key={ind} style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                {/* To show the available buses */}
                {RouteList.length == 0 ? <div className='text-center p-4 mt-6 font-bold'>No bus Available in this route</div> : null}
                {/* After card */}
                {RouteList.map((res, ind) => {
                    let starting_stop = res.list_stops.find(val => val.stop.id === StartStop.id);
                    let ending_stop = res.list_stops.find(val => val.stop.id === EndStop.id);
                    return (
                        <div className="bg-gray-100 mx-auto border-gray-500 border rounded-sm mt-4 text-gray-700 mb-0.5" key={res.id}>
                            <div className="flex p-3  border-l-8 border-green-600">
                                <div className="space-y-1 border-r-2 pr-1">
                                    <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500"> ID #</span> {res.id}</div>
                                    <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> Reach time #</span>{starting_stop?.reaching_time}</div>
                                    <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> End time #</span> {ending_stop?.reaching_time}</div>
                                    <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> Number Plate #</span> <br /> {res.bus_detail.bus_number}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="ml-3 space-y-1 border-r-2 pr-3">
                                        <div className="text-base leading-6 font-normal">{res.bus_detail.bus_name}</div>
                                        <div className="text-xs leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Origin:</span><br />{res.origin.stop_name}</div>
                                        <div className="text-xs leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Destination:</span><br />{res.destination.stop_name} </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="ml-3 my-5 bg-green-600 p-1 w-20 rounded-xl cursor-pointer">
                                        <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100" onClick={() => AvailDate(res)}>Buy</div>
                                        {/* <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100" onClick={() => handleSubmit(res, starting_stop, ending_stop)}>Buy</div> */}
                                    </div>
                                    <div className="ml-3 my-5 bg-blue-600 p-1 w-20 rounded-xl cursor-pointer">
                                        <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100 pt" onClick={() => setShowPoint({ 'origin': res.origin, 'destination': res.destination })}>view on map</div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}

            </div>
            {/* </nav> */}
            <div className='mt-20 w-full'>
                <MapUsers PointA={showPoint.origin} PointB={showPoint.destination} dimension={{ width: 'Auto', height: mapHeight + 'px' }} />
            </div>
        </div>
    )
}

export default UserMap