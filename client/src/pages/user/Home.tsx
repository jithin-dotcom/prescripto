

import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import SpecialityMenu from "../../components/SpecialityMenu";
import TopDoctors from "../../components/TopDoctors";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
// import { logoutService } from "../../services/logoutService";
// import { toast } from "react-toastify";
// import TestTokenRefresh from "../TestTokenRefresh";
import { fetchCurrentUser } from "../../services/authService";



const Dashboard: React.FC = () => {
  // const user = useAuthStore((state) => state.user);
  // const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const getUser = async () => {
      if (accessToken) {
        try {
          const user = await fetchCurrentUser(accessToken,navigate);
          setUser(user); 
        } catch (err) {
          console.error("Failed to fetch current user", err);
        }
      }
    };
    getUser();
  }, [accessToken, setUser,navigate] );



//   const handleLogout = async () => {
  

//       try {
//       await logoutService();  
//       logout(); 
//       navigate("/login", { replace: true });
//     } catch (error) {
//          if(error instanceof Error){
//             toast.error(error.message || "Logout failed");
//          }else{
//             toast.error("Logout Failed ");
//          }
      
//     }

// };


  return (
    <div className="p-6">
      {/* <TestTokenRefresh/> */}
      <Navbar/>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
       {/* <h1 className="text-3xl mb-4">Welcome, {user?.name || "User"}!</h1> */}
      {/* <p>Your email: {user?.email}</p> */}
      {/* <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button> */}
      <Footer/>
      
    </div>
  );
};

export default Dashboard;
