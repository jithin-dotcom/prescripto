

// // Appointment.tsx
// import React from 'react';
// import { assets } from '../../assets/assets1';
// // import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment: React.FC = () => {
//   // Dummy doctor data (replace with your own logic or fetched data)
//   const doctor = {
//     name: 'Dr. John Doe',
//     image: 'https://via.placeholder.com/300x400', // Replace with your actual image URL
//     degree: 'MD',
//     speciality: 'Cardiology',
//     experience: '10 years',
//     about: 'Experienced cardiologist with a passion for patient care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     fees: '100'
//   };

//   // Dummy booking slots data
//   const slots = [
//     {
//       day: 'MON',
//       date: '22',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     },
//     {
//       day: 'TUE',
//       date: '23',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     },
//     {
//       day: 'WED',
//       date: '24',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     }
//   ];

//   // Note: You can add state and logic here later.
//   // For now, we use the first day and first time as active.
//   const activeSlotIndex = 0;
//   const activeTime = slots[0].times[0];

//   return (
//     <div className="p-4">
//       {/* ---------- Doctor Details ----------- */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary w-full sm:max-w-72 rounded-lg"
//             src={doctor.image}
//             alt="Doctor"
//           />
//         </div>
//         <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           {/* Doctor Info: name, degree, experience */}
//           <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//             {doctor.name}
//             <img className="w-5" src={assets.verified_icon} alt="Verified" />
//           </p>
//           <div className="flex items-center gap-2 mt-1 text-gray-600">
//             <p>
//               {doctor.degree} - {doctor.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full">
//               {doctor.experience}
//             </button>
//           </div>
//           {/* About Doctor */}
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
//               About <img className="w-3" src={assets.info_icon} alt="Info" />
//             </p>
//             <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//               {doctor.about}
//             </p>
//           </div>
//           <p className="text-gray-600 font-medium mt-4">
//             Appointment fee:{' '}
//             <span className="text-gray-800">${doctor.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* ---------- Booking Slots ----------- */}
//       <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
//         <p>Booking slots</p>
//         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//           {slots.map((slot, index) => (
//             <div
//               key={index}
//               // Later, add an onClick that will update the active slot index.
//               className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                 activeSlotIndex === index
//                   ? 'bg-primary text-white'
//                   : 'border border-[#DDDDDD]'
//               }`}
//             >
//               <p>{slot.day}</p>
//               <p>{slot.date}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//           {slots[activeSlotIndex].times.map((time, index) => (
//             <p
//               key={index}
//               // Later, add an onClick to set the active time slot.
//               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                 activeTime === time
//                   ? 'bg-primary text-white'
//                   : 'text-[#949494] border border-[#B4B4B4]'
//               }`}
//             >
//               {time.toLowerCase()}
//             </p>
//           ))}
//         </div>

//         <button
//           // Later, add your onClick handler for booking the appointment
//           className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
//         >
//           Book an appointment
//         </button>
//       </div>

//       {/* ---------- Listing Related Doctors ----------- */}
//       {/* <RelatedDoctors speciality={doctor.speciality} docId="dummy-id" /> */}
//     </div>
//   );
// };

// export default Appointment;







// import React from 'react';
// import Navbar from '../../components/Navbar'; // adjust the path if needed
// import { assets } from '../../assets/assets1';
// // import RelatedDoctors from '../../components/RelatedDoctors';

// const Appointment: React.FC = () => {
//   const doctor = {
//     name: 'Dr. John Doe',
//     image: 'https://via.placeholder.com/300x400',
//     degree: 'MD',
//     speciality: 'Cardiology',
//     experience: '10 years',
//     about:
//       'Experienced cardiologist with a passion for patient care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     fees: '100',
//   };

//   const slots = [
//     {
//       day: 'MON',
//       date: '22',
//       times: ['10:00 am', '10:30 am', '11:00 am'],
//     },
//     {
//       day: 'TUE',
//       date: '23',
//       times: ['10:00 am', '10:30 am', '11:00 am'],
//     },
//     {
//       day: 'WED',
//       date: '24',
//       times: ['10:00 am', '10:30 am', '11:00 am'],
//     },
//   ];

//   const activeSlotIndex = 0;
//   const activeTime = slots[0].times[0];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Main content */}
//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         {/* Doctor Details */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={doctor.image}
//               alt="Doctor"
//             />
//           </div>

//           <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//               {doctor.name}
//               <img className="w-5" src={assets.verified_icon} alt="Verified" />
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-gray-600">
//               <p>
//                 {doctor.degree} - {doctor.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {doctor.experience}
//               </button>
//             </div>

//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
//                 About <img className="w-3" src={assets.info_icon} alt="Info" />
//               </p>
//               <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                 {doctor.about}
//               </p>
//             </div>

//             <p className="text-gray-600 font-medium mt-4">
//               Appointment fee:{' '}
//               <span className="text-gray-800">${doctor.fees}</span>
//             </p>
//           </div>
//         </div>

//         {/* Booking Slots */}
//         <div className="mt-8 font-medium text-[#565656]">
//           <p>Booking slots</p>
//           <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
//             {slots.map((slot, index) => (
//               <div
//                 key={index}
//                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                   activeSlotIndex === index
//                     ? 'bg-primary text-white'
//                     : 'border border-[#DDDDDD]'
//                 }`}
//               >
//                 <p>{slot.day}</p>
//                 <p>{slot.date}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
//             {slots[activeSlotIndex].times.map((time, index) => (
//               <p
//                 key={index}
//                 className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                   activeTime === time
//                     ? 'bg-primary text-white'
//                     : 'text-[#949494] border border-[#B4B4B4]'
//                 }`}
//               >
//                 {time.toLowerCase()}
//               </p>
//             ))}
//           </div>

//           <button className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6">
//             Book an appointment
//           </button>
//         </div>

//         {/* Related Doctors */}
//         {/* <RelatedDoctors speciality={doctor.speciality} docId="dummy-id" /> */}
//       </main>
//     </div>
//   );
// };

// export default Appointment;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface Profile {
//   name: string;
//   email: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   registrationNumber: string;
//   registrationYear: string;
//   yearOfExperience: number;
//   fee: number;
//   about: string;
//   proofDocument: string;
//   isVerified: boolean;
//   slots?: Slot[];
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");
//   console.log("doctor id : ",doctorId);

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         const { user, profile: profileData } = res.data.data;

//         setProfile({
//           name: user?.name || "",
//           email: user?.email || "",
//           profilePhoto: user?.photo || "",
//           specialization: profileData?.specialization || "",
//           educationDetails: profileData?.educationDetails || "",
//           registrationNumber: profileData?.registrationNumber || "",
//           registrationYear: profileData?.registrationYear || "",
//           yearOfExperience: profileData?.yearOfExperience || 0,
//           fee: profileData?.fee || 0,
//           about: profileData?.about || "",
//           proofDocument: profileData?.proofDocuments?.[0] || "",
//           isVerified: user?.isVerified || false,
//           slots: profileData?.slots || [],
//         });

//         // Set default active time
//         if (profileData?.slots?.length > 0 && profileData.slots[0].times.length > 0) {
//           setActiveTime(profileData.slots[0].times[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching doctor profile:", error);
//         setProfile(null);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
//         {profile ? (
//           <>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div>
//                 <img
//                   className="bg-primary w-full sm:max-w-72 rounded-lg"
//                   src={profile.profilePhoto}
//                   alt="Doctor"
//                 />
//               </div>

//               <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//                 <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//                   {profile.name}
//                   {profile.isVerified && (
//                     <img className="w-5" src={assets.verified_icon} alt="Verified" />
//                   )}
//                 </p>
//                 <div className="flex items-center gap-2 mt-1 text-gray-600">
//                   <p>{profile.educationDetails} - {profile.specialization}</p>
//                   <button className="py-0.5 px-2 border text-xs rounded-full">
//                     {profile.yearOfExperience} years
//                   </button>
//                 </div>

//                 <div>
//                   <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
//                     About <img className="w-3" src={assets.info_icon} alt="Info" />
//                   </p>
//                   <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                     {profile.about}
//                   </p>
//                 </div>

//                 <p className="text-gray-600 font-medium mt-4">
//                   Appointment fee: <span className="text-gray-800">₹{profile.fee}</span>
//                 </p>
//               </div>
//             </div>

//             {/* Conditional Booking Section */}
//             {profile.isVerified ? (
//               profile.slots && profile.slots.length > 0 ? (
//                 <div className="mt-8 font-medium text-[#565656]">
//                   <p>Booking slots</p>
//                   <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
//                     {profile.slots.map((slot, index) => (
//                       <div
//                         key={index}
//                         className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                           activeSlotIndex === index
//                             ? "bg-primary text-white"
//                             : "border border-[#DDDDDD]"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p>{slot.day}</p>
//                         <p>{slot.date}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
//                     {profile.slots[activeSlotIndex]?.times?.map((time, index) => (
//                       <p
//                         key={index}
//                         className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                           activeTime === time
//                             ? "bg-primary text-white"
//                             : "text-[#949494] border border-[#B4B4B4]"
//                         }`}
//                         onClick={() => setActiveTime(time)}
//                       >
//                         {time.toLowerCase()}
//                       </p>
//                     ))}
//                   </div>

//                   <button className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6">
//                     Book an appointment
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-8">No available appointment slots.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-8">
//                 Doctor is not verified. You can't book appointments.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-center text-gray-500 mt-10">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   slots: Slot[];
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         const { user, profile } = res.data.data;

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           slots: profile.slots || [],
//         };

//         setDoctor(transformedDoctor);

//         if (profile.slots?.length > 0 && profile.slots[0].times.length > 0) {
//           setActiveTime(profile.slots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
//         {doctor ? (
//           <>
//             {/* Doctor Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 glass-effect transition duration-300 hover:shadow-2xl"
//             >
//               <motion.img
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover shadow-lg"
//               />
//               <div className="flex-1 text-gray-700 space-y-2 text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">Dr. {doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <motion.img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Booking Slots */}
//             {doctor.isVerified ? (
//               doctor.slots.length > 0 ? (
//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Slots</h2>

//                   <motion.div
//                     className="flex gap-3 overflow-x-auto pb-2"
//                     initial="hidden"
//                     animate="visible"
//                     variants={{
//                       hidden: {},
//                       visible: {
//                         transition: {
//                           staggerChildren: 0.1,
//                         },
//                       },
//                     }}
//                   >
//                     {doctor.slots.map((slot, index) => (
//                       <motion.div
//                         key={index}
//                         variants={{
//                           hidden: { opacity: 0, y: 20 },
//                           visible: { opacity: 1, y: 0 },
//                         }}
//                         className={`min-w-24 text-center py-4 px-3 rounded-xl cursor-pointer transition ${
//                           activeSlotIndex === index
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p className="text-sm font-medium">{slot.day}</p>
//                         <p className="text-xs">{slot.date}</p>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   <div className="flex flex-wrap gap-3 mt-5">
//                     {doctor.slots[activeSlotIndex]?.times.map((time, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveTime(time)}
//                         className={`px-4 py-2 rounded-full text-sm transition ${
//                           activeTime === time
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-400 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                       >
//                         {time}
//                       </motion.button>
//                     ))}
//                   </div>

//                   <motion.div className="mt-6 text-center">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                     >
//                       Book Appointment
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-10">No appointment slots available.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-10 font-medium">
//                 This doctor is not verified. You can't book an appointment.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   slots: Slot[];
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         const { user, profile } = res.data.data;
//         console.log("doctor profile : ", res);

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           slots: profile.slots || [],
//         };

//         setDoctor(transformedDoctor);

//         if (profile.slots?.length > 0 && profile.slots[0].times.length > 0) {
//           setActiveTime(profile.slots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto   ">
//         {doctor ? (
//           <>
//             {/* Doctor Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6  transition-transform duration-300 ease-in-out hover:scale-105"
//             >
//               <motion.img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover shadow-md"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center sm:text-left ">
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <motion.img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <button className="py-0.5 px-2 border text-xs rounded-full ml-8">
//                     {doctor.yearOfExperience} years
//                   </button>
//                 </p>
//                 {/* <p className="text-sm font-medium text-indigo-600">
//                   {doctor.yearOfExperience} years of experience
//                 </p> */}
                
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Booking Slots */}
//             {doctor.isVerified ? (
//               doctor.slots.length > 0 ? (
//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Slots</h2>

//                   <motion.div
//                     className="flex gap-3 overflow-x-auto pb-2"
//                     initial="hidden"
//                     animate="visible"
//                     variants={{
//                       hidden: {},
//                       visible: {
//                         transition: {
//                           staggerChildren: 0.1,
//                         },
//                       },
//                     }}
//                   >
//                     {doctor.slots.map((slot, index) => (
//                       <motion.div
//                         key={index}
//                         variants={{
//                           hidden: { opacity: 0, y: 20 },
//                           visible: { opacity: 1, y: 0 },
//                         }}
//                         className={`min-w-24 text-center py-4 px-3 rounded-xl cursor-pointer transition ${
//                           activeSlotIndex === index
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p className="text-sm font-medium">{slot.day}</p>
//                         <p className="text-xs">{slot.date}</p>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   <div className="flex flex-wrap gap-3 mt-5">
//                     {doctor.slots[activeSlotIndex]?.times.map((time, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveTime(time)}
//                         className={`px-4 py-2 rounded-full text-sm transition ${
//                           activeTime === time
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-400 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                       >
//                         {time}
//                       </motion.button>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                     >
//                       Book Appointment
//                     </motion.button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-10">No appointment slots available.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-10 font-medium">
//                 This doctor is not verified. You can't book an appointment.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   slots: Slot[];
// }

// // ⏰ Utility: Convert "HH:MM" to "hh:mm AM/PM"
// function formatTimeAMPM(time: string): string {
//   const [hourStr, minuteStr] = time.split(":");
//   let hour = parseInt(hourStr, 10);
//   const minute = parseInt(minuteStr, 10);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour.toString().padStart(2, "0")}:${minuteStr} ${ampm}`;
// }

// // 📅 Get next date for a day name
// function getNextDateForDay(dayName: string): string {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const targetDay = days.indexOf(dayName);
//   const today = new Date();
//   const currentDay = today.getDay();
//   const daysToAdd = (targetDay - currentDay + 7) % 7 || 7;
//   const resultDate = new Date();
//   resultDate.setDate(today.getDate() + daysToAdd);
//   return resultDate.toISOString().split("T")[0]; // yyyy-mm-dd
// }

// // 🕒 Generate time slots (AM/PM) between from-to at intervals
// function generateTimeSlots(from: string, to: string, duration: number): string[] {
//   const [fromHour, fromMinute] = from.split(":").map(Number);
//   const [toHour, toMinute] = to.split(":").map(Number);

//   const fromTime = new Date();
//   fromTime.setHours(fromHour, fromMinute, 0, 0);

//   const toTime = new Date();
//   toTime.setHours(toHour, toMinute, 0, 0);

//   const slots: string[] = [];

//   while (fromTime < toTime) {
//     const timeStr = fromTime.toTimeString().slice(0, 5); // "HH:MM"
//     slots.push(formatTimeAMPM(timeStr));
//     fromTime.setMinutes(fromTime.getMinutes() + duration);
//   }

//   return slots;
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         console.log("doctor data : ",res);
//         const { user, profile } = res.data.data;

//         const availability = profile.availability || [];
//         const slotDuration = profile.slotDuration || 30;

//         const slots: Slot[] = availability.map((slot: any) => ({
//           day: slot.day,
//           date: getNextDateForDay(slot.day),
//           times: generateTimeSlots(slot.from, slot.to, slotDuration),
//         }));

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           slots,
//         };

//         setDoctor(transformedDoctor);
//         if (slots.length > 0 && slots[0].times.length > 0) {
//           setActiveTime(slots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) fetchDoctorProfile();
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />
//       <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
//         {doctor ? (
//           <>
//             {/* Doctor Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:scale-105 transition"
//             >
//               <motion.img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover shadow-md"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <motion.img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <button className="py-0.5 px-2 border text-xs rounded-full ml-8">
//                     {doctor.yearOfExperience} years
//                   </button>
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Booking Slots */}
//             {doctor.isVerified ? (
//               doctor.slots.length > 0 ? (
//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Slots</h2>

//                   <motion.div className="flex gap-3 overflow-x-auto pb-2">
//                     {doctor.slots.map((slot, index) => (
//                       <motion.div
//                         key={index}
//                         className={`min-w-24 text-center py-4 px-3 rounded-xl cursor-pointer transition ${
//                           activeSlotIndex === index
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p className="text-sm font-medium">{slot.day}</p>
//                         <p className="text-xs">{slot.date}</p>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   <div className="flex flex-wrap gap-3 mt-5">
//                     {doctor.slots[activeSlotIndex]?.times.map((time, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveTime(time)}
//                         className={`px-4 py-2 rounded-full text-sm transition ${
//                           activeTime === time
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-400 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                       >
//                         {time}
//                       </motion.button>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                     >
//                       Book Appointment
//                     </motion.button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-10">No appointment slots available.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-10 font-medium">
//                 This doctor is not verified. You can't book an appointment.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;












// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface Availability {
//   day: string;
//   from: string; // "09:00"
//   to: string;   // "17:00"
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   availability: Availability[];
//   slotDuration: number;
// }

// const daysMap: { [key: string]: number } = {
//   Sunday: 0,
//   Monday: 1,
//   Tuesday: 2,
//   Wednesday: 3,
//   Thursday: 4,
//   Friday: 5,
//   Saturday: 6,
// };

// function formatTime24to12(time: string): string {
//   const [hourStr, minuteStr] = time.split(":");
//   let hour = parseInt(hourStr);
//   const minute = parseInt(minuteStr);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
// }

// function generateSlots(availability: Availability[], slotDuration: number): Slot[] {
//   const today = new Date();
//   const result: Slot[] = [];

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(today.getDate() + i);
//     const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

//     const available = availability.find((a) => a.day === dayName);
//     if (!available) continue;

//     const slots: string[] = [];

//     const [fromHour, fromMinute] = available.from.split(":").map(Number);
//     const [toHour, toMinute] = available.to.split(":").map(Number);

//     let from = new Date(currentDate);
//     from.setHours(fromHour, fromMinute, 0, 0);

//     const to = new Date(currentDate);
//     to.setHours(toHour, toMinute, 0, 0);

//     while (from < to) {
//       slots.push(formatTime24to12(`${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`));
//       from = new Date(from.getTime() + slotDuration * 60000);
//     }

//     result.push({
//       day: dayName,
//       date: currentDate.toLocaleDateString(),
//       times: slots,
//     });
//   }

//   return result;
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         console.log("doctor : ",res);
//         const { user, profile } = res.data.data;

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           availability: profile.availability || [],
//           slotDuration: profile.slotDuration || 30,
//         };

//         setDoctor(transformedDoctor);

//         const slotData = generateSlots(profile.availability, profile.slotDuration);
//         setSlots(slotData);

//         if (slotData.length > 0 && slotData[0].times.length > 0) {
//           setActiveTime(slotData[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />
//       <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
//         {doctor ? (
//           <>
//             {/* Doctor Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:scale-105"
//             >
//               <motion.img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover shadow-md"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <motion.img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <button className="py-0.5 px-2 border text-xs rounded-full ml-8">
//                     {doctor.yearOfExperience} years
//                   </button>
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Slots Section */}
//             {doctor.isVerified ? (
//               slots.length > 0 ? (
//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Slots</h2>
//                   <motion.div className="flex gap-3 overflow-x-auto pb-2">
//                     {slots.map((slot, index) => (
//                       <motion.div
//                         key={index}
//                         className={`min-w-24 text-center py-4 px-3 rounded-xl cursor-pointer transition ${
//                           activeSlotIndex === index
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p className="text-sm font-medium">{slot.day}</p>
//                         <p className="text-xs">{slot.date}</p>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   <div className="flex flex-wrap gap-3 mt-5">
//                     {slots[activeSlotIndex]?.times.map((time, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveTime(time)}
//                         className={`px-4 py-2 rounded-full text-sm transition ${
//                           activeTime === time
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-400 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                       >
//                         {time}
//                       </motion.button>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                     >
//                       Book Appointment
//                     </motion.button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-10">No appointment slots available.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-10 font-medium">
//                 This doctor is not verified. You can't book an appointment.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;








// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface Availability {
//   day: string;
//   from: string; // "09:00"
//   to: string;   // "17:00"
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   availability: Availability[];
//   slotDuration: number;
// }

// function formatTime24to12(time: string): string {
//   const [hourStr, minuteStr] = time.split(":");
//   let hour = parseInt(hourStr);
//   const minute = parseInt(minuteStr);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
// }

// function generateSlots(availability: Availability[], slotDuration: number): Slot[] {
//   const today = new Date();
//   const result: Slot[] = [];

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(today.getDate() + i);
//     const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

//     const available = availability.find((a) => a.day === dayName);
//     if (!available) continue;

//     const slots: string[] = [];

//     const [fromHour, fromMinute] = available.from.split(":").map(Number);
//     const [toHour, toMinute] = available.to.split(":").map(Number);

//     let from = new Date(currentDate);
//     from.setHours(fromHour, fromMinute, 0, 0);

//     const to = new Date(currentDate);
//     to.setHours(toHour, toMinute, 0, 0);

//     while (from < to) {
//       slots.push(formatTime24to12(`${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`));
//       from = new Date(from.getTime() + slotDuration * 60000);
//     }

//     result.push({
//       day: dayName,
//       date: currentDate.toLocaleDateString("en-GB"), // dd/mm/yyyy format
//       times: slots,
//     });
//   }
//   console.log("result : ",result);
//   return result;
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         const { user, profile } = res.data.data;

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           availability: profile.availability || [],
//           slotDuration: profile.slotDuration || 30,
//         };

//         setDoctor(transformedDoctor);

//         const generatedSlots = generateSlots(profile.availability, profile.slotDuration);
//         setSlots(generatedSlots);
//         if (generatedSlots.length > 0 && generatedSlots[0].times.length > 0) {
//           setActiveTime(generatedSlots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />
//       <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
//         {doctor ? (
//           <>
//             {/* Doctor Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:scale-105  transition duration-300"
//             >
//               <motion.img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 className="w-40 h-40 rounded-full border-4 border-indigo-200 object-cover shadow-md"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <motion.img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <span className="py-0.5 px-2 border text-xs rounded-full ml-4">
//                     {doctor.yearOfExperience} years
//                   </span>
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Available Slots */}
//             {doctor.isVerified ? (
//               slots.length > 0 ? (
//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Slots</h2>

//                   <div className="flex gap-3 overflow-x-auto pb-2">
//                     {slots.map((slot, index) => (
//                       <div
//                         key={index}
//                         className={`min-w-24 text-center py-4 px-3 rounded-xl m-2 cursor-pointer shadow-xl hover:scale-105  transition duration-300 ${
//                           activeSlotIndex === index
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                         onClick={() => {
//                           setActiveSlotIndex(index);
//                           setActiveTime(slot.times[0]);
//                         }}
//                       >
//                         <p className="text-sm font-medium">{slot.day}</p>
//                         <p className="text-xs">{slot.date}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex flex-wrap gap-3 mt-5">
//                     {slots[activeSlotIndex]?.times.map((time, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveTime(time)}
//                         className={`px-4 py-2 rounded-full text-sm transition shadow-xl hover:scale-105  transition duration-300 ${
//                           activeTime === time
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white border border-gray-400 text-gray-600 hover:bg-indigo-100"
//                         }`}
//                       >
//                         {time}
//                       </motion.button>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                     >
//                       Book Appointment
//                     </motion.button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-10">No appointment slots available.</p>
//               )
//             ) : (
//               <p className="text-red-500 mt-10 font-medium">
//                 This doctor is not verified. You can't book an appointment.
//               </p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface Availability {
//   day: string;
//   from: string;
//   to: string;
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   availability: Availability[];
//   slotDuration: number;
// }

// function formatTime24to12(time: string): string {
//   const [hourStr, minuteStr] = time.split(":");
//   let hour = parseInt(hourStr);
//   const minute = parseInt(minuteStr);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
// }

// function generateSlots(availability: Availability[], slotDuration: number): Slot[] {
//   const today = new Date();
//   const result: Slot[] = [];

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(today.getDate() + i);
//     const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

//     const available = availability.find((a) => a.day === dayName);
//     if (!available) continue;

//     const slots: string[] = [];

//     const [fromHour, fromMinute] = available.from.split(":").map(Number);
//     const [toHour, toMinute] = available.to.split(":").map(Number);

//     let from = new Date(currentDate);
//     from.setHours(fromHour, fromMinute, 0, 0);

//     const to = new Date(currentDate);
//     to.setHours(toHour, toMinute, 0, 0);

//     while (from < to) {
//       slots.push(
//         formatTime24to12(
//           `${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`
//         )
//       );
//       from = new Date(from.getTime() + slotDuration * 60000);
//     }

//     result.push({
//       day: dayName,
//       date: currentDate.toLocaleDateString("en-GB"),
//       times: slots,
//     });
//   }

//   return result;
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");


//   const handleBooking = async () => {
//   if (!doctorId || !slots[activeSlotIndex] || !activeTime) return;

//   const selectedSlot = slots[activeSlotIndex];
//   try {
//     const res = await axiosInstance.post("/create-appointment", {
//       doctorId,
//       date: selectedSlot.date,     
//       time: activeTime,             
//     });
//     console.log("response : ",res);
//     toast.success("Appointment booked successfully!");
//     // Optionally redirect or reset state
//   } catch (err) {
//     console.error("Failed to book appointment:", err);
//     toast.error("Something went wrong. Please try again.");
//   }
// };


//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//         const { user, profile } = res.data.data;

//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           availability: profile.availability || [],
//           slotDuration: profile.slotDuration || 30,
//         };

//         setDoctor(transformedDoctor);

//         const generatedSlots = generateSlots(profile.availability, profile.slotDuration);
//         setSlots(generatedSlots);
//         if (generatedSlots.length > 0 && generatedSlots[0].times.length > 0) {
//           setActiveTime(generatedSlots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />
//       <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 max-w-6xl mx-auto w-full">
//         {doctor ? (
//           <>
//             {/* Doctor Info Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 bg-white hover:scale-105  transition duration-300"
//             >
//               <img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-200 object-cover"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center md:text-left">
//                 <div className="flex items-center justify-center md:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <span className="py-0.5 px-2 border text-xs rounded-full ml-2">
//                     {doctor.yearOfExperience} years
//                   </span>
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Slots Section */}
//             {slots.length > 0 ? (
//               <div className="mt-10">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Slots</h2>

//                 <div className="flex gap-3 overflow-x-auto sm:justify-start pb-2 scrollbar-hide  ">
//                   {slots.map((slot, index) => (
//                     <div
//                       key={index}
//                       className={`min-w-[100px] text-center py-4 px-3 rounded-xl cursor-pointer transition duration-300 ${
//                         activeSlotIndex === index
//                           ? "bg-indigo-600 text-white"
//                           : "bg-white border border-gray-300 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
//                       }`}
//                       onClick={() => {
//                         setActiveSlotIndex(index);
//                         setActiveTime(slot.times[0]);
//                       }}
//                     >
//                       <p className="text-sm font-medium">{slot.day}</p>
//                       <p className="text-xs">{slot.date}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-3 mt-6">
//                   {slots[activeSlotIndex]?.times.map((time, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setActiveTime(time)}
//                       className={`w-full px-4 py-2 rounded-full text-sm transition ${
//                         activeTime === time
//                           ? "bg-indigo-600 text-white"
//                           : "bg-white border border-gray-400 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
//                       }`}
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleBooking}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                   >
//                     Book Appointment
//                   </motion.button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500 mt-10">No appointment slots available.</p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { assets } from "../../assets/assets1";
// import axiosInstance from "../../utils/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// interface Slot {
//   day: string;
//   date: string;
//   times: string[];
// }

// interface Availability {
//   day: string;
//   from: string;
//   to: string;
// }

// interface DoctorProfile {
//   name: string;
//   profilePhoto: string;
//   specialization: string;
//   educationDetails: string;
//   fee: number;
//   about: string;
//   isVerified: boolean;
//   yearOfExperience: number;
//   availability: Availability[];
//   slotDuration: number;
// }

// function formatTime24to12(time: string): string {
//   const [hourStr, minuteStr] = time.split(":");
//   let hour = parseInt(hourStr);
//   const minute = parseInt(minuteStr);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
// }

// function generateSlots(availability: Availability[], slotDuration: number): Slot[] {
//   const today = new Date();
//   const result: Slot[] = [];

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date();
//     currentDate.setDate(today.getDate() + i);
//     const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

//     const available = availability.find((a) => a.day === dayName);
//     if (!available) continue;

//     const slots: string[] = [];

//     const [fromHour, fromMinute] = available.from.split(":").map(Number);
//     const [toHour, toMinute] = available.to.split(":").map(Number);

//     let from = new Date(currentDate);
//     from.setHours(fromHour, fromMinute, 0, 0);

//     const to = new Date(currentDate);
//     to.setHours(toHour, toMinute, 0, 0);

//     while (from < to) {
//       slots.push(
//         formatTime24to12(
//           `${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`
//         )
//       );
//       from = new Date(from.getTime() + slotDuration * 60000);
//     }

//     result.push({
//       day: dayName,
//       date: currentDate.toLocaleDateString("en-GB"),
//       times: slots,
//     });
//   }

//   return result;
// }

// const Appointment: React.FC = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeTime, setActiveTime] = useState("");

//   const handleBooking = async () => {
//     if (!doctorId || !slots[activeSlotIndex] || !activeTime) return;

//     const selectedSlot = slots[activeSlotIndex];
//     try {
//       const res = await axiosInstance.post("/create-appointment", {
//         doctorId,
//         date: selectedSlot.date,
//         time: activeTime,
//       });
//       console.log("response : ", res);
//       toast.success("Appointment booked successfully!");
//     } catch (err) {
//       console.error("Failed to book appointment:", err);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     async function fetchDoctorProfile() {
//       try {
//         const res = await axiosInstance.get(`/user/user-profile/${doctorId}`);
//          const adminRes = await axiosInstance.get(`/all-createAppointments/${doctorId}`);
//          console.log("adminRes : ", adminRes);
//         const { user, profile } = res.data.data;
//         console.log("re.data.data : ", res.data.data);
//         const transformedDoctor: DoctorProfile = {
//           name: user.name,
//           profilePhoto: user.photo,
//           specialization: profile.specialization,
//           educationDetails: profile.educationDetails,
//           fee: profile.fee,
//           about: profile.about,
//           isVerified: user.isVerified,
//           yearOfExperience: profile.yearOfExperience || 0,
//           availability: profile.availability || [],
//           slotDuration: profile.slotDuration || 30,
//         };

//         console.log("transformed doctor : ", transformedDoctor);

//         setDoctor(transformedDoctor);

//         const generatedSlots = generateSlots(profile.availability, profile.slotDuration);
//         setSlots(generatedSlots);
//         if (generatedSlots.length > 0 && generatedSlots[0].times.length > 0) {
//           setActiveTime(generatedSlots[0].times[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch doctor profile:", err);
//       }
//     }

//     if (doctorId) {
//       fetchDoctorProfile();
//     }
//   }, [doctorId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
//       <Navbar />
//       <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 max-w-6xl mx-auto w-full">
//         {doctor ? (
//           <>
//             {/* Doctor Info Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 bg-white hover:scale-105 transition duration-300"
//             >
//               <img
//                 src={doctor.profilePhoto}
//                 alt="Doctor"
//                 className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-200 object-cover"
//               />
//               <div className="flex-1 text-gray-800 space-y-2 text-center md:text-left">
//                 <div className="flex items-center justify-center md:justify-start gap-2">
//                   <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
//                   {doctor.isVerified && (
//                     <img
//                       src={assets.verified_icon}
//                       alt="Verified"
//                       className="w-5 h-5"
//                       title="Verified Doctor"
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   {doctor.educationDetails} - {doctor.specialization}
//                   <span className="py-0.5 px-2 border text-xs rounded-full ml-2">
//                     {doctor.yearOfExperience} years
//                   </span>
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.about}</p>
//                 <p className="text-gray-700 font-medium pt-2">
//                   Consultation Fee: ₹{doctor.fee}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Conditional Rendering based on Verification */}
//             {!doctor.isVerified ? (
//               <div className="mt-10 text-center text-red-700 font-semibold bg-red-100 p-6 rounded-xl">
//                 This doctor is not verified. You cannot book appointments.
//               </div>
//             ) : slots.length > 0 ? (
//               <div className="mt-10">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Slots</h2>

//                 <div className="flex gap-3 overflow-x-auto sm:justify-start pb-2 scrollbar-hide">
//                   {slots.map((slot, index) => (
//                     <div
//                       key={index}
//                       className={`min-w-[100px] text-center py-4 px-3 rounded-xl cursor-pointer transition duration-300 ${
//                         activeSlotIndex === index
//                           ? "bg-indigo-600 text-white"
//                           : "bg-white border border-gray-300 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
//                       }`}
//                       onClick={() => {
//                         setActiveSlotIndex(index);
//                         setActiveTime(slot.times[0]);
//                       }}
//                     >
//                       <p className="text-sm font-medium">{slot.day}</p>
//                       <p className="text-xs">{slot.date}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-3 mt-6">
//                   {slots[activeSlotIndex]?.times.map((time, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setActiveTime(time)}
//                       className={`w-full px-4 py-2 rounded-full text-sm transition ${
//                         activeTime === time
//                           ? "bg-indigo-600 text-white"
//                           : "bg-white border border-gray-400 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
//                       }`}
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleBooking}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
//                   >
//                     Book Appointment
//                   </motion.button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500 mt-10">No appointment slots available.</p>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Appointment;














import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { assets } from "../../assets/assets1";
import axiosInstance from "../../utils/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

interface Slot {
  day: string;
  date: string;
  times: string[];
}

interface Availability {
  day: string;
  from: string;
  to: string;
}

interface DoctorProfile {
  name: string;
  profilePhoto: string;
  specialization: string;
  educationDetails: string;
  fee: number;
  about: string;
  isVerified: boolean;
  yearOfExperience: number;
  availability: Availability[];
  slotDuration: number;
}

function formatTime24to12(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

function generateSlots(availability: Availability[], slotDuration: number, bookedSlot: string[]): Slot[] {
  const today = new Date();
  const result: Slot[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });

    const booked = new Set(bookedSlot);

    console.log("booked : ",booked);
    const available = availability.find((a) => a.day === dayName);
    console.log("available : ", available);
    if (!available) continue;

    const slots: string[] = [];
    

    const [fromHour, fromMinute] = available.from.split(":").map(Number);
    const [toHour, toMinute] = available.to.split(":").map(Number);

    let from = new Date(currentDate);
    from.setHours(fromHour, fromMinute, 0, 0);

    const to = new Date(currentDate);
    to.setHours(toHour, toMinute, 0, 0);

    while (from < to ) {
      
      const timeStr =   formatTime24to12(
          `${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`
        )
      
       if (!booked.has(timeStr)) {
        slots.push(timeStr);
      }
      from = new Date(from.getTime() + slotDuration * 60000);
    }

    result.push({
      day: dayName,
      date: currentDate.toLocaleDateString("en-GB"),
      times: slots,
    });
    console.log("slots : ",slots);
  }

  
  return result;
}

const Appointment: React.FC = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [activeTime, setActiveTime] = useState("");
  // const [bookedSlot, setBookedSlot] = useState([]);

  // const handleBooking = async () => {
  //   if (!doctorId || !slots[activeSlotIndex] || !activeTime) return;
  //   console.log("active time : ",activeTime);
  //   const selectedSlot = slots[activeSlotIndex];
  //   try {
  //     const res = await axiosInstance.post("/create-appointment", {
  //       doctorId,
  //       date: selectedSlot.date,
  //       time: activeTime,
  //     });
  //     console.log("response : ", res);
  //     toast.success("Appointment booked successfully!");
  //   } catch (err) {
  //     console.error("Failed to book appointment:", err);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  const handleBooking = async () => {
  if (!doctorId || !slots[activeSlotIndex] || !activeTime) return;

  console.log("active time : ", activeTime);
  const selectedSlot = slots[activeSlotIndex];

  // Convert activeTime (e.g. "3:30 PM") + date into a Date object
  const [timeStr, period] = activeTime.split(" ");
  const [hourStr, minuteStr] = timeStr.split(":");

  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const appointmentDateTime = new Date();
  const [day, month, year] = selectedSlot.date.split("/").map(Number); // 'dd/mm/yyyy'
  appointmentDateTime.setFullYear(year, month - 1, day);
  appointmentDateTime.setHours(hour, minute, 0, 0);

  const now = new Date();
  const diffInMinutes = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60);

  if (diffInMinutes < 60) {
    toast.error("Please book at least 1 hour in advance.");
    return;
  }

  try {
    const res = await axiosInstance.post("/create-appointment", {
      doctorId,
      date: selectedSlot.date,
      time: activeTime,
    });
    console.log("response : ", res);
    toast.success("Appointment booked successfully!");
  } catch (err) {
    // console.error("Failed to book appointment:", err);
    if(axios.isAxiosError(err)){
       toast.error(err.response?.data?.message);
    }else{
       toast.error("Failed to book appointment");
    }
  }
};


  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const res = await axiosInstance.get(`/all-createAppointments/${doctorId}`);
        console.log("adminRes : ", res);

        const firstDoctor = res.data.responses?.[0]?.doctor;

        if (!firstDoctor) {
          toast.error("Doctor not found.");
          return;
        }
        console.log("timeArray :  ",res.data?.timeArray);
        // setBookedSlot(res.data?.timeArray);

        const transformedDoctor: DoctorProfile = {
          name: firstDoctor.name,
          profilePhoto: firstDoctor.photo,
          specialization: firstDoctor.specialization,
          educationDetails: firstDoctor.educationDetails,
          fee: firstDoctor.fee,
          about: firstDoctor.about,
          isVerified: firstDoctor.isVerified,
          yearOfExperience: firstDoctor.yearOfExperience || 0,
          availability: firstDoctor.availability || [],
          slotDuration: firstDoctor.slotDuration || 30,
        };

        setDoctor(transformedDoctor);

        const generatedSlots = generateSlots(
          transformedDoctor.availability,
          transformedDoctor.slotDuration,
          res.data?.timeArray,
        );
        setSlots(generatedSlots);
        if (generatedSlots.length > 0 && generatedSlots[0].times.length > 0) {
          setActiveTime(generatedSlots[0].times[0]);
        }
      } catch (err) {
        // console.error("Failed to fetch doctor data:", err);
        if(axios.isAxiosError(err)){
          toast.error(err.response?.data?.message)
        }else{
          toast.error("Failed to load doctor profile");
        }
        
      }
    }

    if (doctorId) {
      fetchDoctorProfile();
    }
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 max-w-6xl mx-auto w-full">
        {doctor ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 bg-white hover:scale-105 transition duration-300"
            >
              <img
                src={doctor.profilePhoto}
                alt="Doctor"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-200 object-cover"
              />
              <div className="flex-1 text-gray-800 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
                  {doctor.isVerified && (
                    <img
                      src={assets.verified_icon}
                      alt="Verified"
                      className="w-5 h-5"
                      title="Verified Doctor"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {doctor.educationDetails} - {doctor.specialization}
                  <span className="py-0.5 px-2 border text-xs rounded-full ml-2">
                    {doctor.yearOfExperience} years
                  </span>
                </p>
                <p className="text-gray-600 text-sm">{doctor.about}</p>
                <p className="text-gray-700 font-medium pt-2">
                  Consultation Fee: ₹{doctor.fee}
                </p>
              </div>
            </motion.div>

            {!doctor.isVerified ? (
              <div className="mt-10 text-center text-red-700 font-semibold bg-red-100 p-6 rounded-xl">
                This doctor is not verified. You cannot book appointments.
              </div>
            ) : slots.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Slots</h2>

                <div className="flex gap-3 overflow-x-auto sm:justify-start pb-2 scrollbar-hide">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`min-w-[100px] text-center py-4 px-3 rounded-xl cursor-pointer transition duration-300 ${
                        activeSlotIndex === index
                          ? "bg-indigo-600 text-white"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
                      }`}
                      onClick={() => {
                        setActiveSlotIndex(index);
                        setActiveTime(slot.times[0]);
                      }}
                    >
                      <p className="text-sm font-medium">{slot.day}</p>
                      <p className="text-xs">{slot.date}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-3 mt-6">
                  {slots[activeSlotIndex]?.times.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTime(time)}
                      className={`w-full px-4 py-2 rounded-full text-sm transition ${
                        activeTime === time
                          ? "bg-indigo-600 text-white"
                          : "bg-white border border-gray-400 text-gray-600 hover:bg-[#4F39F6] hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBooking}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-10">No appointment slots available.</p>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
        )}
      </main>
    </div>
  );
};

export default Appointment;
