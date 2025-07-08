


// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../store/authStore"; 

// // const axiosInstance = axios.create({
// //   baseURL: "/api", 
// //   withCredentials: false, 
// // });
// const axiosInstance = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// })


// axiosInstance.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState();
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // const refreshToken = sessionStorage.getItem("refreshToken");

//       // if (!refreshToken) {
//       //   toast.error("Session expired. Please log in again.");
//       //   useAuthStore.getState().logout();
//       //   return Promise.reject(error);
//       // }

//       try {
//         // const refreshResponse = await axios.post(
//         //   "/api/auth/refresh-token",
//         //   { refreshToken }, 
//         //   {
//         //     headers: { "Content-Type": "application/json" },
//         //   }
//         // );
//         const refreshResponse = await axios.post(
//           "api/auth/refresh-token",
//           {},
//           {
//             withCredentials: true,
//             headers: {"Content-Type": "application/json"}
//           }
//         )

//         const { accessToken, refreshToken: newRefreshToken, user } = refreshResponse.data;

        
//         useAuthStore.getState().setAuth({ accessToken, user });
//         sessionStorage.setItem("refreshToken", newRefreshToken);

        
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         toast.error("Session expired. Please log in again.");
//         useAuthStore.getState().logout();
//         sessionStorage.removeItem("refreshToken");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;






import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Global refresh lock
// let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Intercept 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        // Start refresh if not already in progress
        // isRefreshing = true;
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

            // Optionally update refresh token if you're storing it in sessionStorage
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
            // isRefreshing = false;
            refreshPromise = null;
          });
      }

      try {
        // Wait for the refresh to complete
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

