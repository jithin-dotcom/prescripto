

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { Doctor } from "../../interfaces/IDoctorList";
import Pagination from "../../components/Pagination";
import { Search } from "lucide-react";
import { APIRoutes } from "../../constants/routes.constants";

const specialities = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(4);

  const navigate = useNavigate();
  

  const getDoctor = async (page = 1, query = "", selectedSpecialty = "", limit = pageSize) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${APIRoutes.ADMIN_GET_USERS}?role=doctor&page=${page}&limit=${limit}&search=${query}&specialty=${selectedSpecialty}`
      );
      console.log("doctors : ", res.data.data.items);
      setDoctors(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const handler = setTimeout(()=>{
         setDebouncedSearch(search);
    },500)
    return () => clearTimeout(handler);
  })
  useEffect(()=>{
     getDoctor(currentPage, debouncedSearch, specialty)
  },[currentPage, debouncedSearch, specialty, pageSize])

  

  const toggleBlockStatus = async (doctorId: string) => {
    try {
      await axiosInstance.patch(`${APIRoutes.ADMIN_BLOCK_TOGGLE}/${doctorId}`);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === doctorId ? { ...doc, isBlocked: !doc.isBlocked } : doc
        )
      );
      toast.success("Successfully toggled block status");
    } catch (error) {
      const message =
        error instanceof AxiosError ? error.message : "Error toggling block status";
       console.error(message);
    }
  };

  const toggleVerifiedStatus = async (doctorId: string) => {
    try {
      await axiosInstance.patch(`${APIRoutes.ADMIN_VERIFY_TOGGLE}/${doctorId}`);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === doctorId ? { ...doc, isVerified: !doc.isVerified } : doc
        )
      );
      toast.success("Successfully toggled verification status");
    } catch (error) {
      const message = 
      error instanceof AxiosError ? error.message : "Error toggling verification";
      console.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto mt-12 bg-gradient-to-br from-blue-100 to-indigo-100">
         
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">All Doctors</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
             
              <div className="relative w-full sm:w-72 bg-white rounded-lg">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 " />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>

              
              <select
                value={specialty}
                onChange={(e) => {
                  setSpecialty(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-60 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white"
              >
                <option value="">All Specialities</option>
                {specialities.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

         
          {loading ? (
            <p className="text-center text-gray-600">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-600">No doctors found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {doctors.map((doctor) => {
                  const profile = doctor.profile?.[0] || {};
                  return (
                    <div
                      key={doctor.id}
                      onClick={() => navigate(`/edit-doctor/${doctor.id}`)}
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
                        <p className="text-lg font-medium text-[#262626]">{doctor.name}</p>
                        <p className="text-sm text-[#5C5C5C]">
                          {profile.specialization || "Specialization N/A"}
                        </p>
 
                        




{profile.averageRating !== undefined && profile.ratingCount !== undefined && (
  <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600 flex-wrap sm:flex-nowrap">
    <div className="flex items-center gap-1 flex-shrink-0">
      <span className="font-semibold text-base whitespace-nowrap">
        {profile.averageRating.toFixed(1)} {"⭐".repeat(Math.round(profile.averageRating))}
      </span>
      <span className="text-gray-500 whitespace-nowrap">({profile.ratingCount})</span>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        sessionStorage.setItem("doctorId", doctor.id);
        navigate("/rating");
      }}
      className="py-0.5 px-2 border border-yellow-500 text-xs rounded-full text-yellow-700 hover:bg-yellow-100 transition duration-200 whitespace-nowrap flex-shrink-0"
    >
      View Ratings
    </button>
  </div>
)}


                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={doctor.isVerified}
                            onChange={() => toggleVerifiedStatus(doctor.id)}
                            onClick={(e) => e.stopPropagation()}
                            readOnly
                          />
                          <label className="text-gray-700">Verified</label>

                          <input
                            type="checkbox"
                            checked={doctor.isBlocked}
                            onChange={() => toggleBlockStatus(doctor.id)}
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

            
              <div className="mt-8">
                {totalPages >= 1 && (
                  
                <Pagination
                 currentPage={currentPage}
                 totalPages={totalPages}
                 onPageChange={setCurrentPage}
                 pageSize={pageSize}
                 onPageSizeChange={(size) => {
                 setPageSize(size);
                 setCurrentPage(1); 
                }}
                />
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorsList;
