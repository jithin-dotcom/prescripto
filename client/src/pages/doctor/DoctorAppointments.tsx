

import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views} from "react-big-calendar";
import type{ View } from "react-big-calendar";
import moment from "moment";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import axiosInstance from "../../utils/axios";
import { useDoctorStore } from "../../store/doctorStore";
import { toast } from "react-toastify";
import axios from "axios";
import { Ban, Check, Filter, ChevronDown, Video, Calendar as CalendarIcon,  Clock } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import type { Event } from "react-big-calendar";
import type { Appointment } from "../../interfaces/IDoctorAppointment";
import { useNavigate } from "react-router-dom";
import { APIRoutes, APIDoctorRoutes } from "../../constants/routes.constants";
import "react-big-calendar/lib/css/react-big-calendar.css";


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


const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{
    appointmentId: string;
    newStatus: "confirmed" | "cancelled" | null;
  }>({ appointmentId: "", newStatus: null });
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  useDoctorStore((state) => state.doctorData);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(
          `${APIDoctorRoutes.DOCTOR_APPOINTMENTS}?status=${statusFilter}`
        );
        setAppointments(res.data.data || []);
        console.log("Appointments:", res.data.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        toast.error("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, [statusFilter]);

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

  
  const events = appointments.map((app) => {
    const dateTime = moment(`${app.date} ${app.time}`, "DD/MM/YYYY h:mm A").toDate();
    return {
      id: app._id,
      title: `${app.user.name}`,
      start: dateTime,
      end: moment(dateTime).add(30, "minutes").toDate(),
      resource: app,
    };
  });

 
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
                setSelectedAction({ appointmentId: event.resource._id, newStatus: "cancelled" });
                setModalOpen(true);
              }
            }}
            disabled={disabled}
            title="Cancel Appointment"
          >
            <Ban className="w-3 h-3" /> Cancel
          </button>
          {event.resource.status === "confirmed" && event.resource.payment === "paid" ? (
            <button
              className="px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 shadow-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/my-video", {
                  state: {
                    appointmentId: event.resource._id,
                    userId: event.resource.user._id,
                    doctorId: event.resource.doctorId,
                  },
                });
              }}
              title="Start Video Consultation"
            >
              <Video className="w-3 h-3" /> Video
            </button>
          ) : (
            <button
              className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-all duration-200 ${
                disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600 shadow-sm"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                  setSelectedAction({ appointmentId: event.resource._id, newStatus: "confirmed" });
                  setModalOpen(true);
                }
              }}
              disabled={disabled}
              title="Confirm Appointment"
            >
              <Check className="w-3 h-3" /> Confirm
            </button>
          )}
        </div>
      </div>
    );
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <style>{customStyles}</style>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 sm:pt-24">
         
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  My Appointments
                </h1>
                <p className="text-sm text-gray-500">
                  Seamlessly manage your patient appointments and consultations
                </p>
              </div>

             
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
                  <Ban className="w-4 h-4" /> Cancelled
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
                onSelectEvent={(event) => navigate("/appointment-details", { state: { appointment: event.resource } })}
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