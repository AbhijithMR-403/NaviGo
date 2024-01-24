import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../constant/api'
import UserRow from '../elements/manager/userRow'

function UserManagement() {
  const [listusers, setUsers] = React.useState([])
  const [editfield, seteditfield] = useState(false)
  useEffect(() => {
    axios.get(API_BASE_URL + '/admin/listuser').then((res) => {
      setUsers(res.data)
      console.log(res.data, "dsfasdfa\n\n", listusers);
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  
  const updateUserDetails = (id) =>{
    axios.get(API_BASE_URL+`/admin/user/detail/${id}`).then((res)=>{
      seteditfield(true)
    }).catch((err)=>{
      alert("Error in fetching user details")
    })

  }

  return (
    <div>
      {/* component */}
      {editfield? (
        <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">Projects Deliveries</span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All projects from the Loopple team</span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <a href="javascript:void(0)" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"> See other projects </a>
                </div>
              </div>
              {/* end card header */}
              {/* card body  */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">User</th>
                        <th className="pb-3 text-end min-w-[100px]">Email</th>
                        <th className="pb-3 text-end min-w-[100px]">Active</th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">Trips</th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">Created</th>
                        <th className="pb-3 text-end min-w-[50px]">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listusers.map((item, index) => (
                        // <UserItem key={index} item={item}/>
                        <>
                        <UserRow item={item} index={index}/>
                          <tr key={index} className="border-b border-dashed last:border-b-0">
                            <td className="p-3 pl-0">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> {item.username} </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="font-semibold text-light-inverse text-md/normal">{item.email}</span>
                            </td>
                            {item.is_active ? (
                              <td className="p-3 pr-0 text-end">
                                <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                    {/* <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /> */}
                                  </svg> Active </span>
                              </td>
                            ) : (
                              <td className="p-3 pr-0 text-end">
                                <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-danger bg-danger-light rounded-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                    {/* <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" /> */}
                                  </svg> InActive </span>
                              </td>
                            )}

                            <td className="p-3 pr-12 text-end">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"> 45 </span>
                            </td>
                            <td className="pr-0 text-center">
                              <span className="font-semibold text-light-inverse text-md/normal">{item.last_login.split('T')[0]}</span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <button data-modal-target="default-modal" className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center" type="button">
                                <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                  </svg>
                                </span>
                              </button>
                            </td>
                          </tr>


                        </>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1"> Tailwind CSS Component from <a href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents" className="text-slate-700 hover:text-slate-900" target="_blank">Riva Dashboard</a> by <a href="https://www.loopple.com" className="text-slate-700 hover:text-slate-900" target="_blank">Loopple Builder</a>. </p>
        </div>
      </div>
      </>)
      : (
        <>
        <h1>Edit User</h1>
  <form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          First name
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="last_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Last name
        </label>
        <input
          type="text"
          id="last_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Doe"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Flowbite"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="123-45-678"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="website"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Website URL
        </label>
        <input
          type="url"
          id="website"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="flowbite.com"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="visitors"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Unique visitors (per month)
        </label>
        <input
          type="number"
          id="visitors"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required=""
        />
      </div>
    </div>
    <div className="mb-6">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email address
      </label>
      <input
        type="email"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="john.doe@company.com"
        required=""
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required=""
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="confirm_password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Confirm password
      </label>
      <input
        type="password"
        id="confirm_password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required=""
      />
    </div>
    <div className="flex items-start mb-6">
      <div className="flex items-center h-5">
        <input
          id="remember"
          type="checkbox"
          defaultValue=""
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          required=""
        />
      </div>
      <label
        htmlFor="remember"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        I agree with the{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          terms and conditions
        </a>
        .
      </label>
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</>

      )
      }
    </div>
  )
}

export default UserManagement