

import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import SpecialityMenu from "../../components/SpecialityMenu";
import TopDoctors from "../../components/TopDoctors";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";


const Dashboard: React.FC = () => {
 

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
