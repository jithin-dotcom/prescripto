

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
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header className="w-full bg-white border-b shadow-sm px-4 sm:px-6 lg:px-8 py-3  ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
         
          <div className="flex items-center gap-3">
            <img
              src={assets.admin_logo}
              alt="Logo"
              onClick={() => navigate("/")}
              className="w-24 sm:w-32 lg:w-40 cursor-pointer transition-transform duration-200 hover:scale-105"
            />
            {user?.role && (
              <span className="px-2 py-1 border border-gray-300 rounded-full text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden sm:inline-flex">
                {user.role}
              </span>
            )}
          </div>

         
          <button
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } sm:flex flex-col sm:flex-row items-center gap-4 absolute sm:static top-16 left-0 right-0 bg-white sm:bg-transparent p-4 sm:p-0 shadow-md sm:shadow-none z-40`}
          >
            {!accessToken ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="bg-[#5F6FFF] text-white text-sm px-6 py-2 rounded-full hover:bg-[#4b56cc] transition duration-300 ease-in-out w-full sm:w-auto"
              >
                Login
              </button>
            ) : user?.role === "admin" ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-[#5F6FFF] text-white text-sm px-6 py-2 rounded-full hover:bg-[#4b56cc] transition duration-300 ease-in-out w-full sm:w-auto"
              >
                Logout
              </button>
            ) : user?.role === "doctor" ? (
              <div ref={dropdownRef} className="relative w-full sm:w-auto">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
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
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.name?.split(" ")[0] || "Doctor"}
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 sm:w-40">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/doctor-profile");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/change-password");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/change-email");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Change Email
                    </button>
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/doctor-appointments");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Appointments
                    </button>
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/all-concerns");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Concerns
                    </button>
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/wallet");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Wallet
                    </button>
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/all-payouts");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Payout
                    </button>
                     <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/rating");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Rating
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        navigate("/my-chat");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      My Chats
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#5F6FFF] hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out w-full sm:w-auto"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {user?.role === "doctor" && !user?.isVerified && (
        <div
          className="bg-orange-500 border-b border-red-300 overflow-hidden h-8 cursor-pointer mt-16 sm:mt-0 flex items-center"
          onClick={() => navigate("/doctor-profile")}
        >
          <div className="marquee text-m text-white font-semibold whitespace-nowrap ">
            <span>
              Your account is not verified. Please upload your certificates to get verified and start receiving appointments.
            </span>
            <span className="mx-2">
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