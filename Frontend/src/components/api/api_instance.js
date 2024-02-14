import axios from "axios"; 
import { API_BASE_URL } from "../../constant/api";


const token = localStorage.getItem('access');

console.log(token);

export const AuthAxios = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    timeout: 3000,
    
  });


export const AdminAxios = axios.create({
    baseURL: `${API_BASE_URL}/admin`,
    timeout: 3000,
    headers: {
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const AdminBusAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    timeout: 3000,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

  

