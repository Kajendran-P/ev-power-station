import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15 second timeout for serverless cold starts
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('vr_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors and network issues
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vr_token');
      localStorage.removeItem('vr_user');
    }
    // Better error message for network issues
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export default API;
