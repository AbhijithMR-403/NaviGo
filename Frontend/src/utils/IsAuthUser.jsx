import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { API_BASE_URL } from "../constant/api";

const updateUserToken = async ()=>{
    const refreshToken = localStorage.getItem("refresh");

    try {
        const res = await axios.post(API_BASE_URL+'/auth/token/refresh/', 
        {
            'refresh':localStorage.getItem("refresh")
        })
        if(res.status === 200){
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          let decoded = jwtDecode(res.data.access);
          console.log('decode', decoded)
          return {'name':decoded.name,isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:false, is_admin:decoded.is_admin}
        }
        else
        {
            return {'name':null,isAuthenticated:false,is_vendor:false,is_admin:false, is_vendorActive:false}
        }  
      }
      catch (error) {
         return {'name':null,isAuthenticated:false,is_vendor:false, is_admin:false, is_vendorActive:false}
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
    if (decoded.exp > currentTime) {
        return {'name':decoded.name, isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:decoded.is_vendor, is_admin:decoded.is_admin};
      } else {
        
        const updateSuccess = await updateUserToken();
        return updateSuccess;
      }
}
export default IsAuthUser ;