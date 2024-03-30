import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputField from './element/InputField';
import { TError, TInfo, TLoading, TSuccess, TUpdate } from '../../toastify/Toastify';
import { AuthAxios, UserAxios } from '../../api/api_instance';

function VendorDetails() {
    const [darkMode, setDarkMode] = useState(false);
    const [Company, setCompany] = useState('')
    const [otp, setOTP] = useState('')
    const [GSTIN, setGSTIN] = useState('')
    const [address, setAddress] = useState('')
    const [PinCode, setPinCode] = useState('')
    const [file, setFile] = useState([]);
    const [IdProof, setIdProof] = useState([]);
    const imgRef = useRef()
    const [stateID, setStateID] = useState('');
    const [cityID, setCityID] = useState('');
    const { userID } = useParams()
    const navigate = useNavigate()



    const SentOTP = async () => {
        const toaster = TLoading('Please wait...')
        await AuthAxios.patch('/otp', { 'userID': userID }).then((res) => {
            TUpdate(toaster, 'OTP send', 'success')
        }
        ).catch((err) => {
            console.log(err)
            if (err.response.status == 429) {
                TUpdate(toaster, err.response.data.error, 'error')
            }
            else {
                TUpdate(toaster, err.response.data.error, 'error')

            }
        })

    }

    // Store the validation Documentation image
    function handleImgChange(e) {
        setIdProof(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const activateImg = (e) => {
        console.log('active image log');
        imgRef.current.click();
    }


    function validateFormData() {
        const errors = {};

        // Validate userID
        if (!userID || userID.trim() === '') {
            TError('User ID is required');
            return false
        }

        // Validate Company
        if (!Company || Company.trim() === '') {
            TError('Company name is required');
            return false
        }

        // Validate GSTIN
        if (!GSTIN || GSTIN.trim() === '') {
            TError('GSTIN is required');
            return false
        }
        if (!IdProof) {
            TError('Identification proof is required');
            return false
        }

        // Validate address
        if (!address || address.trim() === '') {
            TError('Address is required');
            return false
        }

        // Validate city
        if (!cityID || cityID.trim() === '') {
            TError('City is required');
            return false
        }

        // Validate state
        if (!stateID || stateID.trim() === '') {
            TError('State is required');
            return false
        }

        // Validate PinCode
        if (!PinCode || PinCode.trim() === '') {
            TError('Pin code is required');
            return false
        } else if (!/^[0-9]{6}$/.test(PinCode)) {
            TError('Invalid Pin code format');
            return false
        }

        return true;
    }

    const HandleSubmit = async (event) => {
        if (validateFormData()) {

            const formData = new FormData();
            formData.append('user', userID);
            formData.append('company_name', Company);
            formData.append('GSTIN', GSTIN);
            formData.append('identify_img', IdProof);
            formData.append('address', address);
            formData.append('city', cityID.name);
            formData.append('state', stateID.name);
            formData.append('pincode', PinCode);
            console.log(IdProof);
            const ValidateOTP = await CheckOTP()
            if (ValidateOTP) {
                await AuthAxios.post('/vendor/details', formData).then((res) => {
                    TSuccess('Registration completed(Your request under process now)')
                    navigate('/vendor/login')
                }).catch((err) => {
                    if (err.response.status == 400) {
                        if (err.response.data.company_name) {
                            TError(err.response.data.company_name)
                        }
                        else if (err.response.data.GSTIN) {
                            TError('GSTIN: ' + err.response.data.GSTIN)
                        }
                    }
                })
            } else {
                TError("Wrong OTP")
            }
        }
    }

    const CheckOTP = async () => {
        let otp_Active = false
        await UserAxios.patch('/auth/otp/verify', { 'OTP': otp, 'UserID': userID }).then((res) => {
            if (res.status == 201) {
                // TInfo('OTP verified')
                otp_Active = true
            }
            if (res.status == 200) {
                otp_Active = true
            }
            otp_Active = true
        }).catch((err) => {
            otp_Active = false
        })
        return otp_Active
    }



    return (
        <div>
            <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
                <div className="flex">
                    <h3 className="text-white">Dark Mode : &nbsp;</h3>
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                    </label>
                </div>
            </div>
            <div
                className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"
                    }  w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                        }`}
                >
                    Enter Details
                </h1>
                <div className="w-full mt-8">
                    <form className="form">
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <InputField type="text" placeholder="Company Name" name="Company" value={Company} setValue={setCompany} />
                                    <InputField type="number" placeholder="Enter OTP" name="otp" value={otp} setValue={setOTP} />
                                <p className=' text-sm text-blue-600 self-end cursor-pointer' onClick={() => SentOTP()}>OTP..?</p>
                            </div>
                            <InputField type="text" placeholder="GSTIN" name="GSTIN" value={GSTIN} setValue={setGSTIN} />
                            <InputField type="text" placeholder="Enter Your address" name="address" value={address} setValue={setAddress} />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <InputField type="text" placeholder="State" name="state" value={stateID} setValue={setStateID} />
                                <InputField type="text" placeholder="City" name="city" value={cityID} setValue={setCityID} />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">

                                <div className="overflow-hidden relative w-64 mt-1 mb-4 rounded-lg">
                                    <button
                                        type='button'
                                        onClick={activateImg}
                                        className="bg-blue-700 hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center z-0">
                                        <svg
                                            fill="#FFF"
                                            height={18}
                                            viewBox="0 0 24 24"
                                            width={18}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span className="ml-2">Upload Document</span>

                                    </button>
                                    <input
                                        className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t z-50"
                                        type="file"
                                        name="documents[]"
                                        accept="image/*"
                                        ref={imgRef}
                                        onChange={handleImgChange}
                                    />
                                </div>


                                <InputField type="number" placeholder="Pin code" name="Company Name" value={PinCode} setValue={setPinCode} />
                            </div>

                            <img className='max-w-56 max-h-44' src={file} />

                            <button onClick={() => { HandleSubmit(); }} type='button' className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3" >Continue</span>
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                Already have an account?{" "}
                                <a href="">
                                    <Link to={'/vendor/login'}> <span className="text-[#E9522C] font-semibold">Login</span></Link>

                                </a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VendorDetails