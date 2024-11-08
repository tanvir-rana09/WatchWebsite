import axios from "axios";
import { getLocalStorageItem } from "./setWithExpire";

// Create an Axios instance with the base URL
const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Replace with your API URL
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout for requests
});
apiClient.interceptors.request.use(
    (config) => {
        const token = getLocalStorageItem("token"); // Or use a context if available 
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
            console.error(
                `API error: ${error.response.status} - ${error.response.statusText}`
            );
        }
        return Promise.reject(error);
    }
);

// Define the apiCall function
const apiCall = async (endpoint, method, data = null, config = null) => {
    try {
        const response = await apiClient({
            url: endpoint,
            method: method,
            data: data || null,
            ...config, // Merge additional config options
        });
        const dat = await response.data;
        return dat;
    } catch (error) {
        // Handle errors here (e.g., log or throw)
        console.error("API call error:", error);
        throw error; // Re-throw the error for further handling
    }
};

export default apiCall;
