import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { API_BASE_URL } from "../constant/api";

const updateUserToken = async ()=>{
    const refreshToken = localStorage.getItem("refresh");

    try {
      console.log(refreshToken);
        const res = await axios.post(API_BASE_URL+'/auth/token/refresh/', 
        {
            'refresh':localStorage.getItem("refresh")
        })
        console.log( '\n\n\n\ this ismy favorate prat');
        console.log(res);
        if(res.status === 200){
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          let decoded = jwtDecode(res.data.access);
          console.log('decode', decoded)
          return {'name':decoded.name,isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:false, is_admin:decoded.is_admin, user_id:decoded.user_id}
        }
        else
        {
          return {'name':null,isAuthenticated:false,is_vendor:false,is_admin:false, is_vendorActive:false, user_id:null}
        }  
      }
      catch (error) {
        console.log('/n/n/nthis i tht th eerror page');
         return {'name':null,isAuthenticated:false,is_vendor:false, is_admin:false, is_vendorActive:false, user_id:null}
      }
}



const IsAuthUser = async () => {

    const accessToken = localStorage.getItem("access");
    if(!accessToken)
    {
      return {'name':null,isAuthenticated:false}
    }
    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(localStorage.getItem("access"));
    console.log('dey thi si sthe current and expirted time');
    console.log(decoded.exp, currentTime, decoded.exp > currentTime)
    if (decoded.exp > currentTime) {
      return {'name':decoded.name, isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:decoded.is_vendor, is_admin:decoded.is_admin, user_id:decoded.user_id};
    } else {
      
      const updateSuccess = await updateUserToken();
      console.log('\n\n\n\n this film start is update suceess');
        console.log(updateSuccess);
        return updateSuccess;
      }
}
export default IsAuthUser ;