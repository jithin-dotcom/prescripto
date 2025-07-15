
// // // // import Navbar from "../../components/NavbarAdmin";
// // // // import SidebarAdmin from "../../components/SideBarAdmin";
// // // // import { assets } from "../../assets/assets2";

// // // // const mockAppointments = [
// // // //   {
// // // //     userData: { name: "John Doe", image: "/user1.jpg", dob: "1990-01-01" },
// // // //     slotDate: "2025-06-10",
// // // //     slotTime: "10:30 AM",
// // // //     docData: { name: "Dr. Smith", image: "/doctor1.jpg" },
// // // //     amount: "1500",
// // // //     cancelled: false,
// // // //     isCompleted: true,
// // // //   },
// // // //   {
// // // //     userData: { name: "Jane Doe", image: "/user2.jpg", dob: "1995-07-20" },
// // // //     slotDate: "2025-06-12",
// // // //     slotTime: "02:00 PM",
// // // //     docData: { name: "Dr. Alice", image: "/doctor2.jpg" },
// // // //     amount: "1200",
// // // //     cancelled: true,
// // // //     isCompleted: false,
// // // //   },
// // // // ];

// // // // const AllAppointments = () => {
// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 flex flex-col">
// // // //       <Navbar />

// // // //       <div className="flex flex-1">
// // // //         <SidebarAdmin />

// // // //         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
// // // //           <h1 className="text-2xl font-semibold text-gray-700 mb-6">
// // // //             All Appointments
// // // //           </h1>

// // // //           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
// // // //             {/* Desktop Header */}
// // // //             <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
// // // //               <p>#</p>
// // // //               <p>Patient</p>
// // // //               <p>Age</p>
// // // //               <p>Date & Time</p>
// // // //               <p>Doctor</p>
// // // //               <p>Fees</p>
// // // //               <p>Action</p>
// // // //             </div>

// // // //             {/* Rows */}
// // // //             {mockAppointments.map((item, index) => (
// // // //               <div
// // // //                 key={index}
// // // //                 className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
// // // //               >
// // // //                 {/* Row for small screen */}
// // // //                 <div className="flex sm:hidden flex-col gap-2">
// // // //                   <div className="flex items-center gap-2">
// // // //                     <span className="font-medium w-24">Patient:</span>
// // // //                     <img
// // // //                       src={item.userData.image}
// // // //                       className="w-8 h-8 rounded-full object-cover"
// // // //                       alt="patient"
// // // //                     />
// // // //                     <span>{item.userData.name}</span>
// // // //                   </div>

// // // //                   <div className="flex gap-2">
// // // //                     <span className="font-medium w-24">Date & Time:</span>
// // // //                     <span>
// // // //                       {item.slotDate}, {item.slotTime}
// // // //                     </span>
// // // //                   </div>

// // // //                   <div className="flex items-center gap-2">
// // // //                     <span className="font-medium w-24">Doctor:</span>
// // // //                     <img
// // // //                       src={item.docData.image}
// // // //                       className="w-8 h-8 rounded-full object-cover"
// // // //                       alt="doctor"
// // // //                     />
// // // //                     <span>{item.docData.name}</span>
// // // //                   </div>

// // // //                   <div className="flex gap-2">
// // // //                     <span className="font-medium w-24">Fees:</span>
// // // //                     <span>₹{item.amount}</span>
// // // //                   </div>

// // // //                   <div className="flex gap-2">
// // // //                     <span className="font-medium w-24">Status:</span>
// // // //                     {item.cancelled ? (
// // // //                       <span className="text-red-500 font-medium">Cancelled</span>
// // // //                     ) : item.isCompleted ? (
// // // //                       <span className="text-green-600 font-medium">Completed</span>
// // // //                     ) : (
// // // //                       <img
// // // //                         src={assets.cancel_icon}
// // // //                         alt="cancel"
// // // //                         className="w-6 cursor-pointer"
// // // //                       />
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Row for large screen */}
// // // //                 <p className="hidden sm:block">{index + 1}</p>

// // // //                 <div className="hidden sm:flex items-center gap-2">
// // // //                   <img
// // // //                     src={item.userData.image}
// // // //                     className="w-8 h-8 rounded-full object-cover"
// // // //                     alt="patient"
// // // //                   />
// // // //                   <p>{item.userData.name}</p>
// // // //                 </div>

// // // //                 <p className="hidden sm:block">30</p>

// // // //                 <p className="hidden sm:block">
// // // //                   {item.slotDate}, {item.slotTime}
// // // //                 </p>

// // // //                 <div className="hidden sm:flex items-center gap-2">
// // // //                   <img
// // // //                     src={item.docData.image}
// // // //                     className="w-8 h-8 rounded-full object-cover"
// // // //                     alt="doctor"
// // // //                   />
// // // //                   <p>{item.docData.name}</p>
// // // //                 </div>

// // // //                 <p className="hidden sm:block">₹{item.amount}</p>

// // // //                 <div className="hidden sm:block">
// // // //                   {item.cancelled ? (
// // // //                     <p className="text-red-500 font-medium text-xs">Cancelled</p>
// // // //                   ) : item.isCompleted ? (
// // // //                     <p className="text-green-600 font-medium text-xs">
// // // //                       Completed
// // // //                     </p>
// // // //                   ) : (
// // // //                     <img
// // // //                       src={assets.cancel_icon}
// // // //                       alt="cancel"
// // // //                       className="w-6 cursor-pointer"
// // // //                     />
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AllAppointments;








// // // import { useEffect, useState } from "react";
// // // import Navbar from "../../components/NavbarAdmin";
// // // import SidebarAdmin from "../../components/SideBarAdmin";
// // // import axiosInstance from "../../utils/axios";
// // // // import { assets } from "../../assets/assets2";

// // // interface Appointment {
// // //   _id: string;
// // //   date: string;
// // //   time: string;
// // //   status: "pending" | "confirmed" | "cancelled" | "completed";
// // //   doctor: {
// // //     _id: string;
// // //     name: string;
// // //     photo: string;
// // //   };
// // //   user: {
// // //     _id: string;
// // //     name: string;
// // //     photo: string;
// // //     dateOfBirth: string;
// // //   };
// // //   fee: number;
// // // }

// // // const calculateAge = (dob: string) => {
// // //   const birthDate = new Date(dob);
// // //   const today = new Date();
// // //   let age = today.getFullYear() - birthDate.getFullYear();
// // //   const m = today.getMonth() - birthDate.getMonth();
// // //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
// // //   return age;
// // // };

// // // const AllAppointments = () => {
// // //   const [appointments, setAppointments] = useState<Appointment[]>([]);

// // //   useEffect(() => {
// // //     async function fetchAppointments() {
// // //       try {
// // //         const res = await axiosInstance.get("/all-appointments");
// // //         setAppointments(res.data);
// // //       } catch (err) {
// // //         console.error("Failed to fetch appointments:", err);
// // //       }
// // //     }

// // //     fetchAppointments();
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex flex-col">
// // //       <Navbar />
// // //       <div className="flex flex-1">
// // //         <SidebarAdmin />
// // //         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
// // //           <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Appointments</h1>
// // //           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
// // //             <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
// // //               <p>#</p>
// // //               <p>Patient</p>
// // //               <p>Age</p>
// // //               <p>Date & Time</p>
// // //               <p>Doctor</p>
// // //               <p>Fees</p>
// // //               <p>Status</p>
// // //             </div>

// // //             {appointments.map((item, index) => (
// // //               <div
// // //                 key={item._id}
// // //                 className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
// // //               >
// // //                 {/* Mobile layout */}
// // //                 <div className="flex sm:hidden flex-col gap-2">
// // //                   <div className="flex items-center gap-2">
// // //                     <span className="font-medium w-24">Patient:</span>
// // //                     <img src={item.user.photo} className="w-8 h-8 rounded-full" alt="patient" />
// // //                     <span>{item.user.name}</span>
// // //                   </div>

// // //                   <div className="flex gap-2">
// // //                     <span className="font-medium w-24">Age:</span>
// // //                     <span>{calculateAge(item.user.dateOfBirth)}</span>
// // //                   </div>

// // //                   <div className="flex gap-2">
// // //                     <span className="font-medium w-24">Date & Time:</span>
// // //                     <span>{item.date}, {item.time}</span>
// // //                   </div>

// // //                   <div className="flex items-center gap-2">
// // //                     <span className="font-medium w-24">Doctor:</span>
// // //                     <img src={item.doctor.photo} className="w-8 h-8 rounded-full" alt="doctor" />
// // //                     <span>{item.doctor.name}</span>
// // //                   </div>

// // //                   <div className="flex gap-2">
// // //                     <span className="font-medium w-24">Fee:</span>
// // //                     <span>₹{item.doctor.fee}</span>
// // //                   </div>

// // //                   <div className="flex gap-2">
// // //                     <span className="font-medium w-24">Status:</span>
// // //                     <span
// // //                       className={
// // //                         item.status === "completed"
// // //                           ? "text-green-600 font-medium"
// // //                           : item.status === "cancelled"
// // //                           ? "text-red-500 font-medium"
// // //                           : item.status === "pending"
// // //                           ? "text-yellow-500 font-medium"
// // //                           : "text-blue-500 font-medium"
// // //                       }
// // //                     >
// // //                       {item.status}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 {/* Desktop layout */}
// // //                 <p className="hidden sm:block">{index + 1}</p>
// // //                 <div className="hidden sm:flex items-center gap-2">
// // //                   <img src={item.user.photo} className="w-8 h-8 rounded-full" alt="patient" />
// // //                   <p>{item.user.name}</p>
// // //                 </div>
// // //                 <p className="hidden sm:block">{calculateAge(item.user.dateOfBirth)}</p>
// // //                 <p className="hidden sm:block">{item.date}, {item.time}</p>
// // //                 <div className="hidden sm:flex items-center gap-2">
// // //                   <img src={item.doctor.photo} className="w-8 h-8 rounded-full" alt="doctor" />
// // //                   <p>{item.doctor.name}</p>
// // //                 </div>
// // //                 <p className="hidden sm:block">₹{item.doctor.fee}</p>
// // //                 <p
// // //                   className={`hidden sm:block font-medium text-xs ${
// // //                     item.status === "completed"
// // //                       ? "text-green-600"
// // //                       : item.status === "cancelled"
// // //                       ? "text-red-500"
// // //                       : item.status === "pending"
// // //                       ? "text-yellow-500"
// // //                       : "text-blue-500"
// // //                   }`}
// // //                 >
// // //                   {item.status}
// // //                 </p>
                
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AllAppointments;












// // import { useEffect, useState } from "react";
// // import Navbar from "../../components/NavbarAdmin";
// // import SidebarAdmin from "../../components/SideBarAdmin";
// // import { assets } from "../../assets/assets2";
// // import axiosInstance from "../../utils/axios";

// // interface Appointment {
// //   _id: string;
// //   date: string;
// //   time: string;
// //   status: "pending" | "cancelled" | "confirmed" | "completed";
// //   doctor: {
// //     name: string;
// //     photo: string;
// //   };
// //   user: {
// //     name: string;
// //     photo: string;
// //     dateOfBirth: string;
// //   };
// //   fee: number;
// // }

// // const getStatusButtonStyle = (status: string) => {
// //   switch (status) {
// //     case "pending":
// //       return "bg-yellow-400 text-white";
// //     case "cancelled":
// //       return "bg-red-500 text-white";
// //     case "confirmed":
// //       return "bg-green-500 text-white";
// //     case "completed":
// //       return "bg-gray-500 text-white";
// //     default:
// //       return "bg-gray-300 text-black";
// //   }
// // };

// // const AllAppointments = () => {
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);

// //   useEffect(() => {
// //     const fetchAppointments = async () => {
// //       try {
// //         const res = await axiosInstance.get("/all-appointments");
// //         setAppointments(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch appointments", err);
// //       }
// //     };
// //     fetchAppointments();
// //   }, []);

// //   const calculateAge = (dob: string) => {
// //     const birthDate = new Date(dob);
// //     const ageDifMs = Date.now() - birthDate.getTime();
// //     return Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col">
// //       <Navbar />
// //       <div className="flex flex-1">
// //         <SidebarAdmin />
// //         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
// //           <h1 className="text-2xl font-semibold text-gray-700 mb-6">
// //             All Appointments
// //           </h1>

// //           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
// //             {/* Desktop Header */}
// //             <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_2fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
// //               <p>#</p>
// //               <p>Patient</p>
// //               <p>Age</p>
// //               <p>Date & Time</p>
// //               <p>Doctor</p>
// //               <p>Fees</p>
// //               <p>Status</p>
// //               <p>Actions</p>
// //             </div>

// //             {appointments.map((item, index) => (
// //               <div
// //                 key={item._id}
// //                 className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_2fr] sm:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
// //               >
// //                 {/* Mobile view */}
// //                 <div className="flex sm:hidden flex-col gap-2">
// //                   <div className="flex items-center gap-2">
// //                     <span className="font-medium w-24">Patient:</span>
// //                     <img
// //                       src={item.user.photo}
// //                       className="w-8 h-8 rounded-full object-cover"
// //                       alt="patient"
// //                     />
// //                     <span>{item.user.name}</span>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <span className="font-medium w-24">Age:</span>
// //                     <span>{calculateAge(item.user.dateOfBirth)}</span>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <span className="font-medium w-24">Date & Time:</span>
// //                     <span>{item.date}, {item.time}</span>
// //                   </div>

// //                   <div className="flex items-center gap-2">
// //                     <span className="font-medium w-24">Doctor:</span>
// //                     <img
// //                       src={item.doctor.photo}
// //                       className="w-8 h-8 rounded-full object-cover"
// //                       alt="doctor"
// //                     />
// //                     <span>{item.doctor.name}</span>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <span className="font-medium w-24">Fee:</span>
// //                     <span>₹{item.doctor.fee}</span>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <span className="font-medium w-24">Status:</span>
// //                     <button
// //                       className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusButtonStyle(
// //                         item.status
// //                       )}`}
// //                     >
// //                       {item.status}
// //                     </button>
// //                   </div>

// //                   <div className="flex gap-2 mt-2">
// //                     <button className="bg-red-500 text-white px-3 py-1 text-xs rounded">
// //                       Cancel
// //                     </button>
// //                     <button className="bg-green-500 text-white px-3 py-1 text-xs rounded">
// //                       Confirm
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Desktop view */}
// //                 <p className="hidden sm:block">{index + 1}</p>

// //                 <div className="hidden sm:flex items-center gap-2">
// //                   <img
// //                     src={item.user.photo}
// //                     className="w-8 h-8 rounded-full object-cover"
// //                     alt="patient"
// //                   />
// //                   <p>{item.user.name}</p>
// //                 </div>

// //                 <p className="hidden sm:block">{calculateAge(item.user.dateOfBirth)}</p>

// //                 <p className="hidden sm:block">
// //                   {item.date}, {item.time}
// //                 </p>

// //                 <div className="hidden sm:flex items-center gap-2">
// //                   <img
// //                     src={item.doctor.photo}
// //                     className="w-8 h-8 rounded-full object-cover"
// //                     alt="doctor"
// //                   />
// //                   <p>{item.doctor.name}</p>
// //                 </div>

// //                 <p className="hidden sm:block">₹{item.doctor.fee}</p>

// //                 <div className="hidden sm:block">
// //                   <button
// //                     className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusButtonStyle(
// //                       item.status
// //                     )}`}
// //                   >
// //                     {item.status}
// //                   </button>
// //                 </div>

// //                 <div className="hidden sm:flex gap-2 ml-2">
// //                   <button className="bg-red-500 text-white px-3 py-1 text-xs rounded">
// //                     Cancel
// //                   </button>
// //                   <button className="bg-green-500 text-white px-3 py-1 text-xs rounded">
// //                     Confirm
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllAppointments;















// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import { assets } from "../../assets/assets2";
// import axiosInstance from "../../utils/axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }

// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   user: User;
//   date: string;
//   time: string;
//   status: "pending" | "cancelled" | "confirmed" | "completed";
// }

// const getStatusButtonStyle = (status: string) => {
//   switch (status) {
//     case "pending":
//       return "bg-yellow-300 text-yellow-900";
//     case "cancelled":
//       return "bg-red-200 text-red-700";
//     case "confirmed":
//       return "bg-green-200 text-green-700";
//     case "completed":
//       return "bg-gray-200 text-gray-600";
//     default:
//       return "bg-gray-100 text-gray-500";
//   }
// };

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/all-appointments");
//         setAppointments(res.data);
//       } catch (err) {
//         console.error("Error fetching appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Appointments</h1>

//           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//             {/* Table header */}
//             <div className="hidden sm:grid grid-cols-8 py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
//               <p className="text-center">#</p>
//               <p className="text-left">Patient</p>
//               <p className="text-center">Age</p>
//               <p className="text-left">Date & Time</p>
//               <p className="text-left">Doctor</p>
//               <p className="text-center">Fees</p>
//               <p className="text-center">Status</p>
//               <p className="text-center">Actions</p>
//             </div>

//             {/* Rows */}
//             {appointments.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col sm:grid sm:grid-cols-8 sm:items-center text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
//               >
//                 {/* Mobile view */}
//                 <div className="sm:hidden flex flex-col gap-2">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium w-24">Patient:</span>
//                     <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="patient" />
//                     <span>{item.user.name}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-medium w-24">Age:</span>
//                     <span>{calculateAge(item.user.dateOfBirth)}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-medium w-24">Date & Time:</span>
//                     <span>{item.date}, {item.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium w-24">Doctor:</span>
//                     <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="doctor" />
//                     <span>{item.doctor.name}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-medium w-24">Fee:</span>
//                     <span>₹{item.doctor.fee}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-medium w-24">Status:</span>
//                     <button className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusButtonStyle(item.status)}`}>
//                       {item.status}
//                     </button>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="bg-red-500 text-white px-3 py-1 text-xs rounded">Cancel</button>
//                     <button className="bg-green-500 text-white px-3 py-1 text-xs rounded">Confirm</button>
//                   </div>
//                 </div>

//                 {/* Desktop view */}
//                 <p className="hidden sm:block text-center">{index + 1}</p>

//                 <div className="hidden sm:flex items-center gap-2">
//                   <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="patient" />
//                   <p>{item.user.name}</p>
//                 </div>

//                 <p className="hidden sm:block text-center">{calculateAge(item.user.dateOfBirth)}</p>

//                 <p className="hidden sm:block">{item.date}, {item.time}</p>

//                 <div className="hidden sm:flex items-center gap-2">
//                   <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="doctor" />
//                   <p>{item.doctor.name}</p>
//                 </div>

//                 <p className="hidden sm:block text-center">₹{item.doctor.fee}</p>

//                 <div className="hidden sm:flex justify-center">
//                   <button className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusButtonStyle(item.status)}`}>
//                     {item.status}
//                   </button>
//                 </div>

//                 <div className="hidden sm:flex justify-center gap-2">
//                   <button className="bg-red-500 text-white px-3 py-1 text-xs rounded">Cancel</button>
//                   <button className="bg-green-500 text-white px-3 py-1 text-xs rounded">Confirm</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;

















// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }

// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }

// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   useEffect(() => {
//     async function fetchAppointments() {
//       try {
//         const res = await axiosInstance.get("/all-appointments");
//         setAppointments(res.data);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     }
//     fetchAppointments();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//             All Appointments
//           </h1>

//           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//             {/* Table Header */}
//             <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
//               <p className="text-center">#</p>
//               <p className="text-center">Patient</p>
//               <p className="text-center">Age</p>
//               <p className="text-center">Date & Time</p>
//               <p className="text-center">Doctor</p>
//               <p className="text-center">Fees</p>
//               <p className="text-center">Status</p>
//               <p className="text-center">Actions</p>
//             </div>

//             {/* Appointment Rows */}
//             {appointments.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] md:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
//               >
//                 {/* Index */}
//                 <p className="text-center">{index + 1}</p>

//                 {/* Patient */}
//                 <div className="flex items-center gap-2 justify-center">
//                   <img
//                     src={item.user.photo}
//                     className="w-8 h-8 rounded-full object-cover"
//                     alt="patient"
//                   />
//                   <p>{item.user.name}</p>
//                 </div>

//                 {/* Age */}
//                 <p className="text-center">{calculateAge(item.user.dateOfBirth)}</p>

//                 {/* Date & Time */}
//                 <p className="text-center whitespace-nowrap">
//                   {item.date}, {item.time}
//                 </p>

//                 {/* Doctor */}
//                 <div className="flex items-center gap-2 justify-center">
//                   <img
//                     src={item.doctor.photo}
//                     className="w-8 h-8 rounded-full object-cover"
//                     alt="doctor"
//                   />
//                   <p>{item.doctor.name}</p>
//                 </div>

//                 {/* Fees */}
//                 <p className="text-center whitespace-nowrap">₹{item.doctor.fee}</p>

//                 {/* Status */}
//                 <div className="flex justify-center">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       item.status === "pending"
//                         ? "bg-yellow-300 text-yellow-900"
//                         : item.status === "cancelled"
//                         ? "bg-red-200 text-red-700"
//                         : item.status === "confirmed"
//                         ? "bg-green-200 text-green-800"
//                         : "bg-gray-300 text-gray-700"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex justify-center gap-2 flex-wrap">
//                   <button
//                     className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full"
//                     onClick={() => {
//                       // TODO: implement cancel logic
//                       console.log("Cancel", item._id);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full"
//                     onClick={() => {
//                       // TODO: implement confirm logic
//                       console.log("Confirm", item._id);
//                     }}
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;







// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import Pagination from "../../components/Pagination"; 

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }

// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }

// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const limit = 5;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?page=${currentPage}&limit=${limit}`
//         );
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [currentPage]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">
//             All Appointments
//           </h1>

//           <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//             {/* Table Header */}
//             <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
//               <p className="text-center">#</p>
//               <p className="text-center">Patient</p>
//               <p className="text-center">Age</p>
//               <p className="text-center">Date & Time</p>
//               <p className="text-center">Doctor</p>
//               <p className="text-center">Fees</p>
//               <p className="text-center">Status</p>
//               <p className="text-center">Actions</p>
//             </div>

//             {loading ? (
//               <p className="text-center py-6 text-gray-500">Loading...</p>
//             ) : appointments.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">
//                 No appointments found.
//               </p>
//             ) : (
//               appointments.map((item, index) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] md:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
//                 >
//                   {/* Index */}
//                   <p className="text-center">
//                     {(currentPage - 1) * limit + index + 1}
//                   </p>

//                   {/* Patient */}
//                   <div className="flex items-center gap-2 justify-center">
//                     <img
//                       src={item.user.photo}
//                       className="w-8 h-8 rounded-full object-cover"
//                       alt="patient"
//                     />
//                     <p>{item.user.name}</p>
//                   </div>

//                   {/* Age */}
//                   <p className="text-center">
//                     {calculateAge(item.user.dateOfBirth)}
//                   </p>

//                   {/* Date & Time */}
//                   <p className="text-center whitespace-nowrap">
//                     {item.date}, {item.time}
//                   </p>

//                   {/* Doctor */}
//                   <div className="flex items-center gap-2 justify-center">
//                     <img
//                       src={item.doctor.photo}
//                       className="w-8 h-8 rounded-full object-cover"
//                       alt="doctor"
//                     />
//                     <p>{item.doctor.name}</p>
//                   </div>

//                   {/* Fees */}
//                   <p className="text-center whitespace-nowrap">
//                     ₹{item.doctor.fee}
//                   </p>

//                   {/* Status */}
//                   <div className="flex justify-center">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         item.status === "pending"
//                           ? "bg-yellow-300 text-yellow-900"
//                           : item.status === "cancelled"
//                           ? "bg-red-200 text-red-700"
//                           : item.status === "confirmed"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-gray-300 text-gray-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex justify-center gap-2 flex-wrap">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => {
//                         console.log("Cancel", item._id);
//                       }}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => {
//                         console.log("Confirm", item._id);
//                       }}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;








// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/all-appointments?page=${currentPage}&limit=${limit}`);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };

//     fetchAppointments();
//   }, [currentPage]);

//   useEffect(() => {
//     if (statusFilter === "all") {
//       setFilteredAppointments(appointments);
//     } else {
//       const filtered = appointments.filter(app => app.status === statusFilter);
//       setFilteredAppointments(filtered);
//     }
//   }, [statusFilter, appointments]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border px-3 py-2 rounded text-sm w-48"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <div className="bg-white border rounded-xl shadow overflow-hidden">
//             <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
//               <p className="text-center">#</p>
//               <p className="text-center">Patient</p>
//               <p className="text-center">Age</p>
//               <p className="text-center">Date & Time</p>
//               <p className="text-center">Doctor</p>
//               <p className="text-center">Fees</p>
//               <p className="text-center">Status</p>
//               <p className="text-center">Actions</p>
//             </div>

//             {filteredAppointments.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">No appointments found.</p>
//             ) : (
//               filteredAppointments.map((item, index) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] md:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
//                 >
//                   <p className="text-center">{(currentPage - 1) * limit + index + 1}</p>
//                   <div className="flex items-center gap-2 justify-center">
//                     <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="patient" />
//                     <p>{item.user.name}</p>
//                   </div>
//                   <p className="text-center">{calculateAge(item.user.dateOfBirth)}</p>
//                   <p className="text-center whitespace-nowrap">{item.date}, {item.time}</p>
//                   <div className="flex items-center gap-2 justify-center">
//                     <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="doctor" />
//                     <p>{item.doctor.name}</p>
//                   </div>
//                   <p className="text-center whitespace-nowrap">₹{item.doctor.fee}</p>
//                   <div className="flex justify-center">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         item.status === "pending"
//                           ? "bg-yellow-300 text-yellow-900"
//                           : item.status === "cancelled"
//                           ? "bg-red-200 text-red-700"
//                           : item.status === "confirmed"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-gray-300 text-gray-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </div>
//                   <div className="flex justify-center gap-2 flex-wrap">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => console.log("Cancel", item._id)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => console.log("Confirm", item._id)}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;









// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`);
//         console.log("data : ",res.data);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };

//     fetchAppointments();
//   }, [currentPage, statusFilter]);

//   const handleUpdateStatus = async(appointmentId: string, status: string) => {
//       try {
//          await axiosInstance.patch(`/appointments/${appointmentId}`,{status});
//          const updatedStatus = appointments.map((app) => {
//             return app._id === appointmentId ? {...app,status} : app;
//          })
//          setAppointments(updatedStatus);
//          toast.success(`Appointment ${status} successfully`);
//       }catch (error) {
//          if(axios.isAxiosError(error)){
//             toast.error(error.response?.data?.message || `Failed to ${status} Appointment`);
//          }else{
//             toast.error("Something went wrong");
//          }
//       }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           {/* Header and filter */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1); // Reset to page 1 when filter changes
//               }}
//               className="border px-3 py-2 rounded text-sm w-48"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Appointments Table */}
//           <div className="bg-white border rounded-xl shadow overflow-hidden">
//             <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
//               <p className="text-center">#</p>
//               <p className="text-center">Patient</p>
//               <p className="text-center">Age</p>
//               <p className="text-center">Date & Time</p>
//               <p className="text-center">Doctor</p>
//               <p className="text-center">Fees</p>
//               <p className="text-center">Status</p>
//               <p className="text-center">Actions</p>
//             </div>

//             {appointments.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">No appointments found.</p>
//             ) : (
//               appointments.map((item, index) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] md:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
//                 >
//                   <p className="text-center">{(currentPage - 1) * limit + index + 1}</p>
//                   <div className="flex items-center gap-2 justify-center">
//                     <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="patient" />
//                     <p>{item.user.name}</p>
//                   </div>
//                   <p className="text-center">{calculateAge(item.user.dateOfBirth)}</p>
//                   <p className="text-center whitespace-nowrap">{item.date}, {item.time}</p>
//                   <div className="flex items-center gap-2 justify-center">
//                     <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="doctor" />
//                     <p>{item.doctor.name}</p>
//                   </div>
//                   <p className="text-center whitespace-nowrap">₹{item.doctor.fee}</p>
//                   <div className="flex justify-center">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         item.status === "pending"
//                           ? "bg-yellow-300 text-yellow-900"
//                           : item.status === "cancelled"
//                           ? "bg-red-200 text-red-700"
//                           : item.status === "confirmed"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-gray-300 text-gray-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </div>
//                   <div className="flex justify-center gap-2 flex-wrap">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => handleUpdateStatus(item._id, "cancelled")}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full"
//                       onClick={() => handleUpdateStatus(item._id, "confirmed")}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;











// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check } from "lucide-react";
// import { Tooltip } from "react-tooltip";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, [currentPage, statusFilter]);

//   const handleUpdateStatus = async (appointmentId: string, status: string) => {
//     try {
//       await axiosInstance.patch(`/appointments/${appointmentId}`, { status });
//       const updatedStatus = appointments.map((app) =>
//         app._id === appointmentId ? { ...app, status } : app
//       );
//       setAppointments(updatedStatus);
//       toast.success(`Appointment ${status} successfully`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || `Failed to ${status} Appointment`);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "px-2 py-1 rounded-full text-xs font-semibold";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-300 text-yellow-900`;
//       case "cancelled":
//         return `${base} bg-red-200 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-200 text-green-800`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-700`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border px-3 py-2 rounded text-sm w-48"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Table Header (Desktop Only) */}
//           <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-3 px-6 bg-[#EAEFFF] text-[#262626] font-medium border rounded-t-lg text-sm">
//             <p className="text-center">#</p>
//             <p className="text-center">Patient</p>
//             <p className="text-center">Age</p>
//             <p className="text-center">Date & Time</p>
//             <p className="text-center">Doctor</p>
//             <p className="text-center">Fees</p>
//             <p className="text-center">Status</p>
//             <p className="text-center">Actions</p>
//           </div>

//           <div className="bg-white border-x border-b rounded-b-lg shadow-sm">
//             {appointments.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">No appointments found.</p>
//             ) : (
//               appointments.map((item, index) => {
//                 const disableAction = ["cancelled", "completed"].includes(item.status);
//                 return (
//                   <div
//                     key={item._id}
//                     className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] items-center gap-y-4 text-sm text-gray-700 py-4 px-6 border-t hover:bg-[#5F6FFF] hover:text-white transition"
//                   >
//                     <p className="text-center">{(currentPage - 1) * limit + index + 1}</p>

//                     <div className="flex items-center gap-2 justify-center">
//                       <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="Patient" />
//                       <p>{item.user.name}</p>
//                     </div>

//                     <p className="text-center">{calculateAge(item.user.dateOfBirth)}</p>
//                     <p className="text-center whitespace-nowrap">{item.date}, {item.time}</p>

//                     <div className="flex items-center gap-2 justify-center">
//                       <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="Doctor" />
//                       <p>{item.doctor.name}</p>
//                     </div>

//                     <p className="text-center whitespace-nowrap">₹{item.doctor.fee}</p>

//                     <span className={getStatusBadge(item.status)}>{item.status}</span>

//                     <div className="flex justify-center gap-2 flex-wrap">
//                       <button
//                         data-tooltip-id={`cancel-${item._id}`}
//                         data-tooltip-content={
//                           disableAction ? "Not allowed on completed/cancelled" : "Cancel Appointment"
//                         }
//                         className={`p-1.5 rounded-full transition ${
//                           disableAction
//                             ? "bg-gray-300 cursor-not-allowed"
//                             : "bg-red-500 hover:bg-red-600 text-white"
//                         }`}
//                         onClick={() => !disableAction && handleUpdateStatus(item._id, "cancelled")}
//                         disabled={disableAction}
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                       <Tooltip id={`cancel-${item._id}`} />

//                       <button
//                         data-tooltip-id={`confirm-${item._id}`}
//                         data-tooltip-content={
//                           disableAction ? "Not allowed on completed/cancelled" : "Confirm Appointment"
//                         }
//                         className={`p-1.5 rounded-full transition ${
//                           disableAction
//                             ? "bg-gray-300 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600 text-white"
//                         }`}
//                         onClick={() => !disableAction && handleUpdateStatus(item._id, "confirmed")}
//                         disabled={disableAction}
//                       >
//                         <Check className="w-4 h-4" />
//                       </button>
//                       <Tooltip id={`confirm-${item._id}`} />
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;













// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check } from "lucide-react";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`
//         );
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, [currentPage, statusFilter]);

//   const handleUpdateStatus = async (appointmentId: string, status: string) => {
//     try {
//       await axiosInstance.patch(`/appointments/${appointmentId}`, { status });
//       const updated = appointments.map((app) =>
//         app._id === appointmentId ? { ...app, status } : app
//       );
//       setAppointments(updated);
//       toast.success(`Appointment ${status} successfully`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || `Failed to ${status} appointment`);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "px-2 py-1 rounded-full text-xs font-semibold";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-300 text-yellow-900`;
//       case "cancelled":
//         return `${base} bg-red-200 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-200 text-green-800`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-700`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border px-3 py-2 rounded text-sm w-full sm:w-48"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Table Header */}
//           <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] py-3 px-6 bg-[#EAEFFF] text-[#262626] font-medium border rounded-t-lg text-sm">
//             <p className="text-center">#</p>
//             <p className="text-center">Patient</p>
//             <p className="text-center">Age</p>
//             <p className="text-center">Date & Time</p>
//             <p className="text-center">Doctor</p>
//             <p className="text-center">Fees</p>
//             <p className="text-center">Status</p>
//             <p className="text-center">Actions</p>
//           </div>

//           <div className="bg-white border-x border-b rounded-b-lg shadow-sm">
//             {appointments.length === 0 ? (
//               <p className="text-center py-6 text-gray-500">No appointments found.</p>
//             ) : (
//               appointments.map((item, index) => {
//                 const disabled = ["cancelled", "completed"].includes(item.status);

//                 return (
//                   <div
//                     key={item._id}
//                     className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_2fr] items-center gap-y-4 text-sm text-gray-700 py-4 px-6 border-t hover:bg-[#5F6FFF] hover:text-white transition"
//                   >
//                     <p className="text-center">{(currentPage - 1) * limit + index + 1}</p>

//                     <div className="flex items-center gap-2 justify-center">
//                       <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" alt="Patient" />
//                       <p>{item.user.name}</p>
//                     </div>

//                     <p className="text-center">{calculateAge(item.user.dateOfBirth)}</p>
//                     <p className="text-center whitespace-nowrap">{item.date}, {item.time}</p>

//                     <div className="flex items-center gap-2 justify-center">
//                       <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" alt="Doctor" />
//                       <p>{item.doctor.name}</p>
//                     </div>

//                     <p className="text-center whitespace-nowrap">₹{item.doctor.fee}</p>

//                     <span className={getStatusBadge(item.status)}>{item.status}</span>

//                     <div className="flex justify-center gap-2 flex-wrap">
//                       <button
//                         className={`p-1.5 rounded-full transition ${
//                           disabled
//                             ? "bg-gray-300 cursor-not-allowed"
//                             : "bg-red-500 hover:bg-red-600 text-white"
//                         }`}
//                         onClick={() => !disabled && handleUpdateStatus(item._id, "cancelled")}
//                         disabled={disabled}
//                         title={disabled ? "Not allowed on completed/cancelled" : "Cancel Appointment"}
//                       >
//                         <X className="w-4 h-4" />
//                       </button>

//                       <button
//                         className={`p-1.5 rounded-full transition ${
//                           disabled
//                             ? "bg-gray-300 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600 text-white"
//                         }`}
//                         onClick={() => !disabled && handleUpdateStatus(item._id, "confirmed")}
//                         disabled={disabled}
//                         title={disabled ? "Not allowed on completed/cancelled" : "Confirm Appointment"}
//                       >
//                         <Check className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;










// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check } from "lucide-react";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`
//         );
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, [currentPage, statusFilter]);

//   const handleUpdateStatus = async (appointmentId: string, status: string) => {
//     try {
//       await axiosInstance.patch(`/appointments/${appointmentId}`, { status });
//       const updated = appointments.map((app) =>
//         app._id === appointmentId ? { ...app, status } : app
//       );
//       setAppointments(updated);
//       toast.success(`Appointment ${status} successfully`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || `Failed to ${status} appointment`);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "px-2 py-1 rounded-full text-xs font-semibold";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-300 text-yellow-900`;
//       case "cancelled":
//         return `${base} bg-red-200 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-200 text-green-800`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-700`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border px-3 py-2 rounded text-sm w-full sm:w-48"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* ✅ Desktop Table View */}
//           <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-[#EAEFFF] text-[#262626] text-sm font-semibold">
//                 <tr>
//                   <th className="px-4 py-3 text-center">#</th>
//                   <th className="px-4 py-3 text-center">Patient</th>
//                   <th className="px-4 py-3 text-center">Age</th>
//                   <th className="px-4 py-3 text-center">Date & Time</th>
//                   <th className="px-4 py-3 text-center">Doctor</th>
//                   <th className="px-4 py-3 text-center">Fees</th>
//                   <th className="px-4 py-3 text-center">Status</th>
//                   <th className="px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y text-gray-700">
//                 {appointments.map((item, index) => {
//                   const disabled = ["cancelled", "completed"].includes(item.status);
//                   return (
//                     <tr key={item._id} className="hover:bg-[#5F6FFF] hover:text-white transition">
//                       <td className="text-center px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
//                       <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
//                         <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" />
//                         {item.user.name}
//                       </td>
//                       <td className="text-center px-4 py-3">{calculateAge(item.user.dateOfBirth)}</td>
//                       <td className="text-center px-4 py-3 whitespace-nowrap">
//                         {item.date}, {item.time}
//                       </td>
//                       <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
//                         <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" />
//                         {item.doctor.name}
//                       </td>
//                       <td className="text-center px-4 py-3">₹{item.doctor.fee}</td>
//                       <td className="text-center px-4 py-3">
//                         <span className={getStatusBadge(item.status)}>{item.status}</span>
//                       </td>
//                       <td className="text-center px-4 py-3">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             title="Cancel Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
//                             }`}
//                             onClick={() => !disabled && handleUpdateStatus(item._id, "cancelled")}
//                             disabled={disabled}
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                           <button
//                             title="Confirm Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
//                             }`}
//                             onClick={() => !disabled && handleUpdateStatus(item._id, "confirmed")}
//                             disabled={disabled}
//                           >
//                             <Check className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* ✅ Mobile Card View */}
//           <div className="md:hidden space-y-4">
//             {appointments.map((item, index) => {
//               const disabled = ["cancelled", "completed"].includes(item.status);
//               return (
//                 <div key={item._id} className="bg-white p-4 rounded shadow space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500 font-medium">#{(currentPage - 1) * limit + index + 1}</span>
//                     <span className={getStatusBadge(item.status)}>{item.status}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <img src={item.user.photo} className="w-8 h-8 rounded-full" />
//                     <p className="font-semibold">{item.user.name}</p>
//                   </div>
//                   <p><strong>Age:</strong> {calculateAge(item.user.dateOfBirth)}</p>
//                   <p><strong>Date & Time:</strong> {item.date}, {item.time}</p>
//                   <div className="flex items-center gap-2">
//                     <img src={item.doctor.photo} className="w-8 h-8 rounded-full" />
//                     <p className="font-medium">{item.doctor.name}</p>
//                   </div>
//                   <p><strong>Fees:</strong> ₹{item.doctor.fee}</p>
//                   <div className="flex gap-2 mt-2">
//                     <button
//                       title="Cancel Appointment"
//                       className={`flex-1 text-xs px-3 py-2 rounded flex items-center justify-center gap-1 transition ${
//                         disabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600 "
//                       }`}
//                       onClick={() => !disabled && handleUpdateStatus(item._id, "cancelled")}
//                       disabled={disabled}
//                     >
//                       <X size={14} /> Cancel
//                     </button>
//                     <button
//                       title="Confirm Appointment"
//                       className={`flex-1 text-xs px-3 py-2 rounded flex items-center justify-center gap-1 transition ${
//                         disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 "
//                       }`}
//                       onClick={() => !disabled && handleUpdateStatus(item._id, "confirmed")}
//                       disabled={disabled}
//                     >
//                       <Check size={14} /> Confirm
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;









// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check } from "lucide-react";

// interface Doctor {
//   _id: string;
//   name: string;
//   photo: string;
//   fee: number;
// }
// interface User {
//   _id: string;
//   name: string;
//   photo: string;
//   dateOfBirth: string;
// }
// interface Appointment {
//   _id: string;
//   date: string;
//   time: string;
//   status: string;
//   doctor: Doctor;
//   user: User;
// }

// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
// };

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [modalData, setModalData] = useState<{ id: string; status: string } | null>(null);

//   const limit = 4;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`
//         );
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, [currentPage, statusFilter]);

//   const confirmStatusChange = async () => {
//     if (!modalData) return;
//     try {
//       await axiosInstance.patch(`/appointments/${modalData.id}`, { status: modalData.status });
//       const updated = appointments.map((app) =>
//         app._id === modalData.id ? { ...app, status: modalData.status } : app
//       );
//       setAppointments(updated);
//       toast.success(`Appointment ${modalData.status} successfully`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || `Failed to ${modalData.status} appointment`);
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setModalData(null);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "px-2 py-1 rounded-full text-xs font-semibold";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-300 text-yellow-900`;
//       case "cancelled":
//         return `${base} bg-red-200 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-200 text-green-800`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-700`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col relative">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border px-3 py-2 rounded text-sm w-full sm:w-48"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Desktop Table View */}
//           <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-[#EAEFFF] text-[#262626] text-sm font-semibold">
//                 <tr>
//                   <th className="px-4 py-3 text-center">#</th>
//                   <th className="px-4 py-3 text-center">Patient</th>
//                   <th className="px-4 py-3 text-center">Age</th>
//                   <th className="px-4 py-3 text-center">Date & Time</th>
//                   <th className="px-4 py-3 text-center">Doctor</th>
//                   <th className="px-4 py-3 text-center">Fees</th>
//                   <th className="px-4 py-3 text-center">Status</th>
//                   <th className="px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y text-gray-700">
//                 {appointments.map((item, index) => {
//                   const disabled = ["cancelled", "completed"].includes(item.status);
//                   return (
//                     <tr key={item._id} className="hover:bg-[#5F6FFF] hover:text-white transition">
//                       <td className="text-center px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
//                       <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
//                         <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" />
//                         {item.user.name}
//                       </td>
//                       <td className="text-center px-4 py-3">{calculateAge(item.user.dateOfBirth)}</td>
//                       <td className="text-center px-4 py-3 whitespace-nowrap">{item.date}, {item.time}</td>
//                       <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
//                         <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" />
//                         {item.doctor.name}
//                       </td>
//                       <td className="text-center px-4 py-3">₹{item.doctor.fee}</td>
//                       <td className="text-center px-4 py-3">
//                         <span className={getStatusBadge(item.status)}>{item.status}</span>
//                       </td>
//                       <td className="text-center px-4 py-3">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             title="Cancel Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
//                             }`}
//                             onClick={() => !disabled && setModalData({ id: item._id, status: "cancelled" })}
//                             disabled={disabled}
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                           <button
//                             title="Confirm Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
//                             }`}
//                             onClick={() => !disabled && setModalData({ id: item._id, status: "confirmed" })}
//                             disabled={disabled}
//                           >
//                             <Check className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </main>
//       </div>

//       {/* ✅ Confirmation Modal */}
//       {modalData && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30">
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center space-y-4">
//             <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
//             <p className="text-sm text-gray-600">
//               Do you really want to{" "}
//               <span className="font-semibold">{modalData.status}</span> this appointment?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
//                 onClick={() => setModalData(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`px-4 py-2 rounded text-white ${
//                   modalData.status === "cancelled"
//                     ? "bg-red-500 hover:bg-red-600"
//                     : "bg-green-500 hover:bg-green-600"
//                 }`}
//                 onClick={confirmStatusChange}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllAppointments;







import { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { X, Check } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal"; // ✅ import reusable modal

interface Doctor {
  _id: string;
  name: string;
  photo: string;
  fee: number;
}
interface User {
  _id: string;
  name: string;
  photo: string;
  dateOfBirth: string;
}
interface Appointment {
  _id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  doctor: Doctor;
  user: User;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const AllAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalData, setModalData] = useState<{
    id: string;
    status: "cancelled" | "confirmed";
    patientName: string;
    date: string;
    time: string;
  } | null>(null);

  const limit = 4;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(
          `/all-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`
        );
        setAppointments(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };
    fetchAppointments();
  }, [currentPage, statusFilter]);

  const confirmStatusChange = async () => {
    if (!modalData) return;
    try {
      await axiosInstance.patch(`/appointments/${modalData.id}`, { status: modalData.status });
      const updated = appointments.map((app) =>
        app._id === modalData.id ? { ...app, status: modalData.status } : app
      );
      setAppointments(updated);
      toast.success(`Appointment ${modalData.status} successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || `Failed to ${modalData.status} appointment`);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setModalData(null);
    }
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-300 text-yellow-900`;
      case "cancelled":
        return `${base} bg-red-200 text-red-700`;
      case "confirmed":
        return `${base} bg-green-200 text-green-800`;
      case "completed":
        return `${base} bg-gray-300 text-gray-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">All Appointments</h1>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded text-sm w-full sm:w-48"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#EAEFFF] text-[#262626] text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-center">#</th>
                  <th className="px-4 py-3 text-center">Patient</th>
                  <th className="px-4 py-3 text-center">Age</th>
                  <th className="px-4 py-3 text-center">Date & Time</th>
                  <th className="px-4 py-3 text-center">Doctor</th>
                  <th className="px-4 py-3 text-center">Fees</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {appointments.map((item, index) => {
                  const disabled = ["cancelled", "completed"].includes(item.status);
                  return (
                    <tr key={item._id} className="hover:bg-[#5F6FFF] hover:text-white transition">
                      <td className="text-center px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                      <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
                        <img src={item.user.photo} className="w-8 h-8 rounded-full object-cover" />
                        {item.user.name}
                      </td>
                      <td className="text-center px-4 py-3">{calculateAge(item.user.dateOfBirth)}</td>
                      <td className="text-center px-4 py-3 whitespace-nowrap">{item.date}, {item.time}</td>
                      <td className="text-center px-4 py-3 flex items-center justify-center gap-2">
                        <img src={item.doctor.photo} className="w-8 h-8 rounded-full object-cover" />
                        {item.doctor.name}
                      </td>
                      <td className="text-center px-4 py-3">₹{item.doctor.fee}</td>
                      <td className="text-center px-4 py-3">
                        <span className={getStatusBadge(item.status)}>{item.status}</span>
                      </td>
                      <td className="text-center px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            title="Cancel Appointment"
                            className={`p-1.5 rounded-full ${
                              disabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                            }`}
                            onClick={() =>
                              !disabled &&
                              setModalData({
                                id: item._id,
                                status: "cancelled",
                                patientName: item.user.name,
                                date: item.date,
                                time: item.time,
                              })
                            }
                            disabled={disabled}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            title="Confirm Appointment"
                            className={`p-1.5 rounded-full ${
                              disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                            }`}
                            onClick={() =>
                              !disabled &&
                              setModalData({
                                id: item._id,
                                status: "confirmed",
                                patientName: item.user.name,
                                date: item.date,
                                time: item.time,
                              })
                            }
                            disabled={disabled}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      {/* ✅ Reusable Confirmation Modal */}
      {modalData && (
        <ConfirmModal
          isOpen={!!modalData}
          onClose={() => setModalData(null)}
          onConfirm={confirmStatusChange}
          title={`Confirm ${modalData.status}`}
          description={`Are you sure you want to ${modalData.status} the appointment with ${modalData.patientName} on ${modalData.date} at ${modalData.time}?`}
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </div>
  );
};

export default AllAppointments;
