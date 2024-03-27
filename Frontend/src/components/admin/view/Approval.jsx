import React, { useEffect } from 'react'
import { AdminAxios } from '../../api/api_instance'
import { TError, TOwnerError } from '../../toastify/Toastify';

function Approval() {

    const [approvedList, setApprovedList] = React.useState([])
    const token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');

    const getData = async() => {
        await AdminAxios.get('/vendor/list').then((res) => {
            setApprovedList(res.data)
        }).catch((err) => {
            if(err.response.status == 401){
                window.location.reload();
            }
            TError(err)
        })
    }

    useEffect(() => {
        getData()

    }, [])

    const approveVendor = async (id, approval) => {
        const formData = { 'approve': approval }
        await AdminAxios.patch(`/vendor/update/${id}`, formData).then((res) => {
            getData()
        }).catch((err) => {
            TOwnerError('Something went wrong(admin/view/Approval)')
        })
    }
    return (
        <div className='p-9'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedList.filter((item => item.user.is_active)).map((item, index) => {
                            return (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {/* <img
                                            className="w-10 h-10 rounded-full"
                                            src="/docs/images/people/profile-picture-1.jpg"
                                            alt="Jese image"
                                        /> */}
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{item.user.username}</div>
                                            <div className="font-normal text-gray-500">
                                                {item.user.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{item.company_name}</td>
                                    <td className="px-6 py-4">
                                        {item.approve ? (
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                                                Approved
                                            </div>) :
                                            (
                                                <div className="flex items-center">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" />{" "}
                                                    Pending
                                                </div>
                                            )}
                                    </td>
                                    <td className="py-4 text-center">
                                        <button onClick={() => approveVendor(item.user.id, true)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-thin rounded-lg text-xs px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
                                        <button onClick={() => approveVendor(item.user.id, false)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-thin rounded-lg text-xs px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Decline</button>

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

export default Approval