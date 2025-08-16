

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft } from "lucide-react";
// import axiosInstance from "../../utils/axios";
// import logo from '../../assets/Screenshot 2025-07-08 170708.png';

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

// const AdminAppointmentDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const appointment = location.state?.appointment;
//   const [prescription, setPrescription] = useState<IPrescription | null>(null);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       if (!appointment?._id) return;
//       try {
//         const { data } = await axiosInstance.get(`/get-prescription/${appointment._id}`);
//         if (data) setPrescription(data);
//       } catch (err) {
//         console.error("Prescription fetch error:", err);
//       }
//     };
//     fetchPrescription();
//   }, [appointment]);

//   if (!appointment) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600 text-lg">No appointment data found.</p>
//       </div>
//     );
//   }

//   const user = appointment.user;
//   const doctor = appointment.doctor;

//   return (
//     <div className="min-h-screen flex flex-col">
     
//       <header className="bg-white shadow px-6 py-4 flex justify-between items-center w-full">
        
//         <img src={logo} alt="Logo" className="w-40 h-12"/>
//         <button
//           onClick={() => navigate("/all-appointments")}
//           className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back
//         </button>
//       </header>

      
//       <div className="flex flex-1 overflow-hidden">
        
//         <aside className="w-64 bg-blue-800 text-white p-6 hidden sm:block">
//           <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//           <nav className="space-y-4">
//             <button
//               onClick={() => navigate("/admin/appointments")}
//               className="block w-full text-left hover:text-blue-300"
//             >
//               Appointments
//             </button>
//             <button
//               onClick={() => navigate("/admin/users")}
//               className="block w-full text-left hover:text-blue-300"
//             >
//               Users
//             </button>
//             <button
//               onClick={() => navigate("/admin/settings")}
//               className="block w-full text-left hover:text-blue-300"
//             >
//               Settings
//             </button>
//           </nav>
//         </aside>

     
//         <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
//           <div className="max-w-5xl mx-auto space-y-6">
           
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-2 gap-6 "
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
//                 <h2 className="text-lg font-semibold mb-4 border-b pb-2">Patient Information</h2>
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={user.photo}
//                     alt="Patient"
//                     className="w-20 h-20 rounded-full border object-cover"
//                   />
//                   <div>
//                     <p className="font-medium">{user.name}</p>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                     <p className="text-sm text-gray-500 capitalize">{user.gender}</p>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p>Date of Birth: {user.dateOfBirth}</p>
//                   <p>
//                     Address: {user.houseName}, {user.city}, {user.state}, {user.country} - {user.pin}
//                   </p>
//                 </div>
//               </div>

            
//               <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300" >
//                 <h2 className="text-lg font-semibold mb-4 border-b pb-2">Doctor Information</h2>
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={doctor.photo}
//                     alt="Doctor"
//                     className="w-20 h-20 rounded-full border object-cover"
//                   />
//                   <div>
//                     <p className="font-medium">{doctor.name}</p>
//                     <p className="text-sm text-gray-500">{doctor.email}</p>
//                     <p className="text-sm text-gray-500">{doctor.specialization}</p>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p>Experience: {doctor.yearOfExperience} years</p>
//                   <p>Education: {doctor.educationDetails}</p>
//                 </div>
//               </motion.div>

             
//               <div className="bg-white rounded-xl shadow-2xl p-6 md:col-span-2 hover:scale-102 transition duration-300" >
//                 <h2 className="text-lg font-semibold mb-4 border-b pb-2">Appointment Info</h2>
//                 <div className="text-sm text-gray-700 space-y-2">
//                   <p><strong>Appointment No:</strong> {appointment.appointmentNo}</p>
//                   <p><strong>Date:</strong> {appointment.date}</p>
//                   <p><strong>Time:</strong> {appointment.time}</p>
//                   <p><strong>Fee:</strong> ₹{doctor.fee}</p>
//                   <p><strong>Status:</strong> {appointment.status}</p>
//                   <p><strong>Payment:</strong> {appointment.payment}</p>
//                 </div>
//               </div>
//             </motion.div>

         
//             {prescription && (
//               <motion.div
//                 className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
//                   Prescription Details
//                 </h2>
//                 <div className="text-sm text-gray-700 space-y-2">
//                   <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
//                   <p><strong>Advice:</strong> {prescription.notes}</p>
//                   {prescription.followUpDate && (
//                     <p>
//                       <strong>Follow-Up Date:</strong>{" "}
//                       {`${new Date(prescription.followUpDate).getDate().toString().padStart(2, "0")}-${(new Date(prescription.followUpDate).getMonth() + 1).toString().padStart(2, "0")}-${new Date(prescription.followUpDate).getFullYear()}, ${new Date(prescription.followUpDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
//                     </p>
//                   )}
//                   <div>
//                     <strong>Medicines: </strong>
//                     <ul className="list-disc ml-6 mt-1">
//                       {prescription.medicines.map((med, idx) => (
//                         <li key={idx}>
//                           {med.name} - {med.dosage} - {med.frequency} - {med.duration} - {med.instructions}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminAppointmentDetails;

















import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import axiosInstance from "../../utils/axios";
import logo from "../../assets/Screenshot 2025-07-08 170708.png";

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

const AdminAppointmentDetails: React.FC = () => {
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

  const user = appointment.user;
  const doctor = appointment.doctor;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center w-full">
        <img src={logo} alt="Logo" className="w-32 sm:w-40 h-10 sm:h-12" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/all-appointments")}
            className="hidden sm:flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow"
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

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 640) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800 text-white w-64 p-6 fixed sm:static z-40 inset-y-0 left-0"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <button
                  className="sm:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <button
                  onClick={() => navigate("/all-appointments")}
                  className="block w-full text-left hover:text-blue-300"
                >
                  Appointments
                </button>
                <button
                  onClick={() => navigate("/admin-dashboard")}
                  className="block w-full text-left hover:text-blue-300"
                >
                  Dashboard
                </button>
                {/* <button
                  onClick={() => navigate("/admin/settings")}
                  className="block w-full text-left hover:text-blue-300"
                >
                  Settings
                </button> */}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Patient Info */}
              <div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  Patient Information
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <img
                    src={user.photo}
                    alt="Patient"
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.gender}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Date of Birth: {user.dateOfBirth}</p>
                  <p>
                    Address: {user.houseName}, {user.city}, {user.state},{" "}
                    {user.country} - {user.pin}
                  </p>
                </div>
              </div>

              {/* Doctor Info */}
              <motion.div className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  Doctor Information
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <img
                    src={doctor.photo}
                    alt="Doctor"
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.email}</p>
                    <p className="text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Experience: {doctor.yearOfExperience} years</p>
                  <p>Education: {doctor.educationDetails}</p>
                </div>
              </motion.div>

              {/* Appointment Info */}
              <div className="bg-white rounded-xl shadow-2xl p-6 md:col-span-2 hover:scale-102 transition duration-300">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  Appointment Info
                </h2>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Appointment No:</strong> {appointment.appointmentNo}
                  </p>
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Fee:</strong> ₹{doctor.fee}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                  <p>
                    <strong>Payment:</strong> {appointment.payment}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Prescription */}
            {prescription && (
              <motion.div
                className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
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
                      ).getDate().toString().padStart(2, "0")}-${(
                        new Date(prescription.followUpDate).getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${new Date(
                        prescription.followUpDate
                      ).getFullYear()}, ${new Date(
                        prescription.followUpDate
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  )}
                  <div>
                    <strong>Medicines: </strong>
                    <ul className="list-disc ml-6 mt-1">
                      {prescription.medicines.map((med, idx) => (
                        <li key={idx}>
                          {med.name} - {med.dosage} - {med.frequency} -{" "}
                          {med.duration} - {med.instructions}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAppointmentDetails;










