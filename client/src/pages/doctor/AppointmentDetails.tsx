

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../../utils/axios";
import logo from '../../assets/Screenshot 2025-07-08 170708.png';

interface IMed {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface IPrescription {
  diagnosis: string;
  notes: string;
  followUpDate?: string;
  medicines: IMed[];
}

const AppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state?.appointment;
  const [prescription, setPrescription] = useState<IPrescription | null>(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!appointment?._id) return;
      try {
        const { data } = await axiosInstance.get(`/get-prescription/${appointment._id}`);
        if (data) setPrescription(data);
      } catch (error) {
        console.error("Prescription not found or fetch failed", error);
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
      
      <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        {/* <h1 className="text-xl font-semibold text-gray-700">Appointment Details</h1> */}
        <img src={logo} alt="Logo" className="w-40 h-12" />
        <button
          onClick={() => navigate("/doctor-appointments")}
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </header>

      
      <div className="flex flex-1">
       
        <aside className="w-64 bg-blue-800 text-white flex-shrink-0 p-6 hidden sm:block">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button
              onClick={() => navigate("/create-prescription", { state: { appointment } })}
              className="block w-full text-left hover:text-blue-300"
            >
              Write Prescription
            </button>
            <button
              onClick={() => navigate("/edit-prescription", { state: { appointment } })}
              className="block w-full text-left hover:text-blue-300"
            >
              Edit Prescription
            </button>
            {/* <button
              onClick={() => navigate("/settings")}
              className="block w-full text-left hover:text-blue-300"
            >
              Settings
            </button> */}
          </nav>
        </aside>

      
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300" >
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Patient Information</h2>
                <div className="flex items-center gap-4 mb-4">
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

             
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300" >
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Appointment Information</h2>
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
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 mt-8 hover:scale-102 transition duration-300" >
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Prescription Details</h2>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><span className="font-medium">Diagnosis:</span> {prescription.diagnosis}</p>
                  <p><span className="font-medium">Advice:</span> {prescription.notes}</p>
                  {prescription.followUpDate && (
                    <p>
                      <span className="font-medium">Follow-Up Date:</span>{" "}
                      {`${new Date(prescription.followUpDate).getDate().toString().padStart(2, '0')}-${(new Date(prescription.followUpDate).getMonth()+1).toString().padStart(2, '0')}-${new Date(prescription.followUpDate).getFullYear()}, ${new Date(prescription.followUpDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </p>
                  )}
                  <div>
                    <span className="font-medium">Medicines:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {prescription.medicines?.map((med: IMed, idx: number) => (
                        <li key={idx}>
                         {med.name}  -  {med.dosage} - {med.frequency} - {med.duration} - {med.instructions}
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

