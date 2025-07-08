

import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


let refreshPromise: Promise<string> | null = null;


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
       
        refreshPromise = axios
          .post(
            "/api/auth/refresh-token",
            {},
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            const { accessToken, refreshToken: newRefreshToken, user } = res.data;
            useAuthStore.getState().setAuth({ accessToken, user });

            sessionStorage.setItem("refreshToken", newRefreshToken);

            return accessToken;
          })
          .catch((err) => {
            toast.error("Session expired. Please log in again.");
            useAuthStore.getState().logout();
            sessionStorage.removeItem("refreshToken");
            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
       
        const newAccessToken = await refreshPromise;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

