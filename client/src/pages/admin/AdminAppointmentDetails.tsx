


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const AdminAppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state?.appointment;

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">No appointment data found.</p>
      </div>
    );
  }

  const user = appointment.user;
  const doctor = appointment.doctor;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex-shrink-0 p-6 hidden sm:block">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => navigate("/admin/appointments")} className="block w-full text-left hover:text-blue-300">
            Appointments
          </button>
          <button onClick={() => navigate("/admin/users")} className="block w-full text-left hover:text-blue-300">
            Users
          </button>
          <button onClick={() => navigate("/admin/settings")} className="block w-full text-left hover:text-blue-300">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Appointment Details</h1>
          <button
            onClick={() => navigate("/all-appointments")}
            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-full shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </header>

        {/* Details */}
        <motion.div
          className="p-4 sm:p-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Info */}
            <motion.div className="bg-white rounded-xl shadow-2xl p-6" whileHover={{ scale: 1.02 }}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Patient Information
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.photo}
                  alt="Patient"
                  className="w-20 h-20 rounded-full border object-cover"
                />
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

            {/* Doctor Info */}
            <motion.div className="bg-white rounded-xl shadow-2xl p-6" whileHover={{ scale: 1.02 }}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Doctor Information
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={doctor.photo}
                  alt="Doctor"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-gray-500 text-sm">{doctor.email}</p>
                  <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Experience: {doctor.yearOfExperience} years</p>
                <p>Education: {doctor.educationDetails}</p>
              </div>
            </motion.div>

            {/* Appointment Info */}
            <motion.div className="bg-white rounded-xl shadow-2xl p-6 md:col-span-2" whileHover={{ scale: 1.02 }}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Appointment Details
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Appointment No:</span> {appointment.appointmentNo}</p>
                <p><span className="font-medium">Date:</span> {appointment.date}</p>
                <p><span className="font-medium">Time:</span> {appointment.time}</p>
                <p><span className="font-medium">Fee:</span> ₹{doctor.fee}</p>
                <p><span className="font-medium">Status:</span> {appointment.status}</p>
                <p><span className="font-medium">Payment:</span> {appointment.payment}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAppointmentDetails;
