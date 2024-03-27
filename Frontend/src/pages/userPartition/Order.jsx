import React, { useEffect, useState } from 'react'
import { AuthUserAxios } from '../../components/api/api_instance'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { TWarning } from '../../components/toastify/Toastify'

function Order() {
    const userID = localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).user_id : null;
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('access')) {
            TWarning('Login to get to Order page')
            navigate('/login')
        }
        AuthUserAxios.get(`user/list/order/${userID}`).then(res => {
            setOrderList(res.data)
        }).catch(err => console.error(err))
    }, [])

    return (
        <>
            {false && (
                <div className='order-ticket-card absolute z-50 bg-slate-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="ticket">
                        <div className="left">
                            {/* <div className="image">
                            <p className="admit-one">
                                <span>ADM ONE</span>
                                <span>AT ONE</span>
                                <span>ADMIT ONE</span>
                            </p>
                            <div className="text-gray-500">
                                <p>#20030220</p>
                            </div>
                        </div> */}
                            <div className="ticket-info">
                                <p className="date">
                                    <span>TUESDAY</span>
                                    <span className="june-29">JUNE 29TH</span>
                                    <span>2021</span>
                                </p>
                                <div className="show-name">
                                    <h1>Prom</h1>
                                    <h2>Olivia Rodrigo</h2>
                                </div>
                                <div className="time">
                                    <p>
                                        8:00 PM <span>TO</span> 11:00 PM
                                    </p>
                                    {/* <p>
                                    DOORS <span>@</span> 7:00 PM
                                </p> */}
                                </div>
                                <p className="location">
                                    <span>East High School</span>
                                    <span className="separator">
                                        <i className="far fa-smile" />
                                    </span>
                                    <span>Salt Lake City, Utah</span>
                                </p>
                            </div>
                        </div>
                        <div className="right">
                            {/* <p className="admit-one">
                            <span>ADMIT ONE</span>
                            <span>ADMIT ONE</span>
                            <span>ADMIT ONE</span>
                        </p> */}
                            <div className="right-info-container">
                                <div className="show-name">
                                    <h1>SOUR Prom</h1>
                                </div>
                                <div className="time">
                                    <p>
                                        8:00 PM <span>TO</span> 11:00 PM
                                    </p>
                                    <p>
                                        DOORS <span>@</span> 7:00 PM
                                    </p>
                                </div>
                                <div className="barcode">
                                    <img
                                        src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
                                        alt="QR code"
                                    />
                                </div>
                                <p className="text-gray-500">#20030220</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='pt-24 sm:p-24 '>

                <h1 className="text-center font-bold text-2xl ">Order</h1>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Place
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bus name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((res) => {
                                console.log(res);
                                return (<tr className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {res.route_id.origin.stop_name} - {res.route_id.destination.stop_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {res.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {res.route_id.starting_time} - {res.route_id.ending_time}
                                    </td>
                                    <td className="px-6 py-4">
                                        {res.route_id.bus_detail.bus_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹{res.total}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 hover:underline">View</a>
                                    </td>
                                </tr>)

                            })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>

    )
}

export default Order