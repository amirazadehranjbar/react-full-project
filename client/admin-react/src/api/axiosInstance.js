// src/api/axiosInstance.js

import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/features/auth/authUserSlice.js';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor for handling auth errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Automatically logout on auth failure
            store.dispatch(logout());
            window.location.href = '/auth/admin/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;