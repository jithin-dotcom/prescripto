

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import type { Doctor } from "../../interfaces/IDoctor";
import { Search } from "lucide-react";

const specialties = [
  "Clear Filter",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const AllDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;
  const [searchInput, setSearchInput] = useState("");
  const [specialty, setSpecialty] = useState("")
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);



useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchInput(searchInput);
  }, 500);

  return () => clearTimeout(handler);
}, [searchInput]);


useEffect(() => {
  fetchDoctors();
}, [page, limit, debouncedSearchInput, specialty]);

const fetchDoctors = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `/user/all-doctors?page=${page}&limit=${limit}&search=${debouncedSearchInput}&specialty=${specialty}`
    );
    setDoctors(res.data.data);
    console.log("res.data.data : ", res.data.data);
    setTotalPages(res.data.totalPages);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Doctors</h1> */}

                {/* Search bar */}
        <div className="mb-6 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            
          />
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
         
          <aside className="w-full sm:w-auto lg:w-72">
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
              {specialties.map((specialty, index) => (
                <p
                  key={index}
                  className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
                  onClick={()=>{
                    if(specialty === "Clear Filter"){
                       setSpecialty("");
                    }else{
                       setSpecialty(specialty);
                    }
                    
                  }}
                >
                  {specialty}
                </p>
              ))}
            </div>
          </aside>

         
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <p className="text-gray-600">Loading doctors...</p>
              ) : doctors.length === 0 ? (
                <p className="text-gray-600">No doctors available.</p>
              ) : (
                doctors.map((doctor) => {
                  const profile = doctor.profile?.[0] || {};
                  return (
                    <div
                      key={doctor._id}
                      className="flex flex-col border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition group hover:shadow-lg hover:scale-[1.03] cursor-pointer "
                    >
                      <div className="w-full aspect-[4/3] bg-[#EAEFFF] hover:bg-[#5F6FFF] transition duration-300">
                        <img
                          src={doctor.photo || "https://via.placeholder.com/300x200?text=Doctor"}
                          alt={doctor.name}
                          className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            doctor.isVerified ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              doctor.isVerified ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
                        </div>
                        <p className="text-[#262626] text-lg font-medium">{doctor.name}</p>
                        <p className="text-[#5C5C5C] text-sm">
                          {profile.specialization || "Specialization N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

           
            {!loading &&  (
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllDoctors;












// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import type { Doctor } from "../../interfaces/IDoctor";
// import { Search } from "lucide-react";
// import clsx from "clsx";

// const specialities = [
//   "General physician",
//   "Gynecologist",
//   "Dermatologist",
//   "Pediatricians",
//   "Neurologist",
//   "Gastroenterologist",
// ];

// const AllDoctors = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [searchParams, setSearchParams] = useSearchParams();
//   // const navigate = useNavigate();

//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "2");
//   const search = searchParams.get("search") || "";
//   const specialty = searchParams.get("specialty") || "";

//   const [searchInput, setSearchInput] = useState(search);

//   useEffect(() => {
//     async function fetchDoctors() {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get(
//           `/user/all-doctors?page=${page}&limit=${limit}&search=${search}&specialty=${specialty}`
//         );
//         setDoctors(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDoctors();
//   }, [page, limit, search, specialty]);

//   const [totalPages, setTotalPages] = useState(1);

//   const updateQuery = (key: string, value: string) => {
//     const newParams = new URLSearchParams(searchParams);
//     if (value) {
//       newParams.set(key, value);
//     } else {
//       newParams.delete(key);
//     }
//     newParams.set("page", "1"); // reset to page 1 when filter/search changes
//     setSearchParams(newParams);
//   };

//   const handlePageChange = (newPage: number) => {
//     const newParams = new URLSearchParams(searchParams);
//     newParams.set("page", newPage.toString());
//     setSearchParams(newParams);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Doctors</h1>

//         {/* Search bar */}
//         <div className="mb-6 max-w-md relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search doctors..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 updateQuery("search", searchInput);
//               }
//             }}
//           />
//         </div>

//         <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
//           {/* Sidebar for Specialties */}
//           <aside className="w-full sm:w-auto lg:w-72">
//             <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
//               {specialities.map((item, index) => (
//                 <p
//                   key={index}
//                   onClick={() =>
//                     updateQuery("specialty", specialty === item ? "" : item)
//                   }
//                   className={clsx(
//                     "pl-5 pr-5 py-3 border rounded-lg cursor-pointer transition duration-300 text-center sm:text-left shadow-sm",
//                     specialty === item
//                       ? "bg-[#5F6FFF] text-white border-[#5F6FFF] scale-105"
//                       : "bg-white border-[#C9D8FF] hover:bg-[#5F6FFF] hover:text-white hover:scale-105"
//                   )}
//                 >
//                   {item}
//                 </p>
//               ))}
//             </div>
//           </aside>

//           {/* Doctors List */}
//           <div className="w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//               {loading ? (
//                 <p className="text-gray-600">Loading doctors...</p>
//               ) : doctors.length === 0 ? (
//                 <p className="text-gray-600">No doctors available.</p>
//               ) : (
//                 doctors.map((doctor) => {
//                   const profile = doctor.profile?.[0] || {};
//                   return (
//                     <div
//                       key={doctor._id}
//                       className="flex flex-col border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition group hover:shadow-lg hover:scale-[1.03] cursor-pointer "
//                     >
//                       <div className="w-full aspect-[4/3] bg-[#EAEFFF] hover:bg-[#5F6FFF] transition duration-300">
//                         <img
//                           src={doctor.photo || "https://via.placeholder.com/300x200?text=Doctor"}
//                           alt={doctor.name}
//                           className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
//                         />
//                       </div>
//                       <div className="p-4 flex flex-col gap-1">
//                         <div
//                           className={`flex items-center gap-2 text-sm ${
//                             doctor.isVerified ? "text-green-500" : "text-red-500"
//                           }`}
//                         >
//                           <span
//                             className={`w-2 h-2 rounded-full ${
//                               doctor.isVerified ? "bg-green-500" : "bg-red-500"
//                             }`}
//                           ></span>
//                           <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
//                         </div>
//                         <p className="text-[#262626] text-lg font-medium">{doctor.name}</p>
//                         <p className="text-[#5C5C5C] text-sm">
//                           {profile.specialization || "Specialization N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             {/* Pagination */}
//             {!loading && (
//               <Pagination
//                 currentPage={page}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;
