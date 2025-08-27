

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";
import type { IPrescription } from "../../interfaces/IUserAppointmentDetails";
import Navbar from "../../components/Navbar";


const UserAppointmentDetails: React.FC = () => {
  const location = useLocation();
  const [prescription, setPrescription] = useState<IPrescription | null>(null);
  const appointment = location.state?.appointment;

  const downloadInvoice = async (appointmentId: string) => {
    try {
      const response = await axiosInstance.get(
        `payments/get-payment/${appointmentId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${appointmentId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPrescription = async (appointmentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/download-prescription/${appointmentId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prescription-${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!appointment?._id) return;
      try {
        const { data } = await axiosInstance.get(
          `/get-prescription/${appointment._id}`
        );
        if (data) setPrescription(data);
      } catch (err) {
        console.error("Prescription fetch error:", err);
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

  const doctor = appointment.doctor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
      
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Doctor Information
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={doctor.photo}
                  alt="Doctor"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-gray-500 text-sm">{doctor.email}</p>
                  <p className="text-gray-500 text-sm">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Education: {doctor.educationDetails}</p>
                <p>Experience: {doctor.yearOfExperience} years</p>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Appointment Information
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Appointment No:</span>{" "}
                  {appointment.appointmentNo}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {appointment.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {appointment.time}
                </p>
                <p>
                  <span className="font-medium">Fee:</span> ₹{doctor.fee}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {appointment.status}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {appointment.payment}
                </p>
                <button
                  onClick={() => downloadInvoice(appointment._id)}
                  className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full shadow text-sm"
                >
                  Download Invoice
                </button>
              </div>
            </motion.div>

            {prescription && (
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 md:col-span-2 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Prescription Details
                </h2>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Diagnosis:</strong> {prescription.diagnosis}
                  </p>
                  <p>
                    <strong>Advice:</strong> {prescription.notes}
                  </p>
                  {prescription.followUpDate && (
                    <p>
                      <strong>Follow-Up Date:</strong>{" "}
                      {`${new Date(
                        prescription.followUpDate
                      ).toLocaleDateString()} ${new Date(
                        prescription.followUpDate
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  )}
                  <div>
                    <strong>Medicines:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      {prescription.medicines.map((med, idx) => (
                        <li key={idx}>
                          {med.name} – {med.dosage} – {med.frequency} –{" "}
                          {med.duration} - {med.instructions}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => downloadPrescription(appointment._id)}
                    className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full shadow text-sm"
                  >
                    Download Prescription
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserAppointmentDetails;