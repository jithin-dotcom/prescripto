


// import React from "react";
// import { assets } from "../../assets/assets2";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";




// const DoctorDashboard: React.FC = () => {
  
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
    
//       <Navbar />

//       <div className="flex flex-1 flex-row">
       
//         <SidebarAdmin />

       
//         <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 mt-12">
                  
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className='flex text-gray-700 items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
//           <img className='w-14' src={assets.doctor_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '></p>
//             <p >Doctors</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '>0</p>
//             <p >Appointments</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white '>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '></p>
//             <p >Patients</p></div>
//         </div>
           
//           </div>

        
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;


























// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Users, Stethoscope, Calendar, DollarSign, Activity, AlertTriangle, Filter } from "lucide-react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "confirmed" | "cancelled" | "pending";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctor: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     specialization: string;
//     educationDetails: string;
//     yearOfExperience: number;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     gender: "male" | "female" | "other";
//     dateOfBirth: string;
//     city: string;
//     state: string;
//     country: string;
//     houseName: string;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
// }

// interface Stats {
//   totalUsers: number;
//   totalDoctors: number;
//   totalAppointmentsToday: number;
//   revenueToday: number;
//   revenueThisMonth: number;
// }

// interface FilterOption {
//   value: "daily" | "weekly" | "monthly";
//   label: string;
// }

// interface ActivityLog {
//   type: "doctor_registration" | "user_complaint" | "system_alert";
//   message: string;
//   timestamp: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [filter, setFilter] = useState<FilterOption>({ value: "daily", label: "Daily" });
//   const { user } = useAuthStore();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/all-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-lg text-gray-700">Access denied. Please log in as an admin.</p>
//       </div>
//     );
//   }

//   // Mock data for users and doctors (replace with API calls if available)
//   const mockUsers = [
//     { _id: "6845483bc40b0f864b623085", createdAt: "2025-06-24T10:00:00Z" },
//     { _id: "6845483bc40b0f864b623086", createdAt: "2025-07-01T10:00:00Z" },
//   ];
//   const mockDoctors = [
//     { _id: "686cdcae7e0fb9f1ba633d8a", name: "Adarsh", specialization: "Pediatricians", createdAt: "2025-07-15T10:00:00Z" },
//   ];

//   // Get stats
//   const getStats = (): Stats => {
//     const today = moment();
//     const thisMonth = moment().startOf("month");
//     const uniqueUsers = new Set(appointments.map((app) => app.user._id)).size;
//     const uniqueDoctors = new Set(appointments.map((app) => app.doctor._id)).size;
//     return {
//       totalUsers: uniqueUsers || mockUsers.length,
//       totalDoctors: uniqueDoctors || mockDoctors.length,
//       totalAppointmentsToday: appointments.filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day")).length,
//       revenueToday: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//       revenueThisMonth: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(thisMonth, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Get filtered appointments
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "daily":
//           return appDate.isSame(today, "day");
//         case "weekly":
//           return appDate.isSameOrAfter(today.clone().subtract(6, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "monthly":
//           return appDate.isSameOrAfter(today.clone().subtract(29, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Appointment trends
//   const getAppointmentTrends = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const count = filteredAppointments.filter((app) => app.date === date).length;
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Revenue growth
//   const getRevenueGrowth = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const revenue = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), revenue };
//     });
//     return data;
//   };

//   // User signups (mock data)
//   const getUserSignups = () => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const count = mockUsers.filter((user) => moment(user.createdAt).isSame(date, "day")).length;
//       return { date: moment(date).format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Appointment status
//   const getAppointmentStatus = (filteredAppointments: Appointment[]) => {
//     const status = { Confirmed: 0, Cancelled: 0, Pending: 0 };
//     filteredAppointments.forEach((app) => {
//       if (app.status === "confirmed") status.Confirmed++;
//       else if (app.status === "cancelled") status.Cancelled++;
//       else status.Pending++;
//     });
//     return Object.entries(status).map(([name, value]) => ({ name, value }));
//   };

//   // Payment method usage (mock data)
//   const getPaymentMethods = (filteredAppointments: Appointment[]) => [
//     { name: "Wallet", value: filteredAppointments.length * 0.7 },
//     { name: "Razorpay", value: filteredAppointments.length * 0.3 },
//   ];

//   // Specialization demand
//   const getSpecializationDemand = (filteredAppointments: Appointment[]) => {
//     const specs: { [key: string]: number } = {};
//     filteredAppointments.forEach((app) => {
//       const spec = app.doctor.specialization;
//       specs[spec] = (specs[spec] || 0) + 1;
//     });
//     return Object.entries(specs).map(([name, value]) => ({ name, value }));
//   };

//   // Top doctors
//   const getTopDoctors = (filteredAppointments: Appointment[]) => {
//     const doctorCounts: { [key: string]: { name: string; specialization: string; count: number } } = {};
//     filteredAppointments.forEach((app) => {
//       const doctorId = app.doctor._id;
//       if (!doctorCounts[doctorId]) {
//         doctorCounts[doctorId] = {
//           name: app.doctor.name,
//           specialization: app.doctor.specialization,
//           count: 0,
//         };
//       }
//       doctorCounts[doctorId].count++;
//     });
//     return Object.values(doctorCounts)
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5);
//   };

//   // Recent activity logs (mock data)
//   const getActivityLogs = (): ActivityLog[] => [
//     { type: "doctor_registration", message: "New doctor registered: Dr. Adarsh (Pediatricians)", timestamp: "2025-07-15T10:00:00Z" },
//     { type: "user_complaint", message: "User Abin submitted a complaint: 'Long wait time'", timestamp: "2025-07-30T12:00:00Z" },
//     { type: "system_alert", message: "System maintenance scheduled for 2025-08-03", timestamp: "2025-08-01T09:00:00Z" },
//   ];

//   // Revenue breakdown
//   const getRevenueBreakdown = (filteredAppointments: Appointment[]) => {
//     const byDate: { [key: string]: number } = {};
//     const byDoctor: { [key: string]: { name: string; revenue: number } } = {};
//     const bySpecialization: { [key: string]: number } = {};
//     filteredAppointments
//       .filter((app) => app.payment === "paid")
//       .forEach((app) => {
//         const date = moment(app.date, "DD/MM/YYYY").format("MMM DD");
//         byDate[date] = (byDate[date] || 0) + app.fee;
//         const doctorId = app.doctor._id;
//         if (!byDoctor[doctorId]) {
//           byDoctor[doctorId] = { name: app.doctor.name, revenue: 0 };
//         }
//         byDoctor[doctorId].revenue += app.fee;
//         const spec = app.doctor.specialization;
//         bySpecialization[spec] = (bySpecialization[spec] || 0) + app.fee;
//       });
//     return {
//       byDate: Object.entries(byDate).map(([date, revenue]) => ({ date, revenue })),
//       byDoctor: Object.entries(byDoctor).map(([_, data]) => data),
//       bySpecialization: Object.entries(bySpecialization).map(([name, revenue]) => ({ name, revenue })),
//     };
//   };

//   const filteredAppointments = getFilteredAppointments();
//   const stats = getStats();
//   const appointmentTrends = getAppointmentTrends(filteredAppointments);
//   const revenueGrowth = getRevenueGrowth(filteredAppointments);
//   const userSignups = getUserSignups();
//   const appointmentStatus = getAppointmentStatus(filteredAppointments);
//   const paymentMethods = getPaymentMethods(filteredAppointments);
//   const specializationDemand = getSpecializationDemand(filteredAppointments);
//   const topDoctors = getTopDoctors(filteredAppointments);
//   const activityLogs = getActivityLogs();
//   const revenueBreakdown = getRevenueBreakdown(filteredAppointments);

//   const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444"];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col font-['Inter']">
//       <style>
//         {`
//           * {
//             font-family: 'Inter', sans-serif;
//           }
//           .recharts-tooltip-wrapper {
//             background: rgba(255, 255, 255, 0.95);
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }
//           .recharts-tooltip-label {
//             font-weight: 600;
//             color: #1f2937;
//           }
//         `}
//       </style>
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
//               <p className="text-sm text-gray-500">Monitor platform activity, revenue, and performance</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: { daily: "Daily", weekly: "Weekly", monthly: "Monthly" }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Users className="w-12 h-12 text-blue-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalUsers}</p>
//                 <p className="text-sm">Total Users</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Stethoscope className="w-12 h-12 text-green-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalDoctors}</p>
//                 <p className="text-sm">Total Doctors</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Calendar className="w-12 h-12 text-yellow-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalAppointmentsToday}</p>
//                 <p className="text-sm">Appointments Today</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <DollarSign className="w-12 h-12 text-purple-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">₹{stats.revenueToday} / ₹{stats.revenueThisMonth}</p>
//                 <p className="text-sm">Revenue (Today/Month)</p>
//               </div>
//             </div>
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Appointment Trends */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentTrends}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Revenue Growth */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={revenueGrowth}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* User Signups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">User Signups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={userSignups}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie/Donut Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Status */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentStatus}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentStatus.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Payment Method Usage */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={paymentMethods}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {paymentMethods.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Specialization Demand */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialization Demand ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={specializationDemand}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {specializationDemand.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Top Doctors */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Doctors by Appointments</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-700">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3">Doctor</th>
//                     <th className="px-6 py-3">Specialization</th>
//                     <th className="px-6 py-3">Appointments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topDoctors.length === 0 ? (
//                     <tr>
//                       <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                         No doctors found
//                       </td>
//                     </tr>
//                   ) : (
//                     topDoctors.map((doctor, index) => (
//                       <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                         <td className="px-6 py-4">{doctor.name}</td>
//                         <td className="px-6 py-4">{doctor.specialization}</td>
//                         <td className="px-6 py-4">{doctor.count}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Recent Activity Logs */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h2>
//             <div className="max-h-[200px] overflow-y-auto">
//               {activityLogs.length === 0 ? (
//                 <p className="text-gray-500 text-center">No recent activity</p>
//               ) : (
//                 activityLogs.map((log, index) => (
//                   <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-200">
//                     <div>
//                       {log.type === "doctor_registration" && <Stethoscope className="w-5 h-5 text-green-600" />}
//                       {log.type === "user_complaint" && <AlertTriangle className="w-5 h-5 text-red-600" />}
//                       {log.type === "system_alert" && <Activity className="w-5 h-5 text-yellow-600" />}
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-700">{log.message}</p>
//                       <p className="text-xs text-gray-500">{moment(log.timestamp).format("MMM DD, YYYY h:mm A")}</p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Revenue Breakdown */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown ({filter.label})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* By Date */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Date</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Date</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDate.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDate.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.date}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Doctor */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Doctor</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Doctor</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDoctor.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDoctor.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Specialization */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Specialization</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Specialization</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.bySpecialization.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.bySpecialization.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





























// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Users, Stethoscope, Calendar, DollarSign, Activity, AlertTriangle, Filter, List } from "lucide-react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "confirmed" | "cancelled" | "pending";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctor: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     specialization: string;
//     educationDetails: string;
//     yearOfExperience: number;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     gender: "male" | "female" | "other";
//     dateOfBirth: string;
//     city: string;
//     state: string;
//     country: string;
//     houseName: string;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
// }

// interface Stats {
//   totalUsers: number;
//   totalDoctors: number;
//   totalAppointmentsToday: number;
//   revenueToday: number;
//   revenueThisMonth: number;
// }

// interface FilterOption {
//   value: "daily" | "weekly" | "monthly" | "next7days";
//   label: string;
// }

// interface ActivityLog {
//   type: "doctor_registration" | "user_complaint" | "system_alert";
//   message: string;
//   timestamp: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [filter, setFilter] = useState<FilterOption>({ value: "daily", label: "Daily" });
//   const { user } = useAuthStore();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/all-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-lg text-gray-700">Access denied. Please log in as an admin.</p>
//       </div>
//     );
//   }

//   // Mock data for users and doctors (replace with API calls if available)
//   const mockUsers = [
//     { _id: "6845483bc40b0f864b623085", createdAt: "2025-06-24T10:00:00Z" },
//     { _id: "6845483bc40b0f864b623086", createdAt: "2025-07-01T10:00:00Z" },
//   ];
//   const mockDoctors = [
//     { _id: "686cdcae7e0fb9f1ba633d8a", name: "Adarsh", specialization: "Pediatricians", createdAt: "2025-07-15T10:00:00Z" },
//   ];

//   // Get stats
//   const getStats = (): Stats => {
//     const today = moment();
//     const thisMonth = moment().startOf("month");
//     const uniqueUsers = new Set(appointments.map((app) => app.user._id)).size;
//     const uniqueDoctors = new Set(appointments.map((app) => app.doctor._id)).size;
//     return {
//       totalUsers: uniqueUsers || mockUsers.length,
//       totalDoctors: uniqueDoctors || mockDoctors.length,
//       totalAppointmentsToday: appointments.filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day")).length,
//       revenueToday: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//       revenueThisMonth: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(thisMonth, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Get filtered appointments
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "daily":
//           return appDate.isSame(today, "day");
//         case "weekly":
//           return appDate.isSameOrAfter(today.clone().subtract(6, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "monthly":
//           return appDate.isSameOrAfter(today.clone().subtract(29, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Get upcoming appointments
//   const getUpcomingAppointments = () => {
//     const today = moment();
//     return appointments
//       .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(today, "day"))
//       .sort((a, b) => {
//         const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//         const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//         return dateA.diff(dateB);
//       });
//   };

//   // Appointment trends
//   const getAppointmentTrends = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const count = filteredAppointments.filter((app) => app.date === date).length;
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Revenue growth
//   const getRevenueGrowth = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const revenue = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), revenue };
//     });
//     return data;
//   };

//   // User signups (mock data)
//   const getUserSignups = () => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const count = mockUsers.filter((user) => moment(user.createdAt).isSame(date, "day")).length;
//       return { date: moment(date).format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Appointment status
//   const getAppointmentStatus = (filteredAppointments: Appointment[]) => {
//     const status = { Confirmed: 0, Cancelled: 0, Pending: 0 };
//     filteredAppointments.forEach((app) => {
//       if (app.status === "confirmed") status.Confirmed++;
//       else if (app.status === "cancelled") status.Cancelled++;
//       else status.Pending++;
//     });
//     return Object.entries(status).map(([name, value]) => ({ name, value }));
//   };

//   // Payment method usage (mock data)
//   const getPaymentMethods = (filteredAppointments: Appointment[]) => [
//     { name: "Wallet", value: filteredAppointments.length * 0.7 },
//     { name: "Razorpay", value: filteredAppointments.length * 0.3 },
//   ];

//   // Specialization demand
//   const getSpecializationDemand = (filteredAppointments: Appointment[]) => {
//     const specs: { [key: string]: number } = {};
//     filteredAppointments.forEach((app) => {
//       const spec = app.doctor.specialization;
//       specs[spec] = (specs[spec] || 0) + 1;
//     });
//     return Object.entries(specs).map(([name, value]) => ({ name, value }));
//   };

//   // Top doctors
//   const getTopDoctors = (filteredAppointments: Appointment[]) => {
//     const doctorCounts: { [key: string]: { name: string; specialization: string; count: number } } = {};
//     filteredAppointments.forEach((app) => {
//       const doctorId = app.doctor._id;
//       if (!doctorCounts[doctorId]) {
//         doctorCounts[doctorId] = {
//           name: app.doctor.name,
//           specialization: app.doctor.specialization,
//           count: 0,
//         };
//       }
//       doctorCounts[doctorId].count++;
//     });
//     return Object.values(doctorCounts)
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5);
//   };

//   // Recent activity logs (mock data)
//   const getActivityLogs = (): ActivityLog[] => [
//     { type: "doctor_registration", message: "New doctor registered: Dr. Adarsh (Pediatricians)", timestamp: "2025-07-15T10:00:00Z" },
//     { type: "user_complaint", message: "User Abin submitted a complaint: 'Long wait time'", timestamp: "2025-07-30T12:00:00Z" },
//     { type: "system_alert", message: "System maintenance scheduled for 2025-08-03", timestamp: "2025-08-01T09:00:00Z" },
//   ];

//   // Revenue breakdown
//   const getRevenueBreakdown = (filteredAppointments: Appointment[]) => {
//     const byDate: { [key: string]: number } = {};
//     const byDoctor: { [key: string]: { name: string; revenue: number } } = {};
//     const bySpecialization: { [key: string]: number } = {};
//     filteredAppointments
//       .filter((app) => app.payment === "paid")
//       .forEach((app) => {
//         const date = moment(app.date, "DD/MM/YYYY").format("MMM DD");
//         byDate[date] = (byDate[date] || 0) + app.fee;
//         const doctorId = app.doctor._id;
//         if (!byDoctor[doctorId]) {
//           byDoctor[doctorId] = { name: app.doctor.name, revenue: 0 };
//         }
//         byDoctor[doctorId].revenue += app.fee;
//         const spec = app.doctor.specialization;
//         bySpecialization[spec] = (bySpecialization[spec] || 0) + app.fee;
//       });
//     return {
//       byDate: Object.entries(byDate).map(([date, revenue]) => ({ date, revenue })),
//       byDoctor: Object.entries(byDoctor).map(([_, data]) => data),
//       bySpecialization: Object.entries(bySpecialization).map(([name, revenue]) => ({ name, revenue })),
//     };
//   };

//   // Status badge styling
//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-medium px-2 py-0.5 rounded-full shadow-sm";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-50 text-yellow-700 border border-yellow-200`;
//       case "cancelled":
//         return `${base} bg-red-50 text-red-700 border border-red-200`;
//       case "confirmed":
//         return `${base} bg-green-50 text-green-700 border border-green-200`;
//       default:
//         return `${base} bg-gray-50 text-gray-600 border border-gray-200`;
//     }
//   };

//   const filteredAppointments = getFilteredAppointments();
//   const upcomingAppointments = getUpcomingAppointments();
//   const stats = getStats();
//   const appointmentTrends = getAppointmentTrends(filteredAppointments);
//   const revenueGrowth = getRevenueGrowth(filteredAppointments);
//   const userSignups = getUserSignups();
//   const appointmentStatus = getAppointmentStatus(filteredAppointments);
//   const paymentMethods = getPaymentMethods(filteredAppointments);
//   const specializationDemand = getSpecializationDemand(filteredAppointments);
//   const topDoctors = getTopDoctors(filteredAppointments);
//   const activityLogs = getActivityLogs();
//   const revenueBreakdown = getRevenueBreakdown(filteredAppointments);

//   const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444"];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col font-['Inter']">
//       <style>
//         {`
//           * {
//             font-family: 'Inter', sans-serif;
//           }
//           .recharts-tooltip-wrapper {
//             background: rgba(255, 255, 255, 0.95);
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }
//           .recharts-tooltip-label {
//             font-weight: 600;
//             color: #1f2937;
//           }
//         `}
//       </style>
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
//               <p className="text-sm text-gray-500">Monitor platform activity, revenue, and performance</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: { daily: "Daily", weekly: "Weekly", monthly: "Monthly", next7days: "Next 7 Days" }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="next7days">Next 7 Days</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Users className="w-12 h-12 text-blue-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalUsers}</p>
//                 <p className="text-sm">Total Users</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Stethoscope className="w-12 h-12 text-green-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalDoctors}</p>
//                 <p className="text-sm">Total Doctors</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Calendar className="w-12 h-12 text-yellow-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalAppointmentsToday}</p>
//                 <p className="text-sm">Appointments Today</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <DollarSign className="w-12 h-12 text-purple-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">₹{stats.revenueToday} / ₹{stats.revenueThisMonth}</p>
//                 <p className="text-sm">Revenue (Today/Month)</p>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {upcomingAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No upcoming appointments.</div>
//               ) : (
//                 upcomingAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-gray-50 group transition-all duration-300"
//                   >
//                     <img
//                       className="rounded-full w-10 h-10 object-cover border border-gray-200"
//                       src={app.user.photo || "/default-avatar.png"}
//                       alt={app.user.name}
//                     />
//                     <div className="flex-1 text-sm">
//                       <p className="text-gray-800 font-medium group-hover:text-blue-900 transition">
//                         {app.user.name}
//                       </p>
//                       <p className="text-gray-600 group-hover:text-blue-700 transition">
//                         {app.date} at {app.time}
//                       </p>
//                     </div>
//                     <span className={getStatusBadge(app.status)}>{app.status}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Appointment Trends */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentTrends}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Revenue Growth */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={revenueGrowth}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* User Signups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">User Signups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={userSignups}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie/Donut Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Status */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentStatus}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentStatus.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Payment Method Usage */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={paymentMethods}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {paymentMethods.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Specialization Demand */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialization Demand ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={specializationDemand}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {specializationDemand.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Top Doctors */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Doctors by Appointments</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-700">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3">Doctor</th>
//                     <th className="px-6 py-3">Specialization</th>
//                     <th className="px-6 py-3">Appointments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topDoctors.length === 0 ? (
//                     <tr>
//                       <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                         No doctors found
//                       </td>
//                     </tr>
//                   ) : (
//                     topDoctors.map((doctor, index) => (
//                       <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                         <td className="px-6 py-4">{doctor.name}</td>
//                         <td className="px-6 py-4">{doctor.specialization}</td>
//                         <td className="px-6 py-4">{doctor.count}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Recent Activity Logs */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h2>
//             <div className="max-h-[200px] overflow-y-auto">
//               {activityLogs.length === 0 ? (
//                 <p className="text-gray-500 text-center">No recent activity</p>
//               ) : (
//                 activityLogs.map((log, index) => (
//                   <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-200">
//                     <div>
//                       {log.type === "doctor_registration" && <Stethoscope className="w-5 h-5 text-green-600" />}
//                       {log.type === "user_complaint" && <AlertTriangle className="w-5 h-5 text-red-600" />}
//                       {log.type === "system_alert" && <Activity className="w-5 h-5 text-yellow-600" />}
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-700">{log.message}</p>
//                       <p className="text-xs text-gray-500">{moment(log.timestamp).format("MMM DD, YYYY h:mm A")}</p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Revenue Breakdown */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown ({filter.label})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* By Date */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Date</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Date</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDate.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDate.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.date}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Doctor */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Doctor</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Doctor</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDoctor.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDoctor.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Specialization */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Specialization</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Specialization</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.bySpecialization.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.bySpecialization.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
















// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Users, Stethoscope, DollarSign, Activity, AlertTriangle, Filter, List, CheckCircle, XCircle, Clock, CheckSquare } from "lucide-react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "confirmed" | "cancelled" | "pending" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctor: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     specialization: string;
//     educationDetails: string;
//     yearOfExperience: number;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     photo: string;
//     gender: "male" | "female" | "other";
//     dateOfBirth: string;
//     city: string;
//     state: string;
//     country: string;
//     houseName: string;
//     isVerified: boolean;
//     isBlocked: boolean;
//   };
// }

// interface Stats {
//   totalUsers: number;
//   totalDoctors: number;
//   appointmentsConfirmed: number;
//   appointmentsCancelled: number;
//   appointmentsPending: number;
//   appointmentsCompleted: number;
//   revenueToday: number;
//   revenueThisMonth: number;
// }

// interface FilterOption {
//   value: "daily" | "weekly" | "monthly" | "next7days";
//   label: string;
// }

// interface ActivityLog {
//   type: "doctor_registration" | "user_complaint" | "system_alert";
//   message: string;
//   timestamp: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [filter, setFilter] = useState<FilterOption>({ value: "daily", label: "Daily" });
//   const { user } = useAuthStore();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/all-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-lg text-gray-700">Access denied. Please log in as an admin.</p>
//       </div>
//     );
//   }

//   // Mock data for users and doctors (replace with API calls if available)
//   const mockUsers = [
//     { _id: "6845483bc40b0f864b623085", createdAt: "2025-06-24T10:00:00Z" },
//     { _id: "6845483bc40b0f864b623086", createdAt: "2025-07-01T10:00:00Z" },
//   ];
//   const mockDoctors = [
//     { _id: "686cdcae7e0fb9f1ba633d8a", name: "Adarsh", specialization: "Pediatricians", createdAt: "2025-07-15T10:00:00Z" },
//   ];

//   // Get stats
//   const getStats = (): Stats => {
//     const today = moment();
//     const thisMonth = moment().startOf("month");
//     const uniqueUsers = new Set(appointments.map((app) => app.user._id)).size;
//     const uniqueDoctors = new Set(appointments.map((app) => app.doctor._id)).size;
//     return {
//       totalUsers: uniqueUsers || mockUsers.length,
//       totalDoctors: uniqueDoctors || mockDoctors.length,
//       appointmentsConfirmed: appointments.filter((app) => app.status === "confirmed").length,
//       appointmentsCancelled: appointments.filter((app) => app.status === "cancelled").length,
//       appointmentsPending: appointments.filter((app) => app.status === "pending").length,
//       appointmentsCompleted: appointments.filter((app) => app.status === "completed").length,
//       revenueToday: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//       revenueThisMonth: appointments
//         .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(thisMonth, "day") && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Get filtered appointments
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "daily":
//           return appDate.isSame(today, "day");
//         case "weekly":
//           return appDate.isSameOrAfter(today.clone().subtract(6, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "monthly":
//           return appDate.isSameOrAfter(today.clone().subtract(29, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Get upcoming appointments
//   const getUpcomingAppointments = () => {
//     const today = moment();
//     return appointments
//       .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(today, "day"))
//       .sort((a, b) => {
//         const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//         const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//         return dateA.diff(dateB);
//       });
//   };

//   // Appointment trends
//   const getAppointmentTrends = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const count = filteredAppointments.filter((app) => app.date === date).length;
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Revenue growth
//   const getRevenueGrowth = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const revenue = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), revenue };
//     });
//     return data;
//   };

//   // User signups (mock data)
//   const getUserSignups = () => {
//     const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "monthly" || filter.value === "weekly"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const count = mockUsers.filter((user) => moment(user.createdAt).isSame(date, "day")).length;
//       return { date: moment(date).format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Appointment status
//   const getAppointmentStatus = (filteredAppointments: Appointment[]) => {
//     const status = { Confirmed: 0, Cancelled: 0, Pending: 0, Completed: 0 };
//     filteredAppointments.forEach((app) => {
//       if (app.status === "confirmed") status.Confirmed++;
//       else if (app.status === "cancelled") status.Cancelled++;
//       else if (app.status === "pending") status.Pending++;
//       else if (app.status === "completed") status.Completed++;
//     });
//     return Object.entries(status).map(([name, value]) => ({ name, value }));
//   };

//   // Payment method usage (mock data)
//   const getPaymentMethods = (filteredAppointments: Appointment[]) => [
//     { name: "Wallet", value: filteredAppointments.length * 0.7 },
//     { name: "Razorpay", value: filteredAppointments.length * 0.3 },
//   ];

//   // Specialization demand
//   const getSpecializationDemand = (filteredAppointments: Appointment[]) => {
//     const specs: { [key: string]: number } = {};
//     filteredAppointments.forEach((app) => {
//       const spec = app.doctor.specialization;
//       specs[spec] = (specs[spec] || 0) + 1;
//     });
//     return Object.entries(specs).map(([name, value]) => ({ name, value }));
//   };

//   // Top doctors
//   const getTopDoctors = (filteredAppointments: Appointment[]) => {
//     const doctorCounts: { [key: string]: { name: string; specialization: string; count: number } } = {};
//     filteredAppointments.forEach((app) => {
//       const doctorId = app.doctor._id;
//       if (!doctorCounts[doctorId]) {
//         doctorCounts[doctorId] = {
//           name: app.doctor.name,
//           specialization: app.doctor.specialization,
//           count: 0,
//         };
//       }
//       doctorCounts[doctorId].count++;
//     });
//     return Object.values(doctorCounts)
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5);
//   };

//   // Recent activity logs (mock data)
//   const getActivityLogs = (): ActivityLog[] => [
//     { type: "doctor_registration", message: "New doctor registered: Dr. Adarsh (Pediatricians)", timestamp: "2025-07-15T10:00:00Z" },
//     { type: "user_complaint", message: "User Abin submitted a complaint: 'Long wait time'", timestamp: "2025-07-30T12:00:00Z" },
//     { type: "system_alert", message: "System maintenance scheduled for 2025-08-03", timestamp: "2025-08-01T09:00:00Z" },
//   ];

//   // Revenue breakdown
//   const getRevenueBreakdown = (filteredAppointments: Appointment[]) => {
//     const byDate: { [key: string]: number } = {};
//     const byDoctor: { [key: string]: { name: string; revenue: number } } = {};
//     const bySpecialization: { [key: string]: number } = {};
//     filteredAppointments
//       .filter((app) => app.payment === "paid")
//       .forEach((app) => {
//         const date = moment(app.date, "DD/MM/YYYY").format("MMM DD");
//         byDate[date] = (byDate[date] || 0) + app.fee;
//         const doctorId = app.doctor._id;
//         if (!byDoctor[doctorId]) {
//           byDoctor[doctorId] = { name: app.doctor.name, revenue: 0 };
//         }
//         byDoctor[doctorId].revenue += app.fee;
//         const spec = app.doctor.specialization;
//         bySpecialization[spec] = (bySpecialization[spec] || 0) + app.fee;
//       });
//     return {
//       byDate: Object.entries(byDate).map(([date, revenue]) => ({ date, revenue })),
//       byDoctor: Object.entries(byDoctor).map(([_, data]) => data),
//       bySpecialization: Object.entries(bySpecialization).map(([name, revenue]) => ({ name, revenue })),
//     };
//   };

//   // Status badge styling
//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-medium px-2 py-0.5 rounded-full shadow-sm";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-50 text-yellow-700 border border-yellow-200`;
//       case "cancelled":
//         return `${base} bg-red-50 text-red-700 border border-red-200`;
//       case "confirmed":
//         return `${base} bg-green-50 text-green-700 border border-green-200`;
//       case "completed":
//         return `${base} bg-blue-50 text-blue-700 border border-blue-200`;
//       default:
//         return `${base} bg-gray-50 text-gray-600 border border-gray-200`;
//     }
//   };

//   const filteredAppointments = getFilteredAppointments();
//   const upcomingAppointments = getUpcomingAppointments();
//   const stats = getStats();
//   const appointmentTrends = getAppointmentTrends(filteredAppointments);
//   const revenueGrowth = getRevenueGrowth(filteredAppointments);
//   const userSignups = getUserSignups();
//   const appointmentStatus = getAppointmentStatus(filteredAppointments);
//   const paymentMethods = getPaymentMethods(filteredAppointments);
//   const specializationDemand = getSpecializationDemand(filteredAppointments);
//   const topDoctors = getTopDoctors(filteredAppointments);
//   const activityLogs = getActivityLogs();
//   const revenueBreakdown = getRevenueBreakdown(filteredAppointments);

//   const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444"];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col font-['Inter']">
//       <style>
//         {`
//           * {
//             font-family: 'Inter', sans-serif;
//           }
//           .recharts-tooltip-wrapper {
//             background: rgba(255, 255, 255, 0.95);
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }
//           .recharts-tooltip-label {
//             font-weight: 600;
//             color: #1f2937;
//           }
//         `}
//       </style>
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
//               <p className="text-sm text-gray-500">Monitor platform activity, revenue, and performance</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: { daily: "Daily", weekly: "Weekly", monthly: "Monthly", next7days: "Next 7 Days" }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="next7days">Next 7 Days</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Users className="w-12 h-12 text-blue-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalUsers}</p>
//                 <p className="text-sm">Total Users</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Stethoscope className="w-12 h-12 text-green-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.totalDoctors}</p>
//                 <p className="text-sm">Total Doctors</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <DollarSign className="w-12 h-12 text-purple-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">₹{stats.revenueToday} / ₹{stats.revenueThisMonth}</p>
//                 <p className="text-sm">Revenue (Today/Month)</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <CheckCircle className="w-12 h-12 text-green-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.appointmentsConfirmed}</p>
//                 <p className="text-sm">Confirmed Appointments</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <XCircle className="w-12 h-12 text-red-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.appointmentsCancelled}</p>
//                 <p className="text-sm">Cancelled Appointments</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <Clock className="w-12 h-12 text-yellow-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.appointmentsPending}</p>
//                 <p className="text-sm">Pending Appointments</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
//               <CheckSquare className="w-12 h-12 text-blue-600 hover:text-white" />
//               <div>
//                 <p className="text-xl font-semibold">{stats.appointmentsCompleted}</p>
//                 <p className="text-sm">Completed Appointments</p>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {upcomingAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No upcoming appointments.</div>
//               ) : (
//                 upcomingAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-gray-50 group transition-all duration-300"
//                   >
//                     <img
//                       className="rounded-full w-10 h-10 object-cover border border-gray-200"
//                       src={app.user.photo || "/default-avatar.png"}
//                       alt={app.user.name}
//                     />
//                     <div className="flex-1 text-sm">
//                       <p className="text-gray-800 font-medium group-hover:text-blue-900 transition">
//                         {app.user.name}
//                       </p>
//                       <p className="text-gray-600 group-hover:text-blue-700 transition">
//                         {app.date} at {app.time}
//                       </p>
//                     </div>
//                     <span className={getStatusBadge(app.status)}>{app.status}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Appointment Trends */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentTrends}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Revenue Growth */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={revenueGrowth}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* User Signups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">User Signups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={userSignups}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie/Donut Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Status */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentStatus}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentStatus.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Payment Method Usage */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={paymentMethods}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {paymentMethods.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Specialization Demand */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialization Demand ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={specializationDemand}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {specializationDemand.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Top Doctors */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Doctors by Appointments</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-700">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3">Doctor</th>
//                     <th className="px-6 py-3">Specialization</th>
//                     <th className="px-6 py-3">Appointments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topDoctors.length === 0 ? (
//                     <tr>
//                       <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                         No doctors found
//                       </td>
//                     </tr>
//                   ) : (
//                     topDoctors.map((doctor, index) => (
//                       <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                         <td className="px-6 py-4">{doctor.name}</td>
//                         <td className="px-6 py-4">{doctor.specialization}</td>
//                         <td className="px-6 py-4">{doctor.count}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Recent Activity Logs */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h2>
//             <div className="max-h-[200px] overflow-y-auto">
//               {activityLogs.length === 0 ? (
//                 <p className="text-gray-500 text-center">No recent activity</p>
//               ) : (
//                 activityLogs.map((log, index) => (
//                   <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-200">
//                     <div>
//                       {log.type === "doctor_registration" && <Stethoscope className="w-5 h-5 text-green-600" />}
//                       {log.type === "user_complaint" && <AlertTriangle className="w-5 h-5 text-red-600" />}
//                       {log.type === "system_alert" && <Activity className="w-5 h-5 text-yellow-600" />}
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-700">{log.message}</p>
//                       <p className="text-xs text-gray-500">{moment(log.timestamp).format("MMM DD, YYYY h:mm A")}</p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Revenue Breakdown */}
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown ({filter.label})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* By Date */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Date</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Date</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDate.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDate.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.date}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Doctor */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Doctor</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Doctor</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.byDoctor.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.byDoctor.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               {/* By Specialization */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">By Specialization</h3>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left text-gray-700">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2">Specialization</th>
//                         <th className="px-4 py-2">Revenue</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {revenueBreakdown.bySpecialization.length === 0 ? (
//                         <tr>
//                           <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
//                             No revenue data
//                           </td>
//                         </tr>
//                       ) : (
//                         revenueBreakdown.bySpecialization.map((entry, index) => (
//                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                             <td className="px-4 py-2">{entry.name}</td>
//                             <td className="px-4 py-2">₹{entry.revenue}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

























































import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Stethoscope, DollarSign, Activity, AlertTriangle, Filter, List, CheckCircle, XCircle, Clock, CheckSquare } from "lucide-react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

interface Appointment {
  _id: string;
  appointmentNo: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "pending" | "completed";
  payment: "paid" | "refund" | "not paid";
  fee: number;
  doctor: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    specialization: string;
    educationDetails: string;
    yearOfExperience: number;
    isVerified: boolean;
    isBlocked: boolean;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    city: string;
    state: string;
    country: string;
    houseName: string;
    isVerified: boolean;
    isBlocked: boolean;
  };
}

interface Stats {
  totalUsers: number;
  totalDoctors: number;
  appointmentsConfirmed: number;
  appointmentsCancelled: number;
  appointmentsPending: number;
  appointmentsCompleted: number;
  revenueToday: number;
  revenueThisMonth: number;
}

interface FilterOption {
  value: "all" | "daily" | "weekly" | "monthly" | "next7days";
  label: string;
}

interface ActivityLog {
  type: "doctor_registration" | "user_complaint" | "system_alert";
  message: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<FilterOption>({ value: "all", label: "All Data" });
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/all-appointments");
        setAppointments(res.data.data || []);
        console.log("Appointments:", res.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">Access denied. Please log in as an admin.</p>
      </div>
    );
  }

  // Mock data for users and doctors (replace with API calls if available)
  const mockUsers = [
    { _id: "6845483bc40b0f864b623085", createdAt: "2025-06-24T10:00:00Z" },
    { _id: "6845483bc40b0f864b623086", createdAt: "2025-07-01T10:00:00Z" },
  ];
  const mockDoctors = [
    { _id: "686cdcae7e0fb9f1ba633d8a", name: "Adarsh", specialization: "Pediatricians", createdAt: "2025-07-15T10:00:00Z" },
  ];

  // Get filtered appointments
  const getFilteredAppointments = () => {
    const today = moment();
    return appointments.filter((app) => {
      const appDate = moment(app.date, "DD/MM/YYYY");
      switch (filter.value) {
        case "all":
          return true;
        case "daily":
          return appDate.isSame(today, "day");
        case "weekly":
          return appDate.isSameOrAfter(today.clone().subtract(6, "days"), "day") && appDate.isSameOrBefore(today, "day");
        case "monthly":
          return appDate.isSameOrAfter(today.clone().subtract(29, "days"), "day") && appDate.isSameOrBefore(today, "day");
        case "next7days":
          return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
        default:
          return true;
      }
    });
  };

  // Get stats
  const getStats = (filteredAppointments: Appointment[]): Stats => {
    const today = moment();
    const thisMonth = moment().startOf("month");
    return {
      totalUsers: new Set(filteredAppointments.map((app) => app.user._id)).size || mockUsers.length,
      totalDoctors: new Set(filteredAppointments.map((app) => app.doctor._id)).size || mockDoctors.length,
      appointmentsConfirmed: filteredAppointments.filter((app) => app.status === "confirmed").length,
      appointmentsCancelled: filteredAppointments.filter((app) => app.status === "cancelled").length,
      appointmentsPending: filteredAppointments.filter((app) => app.status === "pending").length,
      appointmentsCompleted: filteredAppointments.filter((app) => app.status === "completed").length,
      revenueToday: filteredAppointments
        .filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day") && app.payment === "paid")
        .reduce((sum, app) => sum + app.fee, 0),
      revenueThisMonth: filteredAppointments
        .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(thisMonth, "day") && app.payment === "paid")
        .reduce((sum, app) => sum + app.fee, 0),
    };
  };

  // Get upcoming appointments
  const getUpcomingAppointments = (filteredAppointments: Appointment[]) => {
    const today = moment();
    return filteredAppointments
      .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(today, "day"))
      .sort((a, b) => {
        const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
        const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
        return dateA.diff(dateB);
      });
  };

  // Appointment trends
  const getAppointmentTrends = (filteredAppointments: Appointment[]) => {
    const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
    const startDate = filter.value === "monthly" || filter.value === "weekly"
      ? moment().subtract(days - 1, "days")
      : filter.value === "next7days"
      ? moment()
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
      const count = filteredAppointments.filter((app) => app.date === date).length;
      return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
    });
    return filter.value === "all" ? filteredAppointments.map((app) => ({
      date: moment(app.date, "DD/MM/YYYY").format("MMM DD"),
      count: 1
    })).reduce((acc: { date: string; count: number }[], curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      if (existing) {
        existing.count += curr.count;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []).sort((a, b) => moment(a.date, "MMM DD").diff(moment(b.date, "MMM DD"))) : data;
  };

  // Revenue growth
  const getRevenueGrowth = (filteredAppointments: Appointment[]) => {
    const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
    const startDate = filter.value === "monthly" || filter.value === "weekly"
      ? moment().subtract(days - 1, "days")
      : filter.value === "next7days"
      ? moment()
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
      const revenue = filteredAppointments
        .filter((app) => app.date === date && app.payment === "paid")
        .reduce((sum, app) => sum + app.fee, 0);
      return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), revenue };
    });
    return filter.value === "all" ? filteredAppointments
      .filter((app) => app.payment === "paid")
      .map((app) => ({
        date: moment(app.date, "DD/MM/YYYY").format("MMM DD"),
        revenue: app.fee
      }))
      .reduce((acc: { date: string; revenue: number }[], curr) => {
        const existing = acc.find((item) => item.date === curr.date);
        if (existing) {
          existing.revenue += curr.revenue;
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])
      .sort((a, b) => moment(a.date, "MMM DD").diff(moment(b.date, "MMM DD"))) : data;
  };

  // User signups (mock data)
  const getUserSignups = () => {
    const days = filter.value === "monthly" ? 30 : filter.value === "weekly" || filter.value === "next7days" ? 7 : 1;
    const startDate = filter.value === "monthly" || filter.value === "weekly"
      ? moment().subtract(days - 1, "days")
      : filter.value === "next7days"
      ? moment()
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
      const count = mockUsers.filter((user) => moment(user.createdAt).isSame(date, "day")).length;
      return { date: moment(date).format("MMM DD"), count };
    });
    return filter.value === "all" ? mockUsers.map((user) => ({
      date: moment(user.createdAt).format("MMM DD"),
      count: 1
    })).reduce((acc: { date: string; count: number }[], curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      if (existing) {
        existing.count += curr.count;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []).sort((a, b) => moment(a.date, "MMM DD").diff(moment(b.date, "MMM DD"))) : data;
  };

  // Appointment status
  const getAppointmentStatus = (filteredAppointments: Appointment[]) => {
    const status = { Confirmed: 0, Cancelled: 0, Pending: 0, Completed: 0 };
    filteredAppointments.forEach((app) => {
      if (app.status === "confirmed") status.Confirmed++;
      else if (app.status === "cancelled") status.Cancelled++;
      else if (app.status === "pending") status.Pending++;
      else if (app.status === "completed") status.Completed++;
    });
    return Object.entries(status).map(([name, value]) => ({ name, value }));
  };

  // Payment method usage (mock data)
  const getPaymentMethods = (filteredAppointments: Appointment[]) => [
    { name: "Wallet", value: filteredAppointments.length * 0.7 },
    { name: "Razorpay", value: filteredAppointments.length * 0.3 },
  ];

  // Specialization demand
  const getSpecializationDemand = (filteredAppointments: Appointment[]) => {
    const specs: { [key: string]: number } = {};
    filteredAppointments.forEach((app) => {
      const spec = app.doctor.specialization;
      specs[spec] = (specs[spec] || 0) + 1;
    });
    return Object.entries(specs).map(([name, value]) => ({ name, value }));
  };

  // Top doctors
  const getTopDoctors = (filteredAppointments: Appointment[]) => {
    const doctorCounts: { [key: string]: { name: string; specialization: string; count: number } } = {};
    filteredAppointments.forEach((app) => {
      const doctorId = app.doctor._id;
      if (!doctorCounts[doctorId]) {
        doctorCounts[doctorId] = {
          name: app.doctor.name,
          specialization: app.doctor.specialization,
          count: 0,
        };
      }
      doctorCounts[doctorId].count++;
    });
    return Object.values(doctorCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Recent activity logs (mock data)
  const getActivityLogs = (): ActivityLog[] => [
    { type: "doctor_registration", message: "New doctor registered: Dr. Adarsh (Pediatricians)", timestamp: "2025-07-15T10:00:00Z" },
    { type: "user_complaint", message: "User Abin submitted a complaint: 'Long wait time'", timestamp: "2025-07-30T12:00:00Z" },
    { type: "system_alert", message: "System maintenance scheduled for 2025-08-03", timestamp: "2025-08-01T09:00:00Z" },
  ];

  // Revenue breakdown
  const getRevenueBreakdown = (filteredAppointments: Appointment[]) => {
    const byDate: { [key: string]: number } = {};
    const byDoctor: { [key: string]: { name: string; revenue: number } } = {};
    const bySpecialization: { [key: string]: number } = {};
    filteredAppointments
      .filter((app) => app.payment === "paid")
      .forEach((app) => {
        const date = moment(app.date, "DD/MM/YYYY").format("MMM DD");
        byDate[date] = (byDate[date] || 0) + app.fee;
        const doctorId = app.doctor._id;
        if (!byDoctor[doctorId]) {
          byDoctor[doctorId] = { name: app.doctor.name, revenue: 0 };
        }
        byDoctor[doctorId].revenue += app.fee;
        const spec = app.doctor.specialization;
        bySpecialization[spec] = (bySpecialization[spec] || 0) + app.fee;
      });
    return {
      byDate: Object.entries(byDate).map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => moment(a.date, "MMM DD").diff(moment(b.date, "MMM DD"))),
      byDoctor: Object.entries(byDoctor).map(([_, data]) => data),
      bySpecialization: Object.entries(bySpecialization).map(([name, revenue]) => ({ name, revenue })),
    };
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
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

  const filteredAppointments = getFilteredAppointments();
  const stats = getStats(filteredAppointments);
  const upcomingAppointments = getUpcomingAppointments(filteredAppointments);
  const appointmentTrends = getAppointmentTrends(filteredAppointments);
  const revenueGrowth = getRevenueGrowth(filteredAppointments);
  const userSignups = getUserSignups();
  const appointmentStatus = getAppointmentStatus(filteredAppointments);
  const paymentMethods = getPaymentMethods(filteredAppointments);
  const specializationDemand = getSpecializationDemand(filteredAppointments);
  const topDoctors = getTopDoctors(filteredAppointments);
  const activityLogs = getActivityLogs();
  const revenueBreakdown = getRevenueBreakdown(filteredAppointments);

  const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-['Inter']">
      <style>
        {`
          * {
            font-family: 'Inter', sans-serif;
          }
          .recharts-tooltip-wrapper {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .recharts-tooltip-label {
            font-weight: 600;
            color: #1f2937;
          }
        `}
      </style>
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
          {/* Header and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Monitor platform activity, revenue, and performance</p>
            </div>
            <div className="relative">
              <select
                value={filter.value}
                onChange={(e) => {
                  const value = e.target.value as FilterOption["value"];
                  setFilter({
                    value,
                    label: { all: "All Data", daily: "Daily", weekly: "Weekly", monthly: "Monthly", next7days: "Next 7 Days" }[value],
                  });
                }}
                className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
              >
                <option value="all">All Data</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="next7days">Next 7 Days</option>
              </select>
              <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <Users className="w-12 h-12 text-blue-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.totalUsers}</p>
                <p className="text-sm">Total Users</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <Stethoscope className="w-12 h-12 text-green-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.totalDoctors}</p>
                <p className="text-sm">Total Doctors</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <DollarSign className="w-12 h-12 text-purple-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">₹{stats.revenueToday} / ₹{stats.revenueThisMonth}</p>
                <p className="text-sm">Revenue (Today/Month)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <CheckCircle className="w-12 h-12 text-green-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.appointmentsConfirmed}</p>
                <p className="text-sm">Confirmed Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <XCircle className="w-12 h-12 text-red-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.appointmentsCancelled}</p>
                <p className="text-sm">Cancelled Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <Clock className="w-12 h-12 text-yellow-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.appointmentsPending}</p>
                <p className="text-sm">Pending Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white">
              <CheckSquare className="w-12 h-12 text-blue-600 hover:text-white" />
              <div>
                <p className="text-xl font-semibold">{stats.appointmentsCompleted}</p>
                <p className="text-sm">Completed Appointments</p>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <List className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments ({filter.label})</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
              {upcomingAppointments.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No upcoming appointments.</div>
              ) : (
                upcomingAppointments.map((app) => (
                  <div
                    key={app._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-gray-50 group transition-all duration-300"
                  >
                    <img
                      className="rounded-full w-10 h-10 object-cover border border-gray-200"
                      src={app.user.photo || "/default-avatar.png"}
                      alt={app.user.name}
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium group-hover:text-blue-900 transition">
                        {app.user.name}
                      </p>
                      <p className="text-gray-600 group-hover:text-blue-700 transition">
                        {app.date} at {app.time}
                      </p>
                    </div>
                    <span className={getStatusBadge(app.status)}>{app.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointment Trends */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Growth */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* User Signups */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Signups ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userSignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie/Donut Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Appointment Status */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={appointmentStatus}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {appointmentStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Method Usage */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Specialization Demand */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialization Demand ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={specializationDemand}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {specializationDemand.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Doctors */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Doctors by Appointments ({filter.label})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Doctor</th>
                    <th className="px-6 py-3">Specialization</th>
                    <th className="px-6 py-3">Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {topDoctors.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        No doctors found
                      </td>
                    </tr>
                  ) : (
                    topDoctors.map((doctor, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{doctor.name}</td>
                        <td className="px-6 py-4">{doctor.specialization}</td>
                        <td className="px-6 py-4">{doctor.count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity Logs */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h2>
            <div className="max-h-[200px] overflow-y-auto">
              {activityLogs.length === 0 ? (
                <p className="text-gray-500 text-center">No recent activity</p>
              ) : (
                activityLogs.map((log, index) => (
                  <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-200">
                    <div>
                      {log.type === "doctor_registration" && <Stethoscope className="w-5 h-5 text-green-600" />}
                      {log.type === "user_complaint" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                      {log.type === "system_alert" && <Activity className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{log.message}</p>
                      <p className="text-xs text-gray-500">{moment(log.timestamp).format("MMM DD, YYYY h:mm A")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown ({filter.label})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* By Date */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">By Date</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.byDate.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.byDate.map((entry, index) => (
                          <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{entry.date}</td>
                            <td className="px-4 py-2">₹{entry.revenue}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* By Doctor */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">By Doctor</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-2">Doctor</th>
                        <th className="px-4 py-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.byDoctor.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.byDoctor.map((entry, index) => (
                          <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{entry.name}</td>
                            <td className="px-4 py-2">₹{entry.revenue}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* By Specialization */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">By Specialization</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-2">Specialization</th>
                        <th className="px-4 py-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.bySpecialization.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.bySpecialization.map((entry, index) => (
                          <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{entry.name}</td>
                            <td className="px-4 py-2">₹{entry.revenue}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;