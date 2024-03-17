import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const BookingConfirm = () => {
    const {uuid} = useParams()
    console.log('this is from kooking confirm page', uuid);

    
    return (
        <div className="pt-20 relative mx-auto w-full bg-white">
            <div className="grid min-h-screen grid-cols-10">
                <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                    <div className="mx-auto w-full max-w-lg">
                        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                            Secure Checkout
                            <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20" />
                        </h1>
                        <form action="" className="mt-10 flex flex-col space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-xs font-semibold text-gray-500"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john.capler@fang.com"
                                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="card-number"
                                    className="text-xs font-semibold text-gray-500"
                                >
                                    Enter your address
                                </label>
                                <textarea className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"/>
                                
                                <img
                                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                                    alt=""
                                    className="absolute bottom-3 right-3 max-h-4"
                                />
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                            By placing this order you agree to the{" "}
                            <a
                                href="#"
                                className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                            >
                                Terms and Conditions
                            </a>
                        </p>
                        <button
                            type="submit"
                            className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
                <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                    <h2 className="sr-only">Order summary</h2>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95" />
                    </div>
                    <div className="relative">
                        <ul className="space-y-5">
                            {/* <li className="flex justify-between">
                                <div className="inline-flex">
                                    <img
                                        src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                        alt=""
                                        className="max-h-16"
                                    />
                                    <div className="ml-3">
                                        <p className="text-base font-semibold text-white">
                                            Nano Titanium Hair Dryer
                                        </p>
                                        <p className="text-sm font-medium text-white text-opacity-80">
                                            Pdf, doc Kindle
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-white">$260.00</p>
                            </li> */}
                            <li className="flex justify-between">
                                <div className="inline-flex">
                                    <img
                                        src="https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                        alt=""
                                        className="max-h-16"
                                    />
                                    <div className="ml-3">
                                        <p className="text-base font-semibold text-white">Luisia H35</p>
                                        <p className="text-sm font-medium text-white text-opacity-80">
                                            Hair Dryer
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-white">$350.00</p>
                            </li>
                        </ul>
                        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
                        <div className="space-y-2">
                            <p className="flex justify-between text-lg font-bold text-white">
                                <span>Total price:</span>
                                <span>$510.00</span>
                            </p>
                            <p className="flex justify-between text-sm font-medium text-white">
                                <span>Vat: 10%</span>
                                <span>$55.00</span>
                            </p>
                        </div>
                    </div>
                    <div className="relative mt-10 text-white">
                        <h3 className="mb-5 text-lg font-bold">Support</h3>
                        <p className="text-sm font-semibold">
                            +44433 <span className="font-light">(International)</span>
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            support@gmail.com <span className="font-light">(Email)</span>
                        </p>
                        <p className="mt-2 text-xs font-medium">
                            Call us now for payment related issues
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default BookingConfirm