

// import { useEffect, useState } from "react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { useDoctorStore } from "../../store/doctorStore";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Ban, Check } from "lucide-react";
// import ConfirmModal from "../../components/ConfirmModal"; 
// import type { Appointment } from "../../interfaces/IDoctorAppointment";
// import { useNavigate } from "react-router-dom";
// import { APIRoutes, APIDoctorRoutes } from "../../constants/routes.constants";


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


// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedAction, setSelectedAction] = useState<{
//     appointmentId: string;
//     newStatus: "confirmed" | "cancelled" | null;
//   }>({ appointmentId: "", newStatus: null });
//   const navigate = useNavigate();
//   const [pageSize, setPageSize] = useState<number>(5);

//   useDoctorStore((state) => state.doctorData);

  

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `${APIDoctorRoutes.DOCTOR_APPOINTMENTS}?page=${currentPage}&limit=${pageSize}&status=${statusFilter}`
//         );
//         console.log("res.data.data", res.data.data);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, [currentPage, statusFilter, pageSize]);

//   const handleUpdateStatus = async () => {
//     const { appointmentId, newStatus } = selectedAction;
//     if (!appointmentId || !newStatus) return;

//     try {
//       await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${appointmentId}`, { status: newStatus });

//       const updated = appointments.map((app) => {
//          if(app._id !== appointmentId) return app;
//          const shouldRefund = newStatus === "cancelled" && app.payment === "paid";
//          return{
//            ...app,
//            status: newStatus,
//            payment: shouldRefund ? "refund" : app.payment
//          }
//       })
//       setAppointments(updated);
//       toast.success(`Appointment ${newStatus}`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "Failed to update");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setModalOpen(false);
//       setSelectedAction({ appointmentId: "", newStatus: null });
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-semibold px-3 py-1 rounded-full w-fit";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-100 text-yellow-800`;
//       case "cancelled":
//         return `${base} bg-red-100 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-100 text-green-700`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-800`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };
//   console.log("appointments : ",appointments);
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-4 md:p-6 lg:p-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//             <h1 className="text-xl font-semibold text-gray-700">All Appointments</h1>
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

//           <div className="overflow-x-auto rounded-lg bg-white shadow-2xl hover:scale-102 transition duration-300">
//             <table className="min-w-full divide-y divide-gray-200 text-sm">
//               <thead className="bg-[#EAEFFF] text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">#</th>
//                   <th className="px-4 py-3 text-left">AppNo</th>
//                   <th className="px-4 py-3">Patient</th>
//                   <th className="px-4 py-3">Age</th>
//                   <th className="px-4 py-3">Date & Time</th>
//                   <th className="px-4 py-3">Fee</th>
//                   <th className="px-4 py-3">Status</th>
//                    <th className="px-4 py-3">Payment</th>
//                   <th className="px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
                
//                 {appointments.map((app, index) => {
//                   const disabled = ["cancelled", "completed"].includes(app.status);
//                   return (
//                     <tr key={app._id} className="hover:bg-[#5F6FFF] hover:text-white transition" onClick={()=>navigate("/appointment-details",{state:{appointment:app}})}>
//                       <td className="px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
//                       <td className="px-4 py-3">{app.appointmentNo}</td>
//                       <td className="px-4 py-3 flex items-center gap-2 justify-center">
//                         <img
//                           src={app.user.photo || "/default-avatar.png"}
//                           className="w-8 h-8 rounded-full object-cover"
//                           alt="patient"
//                         />
//                         <span>{app.user.name}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         {app.date}, {app.time}
//                       </td>
//                       <td className="px-4 py-3">₹{app.fee}</td>
//                       <td className="px-4 py-3">
//                         <span className={getStatusBadge(app.status)}>{app.status}</span>
//                       </td>
//                        {/* <td className="px-4 py-3">
//                         <span>{app.payment}</span>
//                       </td> */}
//                       <td className="px-4 py-3">
//   <span
//     className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
//       app.payment === "paid"
//         ? "bg-green-100 text-green-800 border border-green-300"
//         : app.payment === "refund"
//         ? "bg-gray-100 text-gray-800 border border-gray-300"
//         : "bg-red-100 text-red-800 border border-red-300"
//     }`}
//   >
//     {app.payment === "paid"
//       ? "Paid"
//       : app.payment === "refund"
//       ? "Refunded"
//       : "Not Paid"}
//   </span>
// </td>

//                       <td className="px-4 py-3 text-center">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             className={`text-xs px-3 py-1 rounded flex items-center gap-1 transition ${
//                               disabled
//                                 ? "bg-gray-400 text-white cursor-not-allowed"
//                                 : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
//                             }`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               if (!disabled)
//                                 setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
//                               setModalOpen(true);
//                             }}
//                             disabled={disabled}
//                           >
//                             <Ban size={14} /> Cancel
//                           </button>
                          


//                           {app.status === "confirmed" && app.payment === "paid" ? (
//       <>
       

//         <button
//           className="text-xs px-3 py-1 rounded flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate("/my-video",{ state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId } })
//             //  navigate("/my-video",{ state: { appointmentId: app._id, userId: app.doctorId, doctorId: app.user._id } })
//           }}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10z" />
//             <path d="M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
//           </svg>
//           Video
//         </button>
//       </>
//     ) : (
//       <button
//         className={`text-xs px-3 py-1 rounded flex items-center gap-1 transition ${
//           disabled
//             ? "bg-gray-400 text-white cursor-not-allowed"
//             : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
//         }`}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (!disabled)
//             setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
//           setModalOpen(true);
//         }}
//         disabled={disabled}
//       >
//         <Check size={14} /> Confirm
//       </button>
//     )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {totalPages > 0 && (
//             <div className="mt-6">
//               {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
//                                               <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   onPageChange={setCurrentPage}
//   pageSize={pageSize}
//   onPageSizeChange={(size) => {
//     setPageSize(size);
//     setCurrentPage(1); 
//   }}
// />
//             </div>
//           )}

//           {/*  Confirmation Modal */}
//           <ConfirmModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onConfirm={handleUpdateStatus}
//             title="Change Appointment Status"
//             description={`Are you sure you want to ${selectedAction.newStatus} this appointment?`}
//             confirmText="Yes"
//             cancelText="No"
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;






























// import { useEffect, useState } from "react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { useDoctorStore } from "../../store/doctorStore";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Ban, Check } from "lucide-react";
// import ConfirmModal from "../../components/ConfirmModal";
// import type { Appointment } from "../../interfaces/IDoctorAppointment";
// import { useNavigate } from "react-router-dom";
// import { APIRoutes, APIDoctorRoutes } from "../../constants/routes.constants";

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

// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedAction, setSelectedAction] = useState<{
//     appointmentId: string;
//     newStatus: "confirmed" | "cancelled" | null;
//   }>({ appointmentId: "", newStatus: null });
//   const navigate = useNavigate();
//   const [pageSize, setPageSize] = useState<number>(5);

//   useDoctorStore((state) => state.doctorData);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `${APIDoctorRoutes.DOCTOR_APPOINTMENTS}?page=${currentPage}&limit=${pageSize}&status=${statusFilter}`
//         );
//         setAppointments(res.data.data || []);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//         toast.error("Failed to fetch appointments");
//       }
//     };

//     fetchAppointments();
//   }, [currentPage, statusFilter, pageSize]);

//   const handleUpdateStatus = async () => {
//     const { appointmentId, newStatus } = selectedAction;
//     if (!appointmentId || !newStatus) return;

//     try {
//       await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${appointmentId}`, { status: newStatus });

//       const updated = appointments.map((app) => {
//         if (app._id !== appointmentId) return app;
//         const shouldRefund = newStatus === "cancelled" && app.payment === "paid";
//         return {
//           ...app,
//           status: newStatus,
//           payment: shouldRefund ? "refund" : app.payment,
//         };
//       });
//       setAppointments(updated);
//       toast.success(`Appointment ${newStatus}`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "Failed to update");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setModalOpen(false);
//       setSelectedAction({ appointmentId: "", newStatus: null });
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-semibold px-3 py-1 rounded-full w-fit";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-100 text-yellow-800`;
//       case "cancelled":
//         return `${base} bg-red-100 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-100 text-green-700`;
//       case "completed":
//         return `${base} bg-gray-300 text-gray-800`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 sm:mt-20 md:ml-60">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
//             <h1 className="text-lg sm:text-xl font-semibold text-gray-700">All Appointments</h1>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Desktop: Table */}
//           <div className="hidden sm:block overflow-x-auto rounded-lg bg-white shadow-lg">
//             <table className="min-w-full divide-y divide-gray-200 text-sm">
//               <thead className="bg-[#EAEFFF] text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-medium">#</th>
//                   <th className="px-4 py-3 text-left font-medium">AppNo</th>
//                   <th className="px-4 py-3 text-left font-medium">Patient</th>
//                   <th className="px-4 py-3 text-left font-medium">Age</th>
//                   <th className="px-4 py-3 text-left font-medium">Date & Time</th>
//                   <th className="px-4 py-3 text-left font-medium">Fee</th>
//                   <th className="px-4 py-3 text-left font-medium">Status</th>
//                   <th className="px-4 py-3 text-left font-medium">Payment</th>
//                   <th className="px-4 py-3 text-center font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {appointments.map((app, index) => {
//                   const disabled = ["cancelled", "completed"].includes(app.status);
//                   return (
//                     <tr
//                       key={app._id}
//                       className="hover:bg-[#5F6FFF] hover:text-white transition-colors cursor-pointer"
//                       onClick={() => navigate("/appointment-details", { state: { appointment: app } })}
//                     >
//                       <td className="px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
//                       <td className="px-4 py-3">{app.appointmentNo}</td>
//                       <td className="px-4 py-3 flex items-center gap-2">
//                         <img
//                           src={app.user.photo || "/default-avatar.png"}
//                           className="w-8 h-8 rounded-full object-cover"
//                           alt="patient"
//                         />
//                         <span className="truncate">{app.user.name}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">{`${app.date}, ${app.time}`}</td>
//                       <td className="px-4 py-3">₹{app.fee}</td>
//                       <td className="px-4 py-3">
//                         <span className={getStatusBadge(app.status)}>{app.status}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
//                             app.payment === "paid"
//                               ? "bg-green-100 text-green-800 border border-green-300"
//                               : app.payment === "refund"
//                               ? "bg-gray-100 text-gray-800 border border-gray-300"
//                               : "bg-red-100 text-red-800 border border-red-300"
//                           }`}
//                         >
//                           {app.payment === "paid" ? "Paid" : app.payment === "refund" ? "Refunded" : "Not Paid"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition ${
//                               disabled
//                                 ? "bg-gray-400 text-white cursor-not-allowed"
//                                 : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
//                             }`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               if (!disabled) {
//                                 setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
//                                 setModalOpen(true);
//                               }
//                             }}
//                             disabled={disabled}
//                           >
//                             <Ban size={14} /> Cancel
//                           </button>
//                           {app.status === "confirmed" && app.payment === "paid" ? (
//                             <button
//                               className="text-xs px-3 py-1.5 rounded flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigate("/my-video", {
//                                   state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId },
//                                 });
//                               }}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10z" />
//                                 <path d="M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
//                               </svg>
//                               Video
//                             </button>
//                           ) : (
//                             <button
//                               className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition ${
//                                 disabled
//                                   ? "bg-gray-400 text-white cursor-not-allowed"
//                                   : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
//                               }`}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 if (!disabled) {
//                                   setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
//                                   setModalOpen(true);
//                                 }
//                               }}
//                               disabled={disabled}
//                             >
//                               <Check size={14} /> Confirm
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile: Card Layout */}
//           <div className="sm:hidden flex flex-col gap-4">
//             {appointments.map((app) => {
//               const disabled = ["cancelled", "completed"].includes(app.status);
//               return (
//                 <div
//                   key={app._id}
//                   className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                   onClick={() => navigate("/appointment-details", { state: { appointment: app } })}
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <img
//                       src={app.user.photo || "/default-avatar.png"}
//                       className="w-10 h-10 rounded-full object-cover"
//                       alt="patient"
//                     />
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">{app.user.name}</p>
//                       <p className="text-xs text-gray-500">
//                         {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"} yrs
//                       </p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
//                     <p><span className="font-medium">AppNo:</span> {app.appointmentNo}</p>
//                     <p><span className="font-medium">Date:</span> {app.date}</p>
//                     <p><span className="font-medium">Time:</span> {app.time}</p>
//                     <p><span className="font-medium">Fee:</span> ₹{app.fee}</p>
//                     <p>
//                       <span className="font-medium">Status:</span>{" "}
//                       <span className={getStatusBadge(app.status)}>{app.status}</span>
//                     </p>
//                     <p>
//                       <span className="font-medium">Payment:</span>{" "}
//                       <span
//                         className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                           app.payment === "paid"
//                             ? "bg-green-100 text-green-800 border border-green-300"
//                             : app.payment === "refund"
//                             ? "bg-gray-100 text-gray-800 border border-gray-300"
//                             : "bg-red-100 text-red-800 border border-red-300"
//                         }`}
//                       >
//                         {app.payment === "paid" ? "Paid" : app.payment === "refund" ? "Refunded" : "Not Paid"}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="flex justify-end gap-2 mt-3">
//                     <button
//                       className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition ${
//                         disabled
//                           ? "bg-gray-400 text-white cursor-not-allowed"
//                           : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!disabled) {
//                           setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
//                           setModalOpen(true);
//                         }
//                       }}
//                       disabled={disabled}
//                     >
//                       <Ban size={14} /> Cancel
//                     </button>
//                     {app.status === "confirmed" && app.payment === "paid" ? (
//                       <button
//                         className="text-xs px-3 py-1.5 rounded flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate("/my-video", {
//                             state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId },
//                           });
//                         }}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10z" />
//                           <path d="M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
//                         </svg>
//                         Video
//                       </button>
//                     ) : (
//                       <button
//                         className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition ${
//                           disabled
//                             ? "bg-gray-400 text-white cursor-not-allowed"
//                             : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
//                         }`}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           if (!disabled) {
//                             setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
//                             setModalOpen(true);
//                           }
//                         }}
//                         disabled={disabled}
//                       >
//                         <Check size={14} /> Confirm
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {totalPages > 0 && (
//             <div className="mt-6 flex justify-center">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//                 pageSize={pageSize}
//                 onPageSizeChange={(size) => {
//                   setPageSize(size);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//           )}

//           {/* Confirmation Modal */}
//           <ConfirmModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onConfirm={handleUpdateStatus}
//             title="Change Appointment Status"
//             description={`Are you sure you want to ${selectedAction.newStatus} this appointment?`}
//             confirmText="Yes"
//             cancelText="No"
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;

















import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import { useDoctorStore } from "../../store/doctorStore";
import { toast } from "react-toastify";
import axios from "axios";
import { 
  Ban, 
  Check, 
  Filter, 
  ChevronDown, 
  Calendar, 
  Clock, 
  User, 
  CreditCard,
  Video,
  
} from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import type { Appointment } from "../../interfaces/IDoctorAppointment";
import { useNavigate } from "react-router-dom";
import { APIRoutes, APIDoctorRoutes } from "../../constants/routes.constants";

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{
    appointmentId: string;
    newStatus: "confirmed" | "cancelled" | null;
  }>({ appointmentId: "", newStatus: null });
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(5);

  useDoctorStore((state) => state.doctorData);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(
          `${APIDoctorRoutes.DOCTOR_APPOINTMENTS}?page=${currentPage}&limit=${pageSize}&status=${statusFilter}`
        );
        setAppointments(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        toast.error("Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, [currentPage, statusFilter, pageSize]);

  const handleUpdateStatus = async () => {
    const { appointmentId, newStatus } = selectedAction;
    if (!appointmentId || !newStatus) return;

    try {
      await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${appointmentId}`, { status: newStatus });

      const updated = appointments.map((app) => {
        if (app._id !== appointmentId) return app;
        const shouldRefund = newStatus === "cancelled" && app.payment === "paid";
        return {
          ...app,
          status: newStatus,
          payment: shouldRefund ? "refund" : app.payment,
        };
      });
      setAppointments(updated);
      toast.success(`Appointment ${newStatus} successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setModalOpen(false);
      setSelectedAction({ appointmentId: "", newStatus: null });
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "text-xs font-semibold px-3 py-1 rounded-full w-fit";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case "cancelled":
        return `${base} bg-red-100 text-red-700 border border-red-200`;
      case "confirmed":
        return `${base} bg-green-100 text-green-700 border border-green-200`;
      case "completed":
        return `${base} bg-blue-100 text-blue-800 border border-blue-200`;
      default:
        return `${base} bg-gray-100 text-gray-600 border border-gray-200`;
    }
  };

  const getPaymentBadge = (payment: string) => {
    if (payment === "paid") {
      return "bg-green-100 text-green-800 border border-green-300";
    } else if (payment === "refund") {
      return "bg-gray-100 text-gray-800 border border-gray-300";
    } else {
      return "bg-red-100 text-red-800 border border-red-300";
    }
  };

  const getPaymentText = (payment: string) => {
    if (payment === "paid") return "Paid";
    if (payment === "refund") return "Refunded";
    return "Not Paid";
  };

  const getStatusStats = () => {
    const stats = appointments.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: appointments.length,
      pending: stats.pending || 0,
      confirmed: stats.confirmed || 0,
      cancelled: stats.cancelled || 0,
      completed: stats.completed || 0
    };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden mt-12">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8 pt-20 sm:pt-24">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  My Appointments
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your patient appointments and consultations
                </p>
              </div>
              
              {/* Desktop Filter */}
              <div className="hidden sm:block">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Mobile Filter Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilter ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile Filter Dropdown */}
            {showMobileFilter && (
              <div className="mb-4 sm:hidden">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                    setShowMobileFilter(false);
                  }}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            {/* Stats Cards - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-6">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
                <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-xs sm:text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
                <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.confirmed}</div>
                <div className="text-xs sm:text-sm text-gray-600">Confirmed</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
                <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.cancelled}</div>
                <div className="text-xs sm:text-sm text-gray-600">Cancelled</div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
                <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.completed}</div>
                <div className="text-xs sm:text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg  border border-gray-200 overflow-hidden mb-6 hover:scale-102 transition duration-300 shadow-2xl ">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">#</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">App No</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Patient</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Age</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Date & Time</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Fee</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Payment</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-700 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((app, index) => {
                    const disabled = ["cancelled", "completed"].includes(app.status);
                    return (
                      <tr
                        key={app._id}
                        className=" transition-colors cursor-pointer hover:bg-[#5F6FFF]"
                        onClick={() => navigate("/appointment-details", { state: { appointment: app } })}
                      >
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {app.appointmentNo}
                        </td>
                        <td className="px-3 py-3 min-w-0">
                          <div className="flex items-center gap-2">
                            <img
                              src={app.user.photo || "/default-avatar.png"}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                              alt="patient"
                            />
                            <span className="font-medium text-gray-900 truncate">{app.user.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                          {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                          {`${app.date}, ${app.time}`}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">₹{app.fee}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={getStatusBadge(app.status)}>{app.status}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentBadge(app.payment)}`}>
                            {getPaymentText(app.payment)}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex justify-center gap-1">
                            <button
                              className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
                                disabled
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-red-500 text-white hover:bg-red-600"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled) {
                                  setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
                                  setModalOpen(true);
                                }
                              }}
                              disabled={disabled}
                            >
                              <Ban className="w-3 h-3" /> Cancel
                            </button>
                            {app.status === "confirmed" && app.payment === "paid" ? (
                              <button
                                className="px-2 py-1 rounded text-xs font-medium flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 transition-colors whitespace-nowrap"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate("/my-video", {
                                    state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId },
                                  });
                                }}
                              >
                                <Video className="w-3 h-3" /> Video
                              </button>
                            ) : (
                              <button
                                className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
                                  disabled
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!disabled) {
                                    setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
                                    setModalOpen(true);
                                  }
                                }}
                                disabled={disabled}
                              >
                                <Check className="w-3 h-3" /> Confirm
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {appointments.map((app, index) => {
              const disabled = ["cancelled", "completed"].includes(app.status);
              return (
                <div
                  key={app._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate("/appointment-details", { state: { appointment: app } })}
                >
                  {/* Header with App Number and Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        #{(currentPage - 1) * pageSize + index + 1}
                      </div>
                      <div className="font-bold text-gray-900 text-sm">
                        App No: {app.appointmentNo}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={getStatusBadge(app.status)}>{app.status}</span>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentBadge(app.payment)}`}>
                        {getPaymentText(app.payment)}
                      </span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <img
                      src={app.user.photo || "/default-avatar.png"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      alt="patient"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1 truncate">{app.user.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>Age: {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{app.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{app.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">₹{app.fee}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!disabled) {
                          setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
                          setModalOpen(true);
                        }
                      }}
                      disabled={disabled}
                    >
                      <Ban className="w-4 h-4" />
                      Cancel
                    </button>
                    {app.status === "confirmed" && app.payment === "paid" ? (
                      <button
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/my-video", {
                            state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId },
                          });
                        }}
                      >
                        <Video className="w-4 h-4" />
                        Start Video
                      </button>
                    ) : (
                      <button
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                          disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!disabled) {
                            setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
                            setModalOpen(true);
                          }
                        }}
                        disabled={disabled}
                      >
                        <Check className="w-4 h-4" />
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex justify-center">
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
            </div>
          )}

          {/* Confirmation Modal */}
          <ConfirmModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleUpdateStatus}
            title="Change Appointment Status"
            description={`Are you sure you want to ${selectedAction.newStatus} this appointment?`}
            confirmText="Yes"
            cancelText="No"
          />
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;