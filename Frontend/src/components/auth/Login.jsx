import React, { useEffect } from 'react'
import InputField from './elements/InputField'
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Set_Authentication } from '../../redux/authentication/AuthenticationSlice';
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { TError, TSuccess } from '../toastify/Toastify';
import { AuthAxios, UserAxios } from '../api/api_instance';


function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await AuthAxios.post('/login', formData)
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(
          Set_Authentication({
            name: jwtDecode(res.data.access).name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin
          })
        );
        TSuccess("You have successfully login")
        navigate('/')
        return res
      }
    }
    catch (error) {
      console.log(error);
      TError(error.response.data.error)
    }
  }

  const GoogleTestLogin = async(user_detail) =>{
    const formData = {
      client_id: user_detail,
    } 
    await AuthAxios.post('/google', formData).then((res)=>{
      
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      dispatch(
        Set_Authentication({
          name: jwtDecode(res.data.access).name,
          isAuthenticated: true,
          isAdmin: res.data.isAdmin,
          is_vendor: res.data.isVendor,
          userid: res.data.user_id
        })
      );
      if(!res.data.accountExist){
        setTimeout(() => { TSuccess('Welcome To NaviGo') }, 2000);
      } else
      TSuccess("You have successfully login")
      navigate('/')
      return res
      
    }).catch((err)=>{
      console.log(err);

    })
  }

  const PasswordIcon = () => {
    return <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
  }
  const EmailIcon = () => {
    return <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
  }
  const EyeIcon = () => {
    return <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
  }
  const fields = [
    {
      Icon: EmailIcon,
      name: "Email",
      formName: "email",
      type: "text",
      placeholder: "Enter your Email",
      autocomplete: "on",
    },
    {
      Icon: PasswordIcon,
      name: "Password",
      formName: "password",
      type: "Password",
      placeholder: "Enter your Password",
      autocomplete: "on",
      EyeIcon: EyeIcon,
    },
  ]
  return (
    <div>
      <ToastContainer />
      <form className="form" method='POST' onSubmit={handleLoginSubmit}>

        {fields.map((field, index) => <div key={index}><InputField {...field} /></div>)}

        {/* <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div> */}
        <button className="button-submit" type='submit'>Sign In</button>
        <p className="p">Don't have an account? <Link to={'/signup'}>
          <span className="span">Sign Up</span></Link>

        </p>
        <p className="p line">Or With</p>

        <div className="w-full flex justify-center items-center">

          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              GoogleTestLogin(credentialResponse.credential)
              // Google_login(user_detail)
            }}
            onError={() => {
              TError("Login Failed")
            }}
          />

        </div>
      </form>
    </div>
  )
}

export default Login