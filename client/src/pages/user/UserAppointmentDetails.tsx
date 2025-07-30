

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Menu, X } from "lucide-react";
// import axiosInstance from "../../utils/axios";



// interface IMed {
//   name: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
// }

// interface IPrescription {
//   diagnosis: string;
//   notes: string;
//   followUpDate?: string;
//   medicines: IMed[];
// }

// const UserAppointmentDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [prescription, setPrescription] = useState<IPrescription | null>(null);
//   const appointment = location.state?.appointment;

//    useEffect(() => {
//       const fetchPrescription = async () => {
//         if (!appointment?._id) return;
//         try {
//           const { data } = await axiosInstance.get(`/get-prescription/${appointment._id}`);
//           if (data) setPrescription(data);
//         } catch (err) {
//           console.error("Prescription fetch error:", err);
//         }
//       };
//       fetchPrescription();
//     }, [appointment]);
  
//   if (!appointment) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600 text-lg">No appointment data found.</p>
//       </div>
//     );
//   }

 

//   const doctor = appointment.doctor;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       {/* Top Navbar (always full width) */}
//       <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-semibold text-gray-700">Appointment Details</h1>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/my-appointments")}
//             className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full shadow"
//           >
//             <ArrowLeft className="w-5 h-5" /> Back
//           </button>
//           {/* Mobile menu toggle */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="md:hidden text-blue-600"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>
//       </header>

//       {/* Below-header content layout */}
//       <div className="flex flex-1">
//         {/* Sidebar (shown on md+ screens or toggled on mobile) */}
//         <AnimatePresence>
//           {(sidebarOpen || window.innerWidth >= 768) && (
//             <motion.aside
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               transition={{ duration: 0.3 }}
//               className="bg-blue-800 text-white w-64 p-6 fixed md:static z-40 inset-y-0 left-0 md:flex-shrink-0"
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold">Actions</h2>
//                 <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <nav className="space-y-4">
//                 <button onClick={() => navigate("/appointments")} className="block w-full text-left hover:text-blue-300">Appointments</button>
//                 <button onClick={() => navigate("/patients")} className="block w-full text-left hover:text-blue-300">Patients</button>
//                 <button onClick={() => navigate("/settings")} className="block w-full text-left hover:text-blue-300">Settings</button>
//               </nav>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-4 sm:p-8 ">
//           <motion.div
//             className="max-w-5xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Doctor Info */}
//               <motion.div
//                 className="bg-white rounded-xl shadow-2xl p-6"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
//                   Doctor Information
//                 </h2>
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={doctor.photo}
//                     alt="Doctor"
//                     className="w-20 h-20 rounded-full border object-cover"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-800">{doctor.name}</p>
//                     <p className="text-gray-500 text-sm">{doctor.email}</p>
//                     <p className="text-gray-500 text-sm">{doctor.specialization}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1 text-sm text-gray-600">
//                   <p>Education: {doctor.educationDetails}</p>
//                   <p>Experience: {doctor.yearOfExperience} years</p>
//                 </div>
//               </motion.div>

//               {/* Appointment Info */}
//               <motion.div
//                 className="bg-white rounded-xl shadow-2xl p-6"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
//                   Appointment Information
//                 </h2>
//                 <div className="space-y-2 text-sm text-gray-700">
//                   <p><span className="font-medium">Appointment No:</span> {appointment.appointmentNo}</p>
//                   <p><span className="font-medium">Date:</span> {appointment.date}</p>
//                   <p><span className="font-medium">Time:</span> {appointment.time}</p>
//                   <p><span className="font-medium">Fee:</span> ₹{doctor.fee}</p>
//                   <p><span className="font-medium">Status:</span> {appointment.status}</p>
//                   <p><span className="font-medium">Payment:</span> {appointment.payment}</p>
//                 </div>
//               </motion.div>

//                {prescription && (
//                         <motion.div
//                           className="bg-white rounded-xl shadow p-6"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.4 }}
//                         >
//                           <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
//                             Prescription Details
//                           </h2>
//                           <div className="text-sm text-gray-700 space-y-2">
//                             <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
//                             <p><strong>Advice:</strong> {prescription.notes}</p>
//                             {prescription.followUpDate && (
//                               <p>
//                                 <strong>Follow-Up Date:</strong>{" "}
//                                 {`${new Date(prescription.followUpDate).getDate().toString().padStart(2, "0")}-${(new Date(prescription.followUpDate).getMonth() + 1).toString().padStart(2, "0")}-${new Date(prescription.followUpDate).getFullYear()}, ${new Date(prescription.followUpDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
//                               </p>
//                             )}
//                             <div>
//                               <strong>Medicines:</strong>
//                               <ul className="list-disc ml-6 mt-1">
//                                 {prescription.medicines.map((med, idx) => (
//                                   <li key={idx}>
//                                     {med.name} - {med.dosage} - {med.frequency} - {med.duration}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserAppointmentDetails;























import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import axiosInstance from "../../utils/axios";
import logo from '../../assets/Screenshot 2025-07-08 170708.png';


interface IMed {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface IPrescription {
  diagnosis: string;
  notes: string;
  followUpDate?: string;
  medicines: IMed[];
}

const UserAppointmentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prescription, setPrescription] = useState<IPrescription | null>(null);
  const appointment = location.state?.appointment;

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

  const doctor = appointment.doctor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* <h1 className="text-xl font-semibold text-gray-700">{logo}</h1> */}
        <img src={logo} alt="logo" className="w-40 h-12 "/>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/my-appointments")}
            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full shadow"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-blue-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1">
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800 text-white w-64 p-6 fixed md:static z-40 inset-y-0 left-0 md:flex-shrink-0"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Actions</h2>
                <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <button onClick={() => navigate("/appointments")} className="block w-full text-left hover:text-blue-300">Appointments</button>
                <button onClick={() => navigate("/patients")} className="block w-full text-left hover:text-blue-300">Patients</button>
                <button onClick={() => navigate("/settings")} className="block w-full text-left hover:text-blue-300">Settings</button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 sm:p-8">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Info */}
              <motion.div
                className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
                
              >
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
                  <p>Education: {doctor.educationDetails}</p>
                  <p>Experience: {doctor.yearOfExperience} years</p>
                </div>
              </motion.div>

              {/* Appointment Info */}
              <motion.div
                className="bg-white rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
                
              >
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Appointment Information
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

              {/* Prescription Info */}
              {prescription && (
                <motion.div
                  className="bg-white rounded-xl shadow-2xl p-6 md:col-span-2 hover:scale-102 transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                    Prescription Details
                  </h2>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                    <p><strong>Advice:</strong> {prescription.notes}</p>
                    {prescription.followUpDate && (
                      <p>
                        <strong>Follow-Up Date:</strong>{" "}
                        {`${new Date(prescription.followUpDate).toLocaleDateString()} ${new Date(prescription.followUpDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                      </p>
                    )}
                    <div>
                      <strong>Medicines:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {prescription.medicines.map((med, idx) => (
                          <li key={idx}>
                            {med.name} – {med.dosage} – {med.frequency} – {med.duration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserAppointmentDetails;
