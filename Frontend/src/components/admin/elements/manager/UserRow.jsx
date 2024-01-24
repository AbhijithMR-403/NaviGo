import React from 'react'

function UserRow({item, index}) {
    return (
        <>
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
    )
}

export default UserRow