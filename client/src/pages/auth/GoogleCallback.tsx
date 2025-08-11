

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const getDashboardRoute = (role: string | null) => {
    if (role === "doctor") return "/doctor-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/user-dashboard";
  };

  useEffect(() => {
    const handleGoogleCallback = () => {
      try {
        const query = new URLSearchParams(location.search);
        const accessToken = query.get("accessToken");
        const refreshToken = query.get("refreshToken");
        const userString = query.get("user");
        const error = query.get("error");

        if (error) {
          throw new Error("Google authentication failed");
        }

        if (!accessToken || !refreshToken || !userString) {
          throw new Error("Missing authentication data");
        }

        const user = JSON.parse(userString);

       
        setAuth({ accessToken, user });

        toast.success("Successfully logged in with Google");

       
        navigate(getDashboardRoute(user.role));
      } catch (err: unknown) {
        console.error("Google callback error:", err);
        toast.error(
          "Google login failed: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
        navigate("/signup");
      }
    };

    handleGoogleCallback();
  }, [navigate, location, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          Processing Google Login...
        </h2>
      </div>
    </div>
  );
};

export default GoogleCallback;
