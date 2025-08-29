

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";

import { toast } from "react-toastify";
import type { IPrescription, IMed } from "../../interfaces/IAppointmentDetails";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import { APIRoutes } from "../../constants/routes.constants";

const AppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state?.appointment;
  const [prescription, setPrescription] = useState<IPrescription | null>(null);
  

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!appointment?._id) return;
      try {
        const { data } = await axiosInstance.get(`${APIRoutes.GET_PRESCRIPTION}/${appointment._id}`);
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
    <div className="min-h-screen flex flex-col bg-gray-50 bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className="bg-white rounded-xl shadow-2xl pbudgets p-6 hover:scale-102 transition duration-300">
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
                 <button
                  onClick={() => navigate("/patient-history",{ state : { patientId:  user._id }})}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Patient History
                </button>
              </motion.div>

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
                <button
                  onClick={() =>
                    appointment.status === "completed"
                      ? navigate("/create-prescription", { state: { appointment } })
                      : toast.error("Consultation not Completed")
                  }
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Write Prescription
                </button>
               
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
                  <button
                    onClick={() =>
                      appointment.status === "completed"
                        ? navigate("/edit-prescription", { state: { appointment } })
                        : toast.error("Consultation not Completed")
                    }
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
                  >
                    Edit Prescription
                  </button>
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












