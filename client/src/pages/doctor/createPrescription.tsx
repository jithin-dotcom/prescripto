


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import type { Variants } from "framer-motion";
import { toast } from "react-toastify";
import { 
  ArrowLeft, 
  PlusCircle, 
  FileText, 
  Calendar, 
  Pill, 
  User, 
  Stethoscope,
  Save,
  Trash2,
  AlertCircle,
} from "lucide-react";



interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

const CreatePrescription: React.FC = () => {
  
  const navigate = useNavigate();
  const { state } = useLocation();


  const appointment = state?.appointment;

  console.log("appointments : ",appointment);

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ]);

  const handleMedicineChange = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
  };

  
  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      const updated = medicines.filter((_, i) => i !== index);
      setMedicines(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  if (!diagnosis.trim() || !notes.trim()) {
    toast.error("Diagnosis and notes  are required.");
    return;
  }


  for (let i = 0; i < medicines.length; i++) {
    const med = medicines[i];
    const fields = ["name", "dosage", "frequency", "duration", "instructions"] as (keyof Medicine)[];
    for (const field of fields) {
      if (!med[field].trim()) {
        toast.error(`Medicine #${i + 1} is missing a value for "${field}".`);
        return;
      }
    }
  }

    try {
      const payload = {
        appointmentId: appointment._id,
        doctorId: appointment.doctorId,
        patientId: appointment.user._id,
        diagnosis,
        notes,
        medicines,
        followUpDate: followUpDate || null,
      };

      


     const res = await axiosInstance.post("/create-prescription", payload);
     console.log("res : ",res);
      
      toast.success("Prescription created successfully!");
      navigate("/doctor-appointments");
    } catch (error) {
      console.error("Error submitting prescription:", error);
      
    }
  };


  const getAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

const age = getAge(appointment.user.dateOfBirth);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

const medicineVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

  if (!appointment) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-red-600 text-lg font-medium">No appointment data available.</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Write Prescription
                </h2>
                <p className="text-gray-600 mt-1">Create digital prescription for your patient</p>
              </div>
            </div>
            <motion.button
              onClick={() => navigate("/doctor-appointments")}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Back</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Patient Information Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-800">Patient Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-600 mb-1 font-medium">Patient Name</p>
              <p className="font-bold text-gray-800 text-lg">{appointment.user.name}</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
              <p className="text-sm text-gray-600 mb-1 font-medium">Age</p>
              <p className="font-bold text-gray-800 text-lg">{age} years</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
              <p className="text-sm text-gray-600 mb-1 font-medium">Appointment</p>
              <p className="font-bold text-gray-800">{appointment.date}</p>
              <p className="text-sm text-gray-600">{appointment.time}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-10"
          variants={itemVariants}
        >
          <div className="space-y-8">
            {/* Diagnosis and Notes Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                  <Stethoscope className="w-5 h-5 text-indigo-600" />
                  Diagnosis
                </label>
                <motion.input
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700 font-medium"
                  placeholder="Enter primary diagnosis..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Notes
                </label>
                <motion.textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-24 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none text-gray-700"
                  placeholder="Additional observations, recommendations..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            </div>

            {/* Follow-up Date */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Follow-up Date
              </label>
              <motion.input
                type="datetime-local"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Medicines Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                  <Pill className="w-6 h-6 text-indigo-600" />
                  Medicines
                </h3>
                <motion.button
                  type="button"
                  onClick={addMedicineField}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Medicine
                </motion.button>
              </div>

              <AnimatePresence>
                {medicines.map((medicine, index) => (
                  <motion.div
                    key={index}
                    variants={medicineVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl mb-4 border-2 border-gray-100 hover:border-indigo-200 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        Medicine #{index + 1}
                      </h4>
                      {medicines.length > 1 && (
                        <motion.button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                      {(["name", "dosage", "frequency", "duration", "instructions"] as (keyof Medicine)[]).map((field) => (
                        <motion.input
                          key={field}
                          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}${
                            field === 'name' ? ' (e.g., Paracetamol)' : 
                            field === 'dosage' ? ' (e.g., 500mg)' : 
                            field === 'frequency' ? ' (e.g., 2x daily)' : 
                            field === 'duration' ? ' (e.g., 7 days)' : 
                            ' (e.g., After meals)'
                          }`}
                          value={medicine[field]}
                          onChange={(e) => handleMedicineChange(index, field, e.target.value)}
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700"
                          whileFocus={{ scale: 1.02 }}
                        />
                      ))}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="pt-8"
              variants={itemVariants}
            >
              <motion.button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Save className="w-6 h-6" />
                  Submit Prescription
                </div>
              </motion.button>
            </motion.div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreatePrescription;
















































// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ArrowLeft, 
//   PlusCircle, 
//   FileText, 
//   Calendar, 
//   Pill, 
//   User, 
//   Stethoscope,
//   Clock,
//   Save,
//   Trash2,
//   AlertCircle
// } from "lucide-react";

// // Note: In a real app, you'd import these from react-router-dom and axios
// // This demo version simulates the functionality without external dependencies

// interface Medicine {
//   name: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
//   instructions: string;
// }

// const CreatePrescription: React.FC = () => {
//   // Mock data for demonstration
//   const appointment = {
//     _id: "123",
//     doctorId: "doc123",
//     user: { _id: "user123", name: "John Doe", age: 35 },
//     date: "2024-01-15",
//     time: "10:00 AM"
//   };

//   const [diagnosis, setDiagnosis] = useState("");
//   const [notes, setNotes] = useState("");
//   const [followUpDate, setFollowUpDate] = useState("");
//   const [medicines, setMedicines] = useState<Medicine[]>([
//     { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleMedicineChange = (index: number, field: keyof Medicine, value: string) => {
//     const updated = [...medicines];
//     updated[index][field] = value;
//     setMedicines(updated);
//   };

//   const addMedicineField = () => {
//     setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
//   };

//   const removeMedicine = (index: number) => {
//     if (medicines.length > 1) {
//       const updated = medicines.filter((_, i) => i !== index);
//       setMedicines(updated);
//     }
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const payload = {
//         appointmentId: appointment._id,
//         doctorId: appointment.doctorId,
//         patientId: appointment.user._id,
//         diagnosis,
//         notes,
//         medicines,
//         followUpDate
//       };

//       console.log("Prescription created:", payload);
//       alert("Prescription created successfully!");
//       // In a real app: navigate("/doctor-appointments");
//     } catch (error) {
//       console.error("Error submitting prescription:", error);
//       alert("Failed to create prescription.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const medicineVariants = {
//     hidden: { opacity: 0, scale: 0.8, x: -50 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       x: 0,
//       transition: { type: "spring", stiffness: 300, damping: 25 }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.8, 
//       x: 50,
//       transition: { duration: 0.2 }
//     }
//   };

//   if (!appointment) {
//     return (
//       <motion.div 
//         className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <motion.div 
//           className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-4"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//         >
//           <AlertCircle className="w-8 h-8 text-red-500" />
//           <p className="text-red-600 text-lg font-medium">No appointment data available.</p>
//         </motion.div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
//       <motion.div 
//         className="max-w-6xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Header */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
//           variants={itemVariants}
//         >
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
//                 <FileText className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   Create Prescription
//                 </h1>
//                 <p className="text-gray-600 mt-1">Digital prescription for your patient</p>
//               </div>
//             </div>
//             <motion.button
//               onClick={() => console.log("Navigate back")}
//               className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span className="hidden sm:inline">Back</span>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Patient Info Card */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-xl p-6 mb-8"
//           variants={itemVariants}
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <User className="w-6 h-6 text-indigo-600" />
//             <h3 className="text-xl font-semibold text-gray-800">Patient Information</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
//               <p className="text-sm text-gray-600 mb-1">Patient Name</p>
//               <p className="font-semibold text-gray-800">{appointment.user.name}</p>
//             </div>
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
//               <p className="text-sm text-gray-600 mb-1">Age</p>
//               <p className="font-semibold text-gray-800">{appointment.user.age} years</p>
//             </div>
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
//               <p className="text-sm text-gray-600 mb-1">Appointment</p>
//               <p className="font-semibold text-gray-800">{appointment.date} at {appointment.time}</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Form */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
//           variants={itemVariants}
//         >
//           <div className="space-y-8">
//             {/* Diagnosis and Notes */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <motion.div variants={itemVariants}>
//                 <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
//                   <Stethoscope className="w-5 h-5 text-indigo-600" />
//                   Diagnosis
//                 </label>
//                 <motion.input
//                   value={diagnosis}
//                   onChange={(e) => setDiagnosis(e.target.value)}
//                   required
//                   className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700"
//                   placeholder="Enter primary diagnosis..."
//                   whileFocus={{ scale: 1.02 }}
//                 />
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
//                   <FileText className="w-5 h-5 text-indigo-600" />
//                   Additional Notes
//                 </label>
//                 <motion.textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-24 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none text-gray-700"
//                   placeholder="Additional observations, recommendations..."
//                   whileFocus={{ scale: 1.02 }}
//                 />
//               </motion.div>
//             </div>

//             {/* Follow-up Date */}
//             <motion.div variants={itemVariants}>
//               <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
//                 <Calendar className="w-5 h-5 text-indigo-600" />
//                 Follow-up Appointment
//               </label>
//               <motion.input
//                 type="datetime-local"
//                 value={followUpDate}
//                 onChange={(e) => setFollowUpDate(e.target.value)}
//                 className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700"
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </motion.div>

//             {/* Medicines Section */}
//             <motion.div variants={itemVariants}>
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
//                   <Pill className="w-6 h-6 text-indigo-600" />
//                   Prescribed Medications
//                 </h3>
//                 <motion.button
//                   type="button"
//                   onClick={addMedicineField}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <PlusCircle className="w-5 h-5" />
//                   Add Medicine
//                 </motion.button>
//               </div>

//               <AnimatePresence>
//                 {medicines.map((medicine, index) => (
//                   <motion.div
//                     key={index}
//                     variants={medicineVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl mb-4 border border-gray-200"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="text-lg font-semibold text-gray-700">Medicine #{index + 1}</h4>
//                       {medicines.length > 1 && (
//                         <motion.button
//                           type="button"
//                           onClick={() => removeMedicine(index)}
//                           className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </motion.button>
//                       )}
//                     </div>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//                       {(["name", "dosage", "frequency", "duration", "instructions"] as (keyof Medicine)[]).map((field) => (
//                         <motion.input
//                           key={field}
//                           placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}${field === 'name' ? ' (e.g., Paracetamol)' : field === 'dosage' ? ' (e.g., 500mg)' : field === 'frequency' ? ' (e.g., 2x daily)' : field === 'duration' ? ' (e.g., 7 days)' : ' (e.g., After meals)'}`}
//                           value={medicine[field]}
//                           onChange={(e) => handleMedicineChange(index, field, e.target.value)}
//                           className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-700"
//                           whileFocus={{ scale: 1.02 }}
//                         />
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.div 
//               className="pt-8"
//               variants={itemVariants}
//             >
//               <motion.button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
//                   isSubmitting 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
//                 }`}
//                 whileHover={!isSubmitting ? { scale: 1.02 } : {}}
//                 whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//               >
//                 <div className="flex items-center justify-center gap-3">
//                   {isSubmitting ? (
//                     <>
//                       <motion.div
//                         className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                       />
//                       Creating Prescription...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-6 h-6" />
//                       Create Prescription
//                     </>
//                   )}
//                 </div>
//               </motion.button>
//             </motion.div>
//             </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default CreatePrescription;