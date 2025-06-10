


import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar2";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


interface DoctorProfile {
  specialization?: string;
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  isVerified: boolean;
  isBlocked: boolean;
  profile?: DoctorProfile[];
}

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDoctor() {
      try {
        const res = await axiosInstance.get("/admin/users?role=doctor");
        console.log("doctors:", res.data);
        setDoctors(res.data.data.items);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    getDoctor();
  }, []);


  const toggleBlockStatus = async (doctorId: string) => {
     try {
        await axiosInstance.patch(`/admin/block-toggle/${doctorId}`)
        setDoctors((prev) => {
          return prev.map((doc) =>{
             return doc._id === doctorId ? {...doc,isBlocked:!doc.isBlocked} : doc;
           })
        });
        toast.success("successfully toggled Block status");
     } catch (error) {
        if(error instanceof AxiosError){
           toast.error(error.message || "error toggling doctor isBlocked");
        }else{
           toast.error("error toggling doctor isBlocked");
        }
     }
  }

  const toggleVerifiedStatus = async (doctorId: string) => {
    try {
      await axiosInstance.patch(`/admin/verify-toggle/${doctorId}`)
      setDoctors((prev) => {
         return prev.map((doc)=>{
            return doc._id === doctorId ? {...doc,isVerified: !doc.isVerified} : doc;
         })
      });
      toast.success("successfully toggled Block status");
    } catch (error) {
      if(error instanceof AxiosError){
         toast.error(error.message || "error toggling doctor isBlocked");
      }else{
         toast.error("error toggling doctor isBlocked");
      }
    }
  }



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            All Doctors
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-600">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => {
                const profile = doctor.profile?.[0] || {};
                return (
                  <div
                    key={doctor._id}
                    onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
                    className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
                  >
                    <img
                      src={
                        doctor.photo ||
                        "https://via.placeholder.com/300x200?text=Doctor"
                      }
                      alt={doctor.name}
                      className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
                    />
                    <div className="p-4">
                      <p className="text-lg font-medium text-[#262626]">
                        {doctor.name}
                      </p>
                      <p className="text-sm text-[#5C5C5C]">
                        {profile.specialization || "Specialization N/A"}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={doctor.isVerified}
                          onChange={()=>toggleVerifiedStatus(doctor._id)}
                          onClick={(e) => e.stopPropagation()}
                          readOnly
                        />
                        <label className="text-gray-700">Verified</label>
                        <input
                          type="checkbox"
                          checked={doctor.isBlocked}
                          onChange={() => toggleBlockStatus(doctor._id)}
                          onClick={(e) => e.stopPropagation()}
                          readOnly
                        />
                        <label className="text-gray-700">Blocked</label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorsList;
