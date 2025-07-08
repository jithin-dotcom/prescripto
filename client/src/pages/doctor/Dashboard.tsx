







import React from "react";
import { assets } from "../../assets/assets2";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
// import { useAuthStore } from "../../store/authStore";
// import { fetchCurrentUser } from "../../services/authService";

const DoctorDashboard: React.FC = () => {

  // const accessToken = useAuthStore((s) => s.accessToken);
  // const setUser = useAuthStore((s) => s.setUser);
  
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
          {/* Welcome Header (optional) */}
          {/* 
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, Dr. John!
            </h1>
            <p className="text-gray-500 mt-1">Your email: dr.john@example.com</p>
          </div>
          */}

          {/* Stats (you can use this grid when adding cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example stat card */}
            
            {/* <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">Appointments</h2>
              <p className="text-2xl font-bold text-[#5F6FFF] mt-2">12</p>
            </div>  */}
            <div className='flex text-gray-700 items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold '>200</p>
            <p >Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold '>1</p>
            <p >Appointments</p>
          </div>
        </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold '>1</p>
            <p >Patients</p></div>
        </div>
           
          </div>

          {/* Latest Bookings */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-[#f9f9ff]">
              <img src={assets.list_icon} alt="List Icon" className="w-5 h-5" />
              <p className="font-semibold text-gray-700">Latest Bookings</p>
            </div>

            {/* Booking List */}
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  // className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-[#5F6FFF] group transition-all  transform hover:scale-104 transition  duration-300 ease-in-out"
                  className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-[#5F6FFF] group transition-all duration-300 ease-in-out transform hover:scale-103"
                >
                  <img
                    className="rounded-full w-10 h-10"
                    src="https://via.placeholder.com/40"
                    alt="User"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium group-hover:text-white transition">
                      John Doe {index + 1}
                    </p>
                    <p className="text-gray-600 group-hover:text-white transition">
                      Booking on June {10 + index}, 2025
                    </p>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <img
                      className="w-8 h-8 cursor-pointer transform hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      className="w-8 h-8 cursor-pointer transform hover:scale-110 transition"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;




