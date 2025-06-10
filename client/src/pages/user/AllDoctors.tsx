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












import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axios";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  isBlocked: boolean;
  isVerified: boolean;
  profile: {
    specialization?: string;
  }[];
}

const specialities = [
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

  useEffect(() => {
    async function fetchAllDoctors() {
      try {
        const res = await axiosInstance.get("/user/all-doctors");
        setDoctors(res.data.data);
      } catch (error) {
        console.error("Error fetching all doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          All Doctors
        </h1>

        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Sidebar for filters */}
          <aside className="w-full sm:w-auto lg:w-72">
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
              {specialities.map((speciality, index) => (
                <p
                  key={index}
                  className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 bg-white shadow-sm text-center sm:text-left"
                >
                  {speciality}
                </p>
              ))}
            </div>
          </aside>

          {/* Doctor cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
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
                        src={
                          doctor.photo ||
                          "https://via.placeholder.com/300x200?text=Doctor"
                        }
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
                        <p>
                          {doctor.isVerified ? "Available" : "Unavailable"}
                        </p>
                      </div>
                      <p className="text-[#262626] text-lg font-medium">
                        {doctor.name}
                      </p>
                      <p className="text-[#5C5C5C] text-sm">
                        {profile.specialization || "Specialization N/A"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllDoctors;
