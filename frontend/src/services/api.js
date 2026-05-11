import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ev-power-station.onrender.com';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('vr_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vr_token');
      localStorage.removeItem('vr_user');
    }
    return Promise.reject(error);
  }
);

export default API;
