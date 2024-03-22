import { jwtDecode } from "jwt-decode";
import { AuthAxios } from "../components/api/api_instance";




const updateAdminToken = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
        const res = await AuthAxios.post('/token/refresh/', {
            refresh: localStorage.getItem("refresh")
        }, { headers: {'Content-Type': 'application/json'}},{withCredentials: true});
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

const fetchIsAdmin = async () => {
    const token = localStorage.getItem('access');
    
    try {
        const res = await AuthAxios.get('/details', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return res.data.is_superuser;

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
        let checkAdmin = await fetchIsAdmin(); // Await the result
        return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
    } else {
        const updateSuccess = await updateAdminToken();

        if (updateSuccess) {
            let decoded = jwtDecode(accessToken);
            let checkAdmin = await fetchIsAdmin(); // Await the result
            return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
        } else {
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }
};

export default isAuthAdmin;


