// import Navbar from "../../components/Navbar";




// const AllDoctors = () => {
//   return (
//     <div>
//         <Navbar/>
//       <p className="text-gray-600">Browse through the doctors specialist.</p>

//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <button className="py-1 px-3 border rounded text-sm transition-all sm:hidden">
//           Filters
//         </button>

//         <div className="flex-col gap-4 text-sm text-gray-600 hidden sm:flex">
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             General physician
//           </p>
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             Gynecologist
//           </p>
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             Dermatologist
//           </p>
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             Pediatricians
//           </p>
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             Neurologist
//           </p>
//           <p className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer">
//             Gastroenterologist
//           </p>
//         </div>

//         <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
//           {/* Placeholder for doctor cards */}
//           <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
//             <img
//               className="bg-[#EAEFFF]"
//               src="https://via.placeholder.com/300x200?text=Doctor"
//               alt="Doctor"
//             />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-green-500">
//                 <p className="w-2 h-2 rounded-full bg-green-500"></p>
//                 <p>Available</p>
//               </div>
//               <p className="text-[#262626] text-lg font-medium">Dr. Example</p>
//               <p className="text-[#5C5C5C] text-sm">Speciality</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllDoctors;






// import Navbar from "../../components/Navbar";

// const AllDoctors = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <p className="text-sm text-gray-600 mb-8 max-w-md">
//           Browse through our complete list of specialists and book the right doctor for your needs.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {/* Replace this with dynamic doctor list when available */}
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer transition group hover:shadow-lg hover:scale-[1.03]"
//             >
//               <img
//                 src="https://via.placeholder.com/300x200?text=Doctor"
//                 alt="Doctor"
//                 className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//               />
//               <div className="p-4">
//                 <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
//                   <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                   <p>Available</p>
//                 </div>
//                 <p className="text-[#262626] text-lg font-medium">Dr. Example</p>
//                 <p className="text-[#5C5C5C] text-sm">Specialist</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;










// import Navbar from "../../components/Navbar";

// const specialities = [
//   "General physician",
//   "Gynecologist",
//   "Dermatologist",
//   "Pediatricians",
//   "Neurologist",
//   "Gastroenterologist",
// ];

// const AllDoctors = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar for filters */}
//           {/* <aside className="hidden sm:flex flex-col gap-3 text-sm text-gray-700 w-full sm:w-64">
//             {specialities.map((speciality, index) => (
//               <p
//                 key={index}
//                 className="pl-4 pr-4 py-2 border border-[#C9D8FF] rounded cursor-pointer transition hover:bg-[#E2E5FF] hover:text-[#262626] bg-white"
//               >
//                 {speciality}
//               </p>
//             ))}
//           </aside> */}

//           {/* Sidebar for filters */}
// <aside className="hidden sm:flex flex-col gap-4 text-base text-gray-700 w-full sm:w-72">
//   {specialities.map((speciality, index) => (
//     <p
//       key={index}
//       className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition hover:bg-[#E2E5FF] hover:text-[#262626] bg-white shadow-sm"
//     >
//       {speciality}
//     </p>
//   ))}
// </aside>


//           {/* Doctor cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
//             {/* Example static cards, replace with map when dynamic data is ready */}
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer transition group hover:shadow-lg hover:scale-[1.03]"
//               >
//                 <img
//                   src="https://via.placeholder.com/300x200?text=Doctor"
//                   alt="Doctor"
//                   className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
//                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                     <p>Available</p>
//                   </div>
//                   <p className="text-[#262626] text-lg font-medium">
//                     Dr. Example
//                   </p>
//                   <p className="text-[#5C5C5C] text-sm">Specialist</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;








// import Navbar from "../../components/Navbar";
// import { useEffect } from "react";
// import axiosInstance from "../../utils/axios";

// const specialities = [
//   "General physician",
//   "Gynecologist",
//   "Dermatologist",
//   "Pediatricians",
//   "Neurologist",
//   "Gastroenterologist",
// ];

// const AllDoctors = () => {

//       useEffect(() => {
//     async function fetchAllDoctors() {
//       try {
//         const res = await axiosInstance.get("/user/all-doctors");
//          console.log("all doctors : ",res);
//       } catch (error) {
//         console.error("Error fetching top doctors:", error);
//       } 
      
//     }
//     fetchAllDoctors();
//   }, []);


//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar for filters */}
//           <aside className="w-full sm:w-auto lg:w-72">
//             <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
//               {specialities.map((speciality, index) => (
//                 <p
//                   key={index}
//                   className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
//                 >
//                   {speciality}
//                 </p>
//               ))}
//             </div>
//           </aside>

//           {/* Doctor cards */}
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer transition group hover:shadow-lg hover:scale-[1.03]"
//               >
//                 <img
//                   src="https://via.placeholder.com/300x200?text=Doctor"
//                   alt="Doctor"
//                   className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
//                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                     <p>Available</p>
//                   </div>
//                   <p className="text-[#262626] text-lg font-medium">
//                     Dr. Example
//                   </p>
//                   <p className="text-[#5C5C5C] text-sm">Specialist</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;




// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import axiosInstance from "../../utils/axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   isBlocked: boolean;
//   isVerified: boolean;
//   profile: {
//     specialization?: string;
//   }[];
// }

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

//   useEffect(() => {
//     async function fetchAllDoctors() {
//       try {
//         const res = await axiosInstance.get("/user/all-doctors");
//         setDoctors(res.data.data); // assumes { data: Doctor[] } structure
//       } catch (error) {
//         console.error("Error fetching all doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllDoctors();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar for filters */}
//           <aside className="w-full sm:w-auto lg:w-72">
//             <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
//               {specialities.map((speciality, index) => (
//                 <p
//                   key={index}
//                   className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
//                 >
//                   {speciality}
//                 </p>
//               ))}
//             </div>
//           </aside>

//           {/* Doctor cards */}
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {loading ? (
//               <p className="text-gray-600">Loading doctors...</p>
//             ) : doctors.length === 0 ? (
//               <p className="text-gray-600">No doctors available.</p>
//             ) : (
//               doctors.map((doctor) => {
//                 const profile = doctor.profile?.[0] || {};
//                 return (
//                   <div
//                     key={doctor._id}
//                     className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition group hover:shadow-lg hover:scale-[1.03] cursor-pointer"
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
//                       <div
//                         className={`flex items-center gap-2 text-sm ${
//                           doctor.isVerified ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         <span
//                           className={`w-2 h-2 rounded-full ${
//                             doctor.isVerified ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         ></span>
//                         <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
//                       </div>
//                       <p className="text-[#262626] text-lg font-medium mt-1">
//                         {doctor.name}
//                       </p>
//                       <p className="text-[#5C5C5C] text-sm">
//                         {profile.specialization || "Specialization N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;















// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import axiosInstance from "../../utils/axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   isBlocked: boolean;
//   isVerified: boolean;
//   profile: {
//     specialization?: string;
//   }[];
// }

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

//   useEffect(() => {
//     async function fetchAllDoctors() {
//       try {
//         const res = await axiosInstance.get("/user/all-doctors");
//         setDoctors(res.data.data);
//       } catch (error) {
//         console.error("Error fetching all doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllDoctors();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="w-full sm:w-auto lg:w-72">
//             <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
//               {specialities.map((speciality, index) => (
//                 <p
//                   key={index}
//                   className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
//                 >
//                   {speciality}
//                 </p>
//               ))}
//             </div>
//           </aside>

//           {/* Doctor Cards */}
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {loading ? (
//               <p className="text-gray-600">Loading doctors...</p>
//             ) : doctors.length === 0 ? (
//               <p className="text-gray-600">No doctors available.</p>
//             ) : (
//               doctors.map((doctor) => {
//                 const profile = doctor.profile?.[0] || {};
//                 return (
//                   <div
//                     key={doctor._id}
//                     className="flex flex-col border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition group hover:shadow-lg hover:scale-[1.03] cursor-pointer"
//                   >
//                     <div className="w-full aspect-[4/3] overflow-hidden">
//                       <img
//                         src={
//                           doctor.photo ||
//                           "https://via.placeholder.com/300x200?text=Doctor"
//                         }
//                         alt={doctor.name}
//                         className="w-full h-full object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                       />
//                     </div>
//                     <div className="p-4 flex flex-col gap-1">
//                       <div
//                         className={`flex items-center gap-2 text-sm ${
//                           doctor.isVerified ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         <span
//                           className={`w-2 h-2 rounded-full ${
//                             doctor.isVerified ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         ></span>
//                         <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
//                       </div>
//                       <p className="text-[#262626] text-lg font-medium">
//                         {doctor.name}
//                       </p>
//                       <p className="text-[#5C5C5C] text-sm">
//                         {profile.specialization || "Specialization N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;






// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   isBlocked: boolean;
//   isVerified: boolean;
//   profile: {
//     specialization?: string;
//   }[];
// }







// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import axiosInstance from "../../utils/axios";
// import type { Doctor } from "../../interfaces/IDoctor";



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

//   useEffect(() => {
//     async function fetchAllDoctors() {
//       try {
//         const res = await axiosInstance.get("/user/all-doctors");
//         setDoctors(res.data.data);
//       } catch (error) {
//         console.error("Error fetching all doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllDoctors();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//           All Doctors
//         </h1>

//         <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
//           {/* Sidebar for filters */}
//           <aside className="w-full sm:w-auto lg:w-72">
//             <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
//               {specialities.map((speciality, index) => (
//                 <p
//                   key={index}
//                   className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
//                 >
//                   {speciality}
//                 </p>
//               ))}
//             </div>
//           </aside>

//           {/* Doctor cards */}
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
//             {loading ? (
//               <p className="text-gray-600">Loading doctors...</p>
//             ) : doctors.length === 0 ? (
//               <p className="text-gray-600">No doctors available.</p>
//             ) : (
//               doctors.map((doctor) => {
//                 const profile = doctor.profile?.[0] || {};
//                 return (
//                   <div
//                     key={doctor._id}
//                     className="flex flex-col border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden transition group hover:shadow-lg hover:scale-[1.03] cursor-pointer "
//                   >
//                     <div className="w-full aspect-[4/3] bg-[#EAEFFF] hover:bg-[#5F6FFF] transition duration-300">
//                       <img
//                         src={
//                           doctor.photo ||
//                           "https://via.placeholder.com/300x200?text=Doctor"
//                         }
//                         alt={doctor.name}
//                         className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
//                       />
//                     </div>
//                     <div className="p-4 flex flex-col gap-1">
//                       <div
//                         className={`flex items-center gap-2 text-sm ${
//                           doctor.isVerified ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         <span
//                           className={`w-2 h-2 rounded-full ${
//                             doctor.isVerified ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         ></span>
//                         <p>
//                           {doctor.isVerified ? "Available" : "Unavailable"}
//                         </p>
//                       </div>
//                       <p className="text-[#262626] text-lg font-medium">
//                         {doctor.name}
//                       </p>
//                       <p className="text-[#5C5C5C] text-sm">
//                         {profile.specialization || "Specialization N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllDoctors;









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

  // useEffect(() => {
  //   async function fetchDoctors() {
  //     try {
  //       setLoading(true);
  //       const res = await axiosInstance.get(`/user/all-doctors?page=${page}&limit=${limit}&search=${searchInput}&specialty=${specialty}`);
  //       setDoctors(res.data.data);
  //       console.log("res.data.data : ",res.data.data);
  //       setTotalPages(res.data.totalPages);
  //     } catch (error) {
  //       console.error("Error fetching doctors:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   console.log("specialty : ",specialty);

  //   fetchDoctors();
  // }, [page,limit,searchInput,specialty]);




//   useEffect(() => {
//   const delayDebounce = setTimeout(() => {
//     fetchDoctors();
//   }, 500); 

//   return () => clearTimeout(delayDebounce); 
// }, [page, limit, searchInput, specialty]);


// const fetchDoctors = async () => {
//   try {
//     setLoading(true);
//     const res = await axiosInstance.get(
//       `/user/all-doctors?page=${page}&limit=${limit}&search=${searchInput}&specialty=${specialty}`
//     );
//     setDoctors(res.data.data);
//     console.log("res.data.data : ", res.data.data);
//     setTotalPages(res.data.totalPages);
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//   } finally {
//     setLoading(false);
//   }
// };




// Debounce searchInput only
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchInput(searchInput);
  }, 500);

  return () => clearTimeout(handler);
}, [searchInput]);

// Fetch doctors whenever debouncedSearchInput, page, limit, or specialty change
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
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     updateQuery("search", searchInput);
            //   }
            // }}
          />
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Sidebar */}
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

          {/* Doctors List */}
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

            {/* Pagination Component */}
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
