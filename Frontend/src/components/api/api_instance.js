import axios from "axios"; 
import { API_BASE_URL } from "../../constant/api";



export const AuthAxios = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    timeout: 3000,
    
  });


export const AdminAxios = axios.create({
    baseURL: `${API_BASE_URL}/admin`,
    timeout: 3000,
  });

// export const AdminUserListAxios = axios.create({
//     baseURL: `${API_BASE_URL}/admin`,
//     timeout: 3000,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//   },
//   });

  

