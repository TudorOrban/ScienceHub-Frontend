import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor to add the JWT token to the request headers
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
