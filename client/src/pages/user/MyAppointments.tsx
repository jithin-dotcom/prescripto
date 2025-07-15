

// // // import React from 'react';
// // // import Navbar from '../../components/Navbar'; // Adjust path if needed
// // // import { assets } from '../../assets/assets1';

// // // const MyAppointments: React.FC = () => {
// // //   // Dummy appointment data
// // //   const appointments = [
// // //     {
// // //       _id: '1',
// // //       cancelled: false,
// // //       isCompleted: false,
// // //       payment: false,
// // //       slotDate: '22_07_2025',
// // //       slotTime: '10:00 am',
// // //       docData: {
// // //         name: 'Dr. John Doe',
// // //         speciality: 'Cardiology',
// // //         image: 'https://via.placeholder.com/150x150',
// // //         address: {
// // //           line1: '123 Heart Street',
// // //           line2: 'Healthy City, Careland',
// // //         },
// // //       },
// // //     },
// // //     {
// // //       _id: '2',
// // //       cancelled: true,
// // //       isCompleted: false,
// // //       payment: false,
// // //       slotDate: '23_07_2025',
// // //       slotTime: '11:00 am',
// // //       docData: {
// // //         name: 'Dr. Jane Smith',
// // //         speciality: 'Neurology',
// // //         image: 'https://via.placeholder.com/150x150',
// // //         address: {
// // //           line1: '456 Brain Ave',
// // //           line2: 'Neurotown, Mediland',
// // //         },
// // //       },
// // //     },
// // //   ];

// // //   const months = [
// // //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
// // //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
// // //   ];

// // //   const formatDate = (slotDate: string) => {
// // //     const [day, month, year] = slotDate.split('_');
// // //     return `${day} ${months[+month - 1]} ${year}`;
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex flex-col">
// // //       {/* Top Navbar */}
// // //       <Navbar />

// // //       {/* Main content */}
// // //       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
// // //         <p className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b">
// // //           My appointments
// // //         </p>

// // //         <div className="mt-4">
// // //           {appointments.map((item, index) => (
// // //             <div
// // //               key={index}
// // //               className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
// // //             >
// // //               {/* Doctor Image */}
// // //               <div>
// // //                 <img
// // //                   className="w-36 bg-[#EAEFFF] rounded-md"
// // //                   src={item.docData.image}
// // //                   alt={item.docData.name}
// // //                 />
// // //               </div>

// // //               {/* Doctor Info */}
// // //               <div className="flex-1 text-sm text-[#5E5E5E]">
// // //                 <p className="text-[#262626] text-base font-semibold">
// // //                   {item.docData.name}
// // //                 </p>
// // //                 <p>{item.docData.speciality}</p>
// // //                 <p className="text-[#464646] font-medium mt-1">Address:</p>
// // //                 <p>{item.docData.address.line1}</p>
// // //                 <p>{item.docData.address.line2}</p>
// // //                 <p className="mt-1">
// // //                   <span className="text-sm text-[#3C3C3C] font-medium">
// // //                     Date & Time:
// // //                   </span>{' '}
// // //                   {formatDate(item.slotDate)} | {item.slotTime}
// // //                 </p>
// // //               </div>

// // //               {/* Appointment Actions */}
// // //               <div className="flex flex-col gap-2 justify-end text-sm text-center">
// // //                 {!item.cancelled && !item.payment && !item.isCompleted && (
// // //                   <>
// // //                     <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
// // //                       Pay Online
// // //                     </button>
// // //                     <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
// // //                       <img
// // //                         className="max-w-20 max-h-5"
// // //                         src={assets.stripe_logo}
// // //                         alt="Stripe"
// // //                       />
// // //                     </button>
// // //                     <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
// // //                       <img
// // //                         className="max-w-20 max-h-5"
// // //                         src={assets.razorpay_logo}
// // //                         alt="Razorpay"
// // //                       />
// // //                     </button>
// // //                     <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
// // //                       Cancel appointment
// // //                     </button>
// // //                   </>
// // //                 )}

// // //                 {item.payment && !item.isCompleted && (
// // //                   <button className="sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]">
// // //                     Paid
// // //                   </button>
// // //                 )}

// // //                 {item.isCompleted && (
// // //                   <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
// // //                     Completed
// // //                   </button>
// // //                 )}

// // //                 {item.cancelled && !item.isCompleted && (
// // //                   <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
// // //                     Appointment cancelled
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default MyAppointments;








// // import React, { useEffect, useState } from "react";
// // import Navbar from "../../components/Navbar";
// // // import { assets } from "../../assets/assets1";
// // import axiosInstance from "../../utils/axios";
// // import { useAuthStore } from "../../store/authStore";

// // interface Doctor {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   photo: string;
// // }

// // interface Appointment {
// //   _id: string;
// //   doctor: Doctor;
// //   userId: string;
// //   date: string;
// //   time: string;
// //   status: string;
// //   transactionId?: string;
// // }

// // const MyAppointments: React.FC = () => {
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const userId = useAuthStore((state) => state.user?._id); // Adjust based on your store setup

// //   useEffect(() => {
// //     if (!userId) return;

// //     const fetchAppointments = async () => {
// //       try {
// //         const res = await axiosInstance.get(`/user-appointments/${userId}`);
// //         setAppointments(res.data);
// //       } catch (error) {
// //         console.error("Failed to fetch appointments", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAppointments();
// //   }, [userId]);

// //   const formatDate = (dateStr: string) => {
// //     const [day, month, year] = dateStr.split('/');
// //     const months = [
// //       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
// //       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
// //     ];
// //     return `${day} ${months[+month - 1]} ${year}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col">
// //       <Navbar />

// //       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
// //         <p className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b">
// //           My appointments
// //         </p>

// //         {loading ? (
// //           <p className="text-gray-600 mt-4">Loading appointments...</p>
// //         ) : appointments.length === 0 ? (
// //           <p className="text-gray-500 mt-4">No appointments found.</p>
// //         ) : (
// //           <div className="mt-4">
// //             {appointments.map((item) => (
// //               <div
// //                 key={item._id}
// //                 className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
// //               >
// //                 {/* Doctor Image */}
// //                 <div>
// //                   <img
// //                     className="w-36 bg-[#EAEFFF] rounded-md"
// //                     src={item.doctor.photo}
// //                     alt={item.doctor.name}
// //                   />
// //                 </div>

// //                 {/* Doctor Info */}
// //                 <div className="flex-1 text-sm text-[#5E5E5E]">
// //                   <p className="text-[#262626] text-base font-semibold">
// //                     {item.doctor.name}
// //                   </p>
// //                   <p className="text-[#464646] font-medium mt-1">Email:</p>
// //                   <p>{item.doctor.email}</p>
// //                   <p className="mt-1">
// //                     <span className="text-sm text-[#3C3C3C] font-medium">
// //                       Date & Time:
// //                     </span>{" "}
// //                     {formatDate(item.date)} | {item.time}
// //                   </p>
// //                 </div>

// //                 {/* Appointment Status */}
// //                 <div className="flex flex-col gap-2 justify-end text-sm text-center">
// //                   {item.status === "pending" && (
// //                     <>
// //                       <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
// //                         Cancel appointment
// //                       </button>
// //                     </>
// //                   )}
// //                   {item.status === "completed" && (
// //                     <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
// //                       Completed
// //                     </button>
// //                   )}
// //                   {item.status === "cancelled" && (
// //                     <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
// //                       Appointment cancelled
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default MyAppointments;












// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "completed" | "cancelled";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const userId = useAuthStore((state) => state.user?._id);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/user-appointments/${userId}`);
//         setAppointments(res.data);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <p className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b">
//           My appointments
//         </p>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : appointments.length === 0 ? (
//           <p className="text-gray-500 mt-4">No appointments found.</p>
//         ) : (
//           <div className="mt-4 space-y-6">
//             {appointments.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-sm border"
//               >
//                 {/* Doctor Image */}
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}
//                   </p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">
//                       Date & Time:
//                     </span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>
//                 </div>

//                 {/* Appointment Status / Actions */}
//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "pending" && (
//                     <>
//                       <button className="text-[#696969] w-full sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
//                         Pay Online
//                       </button>

//                       <button className="text-[#696969] w-full sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
//                         <img
//                           className="max-w-20 max-h-5"
//                           src={assets.stripe_logo}
//                           alt="Stripe"
//                         />
//                       </button>

//                       <button className="text-[#696969] w-full sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
//                         <img
//                           className="max-w-20 max-h-5"
//                           src={assets.razorpay_logo}
//                           alt="Razorpay"
//                         />
//                       </button>

//                       <button className="text-[#696969] w-full sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
//                         Cancel appointment
//                       </button>
//                     </>
//                   )}

//                   {item.status === "completed" && (
//                     <button className="w-full sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                       Completed
//                     </button>
//                   )}

//                   {item.status === "cancelled" && (
//                     <button className="w-full sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//                       Appointment cancelled
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;









// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const userId = useAuthStore((state) => state.user?._id);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/user-appointments/${userId}`);
//         console.log("response : ",res.data);
//         setAppointments(res.data);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <motion.p
//           className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: .6 }}
//         >
//           My appointments
//         </motion.p>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : appointments.length === 0 ? (
//           <motion.p
//             className="text-gray-500 mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
            
//           >
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: {
//                   staggerChildren: 0.1,
                  
//                 },
//               },
//             }}
//           >
//             {appointments.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-sm border"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
                 
//                 }}
//                  transition={{ duration: 1 }}
//               >
//                 {/* Doctor Image */}
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name},  {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">
//                       Date & Time:
//                     </span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>
//                   {/* <p>{item.status}</p> */}
//                   <div className="mt-2">
//   <button
//     className={`px-3 py-1 text-xs font-medium rounded-full
//       ${
//         item.status === "pending"
//           ? "bg-yellow-100 text-yellow-700"
//           : item.status === "completed"
//           ? "bg-green-100 text-green-700"
//           : "bg-red-100 text-red-700"
//       }`}
//     disabled
//   >
//     {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//   </button>
// </div>
//                 </div>

//                 {/* Appointment Actions */}
//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "pending" && (
//                     <>
//                       {/* <MotionButton>Pay Online</MotionButton> */}

//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 mx-auto"
//                           src={assets.stripe_logo}
//                           alt="Stripe"
//                         />
//                       </MotionButton>

//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 m-auto "
//                           src={assets.razorpay_logo}
//                           alt="Razorpay"
//                         />
//                       </MotionButton>

//                       <MotionButton className="hover:bg-red-600 hover:text-white">
//                         Cancel appointment
//                       </MotionButton>
//                     </>
//                   )}

//                   {item.status === "completed" && (
//                     <button className="w-full sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                       Completed
//                     </button>
//                   )}

//                   {item.status === "cancelled" && (
//                     <button className="w-full sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//                       Appointment cancelled
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;

// // Reusable motion button with hover scale
// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };












// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const userId = useAuthStore((state) => state.user?._id);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/user-appointments/${userId}`);
//         setAppointments(res.data);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   const getStatusStyles = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       case "confirmed":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "cancelled":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "completed":
//         return "bg-gray-100 text-gray-600 border-gray-300";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <motion.p
//           className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           My appointments
//         </motion.p>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : appointments.length === 0 ? (
//           <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: { staggerChildren: 0.1 },
//               },
//             }}
//           >
//             {appointments.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl  hover:scale-105 transition duration-300"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 1 }}
//               >
//                 {/* Doctor Image */}
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}, {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">
//                       Date & Time:
//                     </span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>

//                   {/* Status Button */}
//                   <div className="mt-2">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(
//                         item.status
//                       )}`}
//                     >
//                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "confirmed" && (
//                     <>
//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 mx-auto"
//                           src={assets.stripe_logo}
//                           alt="Stripe"
//                         />
//                       </MotionButton>

//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 mx-auto"
//                           src={assets.razorpay_logo}
//                           alt="Razorpay"
//                         />
//                       </MotionButton>

//                       <MotionButton className="hover:bg-red-600 hover:text-white">
//                         Cancel appointment
//                       </MotionButton>
//                     </>
//                   )}

//                   {item.status === "pending" && (
//                     <MotionButton className="hover:bg-red-600 hover:text-white">
//                       Cancel appointment
//                     </MotionButton>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;

// // Reusable motion button with hover scale
// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };









// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("all"); // 🔄 Add filter state
//   const userId = useAuthStore((state) => state.user?._id);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(`/user-appointments/${userId}`);
//         setAppointments(res.data);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   const getStatusStyles = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       case "confirmed":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "cancelled":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "completed":
//         return "bg-gray-100 text-gray-600 border-gray-300";
//       default:
//         return "";
//     }
//   };

  
//   const filteredAppointments =
//     selectedStatus === "all"
//       ? appointments
//       : appointments.filter((a) => a.status === selectedStatus);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center">
//           <motion.p
//             className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             My appointments
//           </motion.p>

          
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="mt-6 p-2  rounded-md bg-white text-sm text-gray-700 hover:scale-105 transition duration-300"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : filteredAppointments.length === 0 ? ( // 🔄 changed from `appointments` to `filteredAppointments`
//           <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: { staggerChildren: 0.1 },
//               },
//             }}
//           >
//             {filteredAppointments.map((item) => ( // 🔄 use filtered list
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl hover:scale-105 transition duration-300"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 1 }}
//               >
//                 {/* Doctor Image */}
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 {/* Doctor Info */}
//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}, {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">
//                       Date & Time:
//                     </span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>

//                   {/* Status Button */}
//                   <div className="mt-2">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(
//                         item.status
//                       )}`}
//                     >
//                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "confirmed" && (
//                     <>
//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 mx-auto"
//                           src={assets.stripe_logo}
//                           alt="Stripe"
//                         />
//                       </MotionButton>

//                       <MotionButton>
//                         <img
//                           className="max-w-20 max-h-5 mx-auto"
//                           src={assets.razorpay_logo}
//                           alt="Razorpay"
//                         />
//                       </MotionButton>

//                       <MotionButton className="hover:bg-red-600 hover:text-white">
//                         Cancel appointment
//                       </MotionButton>
//                     </>
//                   )}

//                   {item.status === "pending" && (
//                     <MotionButton className="hover:bg-red-600 hover:text-white">
//                       Cancel appointment
//                     </MotionButton>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;

// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };








// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";
// import Pagination from "../../components/Pagination";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const userId = useAuthStore((state) => state.user?._id);
//   const limit = 4;

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         const query = `/user-appointments/${userId}?page=${currentPage}&limit=${limit}${
//           selectedStatus !== "all" ? `&status=${selectedStatus}` : ""
//         }`;

//         const res = await axiosInstance.get(query);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId, selectedStatus, currentPage]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   const getStatusStyles = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       case "confirmed":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "cancelled":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "completed":
//         return "bg-gray-100 text-gray-600 border-gray-300";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
//       <Navbar />
//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center">
//           <motion.p
//             className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             My appointments
//           </motion.p>

//           <select
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="mt-6 p-2 rounded-md bg-white text-sm text-gray-700 hover:scale-105 transition duration-300"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) :  appointments?.length === 0   ? (
//           <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: { staggerChildren: 0.1 },
//               },
//             }}
//           >
//             {appointments.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl hover:scale-105 transition duration-300"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 1 }}
//               >
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}, {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>

//                   <div className="mt-2">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(
//                         item.status
//                       )}`}
//                     >
//                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "confirmed" && (
//                     <>
//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.stripe_logo} alt="Stripe" />
//                       </MotionButton>

//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
//                       </MotionButton>

//                       <MotionButton className="hover:bg-red-600 hover:text-white">
//                         Cancel appointment
//                       </MotionButton>
//                     </>
//                   )}

//                   {item.status === "pending" && (
//                     <MotionButton className="hover:bg-red-600 hover:text-white">
//                       Cancel appointment
//                     </MotionButton>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Pagination */}
//         {appointments.length > 0 && (
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;

// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };









// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";
// import Pagination from "../../components/Pagination";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const userId = useAuthStore((state) => state.user?._id);
//   const limit = 4;

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         const query = `/user-appointments/${userId}?page=${currentPage}&limit=${limit}${
//           selectedStatus !== "all" ? `&status=${selectedStatus}` : ""
//         }`;

//         const res = await axiosInstance.get(query);
//         setAppointments(res.data?.data || []);
//         setTotalPages(res.data?.totalPages || 1);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//         setAppointments([]); // fallback on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId, selectedStatus, currentPage]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   const getStatusStyles = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       case "confirmed":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "cancelled":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "completed":
//         return "bg-gray-100 text-gray-600 border-gray-300";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
//       <Navbar />
//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center">
//           <motion.p
//             className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             My appointments
//           </motion.p>

//           <select
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="mt-6 p-2 rounded-md bg-white text-sm text-gray-700 hover:scale-105 transition duration-300"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : appointments.length === 0 ? (
//           <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: { staggerChildren: 0.1 },
//               },
//             }}
//           >
//             {appointments.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl hover:scale-105 transition duration-300"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 1 }}
//               >
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}, {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>

//                   <div className="mt-2">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(
//                         item.status
//                       )}`}
//                     >
//                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {item.status === "confirmed" && (
//                     <>
//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.stripe_logo} alt="Stripe" />
//                       </MotionButton>

//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
//                       </MotionButton>

//                       <MotionButton className="hover:bg-red-600 hover:text-white">
//                         Cancel appointment
//                       </MotionButton>
//                     </>
//                   )}

//                   {item.status === "pending" && (
//                     <MotionButton className="hover:bg-red-600 hover:text-white">
//                       Cancel appointment
//                     </MotionButton>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {appointments.length > 0 && (
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyAppointments;

// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };










// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { motion } from "framer-motion";
// import type { HTMLMotionProps } from "framer-motion";
// import Pagination from "../../components/Pagination";
// import { toast } from "react-toastify";
// import axios from "axios";

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   photo: string;
//   specialization: string;
//   educationDetails: string;
// }

// interface Appointment {
//   _id: string;
//   doctor: Doctor;
//   userId: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   transactionId?: string;
// }

// const MyAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

//   const userId = useAuthStore((state) => state.user?._id);
//   const limit = 4;

//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         const query = `/user-appointments/${userId}?page=${currentPage}&limit=${limit}${
//           selectedStatus !== "all" ? `&status=${selectedStatus}` : ""
//         }`;

//         const res = await axiosInstance.get(query);
//         setAppointments(res.data?.data || []);
//         setTotalPages(res.data?.totalPages || 1);
//       } catch (error) {
//         console.error("Error fetching appointments", error);
//         setAppointments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId, selectedStatus, currentPage]);

//   const formatDate = (dateStr: string) => {
//     const [day, month, year] = dateStr.split("/");
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${day} ${months[+month - 1]} ${year}`;
//   };

//   const getStatusStyles = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       case "confirmed":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "cancelled":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "completed":
//         return "bg-gray-100 text-gray-600 border-gray-300";
//       default:
//         return "";
//     }
//   };

//   const handleCancelAppointment = async () => {
//     if (!appointmentToCancel) return;
//     try {
//       await axiosInstance.patch(`/appointments/${appointmentToCancel._id}`, { status: "cancelled" });
//       const updated = appointments.map((item) =>
//         item._id === appointmentToCancel._id ? { ...item, status: "cancelled" as Appointment["status"] } : item
//       );
//       setAppointments(updated);
//       toast.success("Appointment cancelled successfully");
//     }catch (error) {
//       if(axios.isAxiosError(error)){
//          toast.error(error.response?.data?.message || "Failed to cancel Appointment")
//       }else{
//          toast.error("Something went wrong");
//       }
      
//     } finally {
//       setShowModal(false);
//       setAppointmentToCancel(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100 relative">
//       <Navbar />
//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center">
//           <motion.p
//             className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             My appointments
//           </motion.p>

//           <select
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="mt-6 p-2 rounded-md bg-white text-sm text-gray-700 hover:scale-105 transition duration-300"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading appointments...</p>
//         ) : appointments.length === 0 ? (
//           <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             No appointments found.
//           </motion.p>
//         ) : (
//           <motion.div
//             className="mt-4 space-y-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: { transition: { staggerChildren: 0.1 } },
//             }}
//           >
//             {appointments.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl hover:scale-105 transition duration-300"
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 1 }}
//               >
//                 <div className="sm:w-36 flex-shrink-0">
//                   <img
//                     className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
//                     src={item.doctor.photo}
//                     alt={item.doctor.name}
//                   />
//                 </div>

//                 <div className="flex-1 text-sm text-[#5E5E5E]">
//                   <p className="text-[#262626] text-base font-semibold">
//                     {item.doctor.name}, {item.doctor.educationDetails}
//                   </p>
//                   <p>{item.doctor.specialization}</p>
//                   <p className="text-[#464646] font-medium mt-1">Email:</p>
//                   <p>{item.doctor.email}</p>
//                   <p className="mt-1">
//                     <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
//                     {formatDate(item.date)} | {item.time}
//                   </p>

//                   <div className="mt-2">
//                     <span
//                       className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(
//                         item.status
//                       )}`}
//                     >
//                       {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
//                   {["confirmed", "pending"].includes(item.status) && (
//                     <MotionButton
//                       onClick={() => {
//                         setAppointmentToCancel(item);
//                         setShowModal(true);
//                       }}
//                       className="hover:bg-red-600 hover:text-white"
//                     >
//                       Cancel appointment
//                     </MotionButton>
//                   )}

//                   {item.status === "confirmed" && (
//                     <>
//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.stripe_logo} alt="Stripe" />
//                       </MotionButton>
//                       <MotionButton>
//                         <img className="max-w-20 max-h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
//                       </MotionButton>
//                     </>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {appointments.length > 0 && (
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         )}
//       </main>

//       {/* Confirmation Modal */}
//       {showModal && appointmentToCancel && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-80">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Cancel Appointment</h2>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to cancel the appointment with{" "}
//               <strong>{appointmentToCancel.doctor.name}</strong> on <strong>{appointmentToCancel.date}</strong> at{" "}
//               <strong>{appointmentToCancel.time}</strong>?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded"
//                 onClick={() => {
//                   setShowModal(false);
//                   setAppointmentToCancel(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
//                 onClick={handleCancelAppointment}
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

// export default MyAppointments;

// const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
//   children,
//   className = "",
//   ...props
// }) => {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };









import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { assets } from "../../assets/assets1";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmModal";
import axios from "axios";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo: string;
  specialization: string;
  educationDetails: string;
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  transactionId?: string;
}

const MyAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useAuthStore((state) => state.user?._id);
  const limit = 4;

  useEffect(() => {
    if (!userId) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const query = `/user-appointments/${userId}?page=${currentPage}&limit=${limit}${
          selectedStatus !== "all" ? `&status=${selectedStatus}` : ""
        }`;

        const res = await axiosInstance.get(query);
        setAppointments(res.data?.data || []);
        setTotalPages(res.data?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching appointments", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId, selectedStatus, currentPage]);

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;
    try {
      await axiosInstance.patch(`/appointments/${appointmentToCancel._id}`, { status: "cancelled" });
      const updated = appointments.map((item) =>
        item._id === appointmentToCancel._id ? { ...item, status: "cancelled" as Appointment["status"] } : item
      );
      setAppointments(updated);
      toast.success("Appointment cancelled successfully");
    }catch (error) {
      if(axios.isAxiosError(error)){
         toast.error(error.response?.data?.message || "Failed to update status");
      }else{
         toast.error("Something went wrong");
      }
    } finally {
      setIsModalOpen(false);
      setAppointmentToCancel(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[+month - 1]} ${year}`;
  };

  const getStatusStyles = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      case "completed":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100 relative">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <motion.p
            className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My appointments
          </motion.p>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="mt-6 p-2 rounded-md bg-white text-sm text-gray-700 hover:scale-105 transition duration-300"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600 mt-4">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <motion.p className="text-gray-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No appointments found.
          </motion.p>
        ) : (
          <motion.div
            className="mt-4 space-y-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {appointments.map((item) => (
              <motion.div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-2xl hover:scale-105 transition duration-300"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1 }}
              >
                <div className="sm:w-36 flex-shrink-0">
                  <img
                    className="w-full h-auto object-cover rounded-md bg-[#EAEFFF]"
                    src={item.doctor.photo}
                    alt={item.doctor.name}
                  />
                </div>

                <div className="flex-1 text-sm text-[#5E5E5E]">
                  <p className="text-[#262626] text-base font-semibold">
                    {item.doctor.name}, {item.doctor.educationDetails}
                  </p>
                  <p>{item.doctor.specialization}</p>
                  <p className="text-[#464646] font-medium mt-1">Email:</p>
                  <p>{item.doctor.email}</p>
                  <p className="mt-1">
                    <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
                    {formatDate(item.date)} | {item.time}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 text-xs font-medium border rounded-full ${getStatusStyles(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-start sm:justify-end text-sm text-center sm:text-right">
                  {["confirmed", "pending"].includes(item.status) && (
                    <MotionButton
                      onClick={() => {
                        setAppointmentToCancel(item);
                        setIsModalOpen(true);
                      }}
                      className="hover:bg-red-600 hover:text-white"
                    >
                      Cancel appointment
                    </MotionButton>
                  )}

                  {item.status === "confirmed" && (
                    <>
                      <MotionButton>
                        <img className="max-w-20 max-h-5 mx-auto" src={assets.stripe_logo} alt="Stripe" />
                      </MotionButton>
                      <MotionButton>
                        <img className="max-w-20 max-h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
                      </MotionButton>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {appointments.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </main>

      {/* ✅ Reusable Headless UI Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Cancel Appointment"
        description={`Are you sure you want to cancel the appointment with ${appointmentToCancel?.doctor.name} on ${appointmentToCancel?.date} at ${appointmentToCancel?.time}?`}
        onConfirm={handleCancelAppointment}
        onClose={() => {
          setIsModalOpen(false);
          setAppointmentToCancel(null);
        }}
      />
    </div>
  );
};

export default MyAppointments;

const MotionButton: React.FC<HTMLMotionProps<"button">> = ({
  children,
  className = "",
  ...props
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`text-[#696969] w-full sm:min-w-48 py-2 border rounded transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);
