import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Optional: Add refresh token logic here
                // const refreshToken = localStorage.getItem("refreshToken");
                // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refresh`, { refreshToken });
                // const { token } = response.data;
                // localStorage.setItem("token", token);
                // originalRequest.headers.Authorization = `Bearer ${token}`;
                // return axiosInstance(originalRequest);

                // For now, logout on 401
                localStorage.removeItem("token");
                window.location.href = "/login";
            } catch (refreshError) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 