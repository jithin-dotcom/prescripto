

import { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { X, Check } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal"; 
import type {  Appointment } from "../../interfaces/IAllAppointments";


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

          <div className="hidden md:block bg-white rounded-lg shadow-2xl overflow-x-auto hover:scale-102 transition duration-300">
            <table className="min-w-full text-sm text-left ">
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

      {/*  Reusable Confirmation Modal */}
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
