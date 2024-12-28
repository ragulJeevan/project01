// src/services/axiosService.js
import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Django backend URL
});
// Interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('token'); 
    const token = `token`;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Interceptor to handle errors and show a Snackbar
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
