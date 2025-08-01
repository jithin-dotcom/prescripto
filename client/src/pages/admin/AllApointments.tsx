


// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check, Filter, ChevronDown, Calendar, User, Clock } from "lucide-react";
// import ConfirmModal from "../../components/ConfirmModal"; 
// import type {  Appointment } from "../../interfaces/IAllAppointments";
// import { APIRoutes } from "../../constants/routes.constants";
// import { useNavigate } from "react-router-dom";

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
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const navigate = useNavigate();
//   const [modalData, setModalData] = useState<{
//     id: string;
//     status: "cancelled" | "confirmed";
//     patientName: string;
//     date: string;
//     time: string;
//   } | null>(null);

//   const [pageSize, setPageSize] = useState<number>(5);
  

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?page=${currentPage}&limit=${pageSize}&status=${statusFilter}`
//         );
//         console.log("res.data.data : ",res.data.data);
//         setAppointments(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//       }
//     };
//     fetchAppointments();
//   }, [currentPage, statusFilter, pageSize]);

//   const confirmStatusChange = async () => {
//     if (!modalData) return;
//     try {
//       await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${modalData.id}`, { status: modalData.status });  
      
//       const updated = appointments.map((app) => {
//       if (app._id !== modalData.id) return app;

//       const shouldRefund =
//         modalData.status === "cancelled" && app.payment === "paid";

//       return {
//         ...app,
//         status: modalData.status as Appointment["status"],
//         payment: shouldRefund ? ("refund" as Appointment["payment"]) : app.payment,
//       };
//     });
      
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

//   const getStatusBadge = (status: Appointment["status"]) => {
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

//   const getPaymentBadge = (payment: string) => {
//     if (payment === "paid") {
//       return "bg-green-100 text-green-800 border border-green-300";
//     } else if (payment === "refund") {
//       return "bg-gray-100 text-gray-800 border border-gray-300";
//     } else {
//       return "bg-red-100 text-red-800 border border-red-300";
//     }
//   };

//   const getPaymentText = (payment: string) => {
//     if (payment === "paid") return "Paid";
//     if (payment === "refund") return "Refunded";
//     return "Not Paid";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 mt-12">
         
//           <div className="mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
//               <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
//                 All Appointments
//               </h1>
              
             
//               <div className="hidden sm:block">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>

             
//               <div className="sm:hidden">
//                 <button
//                   onClick={() => setShowMobileFilter(!showMobileFilter)}
//                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium shadow-sm"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Filter
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilter ? 'rotate-180' : ''}`} />
//                 </button>
//               </div>
//             </div>

           
//             {showMobileFilter && (
//               <div className="mt-3 sm:hidden">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                     setShowMobileFilter(false);
//                   }}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//             )}
//           </div>

         
//           <div className="hidden lg:block bg-white rounded-lg  border border-gray-200 overflow-hidden hover:scale-102 transition duration-300 shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">#</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">App No</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Patient</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Age</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Date & Time</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Doctor</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Fees</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Payment</th>
//                     <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {appointments.map((item, index) => {
//                     const disabled = ["cancelled", "completed"].includes(item.status);
//                     return (
//                       <tr 
//                         key={item._id} 
//                         className=" transition-colors cursor-pointer hover:bg-[#5F6FFF]"
//                         onClick={() => navigate("/admin-appointment-details", {state: {appointment: item}})}
//                       >
//                         <td className="text-center px-4 py-3 text-gray-600">
//                           {(currentPage - 1) * pageSize + index + 1}
//                         </td>
//                         <td className="text-center px-4 py-3 font-medium text-gray-900">
//                           {item.appointmentNo}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-2">
//                             <img 
//                               src={item.user.photo} 
//                               className="w-8 h-8 rounded-full object-cover border border-gray-200" 
//                               alt={item.user.name}
//                             />
//                             <span className="font-medium text-gray-900">{item.user.name}</span>
//                           </div>
//                         </td>
//                         <td className="text-center px-4 py-3 text-gray-600">
//                           {calculateAge(item.user.dateOfBirth)}
//                         </td>
//                         <td className="text-center px-4 py-3 text-gray-600 whitespace-nowrap">
//                           {item.date}, {item.time}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-2">
//                             <img 
//                               src={item.doctor.photo} 
//                               className="w-8 h-8 rounded-full object-cover border border-gray-200" 
//                               alt={item.doctor.name}
//                             />
//                             <span className="font-medium text-gray-900">{item.doctor.name}</span>
//                           </div>
//                         </td>
//                         <td className="text-center px-4 py-3 font-medium text-gray-900">
//                           ₹{item.doctor.fee}
//                         </td>
//                         <td className="text-center px-4 py-3">
//                           <span className={getStatusBadge(item.status)}>{item.status}</span>
//                         </td>
//                         <td className="text-center px-4 py-3">
//                           <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPaymentBadge(item.payment)}`}>
//                             {getPaymentText(item.payment)}
//                           </span>
//                         </td>
//                         <td className="text-center px-4 py-3">
//                           <div className="flex justify-center gap-2">
//                             <button
//                               title="Cancel Appointment"
//                               className={`p-2 rounded-full transition-colors ${
//                                 disabled 
//                                   ? "bg-gray-200 cursor-not-allowed text-gray-400" 
//                                   : "bg-red-500 hover:bg-red-600 text-white"
//                               }`}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 if (!disabled) {
//                                   setModalData({
//                                     id: item._id,
//                                     status: "cancelled",
//                                     patientName: item.user.name,
//                                     date: item.date,
//                                     time: item.time,
//                                   });
//                                 }
//                               }}
//                               disabled={disabled}
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                             <button
//                               title="Confirm Appointment"
//                               className={`p-2 rounded-full transition-colors ${
//                                 disabled 
//                                   ? "bg-gray-200 cursor-not-allowed text-gray-400" 
//                                   : "bg-green-500 hover:bg-green-600 text-white"
//                               }`}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 if (!disabled) {
//                                   setModalData({
//                                     id: item._id,
//                                     status: "confirmed",
//                                     patientName: item.user.name,
//                                     date: item.date,
//                                     time: item.time,
//                                   });
//                                 }
//                               }}
//                               disabled={disabled}
//                             >
//                               <Check className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

          
//           <div className="lg:hidden space-y-3 sm:space-y-4">
//             {appointments.map((item, index) => {
//               const disabled = ["cancelled", "completed"].includes(item.status);
//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => navigate("/admin-appointment-details", {state: {appointment: item}})}
//                 >
                
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <div className="text-xs text-gray-500 mb-1">
//                         #{(currentPage - 1) * pageSize + index + 1}
//                       </div>
//                       <div className="font-semibold text-gray-900">
//                         App No: {item.appointmentNo}
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end gap-1">
//                       <span className={getStatusBadge(item.status)}>{item.status}</span>
//                       <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentBadge(item.payment)}`}>
//                         {getPaymentText(item.payment)}
//                       </span>
//                     </div>
//                   </div>

                 
//                   <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
//                     <img 
//                       src={item.user.photo} 
//                       className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
//                       alt={item.user.name}
//                     />
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-900 mb-1">{item.user.name}</div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <User className="w-4 h-4" />
//                         Age: {calculateAge(item.user.dateOfBirth)}
//                       </div>
//                     </div>
//                   </div>

               
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Calendar className="w-4 h-4" />
//                       <span>{item.date}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Clock className="w-4 h-4" />
//                       <span>{item.time}</span>
//                     </div>
//                   </div>

               
//                   <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <img 
//                         src={item.doctor.photo} 
//                         className="w-10 h-10 rounded-full object-cover border border-gray-200" 
//                         alt={item.doctor.name}
//                       />
//                       <div>
//                         <div className="font-medium text-gray-900 text-sm">{item.doctor.name}</div>
//                         <div className="text-xs text-gray-600">Doctor</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-gray-900">₹{item.doctor.fee}</div>
//                       <div className="text-xs text-gray-600">Consultation Fee</div>
//                     </div>
//                   </div>

                 
//                   <div className="flex gap-2 pt-3 border-t border-gray-100">
//                     <button
//                       className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
//                         disabled 
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                           : "bg-red-500 hover:bg-red-600 text-white"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!disabled) {
//                           setModalData({
//                             id: item._id,
//                             status: "cancelled",
//                             patientName: item.user.name,
//                             date: item.date,
//                             time: item.time,
//                           });
//                         }
//                       }}
//                       disabled={disabled}
//                     >
//                       <X className="w-4 h-4" />
//                       Cancel
//                     </button>
//                     <button
//                       className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
//                         disabled 
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                           : "bg-green-500 hover:bg-green-600 text-white"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!disabled) {
//                           setModalData({
//                             id: item._id,
//                             status: "confirmed",
//                             patientName: item.user.name,
//                             date: item.date,
//                             time: item.time,
//                           });
//                         }
//                       }}
//                       disabled={disabled}
//                     >
//                       <Check className="w-4 h-4" />
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

         
//           <div className="mt-6">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//               pageSize={pageSize}
//               onPageSizeChange={(size) => {
//                 setPageSize(size);
//                 setCurrentPage(1); 
//               }}
//             />
//           </div>
//         </main>
//       </div>

//       {/* Confirmation Modal */}
//       {modalData && (
//         <ConfirmModal
//           isOpen={!!modalData}
//           onClose={() => setModalData(null)}
//           onConfirm={confirmStatusChange}
//           title={`Confirm ${modalData.status}`}
//           description={`Are you sure you want to ${modalData.status} the appointment with ${modalData.patientName} on ${modalData.date} at ${modalData.time}?`}
//           confirmText="Yes"
//           cancelText="No"
//         />
//       )}
//     </div>
//   );
// };

// export default AllAppointments;























// import { useEffect, useState } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import type{ View } from "react-big-calendar";
// import moment from "moment";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check, Filter, ChevronDown } from "lucide-react";
// import ConfirmModal from "../../components/ConfirmModal";
// import type { Event } from "react-big-calendar";
// import type { Appointment } from "../../interfaces/IAllAppointments";
// import { useNavigate } from "react-router-dom";
// import { APIRoutes } from "../../constants/routes.constants";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// // Initialize moment localizer for react-big-calendar
// const localizer = momentLocalizer(moment);

// interface CalendarEvent extends Event {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   resource: Appointment;
// }

// const AllAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const [modalData, setModalData] = useState<{
//     id: string;
//     status: "cancelled" | "confirmed";
//     patientName: string;
//     date: string;
//     time: string;
//   } | null>(null);
//   const [view, setView] = useState<View>(Views.WEEK); // Default to Week view
//   const [date, setDate] = useState(new Date()); // Manage current date
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/all-appointments?status=${statusFilter}`
//         );
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch appointments", err);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, [statusFilter]);

//   const confirmStatusChange = async () => {
//     if (!modalData) return;
//     try {
//       await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${modalData.id}`, {
//         status: modalData.status,
//       });

//       const updated = appointments.map((app) => {
//         if (app._id !== modalData.id) return app;
//         const shouldRefund = modalData.status === "cancelled" && app.payment === "paid";
//         return {
//           ...app,
//           status: modalData.status as Appointment["status"],
//           payment: shouldRefund ? ("refund" as Appointment["payment"]) : app.payment,
//         };
//       });

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

//   const getStatusBadge = (status: Appointment["status"]) => {
//     const base = "text-xs font-semibold px-2 py-1 rounded-full w-fit";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-100 text-yellow-800 border border-yellow-200`;
//       case "cancelled":
//         return `${base} bg-red-100 text-red-700 border border-red-200`;
//       case "confirmed":
//         return `${base} bg-green-100 text-green-700 border border-green-200`;
//       case "completed":
//         return `${base} bg-blue-100 text-blue-800 border border-blue-200`;
//       default:
//         return `${base} bg-gray-100 text-gray-600 border border-gray-200`;
//     }
//   };

//   const getStatusStats = () => {
//     const stats = appointments.reduce((acc, app) => {
//       acc[app.status] = (acc[app.status] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return {
//       total: appointments.length,
//       pending: stats.pending || 0,
//       confirmed: stats.confirmed || 0,
//       cancelled: stats.cancelled || 0,
//       completed: stats.completed || 0,
//     };
//   };

//   // Prepare events for react-big-calendar
//   const events = appointments.map((app) => {
//     const dateTime = moment(`${app.date} ${app.time}`, "DD/MM/YYYY h:mm A").toDate();
//     return {
//       id: app._id,
//       title: `${app.user.name} - ${app.status}`,
//       start: dateTime,
//       end: moment(dateTime).add(30, "minutes").toDate(),
//       resource: app,
//     };
//   });

//   // Custom event component for calendar
//   const EventComponent = ({ event }: { event: CalendarEvent }) => {
//     const disabled = ["cancelled", "completed"].includes(event.resource.status);
//     return (
//       <div className="rbc-event-content flex flex-col p-1 text-xs">
//         <span className="font-medium truncate">{event.resource.user.name}</span>
//         <span className={getStatusBadge(event.resource.status)}>{event.resource.status}</span>
//         <div className="flex gap-1 mt-1 flex-wrap">
//           <button
//             className={`px-1 py-0.5 rounded text-[10px] font-medium flex items-center gap-0.5 transition-colors ${
//               disabled
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             }`}
//             onClick={(e) => {
//               e.stopPropagation();
//               if (!disabled) {
//                 setModalData({
//                   id: event.resource._id,
//                   status: "cancelled",
//                   patientName: event.resource.user.name,
//                   date: event.resource.date,
//                   time: event.resource.time,
//                 });
//               }
//             }}
//             disabled={disabled}
//           >
//             <X className="w-2 h-2" /> Cancel
//           </button>
//           <button
//             className={`px-1 py-0.5 rounded text-[10px] font-medium flex items-center gap-0.5 transition-colors ${
//               disabled
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             }`}
//             onClick={(e) => {
//               e.stopPropagation();
//               if (!disabled) {
//                 setModalData({
//                   id: event.resource._id,
//                   status: "confirmed",
//                   patientName: event.resource.user.name,
//                   date: event.resource.date,
//                   time: event.resource.time,
//                 });
//               }
//             }}
//             disabled={disabled}
//           >
//             <Check className="w-2 h-2" /> Confirm
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const stats = getStatusStats();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8 mt-12">
//           {/* Header Section */}
//           <div className="mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
//                   All Appointments
//                 </h1>
//                 <p className="text-sm text-gray-600">
//                   Manage all patient appointments and consultations
//                 </p>
//               </div>

//               {/* Desktop Filter and View Switch */}
//               <div className="hidden sm:flex sm:items-center sm:gap-4">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                 >
//                   <option value="">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </select>
//                 <select
//                   value={view}
//                   onChange={(e) => setView(e.target.value as View)}
//                   className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                 >
//                   <option value={Views.MONTH}>Month</option>
//                   <option value={Views.WEEK}>Week</option>
//                   <option value={Views.DAY}>Day</option>
//                   <option value={Views.AGENDA}>Agenda</option>
//                 </select>
//               </div>

//               {/* Mobile Filter Button */}
//               <div className="sm:hidden">
//                 <button
//                   onClick={() => setShowMobileFilter(!showMobileFilter)}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Filter
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilter ? 'rotate-180' : ''}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Filter Dropdown */}
//             {showMobileFilter && (
//               <div className="mb-4 sm:hidden">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setShowMobileFilter(false);
//                   }}
//                   className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                 >
//                   <option value="">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//             )}

//             {/* Stats Cards - Mobile Responsive */}
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-6">
//               <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
//                 <div className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</div>
//                 <div className="text-xs sm:text-sm text-gray-600">Total</div>
//               </div>
//               <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
//                 <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
//                 <div className="text-xs sm:text-sm text-gray-600">Pending</div>
//               </div>
//               <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
//                 <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.confirmed}</div>
//                 <div className="text-xs sm:text-sm text-gray-600">Confirmed</div>
//               </div>
//               <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
//                 <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.cancelled}</div>
//                 <div className="text-xs sm:text-sm text-gray-600">Cancelled</div>
//               </div>
//               <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-200 hover:scale-102 transition duration-300">
//                 <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.completed}</div>
//                 <div className="text-xs sm:text-sm text-gray-600">Completed</div>
//               </div>
//             </div>
//           </div>

//           {/* Calendar View - Responsive */}
//           <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-2xl">
//             <div className="p-2 sm:p-4">
//               <Calendar
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 'calc(100vh - 300px)', minHeight: '400px', maxHeight: '800px' }}
//                 view={view}
//                 onView={(newView) => setView(newView)}
//                 date={date}
//                 onNavigate={(newDate) => setDate(newDate)}
//                 onSelectEvent={(event) => navigate("/admin-appointment-details", { state: { appointment: event.resource } })}
//                 components={{
//                   event: EventComponent,
//                 }}
//                 eventPropGetter={(event) => {
//                   const status = event.resource.status;
//                   let backgroundColor = '#3174ad';
//                   if (status === 'pending') backgroundColor = '#f7c948';
//                   else if (status === 'confirmed') backgroundColor = '#10b981';
//                   else if (status === 'cancelled') backgroundColor = '#ef4444';
//                   else if (status === 'completed') backgroundColor = '#3b82f6';
//                   return { style: { backgroundColor, minHeight: '40px', padding: '2px' } };
//                 }}
//               />
//             </div>
//           </div>

//           {/* Confirmation Modal */}
//           {modalData && (
//             <ConfirmModal
//               isOpen={!!modalData}
//               onClose={() => setModalData(null)}
//               onConfirm={confirmStatusChange}
//               title={`Confirm ${modalData.status}`}
//               description={`Are you sure you want to ${modalData.status} the appointment with ${modalData.patientName} on ${modalData.date} at ${modalData.time}?`}
//               confirmText="Yes"
//               cancelText="No"
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;







































import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import type{ View } from "react-big-calendar";
import moment from "moment";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { X, Check, Filter, ChevronDown, Calendar as CalendarIcon, User, Clock } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import type { Event } from "react-big-calendar";
import type { Appointment } from "../../interfaces/IAllAppointments";
import { useNavigate } from "react-router-dom";
import { APIRoutes } from "../../constants/routes.constants";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Custom CSS for react-big-calendar
const customStyles = `
  .rbc-calendar {
    font-family: 'Inter', sans-serif;
  }
  .rbc-toolbar {
    background: linear-gradient(to bottom, #ffffff, #f9fafb);
    border-bottom: 1px solid #e5e7eb;
    padding: 12px 16px;
    border-radius: 8px 8px 0 0;
  }
  .rbc-toolbar button {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  .rbc-toolbar button:hover {
    background: #2563eb;
  }
  .rbc-toolbar-label {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }
  .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
    background: white;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .rbc-event {
    border-radius: 4px;
    padding: 4px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .rbc-event:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .rbc-day-slot .rbc-event {
    margin: 2px 4px;
  }
  .rbc-time-slot {
    border-top: 1px solid #e5e7eb;
  }
  .rbc-today {
    background: #f0f9ff;
  }
  .rbc-header {
    background: #f3f4f6;
    padding: 8px;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
`;

// Initialize moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

const AllAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [modalData, setModalData] = useState<{
    id: string;
    status: "cancelled" | "confirmed";
    patientName: string;
    date: string;
    time: string;
  } | null>(null);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(`/all-appointments?status=${statusFilter}`);
        setAppointments(res.data.data || []);
        console.log("Appointments:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        toast.error("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, [statusFilter]);

  const confirmStatusChange = async () => {
    if (!modalData) return;
    try {
      await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${modalData.id}`, {
        status: modalData.status,
      });

      const updated = appointments.map((app) => {
        if (app._id !== modalData.id) return app;
        const shouldRefund = modalData.status === "cancelled" && app.payment === "paid";
        return {
          ...app,
          status: modalData.status as Appointment["status"],
          payment: shouldRefund ? ("refund" as Appointment["payment"]) : app.payment,
        };
      });

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
    const base = "text-xs font-medium px-2 py-0.5 rounded-full shadow-sm";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-50 text-yellow-700 border border-yellow-200`;
      case "cancelled":
        return `${base} bg-red-50 text-red-700 border border-red-200`;
      case "confirmed":
        return `${base} bg-green-50 text-green-700 border border-green-200`;
      case "completed":
        return `${base} bg-blue-50 text-blue-700 border border-blue-200`;
      default:
        return `${base} bg-gray-50 text-gray-600 border border-gray-200`;
    }
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
      completed: stats.completed || 0,
    };
  };

  // Prepare events for react-big-calendar
  const events = appointments.map((app) => {
    const dateTime = moment(`${app.date} ${app.time}`, "DD/MM/YYYY h:mm A").toDate();
    return {
      id: app._id,
      title: `${app.user.name} - ${app.doctor.name}`,
      start: dateTime,
      end: moment(dateTime).add(30, "minutes").toDate(),
      resource: app,
    };
  });

  // Custom event component for calendar
  const EventComponent = ({ event }: { event: CalendarEvent }) => {
    const disabled = ["cancelled", "completed"].includes(event.resource.status);
    return (
      <div className="rbc-event-content flex flex-col p-2 text-xs gap-1">
        <div className="flex items-center gap-2">
          <img
            src={event.resource.user.photo || "/default-avatar.png"}
            className="w-5 h-5 rounded-full object-cover border border-gray-200"
            alt={event.resource.user.name}
          />
          <span className="font-semibold text-gray-800 truncate">{event.resource.user.name}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-3 h-3" />
          <span className="truncate">{event.resource.doctor.name}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-3 h-3" />
          <span>{event.resource.time}</span>
        </div>
        <span className={getStatusBadge(event.resource.status)}>{event.resource.status}</span>
        <div className="flex gap-1 mt-2 flex-wrap">
          <button
            className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 shadow-sm"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setModalData({
                  id: event.resource._id,
                  status: "cancelled",
                  patientName: event.resource.user.name,
                  date: event.resource.date,
                  time: event.resource.time,
                });
              }
            }}
            disabled={disabled}
            title="Cancel Appointment"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
          <button
            className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 shadow-sm"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setModalData({
                  id: event.resource._id,
                  status: "confirmed",
                  patientName: event.resource.user.name,
                  date: event.resource.date,
                  time: event.resource.time,
                });
              }
            }}
            disabled={disabled}
            title="Confirm Appointment"
          >
            <Check className="w-3 h-3" /> Confirm
          </button>
        </div>
      </div>
    );
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <style>{customStyles}</style>
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 mt-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  All Appointments
                </h1>
                <p className="text-sm text-gray-500">
                  Seamlessly manage all patient appointments and consultations
                </p>
              </div>

              {/* Desktop Filter and View Switch */}
              <div className="hidden sm:flex sm:items-center sm:gap-4">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                <div className="relative">
                  <select
                    value={view}
                    onChange={(e) => setView(e.target.value as View)}
                    className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-32 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                  >
                    <option value={Views.MONTH}>Month</option>
                    <option value={Views.WEEK}>Week</option>
                    <option value={Views.DAY}>Day</option>
                    <option value={Views.AGENDA}>Agenda</option>
                  </select>
                  <CalendarIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Mobile Filter Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all duration-200"
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
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setShowMobileFilter(false);
                    }}
                    className="appearance-none w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            )}

            {/* Stats Cards - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                <div className="text-sm text-blue-700 flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" /> Total
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                <div className="text-sm text-yellow-700 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Pending
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-green-900">{stats.confirmed}</div>
                <div className="text-sm text-green-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Confirmed
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-red-900">{stats.cancelled}</div>
                <div className="text-sm text-red-700 flex items-center gap-1">
                  <X className="w-4 h-4" /> Cancelled
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Completed
                </div>
              </div>
            </div>
          </div>

          {/* Calendar View - Responsive */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="p-3 sm:p-4">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 280px)', minHeight: '400px', maxHeight: '800px' }}
                view={view}
                onView={(newView) => setView(newView)}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                onSelectEvent={(event) => navigate("/admin-appointment-details", { state: { appointment: event.resource } })}
                components={{
                  event: EventComponent,
                }}
                eventPropGetter={(event) => {
                  const status = event.resource.status;
                  let backgroundColor = '#3b82f6';
                  if (status === 'pending') backgroundColor = '#facc15';
                  else if (status === 'confirmed') backgroundColor = '#10b981';
                  else if (status === 'cancelled') backgroundColor = '#ef4444';
                  else if (status === 'completed') backgroundColor = '#6b7280';
                  return { style: { backgroundColor, minHeight: '40px', padding: '4px', borderRadius: '4px', border: 'none' } };
                }}
              />
            </div>
          </div>

          {/* Confirmation Modal */}
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
        </main>
      </div>
    </div>
  );
};

export default AllAppointments;