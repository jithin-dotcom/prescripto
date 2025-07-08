

// interface DoctorProfile {
//   specialization?: string;
// }

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   isVerified: boolean;
//   isBlocked: boolean;
//   profile?: DoctorProfile[];
// }





// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar2";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import type { Doctor } from "../../interfaces/IDoctorList";



// const DoctorsList: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getDoctor() {
//       try {
//         const res = await axiosInstance.get("/admin/users?role=doctor&page=3&limit=2");
//         console.log("doctors:", res.data);
//         setDoctors(res.data.data.items);
//       } catch (error) {
//         console.error("Failed to fetch doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getDoctor();
//   }, []);


//   const toggleBlockStatus = async (doctorId: string) => {
//      try {
//         await axiosInstance.patch(`/admin/block-toggle/${doctorId}`)
//         setDoctors((prev) => {
//           return prev.map((doc) =>{
//              return doc._id === doctorId ? {...doc,isBlocked:!doc.isBlocked} : doc;
//            })
//         });
//         toast.success("successfully toggled Block status");
//      } catch (error) {
//         if(error instanceof AxiosError){
//            toast.error(error.message || "error toggling doctor isBlocked");
//         }else{
//            toast.error("error toggling doctor isBlocked");
//         }
//      }
//   }

//   const toggleVerifiedStatus = async (doctorId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/verify-toggle/${doctorId}`)
//       setDoctors((prev) => {
//          return prev.map((doc)=>{
//             return doc._id === doctorId ? {...doc,isVerified: !doc.isVerified} : doc;
//          })
//       });
//       toast.success("successfully toggled Block status");
//     } catch (error) {
//       if(error instanceof AxiosError){
//          toast.error(error.message || "error toggling doctor isBlocked");
//       }else{
//          toast.error("error toggling doctor isBlocked");
//       }
//     }
//   }



//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Top Navbar */}
//       <Navbar />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <SidebarAdmin />

//         {/* Main Content */}
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//             All Doctors
//           </h1>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading doctors...</p>
//           ) : doctors.length === 0 ? (
//             <p className="text-center text-gray-600">No doctors found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {doctors.map((doctor) => {
//                 const profile = doctor.profile?.[0] || {};
//                 return (
//                   <div
//                     key={doctor._id}
//                     onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
//                     className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
//                   >
//                     <img
//                       src={
//                         doctor.photo ||
//                         "https://via.placeholder.com/300x200?text=Doctor"
//                       }
//                       alt={doctor.name}
//                       className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                     />
//                     <div className="p-4">
//                       <p className="text-lg font-medium text-[#262626]">
//                         {doctor.name}
//                       </p>
//                       <p className="text-sm text-[#5C5C5C]">
//                         {profile.specialization || "Specialization N/A"}
//                       </p>

//                       <div className="mt-3 flex items-center gap-2 text-sm">
//                         <input
//                           type="checkbox"
//                           checked={doctor.isVerified}
//                           onChange={()=>toggleVerifiedStatus(doctor._id)}
//                           onClick={(e) => e.stopPropagation()}
//                           readOnly
//                         />
//                         <label className="text-gray-700">Verified</label>
//                         <input
//                           type="checkbox"
//                           checked={doctor.isBlocked}
//                           onChange={() => toggleBlockStatus(doctor._id)}
//                           onClick={(e) => e.stopPropagation()}
//                           readOnly
//                         />
//                         <label className="text-gray-700">Blocked</label>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;










// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import type { Doctor } from "../../interfaces/IDoctorList";
// import Pagination from "../../components/Pagination"; 

// const DoctorsList: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const navigate = useNavigate();

//   const limit = 2; 

//   const getDoctor = async (page = 1) => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`/admin/users?role=doctor&page=${page}&limit=${limit}`);
//       // console.log("doctors:", res.data);
//       setDoctors(res.data.data.items);
//       setTotalPages(res.data.data.totalPages); 
//     } catch (error) {
//       console.error("Failed to fetch doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDoctor(currentPage);
//   }, [currentPage]);

//   const toggleBlockStatus = async (doctorId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/block-toggle/${doctorId}`);
//       setDoctors((prev) =>
//         prev.map((doc) =>
//           doc._id === doctorId ? { ...doc, isBlocked: !doc.isBlocked } : doc
//         )
//       );
//       toast.success("Successfully toggled block status");
//     } catch (error) {
//       const message = error instanceof AxiosError ? error.message : "Error toggling block status";
//       toast.error(message);
//     }
//   };

//   const toggleVerifiedStatus = async (doctorId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/verify-toggle/${doctorId}`);
//       setDoctors((prev) =>
//         prev.map((doc) =>
//           doc._id === doctorId ? { ...doc, isVerified: !doc.isVerified } : doc
//         )
//       );
//       toast.success("Successfully toggled verification status");
//     } catch (error) {
//       const message = error instanceof AxiosError ? error.message : "Error toggling verification";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <div className="flex flex-1">
//         <SidebarAdmin />

//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Doctors</h1>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading doctors...</p>
//           ) : doctors.length === 0 ? (
//             <p className="text-center text-gray-600">No doctors found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {doctors.map((doctor) => {
//                   const profile = doctor.profile?.[0] || {};
//                   return (
//                     <div
//                       key={doctor._id}
//                       onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
//                       className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
//                     >
//                       <img
//                         src={
//                           doctor.photo || "https://via.placeholder.com/300x200?text=Doctor"
//                         }
//                         alt={doctor.name}
//                         className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                       />
//                       <div className="p-4">
//                         <p className="text-lg font-medium text-[#262626]">{doctor.name}</p>
//                         <p className="text-sm text-[#5C5C5C]">
//                           {profile.specialization || "Specialization N/A"}
//                         </p>

//                         <div className="mt-3 flex items-center gap-2 text-sm">
//                           <input
//                             type="checkbox"
//                             checked={doctor.isVerified}
//                             onChange={() => toggleVerifiedStatus(doctor._id)}
//                             onClick={(e) => e.stopPropagation()}
//                             readOnly
//                           />
//                           <label className="text-gray-700">Verified</label>

//                           <input
//                             type="checkbox"
//                             checked={doctor.isBlocked}
//                             onChange={() => toggleBlockStatus(doctor._id)}
//                             onClick={(e) => e.stopPropagation()}
//                             readOnly
//                           />
//                           <label className="text-gray-700">Blocked</label>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination Component */}
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;








// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import type { Doctor } from "../../interfaces/IDoctorList";
// import Pagination from "../../components/Pagination";
// import { Search } from "lucide-react";

// const DoctorsList: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [search, setSearch] = useState<string>("");

//   const navigate = useNavigate();
//   const limit = 2;

//   const getDoctor = async (page = 1, query = "") => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(
//         `/admin/users?role=doctor&page=${page}&limit=${limit}&search=${query}`
//       );
//       setDoctors(res.data.data.items);
//       setTotalPages(res.data.data.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDoctor(currentPage, search);
//   }, [currentPage, search]);

//   const toggleBlockStatus = async (doctorId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/block-toggle/${doctorId}`);
//       setDoctors((prev) =>
//         prev.map((doc) =>
//           doc._id === doctorId ? { ...doc, isBlocked: !doc.isBlocked } : doc
//         )
//       );
//       toast.success("Successfully toggled block status");
//     } catch (error) {
//       const message =
//         error instanceof AxiosError ? error.message : "Error toggling block status";
//       toast.error(message);
//     }
//   };

//   const toggleVerifiedStatus = async (doctorId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/verify-toggle/${doctorId}`);
//       setDoctors((prev) =>
//         prev.map((doc) =>
//           doc._id === doctorId ? { ...doc, isVerified: !doc.isVerified } : doc
//         )
//       );
//       toast.success("Successfully toggled verification status");
//     } catch (error) {
//       const message =
//         error instanceof AxiosError ? error.message : "Error toggling verification";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           {/* Header with Search */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//             <h1 className="text-2xl font-semibold text-gray-700">All Doctors</h1>

//             <div className="relative w-full sm:w-80">
//               <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search doctors..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
//               />
//             </div>
//           </div>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading doctors...</p>
//           ) : doctors.length === 0 ? (
//             <p className="text-center text-gray-600">No doctors found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {doctors.map((doctor) => {
//                   const profile = doctor.profile?.[0] || {};
//                   return (
//                     <div
//                       key={doctor._id}
//                       onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
//                       className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
//                     >
//                       <img
//                         src={
//                           doctor.photo ||
//                           "https://via.placeholder.com/300x200?text=Doctor"
//                         }
//                         alt={doctor.name}
//                         className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                       />
//                       <div className="p-4">
//                         <p className="text-lg font-medium text-[#262626]">{doctor.name}</p>
//                         <p className="text-sm text-[#5C5C5C]">
//                           {profile.specialization || "Specialization N/A"}
//                         </p>

//                         <div className="mt-3 flex items-center gap-2 text-sm">
//                           <input
//                             type="checkbox"
//                             checked={doctor.isVerified}
//                             onChange={() => toggleVerifiedStatus(doctor._id)}
//                             onClick={(e) => e.stopPropagation()}
//                             readOnly
//                           />
//                           <label className="text-gray-700">Verified</label>

//                           <input
//                             type="checkbox"
//                             checked={doctor.isBlocked}
//                             onChange={() => toggleBlockStatus(doctor._id)}
//                             onClick={(e) => e.stopPropagation()}
//                             readOnly
//                           />
//                           <label className="text-gray-700">Blocked</label>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               <div className="mt-8">
//                 {totalPages >= 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={(page) => setCurrentPage(page)}
//                   />
//                 )}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;







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

  const navigate = useNavigate();
  const limit = 2;

  const getDoctor = async (page = 1, query = "", selectedSpecialty = "") => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/admin/users?role=doctor&page=${page}&limit=${limit}&search=${query}&specialty=${selectedSpecialty}`
      );
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
  },[currentPage, debouncedSearch, specialty])

  // useEffect(() => {
  //   getDoctor(currentPage, search, specialty);
  // }, [currentPage, search, specialty]);

  const toggleBlockStatus = async (doctorId: string) => {
    try {
      await axiosInstance.patch(`/admin/block-toggle/${doctorId}`);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, isBlocked: !doc.isBlocked } : doc
        )
      );
      toast.success("Successfully toggled block status");
    } catch (error) {
      const message =
        error instanceof AxiosError ? error.message : "Error toggling block status";
      toast.error(message);
    }
  };

  const toggleVerifiedStatus = async (doctorId: string) => {
    try {
      await axiosInstance.patch(`/admin/verify-toggle/${doctorId}`);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, isVerified: !doc.isVerified } : doc
        )
      );
      toast.success("Successfully toggled verification status");
    } catch (error) {
      const message =
        error instanceof AxiosError ? error.message : "Error toggling verification";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Header with Search & Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">All Doctors</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
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

              {/* Speciality Dropdown */}
              <select
                value={specialty}
                onChange={(e) => {
                  setSpecialty(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-60 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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

          {/* Main content */}
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
                        <p className="text-lg font-medium text-[#262626]">{doctor.name}</p>
                        <p className="text-sm text-[#5C5C5C]">
                          {profile.specialization || "Specialization N/A"}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={doctor.isVerified}
                            onChange={() => toggleVerifiedStatus(doctor._id)}
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

              {/* Pagination */}
              <div className="mt-8">
                {totalPages >= 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
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
