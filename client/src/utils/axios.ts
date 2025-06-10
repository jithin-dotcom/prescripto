


import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore"; 

const axiosInstance = axios.create({
  baseURL: "/api", 
  withCredentials: false, 
});


axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        toast.error("Session expired. Please log in again.");
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          "/api/auth/refresh-token",
          { refreshToken }, 
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { accessToken, refreshToken: newRefreshToken, user } = refreshResponse.data;

        
        useAuthStore.getState().setAuth({ accessToken, user });
        sessionStorage.setItem("refreshToken", newRefreshToken);

        
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        useAuthStore.getState().logout();
        sessionStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


