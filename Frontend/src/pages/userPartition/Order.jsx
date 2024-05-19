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
    const [orderDetail, setOrderDetail] = useState(null)
    useEffect(() => {
        if (!localStorage.getItem('access')) {
            TWarning('Login to get to Order page')
            navigate('/login')
        }
        AuthUserAxios.get(`user/list/order/${userID}`).then(res => {
            setOrderList(res.data)
            console.log(res.data);
        }).catch(err => console.error(err))
    }, [])

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <>
            {orderDetail &&
                (
                    <div className='order-ticket-card absolute z-50 bg-slate-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={() => setOrderDetail(null)}>
                <div className="ticket cursor-pointer">
                    <div className="left">
                        <div className="ticket-info">
                            <p className="date">
                                <span>{days[new Date(orderDetail.created).getDay()].toUpperCase()}</span>
                                <span className={`${months[new Date(orderDetail.created).getMonth()].toLowerCase()}-${new Date(orderDetail.created).getDate()}`}>{months[new Date(orderDetail.created).getMonth()].toUpperCase()} {new Date(orderDetail.created).getDate()}TH</span>
                                <span>{new Date(orderDetail.created).getFullYear()}</span>
                            </p>
                            <div className="show-name">
                                <h1>{orderDetail.route_id.bus_detail.bus_name}</h1>
                                <h2>{orderDetail.start_stop.stop_name} - {orderDetail.end_stop.stop_name}</h2>
                            </div>
                            <div className="time">
                                <p>
                                    {orderDetail.route_id.starting_time} <span>TO</span> {orderDetail.route_id.ending_time}
                                </p>
                            </div>
                            <p className="location">
                                <span>{orderDetail.route_id.origin.stop_name}</span>
                                <span className="separator">
                                    <i className="far fa-smile" />
                                </span>
                                <span>{orderDetail.route_id.destination.stop_name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-info-container">
                            <div className="show-name">
                                <h1>Have a nice trip</h1>
                            </div>
                            {/* <div className="time">
                                <p>
                                    8:00 PM <span>TO</span> 11:00 PM
                                </p>
                                <p>
                                    DOORS <span>@</span> 7:00 PM
                                </p>
                            </div> */}
                            <div className="barcode">
                                <img
                                    src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
                                    alt="QR code"
                                />
                            </div>
                            <p className="text-gray-500">#{orderDetail.ticket_order_id.slice(0,8)}</p>
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
                            {orderList.map((res, index) => {
                                console.log(res);
                                return (<tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {res.start_stop.stop_name} - {res.end_stop.stop_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {res.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {res.start_time.split('T')[1].split('+')[0]} - {res.end_time.split('T')[1].split('+')[0]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {res.route_id.bus_detail.bus_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹{res.total}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => setOrderDetail(res)}>View</a>
                                    </td>
                                </tr>)

                            })
                            }
                        </tbody>
                    </table>

                    {orderList.length == 0 ? (
                        <div className='font-bold text-center p-11'>Nothing</div>
                    ) : null}
                </div>

            </div>
        </>

    )
}

export default Order