import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { AdminBusAxios } from '../../api/api_instance'

function StopList() {
    const [busStops, setBusStops] = useState([])
    const deleteStop = async (id) => {
        await AdminBusAxios.delete(`/bus/delete/${id}/`).then((res) => {
            setBusStops((prevStops) => prevStops.filter(stop => stop.id !== id));
        }).catch((error) => {
            console.error("Error deleting bus stop:", error);

        })
    }

    useEffect(() => {
        AdminBusAxios.get("/bus/stop/list").then((res) => {
            setBusStops(res.data)
        }).catch((err) => console.log(err))
    }, [])

    return (
        <div className='p-11'>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        <tr>
                            <th scope="col" className="px-6 py-3">
                                stop id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                stop name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                longitude
                            </th>
                            <th scope="col" className="px-6 py-3">
                                latitude
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {busStops.map((item, index) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.id}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.stop_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.lng}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.lat}
                                    </td>
                                    <td className="px-6 py-4">
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