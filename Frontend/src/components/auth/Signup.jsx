import React, { useEffect, useState } from 'react'
import InputField from './elements/inputField'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../constant/api'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { colors } from '@mui/material'
import OtpInput from "react-otp-input";
import { TError, TInfo, TSuccess } from '../toastify/Toastify'



function Signup() {

    const [sign_up, setsignup] = useState(true)
    const [uname, setuname] = useState("")
    const [UserID, setUserID] = useState(null)
    const [otp, setOtp] = useState("")
    const [djangootp, setdjangootp] = useState(null)
    const EyeIcon = () => {
        return <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
    }
    useEffect(()=>{
        console.log(djangootp);
    },[djangootp])
    const fields = [

        {
            name: "Username",
            type: "text",
            placeholder: "Enter your Password",
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
        if (name.indexOf(' ') !== -1) {
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
        else if (confirmPassword !== password) {
            TError(['Passwords do not match'])
        }
        else {
            //add user to database here
            setFormError([])
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", name)
        }
        
            await axios.post(API_BASE_URL + '/auth/register', formData).then((res)=>{
                console.log(res);
            if (res.status === 201) {
                setuname(res.data.username)
                setUserID(res.data.user_id)
                console.log("yep otp is here", res.data['otp']);
                setdjangootp(res.data['otp'])
                setsignup(false)
                // sendotp()
                TSuccess("OTP sent")
                return res
            }}).catch ((err)=>{
                console.log(err)
                if (err.response.status===409){
                    if  (err.response.data.is_active){
                    navigate('/login')
                    }
                    else{
                        sendotp()
                        setsignup(false)
                    console.log('409 reached' );
                    }
                }
                for (let key in err.response.data.errors) {
                    TInfo(err.response.data.errors[key])
                  } 
            } )
    }

    const sendotp = async () =>{
        var data={"userID": UserID}
        await axios.patch(API_BASE_URL+'/auth/otp', data).then((res)=>{
            setdjangootp(res.data['OTP'])
        }
        ).catch((err)=>console.log(err))
    }

    const Google_login = async (user_detail) => {
        const formData = new FormData();
        formData.append("email", user_detail.email)
        formData.append("username", user_detail.name)
        formData.append("is_active", true)
        formData.append("password", "1704974569")
        try {
            const res = await axios.post(API_BASE_URL + '/auth/google/register', formData)
            if (res.status === 201) {
                TSuccess('Signed up successfully')
                navigate('/login',
                    {
                        state: res.data.Message
                    })
                return res
            }
        }
        catch (error) {
            if (error.response.status === 409){
                TInfo("Already Signed up")
                navigate('/login')
                return error
            }
        }
    }


    const verify_otp = async(e) => {
        e.preventDefault()
        console.log('asdfasd');
        if (djangootp == otp) {
            await axios.patch(API_BASE_URL + `/auth/otp/verify`,{"uname":uname, 'UserID':UserID}).then(
                (res) => {
                    TSuccess('Verified Successfully')
                    navigate('/login',
                        {
                            state: res.data.Message
                        })
                }
            ).catch((err) => {
                console.log(err);
                // TError(res)
            })

        }
        else{
            TError('Check the otp again')
        }
    }


    return (
        <div>
            {sign_up ?
                (<form className="form" method='POST' onSubmit={handleLoginSubmit}>

                    {fields.map((field) => <InputField {...field} />)}


                    <ul className='text-red-500'>
                        {formError && <li>
                            {formError}
                        </li>}
                    </ul>
                    <div className="flex-row">
                        <div>
                            <input type="checkbox" />
                            <label>Remember me </label>
                        </div>
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit" type='submit'>Sign Up</button>
                    <p className="p">Don't have an account? <Link to={'/login'}><span className="span">Log in</span></Link>

                    </p><p className="p line">Or With</p>

                    <div className="flex-row">

                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const user_detail = jwtDecode(credentialResponse.credential)
                                Google_login(user_detail)
                            }}
                            onError={() => {
                                console.log('error ')
                            }}
                        />

                    </div>
                </form>)
                : (
                    <div className='m-40 p-10 bg-slate-50' >
                        <div className="flex-column mb-5">
                            <label >OTP </label></div>
                        <MuiOtpInput className='mb-5' value={otp} onChange={(val)=>setOtp(val)} />
                        <div className="flex-row">
                            
                            <span className="span" onClick={() => sendotp()}>Resent otp?</span>
                            <span className="span" onClick={() => setsignup(true)}>re-enter email</span>
                        </div>
                        <button className="button-submit" onClick={verify_otp}>Sign Up</button>

                    </div>
                )
            }
        </div>
    )
}

export default Signup