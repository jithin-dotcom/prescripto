

import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import { useDoctorStore } from "../../store/doctorStore";
import { toast } from "react-toastify";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal"; 
import type { Appointment } from "../../interfaces/IDoctorAppointment";
import { useNavigate } from "react-router-dom";

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
  const [selectedAction, setSelectedAction] = useState<{
    appointmentId: string;
    newStatus: "confirmed" | "cancelled" | null;
  }>({ appointmentId: "", newStatus: null });
  const navigate = useNavigate();

  useDoctorStore((state) => state.doctorData);

  const limit = 3;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get(
          `/doctor-appointments?page=${currentPage}&limit=${limit}&status=${statusFilter}`
        );
        console.log("res.data.data", res.data.data);
        setAppointments(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [currentPage, statusFilter]);

  const handleUpdateStatus = async () => {
    const { appointmentId, newStatus } = selectedAction;
    if (!appointmentId || !newStatus) return;

    try {
      await axiosInstance.patch(`/cancel-appointment/${appointmentId}`, { status: newStatus });
      // const updated = appointments.map((app) =>
      //   app._id === appointmentId ? { ...app, status: newStatus } : app
      // );
      const updated = appointments.map((app) => {
         if(app._id !== appointmentId) return app;
         const shouldRefund = newStatus === "cancelled" && app.payment === "paid";
         return{
           ...app,
           status: newStatus,
           payment: shouldRefund ? "refund" : app.payment
         }
      })
      setAppointments(updated);
      toast.success(`Appointment ${newStatus}`);
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
        return `${base} bg-yellow-100 text-yellow-800`;
      case "cancelled":
        return `${base} bg-red-100 text-red-700`;
      case "confirmed":
        return `${base} bg-green-100 text-green-700`;
      case "completed":
        return `${base} bg-gray-300 text-gray-800`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };
  console.log("appointments : ",appointments);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-xl font-semibold text-gray-700">All Appointments</h1>
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

          <div className="overflow-x-auto rounded-lg bg-white shadow-2xl hover:scale-102 transition duration-300">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-[#EAEFFF] text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">AppNo</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Fee</th>
                  <th className="px-4 py-3">Status</th>
                   <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                
                {appointments.map((app, index) => {
                  const disabled = ["cancelled", "completed"].includes(app.status);
                  return (
                    <tr key={app._id} className="hover:bg-[#5F6FFF] hover:text-white transition">
                      <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                      <td className="px-4 py-3">{app.appointmentNo}</td>
                      <td className="px-4 py-3 flex items-center gap-2 justify-center">
                        <img
                          src={app.user.photo || "/default-avatar.png"}
                          className="w-8 h-8 rounded-full object-cover"
                          alt="patient"
                        />
                        <span>{app.user.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        {app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {app.date}, {app.time}
                      </td>
                      <td className="px-4 py-3">₹{app.fee}</td>
                      <td className="px-4 py-3">
                        <span className={getStatusBadge(app.status)}>{app.status}</span>
                      </td>
                       {/* <td className="px-4 py-3">
                        <span>{app.payment}</span>
                      </td> */}
                      <td className="px-4 py-3">
  <span
    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
      app.payment === "paid"
        ? "bg-green-100 text-green-800 border border-green-300"
        : app.payment === "refund"
        ? "bg-gray-100 text-gray-800 border border-gray-300"
        : "bg-red-100 text-red-800 border border-red-300"
    }`}
  >
    {app.payment === "paid"
      ? "Paid"
      : app.payment === "refund"
      ? "Refunded"
      : "Not Paid"}
  </span>
</td>

                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className={`text-xs px-3 py-1 rounded flex items-center gap-1 transition ${
                              disabled
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                            onClick={() => {
                              if (!disabled)
                                setSelectedAction({ appointmentId: app._id, newStatus: "cancelled" });
                              setModalOpen(true);
                            }}
                            disabled={disabled}
                          >
                            <Ban size={14} /> Cancel
                          </button>
                          {/* <button
                            className={`text-xs px-3 py-1 rounded flex items-center gap-1 transition ${
                              disabled
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                            onClick={() => {
                              if (!disabled)
                                setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
                              setModalOpen(true);
                            }}
                            disabled={disabled}
                          >
                            <Check size={14} /> Confirm
                          </button> */}


                          {app.status === "confirmed" && app.payment === "paid" ? (
      <>
        <button
          className="text-xs px-3 py-1 rounded flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => {
              navigate("/chat",{ state: { appointmentId: app._id, userId: app.user._id, doctorId: app.doctorId } })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 15a2 2 0 002-2V7a2 2 0 00-2-2H7L3 9v4a2 2 0 002 2h2v4l4-4h10z" />
          </svg>
          Chat
        </button>

        <button
          className="text-xs px-3 py-1 rounded flex items-center gap-1 bg-purple-500 text-white hover:bg-purple-600 transition"
          onClick={() => {
            // Replace with your video call route or action
            // console.log("Start video call with", app.user.name);
            // navigate("/my-video",{ state: { appointmentId: app._id, patientId: app.user._id, doctorId: app.doctorId } })
             navigate("/my-video",{ state: { appointmentId: app._id, userId: app.doctorId, doctorId: app.user._id } })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10z" />
            <path d="M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
          Video
        </button>
      </>
    ) : (
      <button
        className={`text-xs px-3 py-1 rounded flex items-center gap-1 transition ${
          disabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
        onClick={() => {
          if (!disabled)
            setSelectedAction({ appointmentId: app._id, newStatus: "confirmed" });
          setModalOpen(true);
        }}
        disabled={disabled}
      >
        <Check size={14} /> Confirm
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

          {totalPages > 0 && (
            <div className="mt-6">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}

          {/*  Confirmation Modal */}
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
