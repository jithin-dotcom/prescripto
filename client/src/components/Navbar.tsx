

import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { assets } from "../assets/assets1";
import { toast } from "react-toastify";
import { logoutService } from "../services/logoutService";
import axiosInstance from "../utils/axios";
import { Menu, X } from "lucide-react"; 
import { fetchCurrentUser } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
useEffect(() => {
  console.log("User in Navbar:", user);
}, [user]);

   useEffect(() => {
      const getUser = async () => {
        if (accessToken) {
          try {
            const fetchedUser = await fetchCurrentUser(accessToken,navigate);
            setUser(fetchedUser);
          } catch (err) {
            console.error("Failed to fetch current user", err);
          }
        }
      };
      getUser();
    }, [accessToken, setUser,navigate]);
 

  const handleLogout = () => {
    try {
      logoutService();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      if(error instanceof Error){
          toast.error(error.message || "Logout failed");
        }else{
          toast.error("Logout failed");
        }
    }
  };




  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axiosInstance.post("/patient/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data.user);
      toast.success("Profile photo updated!");
    } catch {
      toast.error("Failed to upload photo");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 border-b border-b-[#ADADAD]">
       
        <img className="w-40 cursor-pointer hover:scale-105 transition " src={assets.logo} alt="logo" onClick={() => navigate("/")} />

       
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[#262626]">
          {["/", "/all-doctors", "/about", "/contact"].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `py-1.5 px-3 rounded-md transition ${
                  isActive ? "bg-[#5F6FFF] text-white" : "hover:bg-[#E2E5FF]"
                }`
              }
            >
              {["Home", "All Doctors", "About", "Contact"][idx].toUpperCase()}
            </NavLink>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4 relative">
          {!accessToken ? (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-[#5F6FFF] hover:bg-[#3E4ED5] text-white px-6 py-2 rounded-full text-sm transition"
            >
              Login
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <img
                onClick={handleImageClick}
                src={user?.photo}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div className="relative">
                <span
                  className="font-medium text-[#262626] cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user?.name?.split(" ")[0]}
                </span>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50 overflow-hidden">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                      Profile
                    </button>

                      <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/my-appointments");
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-[#5F6FFF] hover:text-white"
                    >
                       Appointments
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
            </div>
          )}

         
          <button
            className="md:hidden text-[#262626]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col gap-2 p-4 text-sm font-medium text-[#262626] bg-white shadow-sm border-t border-gray-200">
          {["/", "/all-doctors", "/about", "/contact"].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-4 rounded-md transition ${
                  isActive ? "bg-[#5F6FFF] text-white" : "hover:bg-[#E2E5FF]"
                }`
              }
            >
              {["Home", "All Doctors", "About", "Contact"][idx]}
            </NavLink>
          ))}
          {!accessToken ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="bg-[#5F6FFF] hover:bg-[#3E4ED5] text-white px-4 py-2 rounded-full mt-2"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-4 text-left hover:bg-[#5F6FFF] hover:text-white"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-4 text-left text-red-500 hover:bg-[#5F6FFF] hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
