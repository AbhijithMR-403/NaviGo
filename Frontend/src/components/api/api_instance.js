import axios from "axios"; 
import { API_BASE_URL } from "../../constant/api";



export const AuthAxios = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    // timeout: 3000,
  });


export const AdminAxios = axios.create({
    baseURL: `${API_BASE_URL}/admin`,
    // timeout: 3000,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const AdminBusAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    // timeout: 3000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });


export const UserAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    // timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });


  export const VendorAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    // timeout: 3000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });


  export const VendorImgAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    // timeout: 3000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
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

  

