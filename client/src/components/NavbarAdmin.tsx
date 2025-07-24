

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { assets } from "../assets/assets2";
import { fetchCurrentUser } from "../services/authService";
import { logoutService } from "../services/logoutService";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import "../styles/marquee.css";
import { APIRoutes } from "../constants/routes.constants";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      if (accessToken) {
        try {
          const fetchedUser = await fetchCurrentUser(accessToken, navigate);
          setUser(fetchedUser);
        } catch (err) {
          console.error("Failed to fetch current user", err);
        }
      }
    };
    getUser();
  }, [accessToken, setUser, navigate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axiosInstance.post(APIRoutes.UPLOAD_PATIENT_PHOTO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedUser = response.data.user;
      setUser(updatedUser);
      toast.success("Profile photo updated!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload photo");
    }
  };

  const handleLogout = () => {
    try {
      logoutService();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b shadow-sm px-4 sm:px-10 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={assets.admin_logo}
              alt="Logo"
              onClick={() => navigate("/")}
              className="w-28 sm:w-40 cursor-pointer transition-transform duration-200 hover:scale-105"
            />
            {user?.role && (
              <span className="px-3 py-1 border border-gray-400 rounded-full text-xs sm:text-sm text-gray-600 whitespace-nowrap max-[400px]:hidden">
                {user.role}
              </span>
            )}
          </div>

          <div className="relative flex items-center gap-4">
            {!accessToken ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#5F6FFF] text-white text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-full hover:scale-105 transition duration-300 ease-in-out"
              >
                Login
              </button>
            ) : user?.role === "admin" ? (
              <button
                onClick={handleLogout}
                className="bg-[#5F6FFF] text-white text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-full hover:scale-105 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            ) : user?.role === "doctor" ? (
              <div ref={dropdownRef} className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    onClick={handleImageClick}
                    src={user?.photo}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <span className="text-sm hidden sm:block font-medium text-gray-700">
                    {user?.name?.split(" ")[0] || "Doctor"}
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/doctor-profile");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/change-password");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/change-email");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                      Change Email
                    </button>
                      <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/my-chat");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                      My Chats
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-[#5F6FFF] hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-full hover:scale-105 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      

      {user?.role === "doctor" && !user?.isVerified && (
        <div className="bg-orange-500 border-b border-red-300 overflow-hidden h-6 cursor-pointer">
          <div className="marquee text-sm text-black-900 whitespace-nowrap py-auto">
            <span>
              Your account is not verified. Please upload your certificates to get verified and start receiving appointments.
            </span>
            <span className="mx-4">
               Your account is not verified. Please upload your certificates to get verified and start receiving appointments.
            </span> 
            <span className="mx-2">
               Your account is not verified. Please upload your certificates to get verified and start receiving appointments.
            </span> 
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
