

// import React, { useEffect } from "react";
// import { assets } from "../../assets/assets2";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";

// const DoctorDashboard: React.FC = () => {
 

//   useEffect(()=>{
//      try {
//        async function fetchApp(){
//           const res = await axiosInstance.get("/doctor-appointments");
//           console.log("res.data : ", res);
//        }
//        fetchApp();
//      }catch (error) {
//         console.log("error : ",error);
//      }
//   },[])
  
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
      
//       <Navbar />

//       <div className="flex flex-1 flex-row">
      
//         <Sidebar />

       
//         <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 mt-12">
         
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
//             <div className='flex text-gray-700 items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
//           <img className='w-14' src={assets.earning_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '>0</p>
//             <p >Earnings</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '>0</p>
//             <p >Appointments</p>
//           </div>
//         </div>
//                 <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all hover:bg-[#5F6FFF] hover:text-white '>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold '>0</p>
//             <p >Patients</p></div>
//         </div>
           
//           </div>

//           {/* Latest Bookings */}
//           {/* <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-[#f9f9ff]">
//               <img src={assets.list_icon} alt="List Icon" className="w-5 h-5" />
//               <p className="font-semibold text-gray-700">Latest Bookings</p>
//             </div>

            
//             <div className="divide-y divide-gray-200">
//               {[1, 2, 3, 4, 5].map((_, index) => (
//                 <div
//                   key={index}
                 
//                   className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-[#5F6FFF] group transition-all duration-300 ease-in-out transform hover:scale-103"
//                 >
//                   <img
//                     className="rounded-full w-10 h-10"
//                     src="https://via.placeholder.com/40"
//                     alt="User"
//                   />
//                   <div className="flex-1 text-sm">
//                     <p className="text-gray-800 font-medium group-hover:text-white transition">
//                       John Doe {index + 1}
//                     </p>
//                     <p className="text-gray-600 group-hover:text-white transition">
//                       Booking on June {10 + index}, 2025
//                     </p>
//                   </div>
//                   <div className="flex gap-2 ml-auto">
//                     <img
//                       className="w-8 h-8 cursor-pointer transform hover:scale-110 transition"
//                       src={assets.cancel_icon}
//                       alt="Cancel"
//                     />
//                     <img
//                       className="w-8 h-8 cursor-pointer transform hover:scale-110 transition"
//                       src={assets.tick_icon}
//                       alt="Complete"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;








// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Stats {
//   totalAppointmentsToday: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarningsToday: number;
// }

// interface ChartPeriod {
//   value: "week" | "month";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [chartPeriod, setChartPeriod] = useState<ChartPeriod>({ value: "week", label: "Last 7 Days" });

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // Calculate today's stats
//   const getTodayStats = (): Stats => {
//     const today = moment().format("DD/MM/YYYY");
//     const todayAppointments = appointments.filter((app) => app.date === today);
//     return {
//       totalAppointmentsToday: todayAppointments.length,
//       completedConsultations: todayAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: todayAppointments.filter((app) => app.status === "pending").length,
//       totalEarningsToday: todayAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const count = appointments.filter((app) => app.date === date).length;
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Prepare data for earnings over time
//   const getEarningsOverTime = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = appointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Mock data for patient ratings (since not in API)
//   const getPatientRatings = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     return Array.from({ length: days }, (_, i) => ({
//       date: moment(startDate).add(i, "days").format("MMM DD"),
//       rating: Math.random() * 2 + 3, // Random ratings between 3 and 5
//     }));
//   };

//   // Prepare data for appointment types (mock data, assuming 50/50 split)
//   const getAppointmentTypes = () => [
//     { name: "Online", value: appointments.length * 0.5 },
//     { name: "In-clinic", value: appointments.length * 0.5 },
//   ];

//   // Prepare data for patient demographics
//   const getAgeGroups = () => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     appointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   const getGenderDistribution = () => {
//     const genders = { Male: 0, Female: 0, Other: 0 };
//     appointments.forEach((app) => {
//       const gender = app.user.gender.charAt(0).toUpperCase() + app.user.gender.slice(1);
//       if (genders[gender]) genders[gender]++;
//       else genders.Other++;
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

//   const stats = getTodayStats();
//   const appointmentData = getAppointmentsPerDay();
//   const earningsData = getEarningsOverTime();
//   const ratingsData = getPatientRatings();
//   const appointmentTypes = getAppointmentTypes();
//   const ageGroups = getAgeGroups();
//   const genderDistribution = getGenderDistribution();

//   // Chart colors
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
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Today's Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-blue-900">{stats.totalAppointmentsToday}</p>
//                   <p className="text-sm text-blue-700">Appointments Today</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm text-green-700">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm text-yellow-700">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <DollarSign className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-purple-900">₹{stats.totalEarningsToday}</p>
//                   <p className="text-sm text-purple-700">Total Earnings Today</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Chart Period Selector */}
//           <div className="flex justify-end">
//             <select
//               value={chartPeriod.value}
//               onChange={(e) =>
//                 setChartPeriod(
//                   e.target.value === "week"
//                     ? { value: "week", label: "Last 7 Days" }
//                     : { value: "month", label: "Last 30 Days" }
//                 )
//               }
//               className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-40 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//             >
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//             </select>
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments per Day</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings over Time</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Ratings</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis domain={[0, 5]} stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Types */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentTypes}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Age Groups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Gender Distribution */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Gender</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

































// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock, List } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Stats {
//   totalAppointmentsToday: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarningsToday: number;
// }

// interface ChartPeriod {
//   value: "week" | "month";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [chartPeriod, setChartPeriod] = useState<ChartPeriod>({ value: "week", label: "Last 7 Days" });

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // Calculate today's stats
//   const getTodayStats = (): Stats => {
//     const today = moment().format("DD/MM/YYYY");
//     const todayAppointments = appointments.filter((app) => app.date === today);
//     return {
//       totalAppointmentsToday: todayAppointments.length,
//       completedConsultations: todayAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: todayAppointments.filter((app) => app.status === "pending").length,
//       totalEarningsToday: todayAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Get upcoming appointments (next 7 days)
//   const getUpcomingAppointments = () => {
//     const today = moment();
//     const endDate = moment().add(7, "days");
//     return appointments
//       .filter((app) => {
//         const appDate = moment(app.date, "DD/MM/YYYY");
//         return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(endDate, "day");
//       })
//       .sort((a, b) => {
//         const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//         const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//         return dateA.diff(dateB);
//       });
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const count = appointments.filter((app) => app.date === date).length;
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
//     });
//     return data;
//   };

//   // Prepare data for earnings over time
//   const getEarningsOverTime = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = appointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Mock data for patient ratings
//   const getPatientRatings = () => {
//     const days = chartPeriod.value === "week" ? 7 : 30;
//     const startDate = moment().subtract(days - 1, "days");
//     return Array.from({ length: days }, (_, i) => ({
//       date: moment(startDate).add(i, "days").format("MMM DD"),
//       rating: Math.random() * 2 + 3, // Random ratings between 3 and 5
//     }));
//   };

//   // Prepare data for appointment types (mock data)
//   const getAppointmentTypes = () => [
//     { name: "Online", value: appointments.length * 0.5 },
//     { name: "In-clinic", value: appointments.length * 0.5 },
//   ];

//   // Prepare data for patient demographics
//   const getAgeGroups = () => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     appointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   const getGenderDistribution = () => {
//     const genders = { Male: 0, Female: 0, Other: 0 };
//     appointments.forEach((app) => {
//       const gender = app.user.gender.charAt(0).toUpperCase() + app.user.gender.slice(1);
//       if (genders[gender]) genders[gender]++;
//       else genders.Other++;
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

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

//   const stats = getTodayStats();
//   const upcomingAppointments = getUpcomingAppointments();
//   const appointmentData = getAppointmentsPerDay();
//   const earningsData = getEarningsOverTime();
//   const ratingsData = getPatientRatings();
//   const appointmentTypes = getAppointmentTypes();
//   const ageGroups = getAgeGroups();
//   const genderDistribution = getGenderDistribution();

//   // Chart colors
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
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Today's Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-blue-900">{stats.totalAppointmentsToday}</p>
//                   <p className="text-sm text-blue-700">Appointments Today</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm text-green-700">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm text-yellow-700">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <DollarSign className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-purple-900">₹{stats.totalEarningsToday}</p>
//                   <p className="text-sm text-purple-700">Total Earnings Today</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments (Next 7 Days)</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {upcomingAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No upcoming appointments in the next 7 days.</div>
//               ) : (
//                 upcomingAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-blue-50 group transition-all duration-300"
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

//           {/* Chart Period Selector */}
//           <div className="flex justify-end">
//             <select
//               value={chartPeriod.value}
//               onChange={(e) =>
//                 setChartPeriod(
//                   e.target.value === "week"
//                     ? { value: "week", label: "Last 7 Days" }
//                     : { value: "month", label: "Last 30 Days" }
//                 )
//               }
//               className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-40 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//             >
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//             </select>
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments per Day</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings over Time</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Ratings</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis domain={[0, 5]} stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Types */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentTypes}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Age Groups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Gender Distribution */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Gender</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
























// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock, List, Filter } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";


// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Stats {
//   totalAppointments: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarnings: number;
// }

// interface FilterOption {
//   value: "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [filter, setFilter] = useState<FilterOption>({ value: "today", label: "Today" });

  

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // Get filtered appointments based on the selected period
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "today":
//           return appDate.isSame(today, "day");
//         case "tomorrow":
//           return appDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return appDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return appDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     }).sort((a, b) => {
//       const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//       const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//       return dateA.diff(dateB);
//     });
//   };

//   // Calculate stats based on filtered appointments
//   const getStats = (filteredAppointments: Appointment[]): Stats => {
//     return {
//       totalAppointments: filteredAppointments.length,
//       completedConsultations: filteredAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: filteredAppointments.filter((app) => app.status === "pending").length,
//       totalEarnings: filteredAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//     };
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
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

//   // Prepare data for earnings over time
//   const getEarningsOverTime = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Mock data for patient ratings
//   const getPatientRatings = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     return Array.from({ length: days }, (_, i) => ({
//       date: moment(startDate).add(i, "days").format("MMM DD"),
//       rating: Math.random() * 2 + 3, // Random ratings between 3 and 5
//     }));
//   };

//   // Prepare data for appointment types (mock data)
//   const getAppointmentTypes = (filteredAppointments: Appointment[]) => [
//     { name: "Online", value: filteredAppointments.length * 0.5 },
//     { name: "In-clinic", value: filteredAppointments.length * 0.5 },
//   ];

//   // Prepare data for patient demographics
//   const getAgeGroups = (filteredAppointments: Appointment[]) => {
//     console.log("filteredAppointments age : ", filteredAppointments);
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     filteredAppointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   // const getGenderDistribution = (filteredAppointments: Appointment[]) => {
//   //   console.log("filteredAppointments : ", filteredAppointments);
//   //   const genders = { Male: 0, Female: 0, Other: 0 };
//   //   filteredAppointments.forEach((app) => {
//   //     const gender = app.user.gender.charAt(0).toUpperCase() + app.user.gender.slice(1);
//   //     console.log("gender : ",gender);
//   //     if (genders[gender]) genders[gender]++;
//   //     else genders.Other++;
//   //   });
//   //   console.log("genders : ", genders);
//   //   return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   // };


//   // Prepare data for patient demographics - Gender Distribution
//   const getGenderDistribution = (filteredAppointments: Appointment[]) => {
//     const genders: { Male: number; Female: number; Other: number } = { Male: 0, Female: 0, Other: 0 };
//     filteredAppointments.forEach((app) => {
//       const gender = app.user.gender.toLowerCase();
//       if (gender === "male") {
//         genders.Male++;
//       } else if (gender === "female") {
//         genders.Female++;
//       } else {
//         genders.Other++;
//       }
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

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
//   const stats = getStats(filteredAppointments);
//   const appointmentData = getAppointmentsPerDay(filteredAppointments);
//   const earningsData = getEarningsOverTime(filteredAppointments);
//   const ratingsData = getPatientRatings(filteredAppointments);
//   const appointmentTypes = getAppointmentTypes(filteredAppointments);
//   const ageGroups = getAgeGroups(filteredAppointments);
//   const genderDistribution = getGenderDistribution(filteredAppointments);

//   // Chart colors
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
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Doctor Dashboard</h1>
//               <p className="text-sm text-gray-500">Track your appointments, earnings, and patient insights</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: {
//                       last7days: "Last 7 Days",
//                       last30days: "Last 30 Days",
//                       today: "Today",
//                       tomorrow: "Tomorrow",
//                       next7days: "Next 7 Days",
//                     }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="today">Today</option>
//                 <option value="tomorrow">Tomorrow</option>
//                 <option value="next7days">Next 7 Days</option>
//                 <option value="last7days">Last 7 Days</option>
//                 <option value="last30days">Last 30 Days</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-blue-900">{stats.totalAppointments}</p>
//                   <p className="text-sm text-blue-700">Total Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm text-green-700">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm text-yellow-700">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <DollarSign className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-purple-900">₹{stats.totalEarnings}</p>
//                   <p className="text-sm text-purple-700">Total Earnings</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Appointments ({filter.label})</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {filteredAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No appointments for {filter.label.toLowerCase()}.</div>
//               ) : (
//                 filteredAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-blue-50 group transition-all duration-300"
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
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments per Day ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings over Time ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Ratings ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis domain={[0, 5]} stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Types */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentTypes}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Age Groups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Gender Distribution */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Gender ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;














// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock, List, Filter, Star } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore"; // Adjust path to your auth store

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Rating {
//   rating: number;
//   review: string;
//   time: string;
//   userName: string;
// }

// interface Stats {
//   totalAppointments: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarnings: number;
//   averageRating: number;
//   totalReviews: number;
// }

// interface FilterOption {
//   value: "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [totalReviews, setTotalReviews] = useState<number>(0);
//   const [filter, setFilter] = useState<FilterOption>({ value: "today", label: "Today" });

//   const { user } = useAuthStore();
//   const doctorId = user?._id;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };

//     const fetchRatings = async () => {
//       if (!doctorId) {
//         console.log("No doctorId available, skipping ratings fetch");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//         return;
//       }
//       try {
//         const res = await axiosInstance.get(`/get-rating/${doctorId}`);
//         setRatings(res.data.data || []);
//         setAverageRating(res.data.averageRating || 0);
//         setTotalReviews(res.data.totalReviews || 0);
//         console.log("Ratings:", res.data);
//       } catch (error) {
//         console.error("Error fetching ratings:", error);
//         toast.error("Failed to fetch ratings");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//       }
//     };

//     fetchAppointments();
//     fetchRatings();
//   }, [doctorId]);

//   // Get filtered appointments based on the selected period
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "today":
//           return appDate.isSame(today, "day");
//         case "tomorrow":
//           return appDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return appDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return appDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     }).sort((a, b) => {
//       const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//       const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//       return dateA.diff(dateB);
//     });
//   };

//   // Get filtered ratings based on the selected period
//   const getFilteredRatings = () => {
//     const today = moment();
//     return ratings.filter((rating) => {
//       const ratingDate = moment(rating.time);
//       switch (filter.value) {
//         case "today":
//           return ratingDate.isSame(today, "day");
//         case "tomorrow":
//           return ratingDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return ratingDate.isSameOrAfter(today, "day") && ratingDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Calculate stats based on filtered appointments and ratings
//   const getStats = (filteredAppointments: Appointment[]): Stats => {
//     return {
//       totalAppointments: filteredAppointments.length,
//       completedConsultations: filteredAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: filteredAppointments.filter((app) => app.status === "pending").length,
//       totalEarnings: filteredAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//       averageRating,
//       totalReviews,
//     };
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
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

//   // Prepare data for earnings over time
//   const getEarningsOverTime = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Prepare data for patient ratings
//   const getPatientRatings = (filteredRatings: Rating[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const dayRatings = filteredRatings.filter((rating) => moment(rating.time).isSame(date, "day"));
//       const average = dayRatings.length > 0
//         ? dayRatings.reduce((sum, r) => sum + r.rating, 0) / dayRatings.length
//         : 0;
//       return { date: moment(date).format("MMM DD"), rating: average };
//     });
//     return data;
//   };

//   // Prepare data for appointment types (mock data)
//   const getAppointmentTypes = (filteredAppointments: Appointment[]) => [
//     { name: "Online", value: filteredAppointments.length * 0.5 },
//     { name: "In-clinic", value: filteredAppointments.length * 0.5 },
//   ];

//   // Prepare data for patient demographics - Age Groups
//   const getAgeGroups = (filteredAppointments: Appointment[]) => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     filteredAppointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   // Prepare data for patient demographics - Gender Distribution
//   const getGenderDistribution = (filteredAppointments: Appointment[]) => {
//     const genders: { Male: number; Female: number; Other: number } = { Male: 0, Female: 0, Other: 0 };
//     filteredAppointments.forEach((app) => {
//       const gender = app.user?.gender?.toLowerCase();
//       if (gender === "male") {
//         genders.Male++;
//       } else if (gender === "female") {
//         genders.Female++;
//       } else {
//         genders.Other++;
//       }
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

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
//   const filteredRatings = getFilteredRatings();
//   const stats = getStats(filteredAppointments);
//   const appointmentData = getAppointmentsPerDay(filteredAppointments);
//   const earningsData = getEarningsOverTime(filteredAppointments);
//   const ratingsData = getPatientRatings(filteredRatings);
//   const appointmentTypes = getAppointmentTypes(filteredAppointments);
//   const ageGroups = getAgeGroups(filteredAppointments);
//   const genderDistribution = getGenderDistribution(filteredAppointments);

//   // Chart colors
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
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Doctor Dashboard</h1>
//               <p className="text-sm text-gray-500">Track your appointments, earnings, and patient insights</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: {
//                       last7days: "Last 7 Days",
//                       last30days: "Last 30 Days",
//                       today: "Today",
//                       tomorrow: "Tomorrow",
//                       next7days: "Next 7 Days",
//                     }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="today">Today</option>
//                 <option value="tomorrow">Tomorrow</option>
//                 <option value="next7days">Next 7 Days</option>
//                 <option value="last7days">Last 7 Days</option>
//                 <option value="last30days">Last 30 Days</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-blue-900">{stats.totalAppointments}</p>
//                   <p className="text-sm text-blue-700">Total Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm text-green-700">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm text-yellow-700">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <DollarSign className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-purple-900">₹{stats.totalEarnings}</p>
//                   <p className="text-sm text-purple-700">Total Earnings</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Star className="w-8 h-8 text-amber-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-amber-900">
//                     {doctorId ? stats.averageRating.toFixed(1) : "N/A"} ({doctorId ? stats.totalReviews : 0})
//                   </p>
//                   <p className="text-sm text-amber-700">Average Rating</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Appointments ({filter.label})</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {filteredAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No appointments for {filter.label.toLowerCase()}.</div>
//               ) : (
//                 filteredAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-blue-50 group transition-all duration-300"
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
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments per Day ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings over Time ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Ratings ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis domain={[0, 5]} stroke="#6b7280" />
//                   <Tooltip formatter={(value: number) => value === 0 ? "No ratings" : value.toFixed(1)} />
//                   <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Appointment Types */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={appointmentTypes}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label
//                   >
//                     {appointmentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Age Groups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Gender Distribution */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Gender ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



































// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock, List, Filter, Star } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Rating {
//   rating: number;
//   review: string;
//   time: string;
//   userName: string;
// }

// interface Stats {
//   totalAppointments: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarnings: number;
//   averageRating: number;
//   totalReviews: number;
// }

// interface FilterOption {
//   value: "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [totalReviews, setTotalReviews] = useState<number>(0);
//   const [filter, setFilter] = useState<FilterOption>({ value: "today", label: "Today" });

//   const { user } = useAuthStore();
//   const doctorId = user?._id;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };

//     const fetchRatings = async () => {
//       if (!doctorId) {
//         console.log("No doctorId available, skipping ratings fetch");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//         return;
//       }
//       try {
//         const res = await axiosInstance.get(`/get-rating/${doctorId}`);
//         setRatings(res.data.data || []);
//         setAverageRating(res.data.averageRating || 0);
//         setTotalReviews(res.data.totalReviews || 0);
//         console.log("Ratings:", res.data);
//       } catch (error) {
//         console.error("Error fetching ratings:", error);
//         toast.error("Failed to fetch ratings");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//       }
//     };

//     fetchAppointments();
//     fetchRatings();
//   }, [doctorId]);

//   // Get filtered appointments based on the selected period
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "today":
//           return appDate.isSame(today, "day");
//         case "tomorrow":
//           return appDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return appDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return appDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     }).sort((a, b) => {
//       const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//       const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//       return dateA.diff(dateB);
//     });
//   };

//   // Get filtered ratings based on the selected period
//   const getFilteredRatings = () => {
//     const today = moment();
//     return ratings.filter((rating) => {
//       const ratingDate = moment(rating.time);
//       switch (filter.value) {
//         case "today":
//           return ratingDate.isSame(today, "day");
//         case "tomorrow":
//           return ratingDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return ratingDate.isSameOrAfter(today, "day") && ratingDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Calculate stats based on filtered appointments and ratings
//   const getStats = (filteredAppointments: Appointment[]): Stats => {
//     return {
//       totalAppointments: filteredAppointments.length,
//       completedConsultations: filteredAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: filteredAppointments.filter((app) => app.status === "pending").length,
//       totalEarnings: filteredAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//       averageRating,
//       totalReviews,
//     };
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
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

//   // Prepare data for earnings over time
//   const getEarningsOverTime = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Prepare data for patient ratings
//   const getPatientRatings = (filteredRatings: Rating[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const dayRatings = filteredRatings.filter((rating) => moment(rating.time).isSame(date, "day"));
//       const average = dayRatings.length > 0
//         ? dayRatings.reduce((sum, r) => sum + r.rating, 0) / dayRatings.length
//         : 0;
//       return { date: moment(date).format("MMM DD"), rating: average };
//     });
//     return data;
//   };

//   // Prepare data for patient demographics - Age Groups
//   const getAgeGroups = (filteredAppointments: Appointment[]) => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     filteredAppointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   // Prepare data for patient demographics - Gender Distribution
//   const getGenderDistribution = (filteredAppointments: Appointment[]) => {
//     const genders: { Male: number; Female: number; Other: number } = { Male: 0, Female: 0, Other: 0 };
//     filteredAppointments.forEach((app) => {
//       const gender = app.user?.gender?.toLowerCase();
//       if (gender === "male") {
//         genders.Male++;
//       } else if (gender === "female") {
//         genders.Female++;
//       } else {
//         genders.Other++;
//       }
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

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
//   const filteredRatings = getFilteredRatings();
//   const stats = getStats(filteredAppointments);
//   const appointmentData = getAppointmentsPerDay(filteredAppointments);
//   const earningsData = getEarningsOverTime(filteredAppointments);
//   const ratingsData = getPatientRatings(filteredRatings);
//   const ageGroups = getAgeGroups(filteredAppointments);
//   const genderDistribution = getGenderDistribution(filteredAppointments);

//   // Chart colors
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
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 mt-12">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Doctor Dashboard</h1>
//               <p className="text-sm text-gray-500">Track your appointments, earnings, and patient insights</p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: {
//                       last7days: "Last 7 Days",
//                       last30days: "Last 30 Days",
//                       today: "Today",
//                       tomorrow: "Tomorrow",
//                       next7days: "Next 7 Days",
//                     }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-300 px-4 py-2.5 rounded-lg text-sm w-48 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
//               >
//                 <option value="today">Today</option>
//                 <option value="tomorrow">Tomorrow</option>
//                 <option value="next7days">Next 7 Days</option>
//                 <option value="last7days">Last 7 Days</option>
//                 <option value="last30days">Last 30 Days</option>
//               </select>
//               <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-blue-900">{stats.totalAppointments}</p>
//                   <p className="text-sm text-blue-700">Total Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm text-green-700">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm text-yellow-700">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <DollarSign className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-purple-900">₹{stats.totalEarnings}</p>
//                   <p className="text-sm text-purple-700">Total Earnings</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Star className="w-8 h-8 text-amber-600" />
//                 <div>
//                   <p className="text-2xl font-bold text-amber-900">
//                     {doctorId ? stats.averageRating.toFixed(1) : "N/A"} ({doctorId ? stats.totalReviews : 0})
//                   </p>
//                   <p className="text-sm text-amber-700">Average Rating</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <List className="w-5 h-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Appointments ({filter.label})</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
//               {filteredAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">No appointments for {filter.label.toLowerCase()}.</div>
//               ) : (
//                 filteredAppointments.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 gap-3 hover:bg-blue-50 group transition-all duration-300"
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
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments per Day ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings over Time ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Ratings ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#6b7280" />
//                   <YAxis domain={[0, 5]} stroke="#6b7280" />
//                   <Tooltip formatter={(value: number) => value === 0 ? "No ratings" : value.toFixed(1)} />
//                   <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Patient Age Groups */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Gender */}
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Gender ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

































// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Calendar, DollarSign, CheckCircle, Clock, List, Star } from "lucide-react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../store/authStore";

// interface Appointment {
//   _id: string;
//   appointmentNo: string;
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   payment: "paid" | "refund" | "not paid";
//   fee: number;
//   doctorId: string;
//   user: {
//     name: string;
//     photo?: string;
//     dateOfBirth: string;
//     gender: "male" | "female" | "other";
//   };
// }

// interface Rating {
//   rating: number;
//   review: string;
//   time: string;
//   userName: string;
// }

// interface Stats {
//   totalAppointments: number;
//   completedConsultations: number;
//   pendingAppointments: number;
//   totalEarnings: number;
//   averageRating: number;
//   totalReviews: number;
// }

// interface FilterOption {
//   value: "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
//   label: string;
// }

// const DoctorDashboard: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [totalReviews, setTotalReviews] = useState<number>(0);
//   const [filter, setFilter] = useState<FilterOption>({ value: "today", label: "Today" });

//   const { user } = useAuthStore();
//   const doctorId = user?._id;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data.data || []);
//         console.log("Appointments:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         toast.error("Failed to fetch appointments");
//       }
//     };

//     const fetchRatings = async () => {
//       if (!doctorId) {
//         console.log("No doctorId available, skipping ratings fetch");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//         return;
//       }
//       try {
//         const res = await axiosInstance.get(`/get-rating/${doctorId}`);
//         setRatings(res.data.data || []);
//         setAverageRating(res.data.averageRating || 0);
//         setTotalReviews(res.data.totalReviews || 0);
//         console.log("Ratings:", res.data);
//       } catch (error) {
//         console.error("Error fetching ratings:", error);
//         toast.error("Failed to fetch ratings");
//         setRatings([]);
//         setAverageRating(0);
//         setTotalReviews(0);
//       }
//     };

//     fetchAppointments();
//     fetchRatings();
//   }, [doctorId]);

//   // Get filtered appointments based on the selected period
//   const getFilteredAppointments = () => {
//     const today = moment();
//     return appointments.filter((app) => {
//       const appDate = moment(app.date, "DD/MM/YYYY");
//       switch (filter.value) {
//         case "today":
//           return appDate.isSame(today, "day");
//         case "tomorrow":
//           return appDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return appDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return appDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && appDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     }).sort((a, b) => {
//       const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
//       const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
//       return dateA.diff(dateB);
//     });
//   };

//   // Get filtered ratings based on the selected period
//   const getFilteredRatings = () => {
//     const today = moment();
//     return ratings.filter((rating) => {
//       const ratingDate = moment(rating.time);
//       switch (filter.value) {
//         case "today":
//           return ratingDate.isSame(today, "day");
//         case "tomorrow":
//           return ratingDate.isSame(today.clone().add(1, "day"), "day");
//         case "next7days":
//           return ratingDate.isSameOrAfter(today, "day") && ratingDate.isSameOrBefore(today.clone().add(7, "days"), "day");
//         case "last7days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         case "last30days":
//           return ratingDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
//         default:
//           return true;
//       }
//     });
//   };

//   // Calculate stats based on filtered appointments and ratings
//   const getStats = (filteredAppointments: Appointment[]): Stats => {
//     return {
//       totalAppointments: filteredAppointments.length,
//       completedConsultations: filteredAppointments.filter((app) => app.status === "completed").length,
//       pendingAppointments: filteredAppointments.filter((app) => app.status === "pending").length,
//       totalEarnings: filteredAppointments
//         .filter((app) => app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0),
//       averageRating,
//       totalReviews,
//     };
//   };

//   // Prepare data for appointments per day
//   const getAppointmentsPerDay = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
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

//   // Prepare data for earnings over time
//   const getEarningsOverTime = (filteredAppointments: Appointment[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
//       const earnings = filteredAppointments
//         .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
//         .reduce((sum, app) => sum + app.fee, 0);
//       return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
//     });
//     return data;
//   };

//   // Prepare data for patient ratings
//   const getPatientRatings = (filteredRatings: Rating[]) => {
//     const days = filter.value === "last30days" ? 30 : filter.value === "last7days" ? 7 : filter.value === "next7days" ? 7 : 1;
//     const startDate = filter.value === "last7days" || filter.value === "last30days"
//       ? moment().subtract(days - 1, "days")
//       : filter.value === "tomorrow"
//       ? moment().add(1, "day")
//       : filter.value === "next7days"
//       ? moment()
//       : moment();
//     const data = Array.from({ length: days }, (_, i) => {
//       const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
//       const dayRatings = filteredRatings.filter((rating) => moment(rating.time).isSame(date, "day"));
//       const average = dayRatings.length > 0
//         ? dayRatings.reduce((sum, r) => sum + r.rating, 0) / dayRatings.length
//         : 0;
//       return { date: moment(date).format("MMM DD"), rating: average };
//     });
//     return data;
//   };

//   // Prepare data for patient demographics - Age Groups
//   const getAgeGroups = (filteredAppointments: Appointment[]) => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-30": 0,
//       "31-50": 0,
//       "51+": 0,
//     };
//     filteredAppointments.forEach((app) => {
//       const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
//       const age = moment().diff(dob, "years");
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 30) ageGroups["19-30"]++;
//       else if (age <= 50) ageGroups["31-50"]++;
//       else ageGroups["51+"]++;
//     });
//     return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
//   };

//   // Prepare data for patient demographics - Gender Distribution
//   const getGenderDistribution = (filteredAppointments: Appointment[]) => {
//     const genders: { Male: number; Female: number; Other: number } = { Male: 0, Female: 0, Other: 0 };
//     filteredAppointments.forEach((app) => {
//       const gender = app.user?.gender?.toLowerCase();
//       if (gender === "male") {
//         genders.Male++;
//       } else if (gender === "female") {
//         genders.Female++;
//       } else {
//         genders.Other++;
//       }
//     });
//     return Object.entries(genders).map(([name, value]) => ({ name, value }));
//   };

//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-medium px-3 py-1 rounded-full shadow-sm capitalize";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-100 text-yellow-800 border border-yellow-300`;
//       case "cancelled":
//         return `${base} bg-red-100 text-red-800 border border-red-300`;
//       case "confirmed":
//         return `${base} bg-green-100 text-green-800 border border-green-300`;
//       case "completed":
//         return `${base} bg-blue-100 text-blue-800 border border-blue-300`;
//       default:
//         return `${base} bg-gray-100 text-gray-800 border border-gray-300`;
//     }
//   };

//   const filteredAppointments = getFilteredAppointments();
//   const filteredRatings = getFilteredRatings();
//   const stats = getStats(filteredAppointments);
//   const appointmentData = getAppointmentsPerDay(filteredAppointments);
//   const earningsData = getEarningsOverTime(filteredAppointments);
//   const ratingsData = getPatientRatings(filteredRatings);
//   const ageGroups = getAgeGroups(filteredAppointments);
//   const genderDistribution = getGenderDistribution(filteredAppointments);

//   // Chart colors
//   const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626"];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col font-['Inter']">
//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in {
//             animation: fadeIn 0.5s ease-out forwards;
//           }
//           .recharts-tooltip-wrapper {
//             background: rgba(255, 255, 255, 0.98);
//             border: 1px solid #d1d5db;
//             border-radius: 8px;
//             padding: 12px;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//             font-size: 14px;
//           }
//           .recharts-tooltip-label {
//             font-weight: 600;
//             color: #1e293b;
//             margin-bottom: 4px;
//           }
//           .recharts-tooltip-item {
//             color: #475569 !important;
//           }
//           .custom-select::after {
//             content: '▼';
//             position: absolute;
//             right: 12px;
//             top: 50%;
//             transform: translateY(-50%);
//             color: #64748b;
//             font-size: 12px;
//             pointer-events: none;
//           }
//         `}
//       </style>
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-8 mt-16">
//           {/* Header and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
//                 Doctor Dashboard
//               </h1>
//               <p className="text-base sm:text-lg text-gray-600 mt-1">
//                 Track your appointments, earnings, and patient insights
//               </p>
//             </div>
//             <div className="relative">
//               <select
//                 value={filter.value}
//                 onChange={(e) => {
//                   const value = e.target.value as FilterOption["value"];
//                   setFilter({
//                     value,
//                     label: {
//                       last7days: "Last 7 Days",
//                       last30days: "Last 30 Days",
//                       today: "Today",
//                       tomorrow: "Tomorrow",
//                       next7days: "Next 7 Days",
//                     }[value],
//                   });
//                 }}
//                 className="appearance-none border border-gray-200 bg-white px-4 py-2.5 pr-10 rounded-lg text-sm sm:text-base font-medium text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-lg w-full sm:w-56 custom-select"
//               >
//                 <option value="today">Today</option>
//                 <option value="tomorrow">Tomorrow</option>
//                 <option value="next7days">Next 7 Days</option>
//                 <option value="last7days">Last 7 Days</option>
//                 <option value="last30days">Last 30 Days</option>
//               </select>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 animate-fade-in">
//             <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               <div className="flex items-center gap-4">
//                 <Calendar className="w-10 h-10 text-blue-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.totalAppointments}</p>
//                   <p className="text-sm sm:text-base text-blue-800 font-medium">Total Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               <div className="flex items-center gap-4">
//                 <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.completedConsultations}</p>
//                   <p className="text-sm sm:text-base text-green-800 font-medium">Completed Consultations</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               <div className="flex items-center gap-4">
//                 <Clock className="w-10 h-10 text-yellow-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
//                   <p className="text-sm sm:text-base text-yellow-800 font-medium">Pending Appointments</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               <div className="flex items-center gap-4">
//                 <DollarSign className="w-10 h-10 text-purple-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-purple-900">₹{stats.totalEarnings}</p>
//                   <p className="text-sm sm:text-base text-purple-800 font-medium">Total Earnings</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               <div className="flex items-center gap-4">
//                 <Star className="w-10 h-10 text-amber-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-amber-900">
//                     {doctorId ? stats.averageRating.toFixed(1) : "N/A"} ({doctorId ? stats.totalReviews : 0})
//                   </p>
//                   <p className="text-sm sm:text-base text-amber-800 font-medium">Average Rating</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-fade-in">
//             <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
//               <List className="w-6 h-6 text-blue-600" />
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Appointments ({filter.label})</h2>
//             </div>
//             <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
//               {filteredAppointments.length === 0 ? (
//                 <div className="p-6 text-center text-gray-600 text-base sm:text-lg">
//                   No appointments for {filter.label.toLowerCase()}.
//                 </div>
//               ) : (
//                 filteredAppointments.map((app, index) => (
//                   <div
//                     key={app._id}
//                     className={`flex flex-col sm:flex-row items-start sm:items-center px-6 py-5 gap-4 hover:bg-blue-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
//                   >
//                     <div className="relative">
//                       <img
//                         className="rounded-full w-12 h-12 object-cover border-2 border-blue-100"
//                         src={app.user.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' class='w-12 h-12 text-gray-400 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E"}
//                         alt={app.user.name}
//                       />
//                     </div>
//                     <div className="flex-1 text-sm sm:text-base">
//                       <p className="text-gray-900 font-semibold group-hover:text-blue-700 transition">{app.user.name}</p>
//                       <p className="text-gray-600 group-hover:text-blue-600 transition">
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
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
//             {/* Appointments per Day */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Appointments per Day ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={appointmentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#475569" fontSize={14} />
//                   <YAxis stroke="#475569" fontSize={14} />
//                   <Tooltip
//                     contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//                     labelStyle={{ fontWeight: 600, color: "#1e293b" }}
//                   />
//                   <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
//                     <defs>
//                       <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="#2563eb" />
//                         <stop offset="100%" stopColor="#60a5fa" />
//                       </linearGradient>
//                     </defs>
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Earnings over Time */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Earnings over Time ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={earningsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#475569" fontSize={14} />
//                   <YAxis stroke="#475569" fontSize={14} />
//                   <Tooltip
//                     contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//                     labelStyle={{ fontWeight: 600, color: "#1e293b" }}
//                   />
//                   <Line type="monotone" dataKey="earnings" stroke="#059669" strokeWidth={3} dot={{ r: 5, fill: "#059669" }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Ratings */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Ratings ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="date" stroke="#475569" fontSize={14} />
//                   <YAxis domain={[0, 5]} stroke="#475569" fontSize={14} />
//                   <Tooltip
//                     formatter={(value: number) => value === 0 ? "No ratings" : value.toFixed(1)}
//                     contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//                     labelStyle={{ fontWeight: 600, color: "#1e293b" }}
//                   />
//                   <Line type="monotone" dataKey="rating" stroke="#d97706" strokeWidth={3} dot={{ r: 5, fill: "#d97706" }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Charts */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
//             {/* Patient Age Groups */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Age Groups ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={ageGroups}
//                     outerRadius={90}
//                     innerRadius={50}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, value }) => `${name}: ${value}`}
//                     labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
//                   >
//                     {ageGroups.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//                     labelStyle={{ fontWeight: 600, color: "#1e293b" }}
//                   />
//                   <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Patient Gender */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Gender ({filter.label})</h2>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={genderDistribution}
//                     outerRadius={90}
//                     innerRadius={50}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, value }) => `${name}: ${value}`}
//                     labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
//                   >
//                     {genderDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//                     labelStyle={{ fontWeight: 600, color: "#1e293b" }}
//                   />
//                   <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;


































import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, DollarSign, CheckCircle, Clock, List, Star } from "lucide-react";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import axiosInstance from "../../utils/axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

interface Appointment {
  _id: string;
  appointmentNo: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment: "paid" | "refund" | "not paid";
  fee: number;
  doctorId: string;
  user: {
    name: string;
    photo?: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
  };
}

interface Rating {
  rating: number;
  review: string;
  time: string;
  userName: string;
}

interface Stats {
  totalAppointments: number;
  completedConsultations: number;
  pendingAppointments: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

interface FilterOption {
  value: "all" | "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
  label: string;
}

const DoctorDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [filter, setFilter] = useState<FilterOption>({ value: "today", label: "Today" });

  const { user } = useAuthStore();
  const doctorId = user?._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/doctor-appointments");
        setAppointments(res.data.data || []);
        console.log("Appointments:", res.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments");
      }
    };

    const fetchRatings = async () => {
      if (!doctorId) {
        console.log("No doctorId available, skipping ratings fetch");
        setRatings([]);
        setAverageRating(0);
        setTotalReviews(0);
        return;
      }
      try {
        const res = await axiosInstance.get(`/get-rating/${doctorId}`);
        setRatings(res.data.data || []);
        setAverageRating(res.data.averageRating || 0);
        setTotalReviews(res.data.totalReviews || 0);
        console.log("Ratings:", res.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        toast.error("Failed to fetch ratings");
        setRatings([]);
        setAverageRating(0);
        setTotalReviews(0);
      }
    };

    fetchAppointments();
    fetchRatings();
  }, [doctorId]);

  // Get filtered appointments based on the selected period
  const getFilteredAppointments = () => {
    const today = moment();
    return appointments.filter((app) => {
      const appDate = moment(app.date, "DD/MM/YYYY");
      switch (filter.value) {
        case "all":
          return true;
        case "today":
          return appDate.isSame(today, "day");
        case "tomorrow":
          return appDate.isSame(today.clone().add(1, "day"), "day");
        case "next7days":
          return appDate.isSameOrAfter(today, "day") && appDate.isSameOrBefore(today.clone().add(7, "days"), "day");
        case "last7days":
          return appDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && appDate.isSameOrBefore(today, "day");
        case "last30days":
          return appDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && appDate.isSameOrBefore(today, "day");
        default:
          return true;
      }
    }).sort((a, b) => {
      const dateA = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm A");
      const dateB = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm A");
      return dateA.diff(dateB);
    });
  };

  // Get filtered ratings based on the selected period
  const getFilteredRatings = () => {
    const today = moment();
    return ratings.filter((rating) => {
      const ratingDate = moment(rating.time);
      switch (filter.value) {
        case "all":
          return true;
        case "today":
          return ratingDate.isSame(today, "day");
        case "tomorrow":
          return ratingDate.isSame(today.clone().add(1, "day"), "day");
        case "next7days":
          return ratingDate.isSameOrAfter(today, "day") && ratingDate.isSameOrBefore(today.clone().add(7, "days"), "day");
        case "last7days":
          return ratingDate.isSameOrAfter(today.clone().subtract(7, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
        case "last30days":
          return ratingDate.isSameOrAfter(today.clone().subtract(30, "days"), "day") && ratingDate.isSameOrBefore(today, "day");
        default:
          return true;
      }
    });
  };

  // Calculate stats based on filtered appointments and ratings
  const getStats = (filteredAppointments: Appointment[]): Stats => {
    return {
      totalAppointments: filteredAppointments.length,
      completedConsultations: filteredAppointments.filter((app) => app.status === "completed").length,
      pendingAppointments: filteredAppointments.filter((app) => app.status === "pending").length,
      totalEarnings: filteredAppointments
        .filter((app) => app.payment === "paid" && app.status !== "cancelled")
        .reduce((sum, app) => sum + app.fee, 0),
      averageRating,
      totalReviews,
    };
  };

  // Prepare data for appointments per day
  const getAppointmentsPerDay = (filteredAppointments: Appointment[]) => {
    const days = filter.value === "last30days" ? 30 : filter.value === "last7days" || filter.value === "next7days" ? 7 : filter.value === "all" ? appointments.length : 1;
    const startDate = filter.value === "last7days" || filter.value === "last30days"
      ? moment().subtract(days - 1, "days")
      : filter.value === "tomorrow"
      ? moment().add(1, "day")
      : filter.value === "next7days"
      ? moment()
      : filter.value === "all"
      ? moment.min(...appointments.map((app) => moment(app.date, "DD/MM/YYYY")))
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
      const count = filteredAppointments.filter((app) => app.date === date).length;
      return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), count };
    });
    return data;
  };

  // Prepare data for earnings over time
  const getEarningsOverTime = (filteredAppointments: Appointment[]) => {
    const days = filter.value === "last30days" ? 30 : filter.value === "last7days" || filter.value === "next7days" ? 7 : filter.value === "all" ? appointments.length : 1;
    const startDate = filter.value === "last7days" || filter.value === "last30days"
      ? moment().subtract(days - 1, "days")
      : filter.value === "tomorrow"
      ? moment().add(1, "day")
      : filter.value === "next7days"
      ? moment()
      : filter.value === "all"
      ? moment.min(...appointments.map((app) => moment(app.date, "DD/MM/YYYY")))
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("DD/MM/YYYY");
      const earnings = filteredAppointments
        .filter((app) => app.date === date && app.payment === "paid" && app.status !== "cancelled")
        .reduce((sum, app) => sum + app.fee, 0);
      return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), earnings };
    });
    return data;
  };

  // Prepare data for patient ratings
  const getPatientRatings = (filteredRatings: Rating[]) => {
    const days = filter.value === "last30days" ? 30 : filter.value === "last7days" || filter.value === "next7days" ? 7 : filter.value === "all" ? ratings.length : 1;
    const startDate = filter.value === "last7days" || filter.value === "last30days"
      ? moment().subtract(days - 1, "days")
      : filter.value === "tomorrow"
      ? moment().add(1, "day")
      : filter.value === "next7days"
      ? moment()
      : filter.value === "all"
      ? moment.min(...ratings.map((rating) => moment(rating.time)))
      : moment();
    const data = Array.from({ length: days }, (_, i) => {
      const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
      const dayRatings = filteredRatings.filter((rating) => moment(rating.time).isSame(date, "day"));
      const average = dayRatings.length > 0
        ? dayRatings.reduce((sum, r) => sum + r.rating, 0) / dayRatings.length
        : 0;
      return { date: moment(date).format("MMM DD"), rating: average };
    });
    return data;
  };

  // Prepare data for patient demographics - Age Groups
  const getAgeGroups = (filteredAppointments: Appointment[]) => {
    const ageGroups = {
      "0-18": 0,
      "19-30": 0,
      "31-50": 0,
      "51+": 0,
    };
    filteredAppointments.forEach((app) => {
      const dob = moment(app.user.dateOfBirth, "YYYY-MM-DD");
      const age = moment().diff(dob, "years");
      if (age <= 18) ageGroups["0-18"]++;
      else if (age <= 30) ageGroups["19-30"]++;
      else if (age <= 50) ageGroups["31-50"]++;
      else ageGroups["51+"]++;
    });
    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  };

  // Prepare data for patient demographics - Gender Distribution
  const getGenderDistribution = (filteredAppointments: Appointment[]) => {
    const genders: { Male: number; Female: number; Other: number } = { Male: 0, Female: 0, Other: 0 };
    filteredAppointments.forEach((app) => {
      const gender = app.user?.gender?.toLowerCase();
      if (gender === "male") {
        genders.Male++;
      } else if (gender === "female") {
        genders.Female++;
      } else {
        genders.Other++;
      }
    });
    return Object.entries(genders).map(([name, value]) => ({ name, value }));
  };

  const getStatusBadge = (status: string) => {
    const base = "text-xs font-medium px-3 py-1 rounded-full shadow-sm capitalize";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      case "cancelled":
        return `${base} bg-red-100 text-red-800 border border-red-300`;
      case "confirmed":
        return `${base} bg-green-100 text-green-800 border border-green-300`;
      case "completed":
        return `${base} bg-blue-100 text-blue-800 border border-blue-300`;
      default:
        return `${base} bg-gray-100 text-gray-800 border border-gray-300`;
    }
  };

  const filteredAppointments = getFilteredAppointments();
  const filteredRatings = getFilteredRatings();
  const stats = getStats(filteredAppointments);
  const appointmentData = getAppointmentsPerDay(filteredAppointments);
  const earningsData = getEarningsOverTime(filteredAppointments);
  const ratingsData = getPatientRatings(filteredRatings);
  const ageGroups = getAgeGroups(filteredAppointments);
  const genderDistribution = getGenderDistribution(filteredAppointments);

  // Chart colors
  const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col font-['Inter']">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .recharts-tooltip-wrapper {
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
          }
          .recharts-tooltip-label {
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 4px;
          }
          .recharts-tooltip-item {
            color: #475569 !important;
          }
          .custom-select::after {
            content: '▼';
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
            font-size: 12px;
            pointer-events: none;
          }
        `}
      </style>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-8 mt-16">
          {/* Header and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Doctor Dashboard
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-1">
                Track your appointments, earnings, and patient insights
              </p>
            </div>
            <div className="relative">
              <select
                value={filter.value}
                onChange={(e) => {
                  const value = e.target.value as FilterOption["value"];
                  setFilter({
                    value,
                    label: {
                      all: "All Data",
                      last7days: "Last 7 Days",
                      last30days: "Last 30 Days",
                      today: "Today",
                      tomorrow: "Tomorrow",
                      next7days: "Next 7 Days",
                    }[value],
                  });
                }}
                className="appearance-none border border-gray-200 bg-white px-4 py-2.5 pr-10 rounded-lg text-sm sm:text-base font-medium text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-lg w-full sm:w-56 custom-select"
              >
                <option value="all">All Data</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="next7days">Next 7 Days</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Calendar className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.totalAppointments}</p>
                  <p className="text-sm sm:text-base text-blue-800 font-medium">Total Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.completedConsultations}</p>
                  <p className="text-sm sm:text-base text-green-800 font-medium">Completed Consultations</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Clock className="w-10 h-10 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
                  <p className="text-sm sm:text-base text-yellow-800 font-medium">Pending Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <DollarSign className="w-10 h-10 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-900">₹{stats.totalEarnings}</p>
                  <p className="text-sm sm:text-base text-purple-800 font-medium">Total Earnings</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Star className="w-10 h-10 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-900">
                    {doctorId ? stats.averageRating.toFixed(1) : "N/A"} ({doctorId ? stats.totalReviews : 0})
                  </p>
                  <p className="text-sm sm:text-base text-amber-800 font-medium">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
              <List className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Appointments ({filter.label})</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
              {filteredAppointments.length === 0 ? (
                <div className="p-6 text-center text-gray-600 text-base sm:text-lg">
                  No appointments for {filter.label.toLowerCase()}.
                </div>
              ) : (
                filteredAppointments.map((app, index) => (
                  <div
                    key={app._id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center px-6 py-5 gap-4 hover:bg-blue-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="relative">
                      <img
                        className="rounded-full w-12 h-12 object-cover border-2 border-blue-100"
                        src={app.user.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' class='w-12 h-12 text-gray-400 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E"}
                        alt={app.user.name}
                      />
                    </div>
                    <div className="flex-1 text-sm sm:text-base">
                      <p className="text-gray-900 font-semibold group-hover:text-blue-700 transition">{app.user.name}</p>
                      <p className="text-gray-600 group-hover:text-blue-600 transition">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Appointments per Day */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Appointments per Day ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#475569" fontSize={14} />
                  <YAxis stroke="#475569" fontSize={14} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Earnings over Time */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Earnings over Time ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#475569" fontSize={14} />
                  <YAxis stroke="#475569" fontSize={14} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Line type="monotone" dataKey="earnings" stroke="#059669" strokeWidth={3} dot={{ r: 5, fill: "#059669" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Ratings */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Ratings ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#475569" fontSize={14} />
                  <YAxis domain={[0, 5]} stroke="#475569" fontSize={14} />
                  <Tooltip
                    formatter={(value: number) => value === 0 ? "No ratings" : value.toFixed(1)}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Line type="monotone" dataKey="rating" stroke="#d97706" strokeWidth={3} dot={{ r: 5, fill: "#d97706" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {/* Patient Age Groups */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Age Groups ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={ageGroups}
                    outerRadius={90}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
                  >
                    {ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Gender */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Patient Gender ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    outerRadius={90}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;