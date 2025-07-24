

import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import type { Doctor } from "../interfaces/IDoctor";
import { APIRoutes } from "../constants/routes.constants";


const TopDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopDoctors() {
      try {
        const res = await axiosInstance.get(APIRoutes.TOP_DOCTORS);
        setDoctors(res.data.data); 
      } catch (error) {
        console.error("Error fetching top doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Top Doctors to Book
      </h1>

      <p className="text-sm text-gray-600 mb-8 max-w-md">
        Simply browse through our handpicked top-rated doctors you can book now.
      </p>

      {loading ? (
        <p className="text-center text-gray-600">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {doctors.map((doctor) => {
            const profile = doctor.profile?.[0] || {};

            return (
              <div
                key={doctor._id}
                className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition hover:shadow-lg hover:scale-[1.02] "
              >
                <img
                  src={
                    doctor.photo ||
                    "https://via.placeholder.com/300x200?text=Doctor"
                  }
                  alt={doctor.name}
                  className="w-full h-40 object-cover bg-[#EAEFFF] hover:bg-[#5F6FFF] transition duration-300 "
                />
                <div className="p-4">
                 
                 <div className={`flex items-center gap-2 text-sm ${
                    doctor.isVerified ? "text-green-500" : "text-red-500"
                    }`}
                  >
                  <span className={`w-2 h-2 rounded-full ${
                    doctor.isVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
                 </div>
                  <p className="text-lg font-medium text-[#262626] mt-1">
                    {doctor.name}
                  </p>
                  <p className="text-sm text-[#5C5C5C]">
                    {profile.specialization || "Specialization N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopDoctors;
