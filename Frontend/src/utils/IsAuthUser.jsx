import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { API_BASE_URL } from "../constant/api";

const updateUserToken = async ()=>{
    const refreshToken = localStorage.getItem("refresh");

    try {
        const res = await axios.post(API_BASE_URL+'/auth/token/refresh/', 
        {
            'refresh':refreshToken
        })
        if(res.status === 200){
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          let decoded = jwtDecode(res.data.access);
          return {'name':decoded.name,isAuthenticated:true}
        }
        else
        {
            return {'name':null,isAuthenticated:false}
        }  
        
      }
      catch (error) {
         return {'name':null,isAuthenticated:false}
      }
}



const IsAuthUser = async () => {

    const accessToken = localStorage.getItem("access");
    
    if(!accessToken)
    {
        return {'name':null,isAuthenticated:false}
    }
    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);
    if (decoded.exp > currentTime) {
        return {'name':decoded.name, isAuthenticated:true}
      } else {
        
        const updateSuccess = await updateUserToken();
        return updateSuccess;
      }

}
export default IsAuthUser ;