import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../constant/api'
import { Button } from '@mui/material'

function StopList() {
    const [busStops, setBusStops] = useState([])
    const deleteStop = async (id) => {
        await axios.delete(API_BASE_URL + `/bus/delete/${id}/`).then((res) => {
            setBusStops((prevStops) => prevStops.filter(stop => stop.id !== id));
        }).catch((error) => {
            console.error("Error deleting bus stop:", error);

        })

    }
    useEffect(() => {
        axios.get(API_BASE_URL + "/bus/list").then((res) => {
            setBusStops(res.data)
            console.log(res.data);

        }).catch((err) => console.log(err))
    }, [])

    return (
        <div className='p-11'>


            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        <tr>
                            <th scope="col" class="px-6 py-3">
                                stop name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                longitude
                            </th>
                            <th scope="col" class="px-6 py-3">
                                latitude
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {busStops.map((item, index) => {
                            return (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.stop_name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {item.lon}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.lat}
                                    </td>
                                    <td class="px-6 py-4">
                                        <Button variant="outlined" color="error" onClick={(e) => deleteStop(item.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StopList