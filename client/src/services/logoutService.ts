
// import axios from "axios";

// import { toast } from "react-toastify";
// import { APIAuthRoutes } from "../constants/routes.constants";


// export const logoutService = async () => {
//   try {
    
//     await axios.post(APIAuthRoutes.LOGOUT);

//   } catch (error) {
//     if(axios.isAxiosError(error)){
//        toast.error(error.response?.data?.message || "Failed to logout")
//         console.error("Logout service error:", error);
//     }else{
//        toast.error("Logout service error:");
//         console.error("Logout service error:", error);
//     }
   
//   }
// };









export const logoutService = async () => {
  try {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      
    });

    if (!res.ok) {
      const error = await res.json();
       
      throw new Error(error.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout service error:", error);
  }
};
