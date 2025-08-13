


import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { APIAuthRoutes } from "../constants/routes.constants";



const axiosNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  // baseURL: "/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    const status = error.response?.status;
    

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = axiosInstance
          .post(
            APIAuthRoutes.REFRESH_TOKEN,
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
            
            useAuthStore.getState().logout();
            sessionStorage.removeItem("refreshToken");
            window.location.href = "/login"; 
            toast.error("Session expired. Please log in again.");
            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

   
    let message = "Something went wrong";
    try {
      const isBlobError =
        error.response?.data instanceof Blob &&
        error.response.data.type === "application/json";

      if (isBlobError) {
        const text = await error.response.data.text();
        const data = JSON.parse(text);
        message = data.message || message;
      } else {
        message = error.response?.data?.message || error.message || message;
      }
    } catch (e) {
      console.warn("Failed to parse blob error:", e);
    }

    console.log("message in axios interceptor:", message);

  
    if (status === 403 && message.includes("blocked by admin")) {
      useAuthStore.getState().logout();
      toast.error("You have been blocked by the admin. Please log in again.");
      window.location.href = "/login"; 
      
      return Promise.reject(error);
    }

    // 🧭 Handle other errors
    switch (status) {
      case 400:
        toast.error(message || "Bad Request");
        break;
      case 403:
        toast.error(message || "You do not have permission to perform this action.");
        break;
      case 404:
        toast.error(message || "Resource not found.");
        break;
      case 500:
        toast.error(message || "Server error. Please try again later.");
        break;
      default:
        toast.error(message);
        break;
    }

    return Promise.reject(error);
  }
);

export {axiosNoAuth};
export default axiosInstance;