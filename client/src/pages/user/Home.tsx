

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

import { fetchCurrentUser } from "../../services/authService";



const Dashboard: React.FC = () => {
 
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






  return (
    <div className="p-6">
      
      <Navbar/>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
     
      <Footer/>
      
    </div>
  );
};

export default Dashboard;
