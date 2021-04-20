import axios from 'axios'; 
import { getJwt } from './authService';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
async config => {
     
    config.headers = { 
        'Authorization': `Bearer ${getJwt()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
},
error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true; 
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getJwt();
        return axiosApiInstance(originalRequest);
    }
    window.location.href = '/';
    return Promise.reject(error);
});


export default axiosApiInstance;