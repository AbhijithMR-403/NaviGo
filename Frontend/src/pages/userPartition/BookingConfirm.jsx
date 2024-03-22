import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthUserAxios } from '../../components/api/api_instance';
import { TError } from '../../components/toastify/Toastify';


const BookingConfirm = () => {
    const { uuid } = useParams()
    const [bookingData, setBookingData] = useState(null)
    const [subTotal, setSubTotal] = useState(0.0)
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [Tax, setTax] = useState(0.0)
    useEffect(() => {
        AuthUserAxios.get(`/user/order/detail/${uuid}/`).then((res) => {
            setBookingData(res.data)

            CalculatePrice(1, res.data.route_id.price)
        }).catch((err) => console.log(err))
    }, [])

    const CalculatePrice = (qty, subT) => {
        
        let subTotal = qty * parseFloat(subT)
        let tax = subTotal * 18 / 100
        setSubTotal(subTotal)
        setTax(tax)
    }


    //Function to load razorpay script for the display of razorpay payment SDK.
    function loadRazorpayScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    //function will get called when clicked on the pay button.
    async function displayRazorpayPaymentSdk() {
        const res = await loadRazorpayScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. please check are you online?");
            return;
        }

        // creating a new order and sending order ID to backend
        const result = await AuthUserAxios.post("/user/razorpay_order", {
            "order_id": uuid,
            "total": subTotal + Tax,
            "subtotal": subTotal,
            "quantity": quantity,
        });

        if (!result) {
            alert("Server error. please check are you onlin?");
            return;
        }

        // Getting the order details back
        const { merchantId = null, amount = null, currency = null, orderId = null } = result.data;

        const options = {
            key: merchantId,
            amount: amount.toString(),
            currency: currency,
            name: "Razorpay Testing",
            description: "Test Transaction",
            order_id: orderId,
            handler: function(response) {
                
                AuthUserAxios.post('/user/razorpay_callback',{data:response}).then((res)=>{
                    navigate('/success')
                }).catch((err)=>console.log(err))
            },
            prefill: {
                name: "Swapnil Pawar",
                email: "swapnil@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "None",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.success', function(response) {
            // Handle successful payment and redirect to your React success page
            window.location.href = "http://localhost:5173/success";
        });
        paymentObject.open();
    }


    return (
        <div className="pt-16 relative mx-auto w-full bg-white">
            <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                <div className="mx-auto w-full max-w-lg">
                    <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                        Secure Checkout
                        <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20" />
                    </h1>
                    {bookingData &&
                        <form action="" className="mt-10 flex flex-col space-y-4">
                            <div className="relative">
                                <ul className="space-y-5">
                                    <li className="flex justify-between">
                                        <div className="inline-flex">
                                            <img
                                                src="https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                                alt=""
                                                className="max-h-16"
                                            />
                                            <div className="ml-3">
                                                <p className="text-base font-semibold text-black">{bookingData.route_id.origin.stop_name} - {bookingData.route_id.destination.stop_name}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-black">{quantity} x {bookingData.route_id.price} =  ₹{subTotal}</p>
                                    </li>
                                    <p className="flex items-center">
                                        <label htmlFor="quantity" className="pr-3 font-medium">Qty:</label>
                                        <input
                                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={quantity}
                                            onChange={(e) => {
                                                const val = e.target.value
                                                if (Number(val) >= 1 && Number(val) <= 8) {
                                                    setQuantity(Number(val))

                                                    CalculatePrice(val, bookingData.route_id.price)

                                                } else {
                                                    TError("Please enter a number between than 0 and 8");
                                                }
                                            }}
                                            type="number"
                                            name="quantity"
                                        />
                                    </p>
                                    <p className="text-sm font-medium text-black text-opacity-80 flex flex-wrap">
                                        <label htmlFor="quantity" className="pr-3 font-bold">Waypoints:</label>

                                        {
                                            bookingData.route_id.waypoints.map((res, index) => {
                                                return (
                                                    <>
                                                        {index !== 0 &&
                                                            <p className='pl-2 pr-2'> - </p>
                                                        }
                                                        <p>{res.stop.stop_name}</p>
                                                    </>
                                                )
                                            }
                                            )
                                        }
                                    </p>
                                </ul>
                                <div className="my-5 h-0.5 w-full bg-black bg-opacity-30" />
                                <div className="space-y-2">
                                    <p className="flex justify-between text-lg font-bold text-black">
                                        <span>Total price:</span>
                                        <span>₹{subTotal + Tax}</span>
                                    </p>
                                    <p className="flex justify-between text-sm font-medium text-black">
                                        <span>GST: 18%</span>
                                        <span>₹{Tax}</span>
                                    </p>
                                </div>
                            </div>
                        </form>
                    }
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
                        onClick={displayRazorpayPaymentSdk}
                        type="button"
                        className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    )
}

export default BookingConfirm