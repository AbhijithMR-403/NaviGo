import React, { useState } from 'react'
import InputField from './elements/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { TError, TInfo, TLoading, TSuccess, TUpdate } from '../toastify/Toastify'
import { AuthAxios, UserAxios } from '../api/api_instance'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'



function SignUp() {

    const [sign_up, setSignUp] = useState(true)
    const [UserID, setUserID] = useState(null)
    const [otp, setOtp] = useState("")
    const EyeIcon = () => {
        return <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
    }

    const fields = [
        {
            name: "Username",
            type: "text",
            placeholder: "Enter your Username",
            formName: "name"
        },
        {
            name: "Email",
            type: "text",
            placeholder: "Enter your Email",
            formName: "email",
        },
        {
            name: "Password",
            type: "Password",
            placeholder: "Enter your Password",
            formName: "password",
            EyeIcon: EyeIcon,
        },
        {
            name: "Confirm password",
            type: "password",
            placeholder: "Enter your Password",
            formName: "confirmPassword",
            EyeIcon: EyeIcon,
        },
    ]
    const navigate = useNavigate()

    const [formError, setFormError] = useState([])
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.confirmPassword.value
        if (!name) {
            TError(['Please enter a username'])
        }
        else if (name.indexOf(' ') !== -1) {
            TError(['Enter a valid username'])
        }
        else if (!email) {
            TError(['Please enter an email address'])
        }
        else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            TError(['Invalid email address'])
        }
        else if (name.replaceAll(/\s/g, '') > 3) {
            TError('That not your name')
        }
        else if (password.trim() === "") {
            TError(['Invalid Password'])
        }
        else if (password.trim().length < 5 || password.trim().length > 20) {
            TError(['Password length should be between 5 to 20'])
        }
        else if (confirmPassword !== password) {
            TError(['Passwords do not match'])
        }
        else {
            //add user to database here
            setFormError([])
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", name)

            await UserAxios.post('/auth/register', formData).then((res) => {
                if (res.status === 201) {
                    setUserID(res.data.user_id)
                    sendOTP(res.data.user_id)
                    return res
                }
            }).catch((err) => {
                if (err.response.status == 409) {
                    TError(err.response.data.error)
                }
                else if (err.response.status == 401) {
                    setUserID(err.response.data.user_id)
                    sendOTP(err.response.data.user_id)
                    setSignUp(false)
                }
                else if (err.response.status == 400) {
                    TError(err.response.data.error.username)
                }
                for (let key in err.response.data.errors) {
                    TInfo(err.response.data.errors[key])
                }
            })
        }
    }

    const sendOTP = debounce( async (ID) => {
        var data = { "userID": ID }
        toast.dismiss();
        await toast.promise(
            AuthAxios.patch('/otp', data).then((res) => {
                setSignUp(false)
                return res
            }
            ).catch((err) => {
                console.log(data);
                const errorMessage = err.response?.data?.error || 'Promise rejected 🤯';
                throw new Error(errorMessage);
            }),
            {
                pending: 'Please wait...',
                success: 'OTP send 👌',
                error: 'This is an error'}
        );

    }, 2000)



    const verify_otp = async (e) => {
        e.preventDefault()
        await UserAxios.patch(`/auth/otp/verify`, { "OTP": otp, 'UserID': UserID }).then(
            (res) => {

                TSuccess('Verified Successfully')
                navigate('/login',
                    {
                        state: res.data.Message
                    })
            }
        ).catch((err) => {
            console.log(err);
            if (err.response.status == 422)
                TError('Invalid OTP')
        })
    }


    return (
        <div>
            {sign_up ?
                (<form className="form" method='POST' onSubmit={handleLoginSubmit}>

                    {/* List those Input fields */}
                    {fields.map((field, ind) => <div key={ind}><InputField {...field} /></div>)}
                    <ul className='text-red-500' >
                        {formError && <li>
                            {formError}
                        </li>}
                    </ul>
                    <button className="button-submit" type='submit'>Sign Up</button>
                    <p className="p">Don't have an account? <Link to={'/login'}><span className="span">Log in</span></Link>
                    </p>
                </form>)
                : (
                    <div className='mt-40 md:m-40 p-7 sm:p-10 m-8 lg:mr-80 lg:ml-80 rounded-xl bg-slate-50' >
                        <div className="flex-column mb-5">
                            <label >OTP </label></div>
                        <MuiOtpInput className='mb-5' value={otp} onChange={(val) => setOtp(val)} />
                        <div className="flex-row">
                            <span className="span" onClick={() => sendOTP(UserID)}>Resent otp?</span>
                            <span className="span" onClick={() => setSignUp(true)}>re-enter email</span>
                        </div>
                        <button className="button-submit" onClick={verify_otp}>Sign Up</button>

                    </div>
                )
            }
        </div>
    )
}

export default SignUp