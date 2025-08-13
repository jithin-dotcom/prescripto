

import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Stethoscope, DollarSign, List, CheckCircle, XCircle, Clock, CheckSquare } from "lucide-react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import moment from "moment";
// import { toast } from "react-toastify";
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
    fee: number;
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

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<FilterOption>({ value: "all", label: "All Data" });
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/all-appointments");
        setAppointments(res.data.data || []);
        // console.log("Appointments:", res.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // toast.error("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center">
        <p className="text-lg sm:text-xl text-gray-700 font-medium">Access denied. Please log in as an admin.</p>
      </div>
    );
  }

  
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


  const getStats = (filteredAppointments: Appointment[]): Stats => {
    const today = moment();
    const thisMonth = moment().startOf("month");
    return {
      totalUsers: new Set(filteredAppointments.map((app) => app.user._id)).size,
      totalDoctors: new Set(filteredAppointments.map((app) => app.doctor._id)).size,
      appointmentsConfirmed: filteredAppointments.filter((app) => app.status === "confirmed").length,
      appointmentsCancelled: filteredAppointments.filter((app) => app.status === "cancelled").length,
      appointmentsPending: filteredAppointments.filter((app) => app.status === "pending").length,
      appointmentsCompleted: filteredAppointments.filter((app) => app.status === "completed").length,
      revenueToday: filteredAppointments
        .filter((app) => moment(app.date, "DD/MM/YYYY").isSame(today, "day") && app.payment === "paid")
        .reduce((sum, app) => sum + app.doctor.fee, 0),
      revenueThisMonth: filteredAppointments
        .filter((app) => moment(app.date, "DD/MM/YYYY").isSameOrAfter(thisMonth, "day") && app.payment === "paid")
        .reduce((sum, app) => sum + app.doctor.fee, 0),
    };
  };

 
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
        .reduce((sum, app) => sum + app.doctor.fee, 0);
      return { date: moment(date, "DD/MM/YYYY").format("MMM DD"), revenue };
    });
    return filter.value === "all" ? filteredAppointments
      .filter((app) => app.payment === "paid")
      .map((app) => ({
        date: moment(app.date, "DD/MM/YYYY").format("MMM DD"),
        revenue: app.doctor.fee
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

  // Payment method usage (mock data since no payment method field in API)
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

 
  const getRevenueBreakdown = (filteredAppointments: Appointment[]) => {
    const byDate: { [key: string]: number } = {};
    const byDoctor: { [key: string]: { name: string; revenue: number } } = {};
    const bySpecialization: { [key: string]: number } = {};
    filteredAppointments
      .filter((app) => app.payment === "paid")
      .forEach((app) => {
        const date = moment(app.date, "DD/MM/YYYY").format("MMM DD");
        byDate[date] = (byDate[date] || 0) + app.doctor.fee;
        const doctorId = app.doctor._id;
        if (!byDoctor[doctorId]) {
          byDoctor[doctorId] = { name: app.doctor.name, revenue: 0 };
        }
        byDoctor[doctorId].revenue += app.doctor.fee;
        const spec = app.doctor.specialization;
        bySpecialization[spec] = (bySpecialization[spec] || 0) + app.doctor.fee;
      });
    return {
      byDate: Object.entries(byDate).map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => moment(a.date, "MMM DD").diff(moment(b.date, "MMM DD"))),
      byDoctor: Object.entries(byDoctor).map(([, data]) => data),
      bySpecialization: Object.entries(bySpecialization).map(([name, revenue]) => ({ name, revenue })),
    };
  };

  // Status badge styling
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
  const stats = getStats(filteredAppointments);
  const upcomingAppointments = getUpcomingAppointments(filteredAppointments);
  const appointmentTrends = getAppointmentTrends(filteredAppointments);
  const revenueGrowth = getRevenueGrowth(filteredAppointments);
  const appointmentStatus = getAppointmentStatus(filteredAppointments);
  const paymentMethods = getPaymentMethods(filteredAppointments);
  const specializationDemand = getSpecializationDemand(filteredAppointments);
  const topDoctors = getTopDoctors(filteredAppointments);
  const revenueBreakdown = getRevenueBreakdown(filteredAppointments);

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
        <SidebarAdmin />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-8 mt-16">
         
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-1">
                Monitor platform activity, revenue, and performance
              </p>
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
                className="appearance-none border border-gray-200 bg-white px-4 py-2.5 pr-10 rounded-lg text-sm sm:text-base font-medium text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-lg w-full sm:w-56 custom-select"
              >
                <option value="all">All Data</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="next7days">Next 7 Days</option>
              </select>
            </div>
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Users className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
                  <p className="text-sm sm:text-base text-blue-800 font-medium">Total Users</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Stethoscope className="w-10 h-10 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.totalDoctors}</p>
                  <p className="text-sm sm:text-base text-green-800 font-medium">Total Doctors</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <DollarSign className="w-10 h-10 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-900">₹{stats.revenueToday} / ₹{stats.revenueThisMonth}</p>
                  <p className="text-sm sm:text-base text-purple-800 font-medium">Revenue (Today/Month)</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.appointmentsConfirmed}</p>
                  <p className="text-sm sm:text-base text-green-800 font-medium">Confirmed Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-red-900">{stats.appointmentsCancelled}</p>
                  <p className="text-sm sm:text-base text-red-800 font-medium">Cancelled Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <Clock className="w-10 h-10 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-900">{stats.appointmentsPending}</p>
                  <p className="text-sm sm:text-base text-yellow-800 font-medium">Pending Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <CheckSquare className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.appointmentsCompleted}</p>
                  <p className="text-sm sm:text-base text-blue-800 font-medium">Completed Appointments</p>
                </div>
              </div>
            </div>
          </div>

       
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
              <List className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Upcoming Appointments ({filter.label})</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
              {upcomingAppointments.length === 0 ? (
                <div className="p-6 text-center text-gray-600 text-base sm:text-lg">
                  No upcoming appointments.
                </div>
              ) : (
                upcomingAppointments.map((app, index) => (
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
                        {app.date} at {app.time} with Dr. {app.doctor.name}
                      </p>
                    </div>
                    <span className={getStatusBadge(app.status)}>{app.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
           
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Appointment Trends ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentTrends}>
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

           
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Revenue Growth ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#475569" fontSize={14} />
                  <YAxis stroke="#475569" fontSize={14} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} dot={{ r: 5, fill: "#059669" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
        
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Appointment Status ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={appointmentStatus}
                    innerRadius={50}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
                  >
                    {appointmentStatus.map((_, index) => (
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

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Payment Methods ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    innerRadius={50}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value?.toFixed(0)}`}
                    labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
                  >
                    {paymentMethods.map((_, index) => (
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

            {/* Specialization Demand */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Specialization Demand ({filter.label})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={specializationDemand}
                    innerRadius={50}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
                  >
                    {specializationDemand.map((_, index) => (
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

          {/* Top Doctors */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Top Doctors by Appointments ({filter.label})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3">Doctor</th>
                    <th className="px-6 py-3">Specialization</th>
                    <th className="px-6 py-3">Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {topDoctors.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-600 text-base">
                        No doctors found
                      </td>
                    </tr>
                  ) : (
                    topDoctors.map((doctor, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-all duration-300`}>
                        <td className="px-6 py-4 font-medium">{doctor.name}</td>
                        <td className="px-6 py-4">{doctor.specialization}</td>
                        <td className="px-6 py-4">{doctor.count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Revenue Breakdown ({filter.label})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* By Date */}
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">By Date</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.byDate.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-4 text-center text-gray-600 text-base">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.byDate.map((entry, index) => (
                          <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-all duration-300`}>
                            <td className="px-4 py-4">{entry.date}</td>
                            <td className="px-4 py-4">₹{entry.revenue}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* By Doctor */}
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">By Doctor</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3">Doctor</th>
                        <th className="px-4 py-3">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.byDoctor.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-4 text-center text-gray-600 text-base">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.byDoctor.map((entry, index) => (
                          <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-all duration-300`}>
                            <td className="px-4 py-4">{entry.name}</td>
                            <td className="px-4 py-4">₹{entry.revenue}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* By Specialization */}
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">By Specialization</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3">Specialization</th>
                        <th className="px-4 py-3">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueBreakdown.bySpecialization.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-4 text-center text-gray-600 text-base">
                            No revenue data
                          </td>
                        </tr>
                      ) : (
                        revenueBreakdown.bySpecialization.map((entry, index) => (
                          <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-all duration-300`}>
                            <td className="px-4 py-4">{entry.name}</td>
                            <td className="px-4 py-4">₹{entry.revenue}</td>
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