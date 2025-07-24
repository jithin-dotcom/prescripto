

import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { logoutService } from "./logoutService";
import { AxiosError } from "axios"; 
import { APIAuthRoutes } from "../constants/routes.constants";




let isBlockedHandled = false;

export const fetchCurrentUser = async (accessToken: string, navigate: (path: string) => void) => {
  try {
    const res = await axiosInstance.get(APIAuthRoutes.AUTH_ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    isBlockedHandled = false;
    return res.data;
  } catch (err) {
    const logout = useAuthStore.getState().logout;
    const error = err as AxiosError<{ message: string }>;

    if (
      error.response?.status === 403 &&
      error.response.data?.message === "Access denied, Blocked by Admin !" &&
      !isBlockedHandled
    ) {
      isBlockedHandled = true;
      toast.error("You have been blocked by admin.");
      await logoutService();
      logout();
      navigate("/login");
      return null;
    }

    throw err;
  }
};






