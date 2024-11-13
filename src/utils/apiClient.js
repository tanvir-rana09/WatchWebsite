import axios from 'axios';
import { getLocalStorageItem } from './setWithExpire';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // Replace with your API URL
  headers: {
    'Content-Type': 'multipart/form-data',

  },
  timeout: 10000, // 10 seconds timeout for requests
});

// Add a request interceptor to attach a token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem('token'); // Or use a context if available 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API error: ${error.response.status} - ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
