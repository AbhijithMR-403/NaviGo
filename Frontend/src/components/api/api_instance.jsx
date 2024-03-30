import axios from "axios"; 



const API_BASE_URL= import.meta.env.VITE_API_BASE_URL

export const AuthAxios = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
  });


export const AdminAxios = axios.create({
    baseURL: `${API_BASE_URL}/admin`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const AdminBusAxios = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });


export const AuthUserAxios = axios.create({
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
      Authorization: `Bearer ${localStorage.getItem('access') }`,
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



  export const VendorAuth = axios.create({
    baseURL: `${API_BASE_URL}`,
  });


