


// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../store/authStore";
// import { APIAuthRoutes } from "../constants/routes.constants";


// const axiosInstance = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });


// axiosInstance.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState();
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });


// let refreshPromise: Promise<string> | null = null;


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (!refreshPromise) {
//         refreshPromise = axios
//           .post(
//             APIAuthRoutes.REFRESH_TOKEN,
//             {},
//             {
//               withCredentials: true,
//               headers: { "Content-Type": "application/json" },
//             }
//           )
//           .then((res) => {
//             const { accessToken, refreshToken: newRefreshToken, user } = res.data;
//             useAuthStore.getState().setAuth({ accessToken, user });
//             sessionStorage.setItem("refreshToken", newRefreshToken);
//             return accessToken;
//           })
//           .catch((err) => {
//             toast.error("Session expired. Please log in again.");
//             useAuthStore.getState().logout();
//             sessionStorage.removeItem("refreshToken");
//             throw err;
//           })
//           .finally(() => {
//             refreshPromise = null;
//           });
//       }

//       try {
//         const newAccessToken = await refreshPromise;
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest); 
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }

    
//     const status = error.response?.status;
//     console.log("error interceptor : ", error );
//     const message =
//       error.response?.data?.message || error.message || "Something went wrong";
//     console.log("message in axios interceptor : ",message);
//     switch (status) {
//       case 400:
//         toast.error(message || "Bad Request"); 
//         break;
//       case 403:
//         toast.error( message || "You do not have permission to perform this action.");
//         break;
//       case 404:
//         toast.error(message || "Resource not found.");
//         break;
//       case 500:
//         toast.error(message || "Server error. Please try again later.");
//         break;
//       default:
//         toast.error(message || "Something went wrong");
//         break;
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

















import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { APIAuthRoutes } from "../constants/routes.constants";


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
    const status = error.response?.status;

    // 🔁 Refresh token logic remains unchanged
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios
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
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // 🛠 Handle blob error responses (like from file downloads)
    let message = "Something went wrong";
    try {
      const isBlobError =
        error.response?.data instanceof Blob &&
        error.response.data.type === "application/json";

      if (isBlobError) {
        const text = await error.response.data.text(); // get raw text
        const data = JSON.parse(text); // parse JSON string
        message = data.message || message;
      } else {
        message = error.response?.data?.message || error.message || message;
      }
    } catch (e) {
      console.warn("Failed to parse blob error:", e);
    }

    console.log("message in axios interceptor:", message);

    // 🧭 Switch by status
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


export default axiosInstance;