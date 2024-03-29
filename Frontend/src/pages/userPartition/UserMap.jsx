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
    const user = useSelector(state => state.authentication_user)
    const [RouteList, setRouteList] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
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
        if(StartStop && EndStop)
        showBusRoute()
    },[StartStop, EndStop]);


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
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Starting stop</label>
                        <select id="countries" onChange={(e) => { setStartStop(BusStopList.find((val) => e.target.value == val.id)) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} value='' selected>Choose a stop</option>
                            {BusStopList.filter((val) => val != EndStop).map((res, ind) => {
                                return (
                                    <option key={ind} style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Ending stop</label>
                        <select id="countries" onChange={(e) => { setEndStop(BusStopList.find((val) => e.target.value == val.id)) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} selected>Choose a country</option>
                            {BusStopList.filter((val) => val != StartStop).map((res, ind) => {
                                return (
                                    <option key={ind} style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                {/* To show the available buses */}

                {/* After card */}
                {RouteList.map((res)=>{
                return (
                <div className="bg-gray-100 mx-auto border-gray-500 border rounded-sm mt-4 text-gray-700 mb-0.5" key={res.id}>
                    <div className="flex p-3  border-l-8 border-green-600">
                        <div className="space-y-1 border-r-2 pr-1">
                            <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500"> ID #</span> {res.id}</div>
                            <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> Reach time #</span> {res.starting_time}</div>
                            <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> End time #</span> {res.ending_time}</div>
                            <div className="text-xs leading-5 font-semibold"><span className="text-xs leading-3 font-normal text-gray-500 pr"> Number Plate #</span> <br/> {res.bus_detail.bus_number}</div>
                        </div>
                        <div className="flex-1">
                            <div className="ml-3 space-y-1 border-r-2 pr-3">
                                <div className="text-base leading-6 font-normal">{res.bus_detail.bus_name}</div>
                                <div className="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Origin</span> {res.origin.stop_name}</div>
                                <div className="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500"> Destination</span> {res.destination.stop_name} </div>
                            </div>
                        </div>
                        {/* <div className="border-r-2 pr-3">
                            <div >
                                <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                                    <div className="uppercase text-xs leading-4 font-medium">Trailer</div>
                                    <div className="text-center text-sm leading-4 font-semibold text-gray-800">89732</div>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <div className="ml-3 my-5 bg-green-600 p-1 w-20">
                                <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100">Buy</div>
                                <div className="uppercase text-xs leading-4 font-semibold text-center text-green-100 pt">Buy</div>

                            </div>
                        </div>
                        {/* <div>
                            <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div> */}
                    </div>
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