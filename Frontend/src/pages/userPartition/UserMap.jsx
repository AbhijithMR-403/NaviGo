import React, { useEffect, useState } from 'react'
import { UserAxios } from '../../components/api/api_instance';
import MapUsers from '../../utils/maps/MapUsers';

function UserMap() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.9);
    const [BusStopList, setBusStopList] = useState([])
    const [StartStop, setStartStop] = useState(null)
    const [EndStop, setEndStop] = useState(null)
    console.log(StartStop);
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
                        <select id="countries" onChange={(e) => { setStartStop(BusStopList.find((val) => e.target.value == val.id)); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                        <select id="countries" onChange={(e) => { setEndStop(BusStopList.find((val) => e.target.value == val.id)); }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option style={{ backgroundColor: '#C2FCC6' }} selected>Choose a country</option>
                            {BusStopList.filter((val) => val != StartStop).map((res) => {
                                return (
                                    <option style={{ backgroundColor: '#C2FCC6' }} value={res.id}>{res.stop_name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                {/* To show the available buses */}
                <div className='flex justify-evenly mt-4 bus-list-card'>
                    <section id="card1" class="card">
                        hello
                        <div class="card__content">
                            <p class="card__title">Lorem Ipsum</p>
                            <p class="card__description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
                            </p>
                        </div>
                    </section>
                </div>
                <div className='flex justify-evenly mt-4 bus-list-card'>
                    <section id="card1" class="card">
                        hello
                        <div class="card__content">
                            <p class="card__title">Lorem Ipsum</p>
                            <p class="card__description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
                            </p>
                        </div>
                    </section>
                </div>
                <div className='flex justify-evenly mt-4 bus-list-card'>
                    <section id="card1" class="card">
                        hello
                        <div class="card__content">
                            <p class="card__title">Lorem Ipsum</p>
                            <p class="card__description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            {/* </nav> */}
            <div className='mt-20 w-full'>
                <MapUsers dimension={{ width: 'Auto', height: mapHeight + 'px' }} />
            </div>
        </div>
    )
}

export default UserMap