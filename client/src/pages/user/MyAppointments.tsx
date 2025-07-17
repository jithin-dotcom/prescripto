

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
import type { Appointment } from "../../interfaces/IMyAppointments";


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
        console.log("appointments : ",res.data?.data);
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
                     Appointment Number : {item.appointmentNo}
                  </p>
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
