

// import { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import Pagination from "../../components/Pagination";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { X, Check } from "lucide-react";
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

//           <div className="hidden md:block bg-white rounded-lg shadow-2xl overflow-x-auto hover:scale-102 transition duration-300">
//             <table className="min-w-full text-sm text-left ">
//               <thead className="bg-[#EAEFFF] text-[#262626] text-sm font-semibold">
//                 <tr>
//                   <th className="px-4 py-3 text-center">#</th>
//                   <th className="px-4 py-3 text-center">AppNo</th>
//                   <th className="px-4 py-3 text-center">Patient</th>
//                   <th className="px-4 py-3 text-center">Age</th>
//                   <th className="px-4 py-3 text-center">Date & Time</th>
//                   <th className="px-4 py-3 text-center">Doctor</th>
//                   <th className="px-4 py-3 text-center">Fees</th>
//                   <th className="px-4 py-3 text-center">Status</th>
//                   <th className="px-4 py-3 text-center">Payment</th>
//                   <th className="px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y text-gray-700">
//                 {appointments.map((item, index) => {
//                   const disabled = ["cancelled", "completed"].includes(item.status);
//                   return (
//                     <tr key={item._id} className="hover:bg-[#5F6FFF] hover:text-white transition" onClick={() => navigate("/admin-appointment-details",{state:{appointment:item}}) }>
//                       <td className="text-center px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
//                       <td className="text-center px-4 py-3">{item.appointmentNo}</td>
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
//                        <td className="text-center px-4 py-3">
//                         {/* <span >{item.payment}</span> */}
//                          <span
//                        className={`inline-block px-3 py-1 mx-1 text-xs font-medium rounded-full ${
//                        item.payment === "paid"
//                        ? "bg-green-100 text-green-800 border border-green-300"
//                        : item.payment === "refund"
//                        ? "bg-gray-100 text-gray-800 border border-gray-300"
//                        : "bg-red-100 text-red-800 border border-red-300"
//                        }`}
//                      >
//                        {item.payment === "paid"
//                        ? "Paid"
//                        : item.payment === "refund"
//                        ? "Refunded"
//                        : "Not Paid"}
//                      </span>
//                       </td>
//                       <td className="text-center px-4 py-3">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             title="Cancel Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
//                             }`}
//                             onClick={(e) =>{
//                               e.stopPropagation();
//                               if(!disabled){
//                               setModalData({
//                                 id: item._id,
//                                 status: "cancelled",
//                                 patientName: item.user.name,
//                                 date: item.date,
//                                 time: item.time,
//                             });
//                             }
//                             }}
//                             disabled={disabled}
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                           <button
//                             title="Confirm Appointment"
//                             className={`p-1.5 rounded-full ${
//                               disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
//                             }`}
//                             onClick={(e) =>{
//                               e.stopPropagation();
//                               if(!disabled){
//                               setModalData({
//                                 id: item._id,
//                                 status: "confirmed",
//                                 patientName: item.user.name,
//                                 date: item.date,
//                                 time: item.time,
//                               });
//                             }
//                             }}
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

          
//                <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   onPageChange={setCurrentPage}
//   pageSize={pageSize}
//   onPageSizeChange={(size) => {
//     setPageSize(size);
//     setCurrentPage(1); 
//   }}
// />
//         </main>
//       </div>

//       {/*  Reusable Confirmation Modal */}
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



























import { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { X, Check, Filter, ChevronDown, Calendar, User, Clock } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal"; 
import type {  Appointment } from "../../interfaces/IAllAppointments";
import { APIRoutes } from "../../constants/routes.constants";
import { useNavigate } from "react-router-dom";

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
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const navigate = useNavigate();
  const [modalData, setModalData] = useState<{
    id: string;
    status: "cancelled" | "confirmed";
    patientName: string;
    date: string;
    time: string;
  } | null>(null);

  const [pageSize, setPageSize] = useState<number>(5);
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(
          `/all-appointments?page=${currentPage}&limit=${pageSize}&status=${statusFilter}`
        );
        console.log("res.data.data : ",res.data.data);
        setAppointments(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };
    fetchAppointments();
  }, [currentPage, statusFilter, pageSize]);

  const confirmStatusChange = async () => {
    if (!modalData) return;
    try {
      await axiosInstance.patch(`${APIRoutes.CANCEL_APPOINTMENTS}/${modalData.id}`, { status: modalData.status });  
      
      const updated = appointments.map((app) => {
      if (app._id !== modalData.id) return app;

      const shouldRefund =
        modalData.status === "cancelled" && app.payment === "paid";

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
                All Appointments
              </h1>
              
              {/* Desktop Filter */}
              <div className="hidden sm:block">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium shadow-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilter ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile Filter Dropdown */}
            {showMobileFilter && (
              <div className="mt-3 sm:hidden">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                    setShowMobileFilter(false);
                  }}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg  border border-gray-200 overflow-hidden hover:scale-102 transition duration-300 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">#</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">App No</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Patient</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Age</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Date & Time</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Doctor</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Fees</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Payment</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((item, index) => {
                    const disabled = ["cancelled", "completed"].includes(item.status);
                    return (
                      <tr 
                        key={item._id} 
                        className=" transition-colors cursor-pointer hover:bg-[#5F6FFF]"
                        onClick={() => navigate("/admin-appointment-details", {state: {appointment: item}})}
                      >
                        <td className="text-center px-4 py-3 text-gray-600">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="text-center px-4 py-3 font-medium text-gray-900">
                          {item.appointmentNo}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={item.user.photo} 
                              className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                              alt={item.user.name}
                            />
                            <span className="font-medium text-gray-900">{item.user.name}</span>
                          </div>
                        </td>
                        <td className="text-center px-4 py-3 text-gray-600">
                          {calculateAge(item.user.dateOfBirth)}
                        </td>
                        <td className="text-center px-4 py-3 text-gray-600 whitespace-nowrap">
                          {item.date}, {item.time}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={item.doctor.photo} 
                              className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                              alt={item.doctor.name}
                            />
                            <span className="font-medium text-gray-900">{item.doctor.name}</span>
                          </div>
                        </td>
                        <td className="text-center px-4 py-3 font-medium text-gray-900">
                          ₹{item.doctor.fee}
                        </td>
                        <td className="text-center px-4 py-3">
                          <span className={getStatusBadge(item.status)}>{item.status}</span>
                        </td>
                        <td className="text-center px-4 py-3">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPaymentBadge(item.payment)}`}>
                            {getPaymentText(item.payment)}
                          </span>
                        </td>
                        <td className="text-center px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              title="Cancel Appointment"
                              className={`p-2 rounded-full transition-colors ${
                                disabled 
                                  ? "bg-gray-200 cursor-not-allowed text-gray-400" 
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled) {
                                  setModalData({
                                    id: item._id,
                                    status: "cancelled",
                                    patientName: item.user.name,
                                    date: item.date,
                                    time: item.time,
                                  });
                                }
                              }}
                              disabled={disabled}
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              title="Confirm Appointment"
                              className={`p-2 rounded-full transition-colors ${
                                disabled 
                                  ? "bg-gray-200 cursor-not-allowed text-gray-400" 
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled) {
                                  setModalData({
                                    id: item._id,
                                    status: "confirmed",
                                    patientName: item.user.name,
                                    date: item.date,
                                    time: item.time,
                                  });
                                }
                              }}
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
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {appointments.map((item, index) => {
              const disabled = ["cancelled", "completed"].includes(item.status);
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate("/admin-appointment-details", {state: {appointment: item}})}
                >
                  {/* Header with appointment number and status */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        #{(currentPage - 1) * pageSize + index + 1}
                      </div>
                      <div className="font-semibold text-gray-900">
                        App No: {item.appointmentNo}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={getStatusBadge(item.status)}>{item.status}</span>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentBadge(item.payment)}`}>
                        {getPaymentText(item.payment)}
                      </span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <img 
                      src={item.user.photo} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                      alt={item.user.name}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{item.user.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        Age: {calculateAge(item.user.dateOfBirth)}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.doctor.photo} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                        alt={item.doctor.name}
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.doctor.name}</div>
                        <div className="text-xs text-gray-600">Doctor</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{item.doctor.fee}</div>
                      <div className="text-xs text-gray-600">Consultation Fee</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        disabled 
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!disabled) {
                          setModalData({
                            id: item._id,
                            status: "cancelled",
                            patientName: item.user.name,
                            date: item.date,
                            time: item.time,
                          });
                        }
                      }}
                      disabled={disabled}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        disabled 
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!disabled) {
                          setModalData({
                            id: item._id,
                            status: "confirmed",
                            patientName: item.user.name,
                            date: item.date,
                            time: item.time,
                          });
                        }
                      }}
                      disabled={disabled}
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-6">
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
        </main>
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
    </div>
  );
};

export default AllAppointments;