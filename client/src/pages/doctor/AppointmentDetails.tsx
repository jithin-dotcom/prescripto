


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import axiosInstance from "../../utils/axios";
import logo from '../../assets/Screenshot 2025-07-08 170708.png';
import { toast } from "react-toastify";
import type { IPrescription, IMed } from "../../interfaces/IAppointmentDetails";

// interface IMed {
//   name: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
//   instructions: string;
// }

// interface IPrescription {
//   diagnosis: string;
//   notes: string;
//   followUpDate?: string;
//   medicines: IMed[];
// }

const AppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state?.appointment;
  const [prescription, setPrescription] = useState<IPrescription | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!appointment?._id) return;
      try {
        const { data } = await axiosInstance.get(`/get-prescription/${appointment._id}`);
        if (data) setPrescription(data);
      } catch (error) {
        console.error("Prescription fetch failed", error);
      }
    };
    fetchPrescription();
  }, [appointment]);

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">No appointment data found.</p>
      </div>
    );
  }

  const user = appointment.user;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <img src={logo} alt="Logo" className="w-32 sm:w-40 h-10 sm:h-12" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/doctor-appointments")}
            className="hidden sm:flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-md"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden text-blue-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (mobile + desktop) */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 640) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800 text-white w-64 p-6 fixed sm:static inset-y-0 left-0 z-40"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <button className="sm:hidden" onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <button
                  onClick={() =>
                    appointment.status === "completed"
                      ? navigate("/create-prescription", { state: { appointment } })
                      : toast.error("Consultation not Completed")
                  }
                  className="block w-full text-left hover:text-blue-300"
                >
                  Write Prescription
                </button>
                <button
                  onClick={() =>
                    appointment.status === "completed"
                      ? navigate("/edit-prescription", { state: { appointment } })
                      : toast.error("Consultation not Completed")
                  }
                  className="block w-full text-left hover:text-blue-300"
                >
                  Edit Prescription
                </button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Info */}
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Patient Information
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <img src={user.photo} alt="Patient" className="w-20 h-20 rounded-full border object-cover" />
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-sm capitalize">{user.gender}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Date of Birth: {user.dateOfBirth}</p>
                  <p>Address: {user.houseName}, {user.city}, {user.state}, {user.country} - {user.pin}</p>
                </div>
              </motion.div>

              {/* Appointment Info */}
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Appointment Information
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium">Appointment No:</span> {appointment.appointmentNo}</p>
                  <p><span className="font-medium">Date:</span> {appointment.date}</p>
                  <p><span className="font-medium">Time:</span> {appointment.time}</p>
                  <p><span className="font-medium">Fee:</span> ₹{appointment.fee}</p>
                  <p><span className="font-medium">Status:</span> {appointment.status}</p>
                  <p><span className="font-medium">Payment:</span> {appointment.payment}</p>
                </div>
              </motion.div>
            </div>

           
            {prescription && (
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 mt-8 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Prescription Details
                </h2>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><span className="font-medium">Diagnosis:</span> {prescription.diagnosis}</p>
                  <p><span className="font-medium">Advice:</span> {prescription.notes}</p>
                  {prescription.followUpDate && (
                    <p>
                      <span className="font-medium">Follow-Up Date:</span>{" "}
                      {`${new Date(prescription.followUpDate).getDate().toString().padStart(2, '0')}-${(new Date(prescription.followUpDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(prescription.followUpDate).getFullYear()}, ${new Date(prescription.followUpDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </p>
                  )}
                  <div>
                    <span className="font-medium">Medicines:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {prescription.medicines?.map((med: IMed, idx: number) => (
                        <li key={idx}>
                          {med.name} - {med.dosage} - {med.frequency} - {med.duration} - {med.instructions}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentDetails;

