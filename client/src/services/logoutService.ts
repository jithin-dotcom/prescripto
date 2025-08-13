



// export const logoutService = async () => {
//   try {
//     const res = await fetch(`/api/auth/logout`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
      
//     });

//     if (!res.ok) {
//       const error = await res.json();
       
//       throw new Error(error.message || "Logout failed");
//     }
//   } catch (error) {
//     console.error("Logout service error:", error);
//   }
// };



import  { axiosNoAuth } from "../utils/axios";
import { toast } from "react-toastify";
import { APIAuthRoutes } from "../constants/routes.constants";

export const logoutService = async () => {
  try {
    const res = await axiosNoAuth.post(APIAuthRoutes.LOGOUT);
    
    if (res.status !== 200) throw new Error("Logout failed");
    toast.success("Successfully logged out");
  } catch (error) {
    console.error("Logout service error:", error);
    // toast.error("Failed to log out");
  }
};