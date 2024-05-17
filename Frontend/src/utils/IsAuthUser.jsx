import { jwtDecode } from "jwt-decode";
import { AuthAxios } from "../components/api/api_instance";

const updateUserToken = async ()=>{
    const refreshToken = localStorage.getItem("refresh");

    try {
        const res = await AuthAxios.post('/token/refresh/', 
        {
            'refresh':localStorage.getItem("refresh")
        })
        if(res.status === 200){
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          let decoded = jwtDecode(res.data.access);
          return {'name':decoded.name,isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:false, is_admin:decoded.is_admin, user_id:decoded.user_id}
        }
        else
        {
          return {'name':null,isAuthenticated:false,is_vendor:false,is_admin:false, is_vendorActive:false, user_id:null}
        }  
      }
      catch (error) {
         return {'name':null,isAuthenticated:false,is_vendor:false, is_admin:false, is_vendorActive:false, user_id:null}
      }
}



const IsAuthUser = async () => {

    const accessToken = localStorage.getItem("access");
    // await new Promise(resolve => setTimeout(resolve, 100));

    if(!accessToken)
    {
      return {'name':null,isAuthenticated:false}
    }
    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(localStorage.getItem("access"));
    if (decoded.exp > currentTime) {
      return {'name':decoded.name, isAuthenticated:true, is_vendorActive:decoded.vendor_active, is_vendor:decoded.is_vendor, is_admin:decoded.is_admin, user_id:decoded.user_id};
    } else {
      
      const updateSuccess = await updateUserToken();
        return updateSuccess;
      }
}
export default IsAuthUser ;