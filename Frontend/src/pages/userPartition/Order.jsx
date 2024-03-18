import React, { useEffect, useState } from 'react'
import { AuthUserAxios } from '../../components/api/api_instance'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

function Order() {
    const userID = jwtDecode(localStorage.getItem('access')).user_id
    const [orderList, setOrderList] = useState([]);
    useEffect(()=>{
        
        AuthUserAxios.get(`user/list/order/${userID}`).then(res=>{
            console.log(res)
            setOrderList(res.data)
        }).catch(err=>console.error(err))
    },[])
    return (
        <div className='pt-24 sm:p-24'>
            <h1 className="text-center font-bold text-2xl">Order</h1>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Place
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Bus name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">View</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((res)=>{
                        return(<tr class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {res.route_id.origin.stop_name} - {res.route_id.destination.stop_name}
                            </th>
                            <td class="px-6 py-4 text-center">
                                {res.route_id.starting_time} - {res.route_id.ending_time}
                            </td>
                            <td class="px-6 py-4">
                                {res.route_id.bus_detail.bus_name}
                            </td>
                            <td class="px-6 py-4">
                                ${res.total}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                            </td>
                        </tr>)

                        })
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default Order