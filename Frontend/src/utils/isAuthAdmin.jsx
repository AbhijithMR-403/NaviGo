import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { API_BASE_URL } from "../constant/api";




const updateAdminToken = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
        const res = await axios.post(API_BASE_URL + '/auth/token/refresh/', {
            refresh: refreshToken
        }, { headers: {'Content-Type': 'application/json'}},{withCredentials: true});
        console.log('from updateAdminToken\n\n\n', res);
        if (res.status === 200) {
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

const fetchisAdmin = async () => {
    const token = localStorage.getItem('access');
    
    try {
        const res = await axios.get(API_BASE_URL + '/auth/details', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return res.data.is_superuser; // Return directly from the function

    } catch (error) {
        return false;
    }
};

const isAuthAdmin = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        return { 'name': null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);

    if (decoded.exp > currentTime) {
        let checkAdmin = await fetchisAdmin(); // Await the result
        return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
    } else {
        const updateSuccess = await updateAdminToken();

        if (updateSuccess) {
            let decoded = jwtDecode(accessToken);
            let checkAdmin = await fetchisAdmin(); // Await the result
            return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
        } else {
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }
};

export default isAuthAdmin;


