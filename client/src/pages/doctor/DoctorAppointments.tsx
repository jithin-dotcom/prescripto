
// // import { useDoctorDataLoader } from "../../hooks/useDoctorDataLoader";
// // import Sidebar from "../../components/SideBarAdmin";
// // import Navbar from "../../components/NavbarAdmin";
// // import { assets } from "../../assets/assets2";
// // import { useDoctorStore } from "../../store/doctorStore";


// // const DoctorAppointments = () => {
// //   const dummyAppointments = Array(5).fill(null); // 5 dummy entries

// //   useDoctorDataLoader(); 
// //   const doctorData = useDoctorStore((state) => state.doctorData);
// //   console.log("Doctor Data from Zustand:", doctorData);
// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col">
// //       {/* Navbar */}
// //       <Navbar />

// //       {/* Sidebar + Main content */}
// //       <div className="flex flex-1 flex-row">
// //         <Sidebar />

// //         <main className="flex-1 p-4 md:p-6 lg:p-8">
// //           <p className="mb-4 text-lg font-semibold text-gray-700">All Appointments</p>

// //           <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto shadow-sm">
// //             {/* Table Header */}
// //             <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50">
// //               <p>#</p>
// //               <p>Patient</p>
// //               <p>Age</p>
// //               <p>Payment</p> 
// //               <p>Date & Time</p>
// //               <p>Fees</p>
// //               <p>Action</p>
// //             </div>

// //             {/* Dummy Rows */}
// //             {dummyAppointments.map((_, index) => (
// //               <div
// //                 key={index}
// //                 className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-3 text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition"
// //               >
// //                 <p className="hidden sm:block">{index + 1}</p>

// //                 <div className="flex items-center gap-2">
// //                   <img
// //                     src="https://via.placeholder.com/32"
// //                     className="w-8 h-8 rounded-full"
// //                     alt="Patient"
// //                   />
// //                   <p>John Doe</p>
// //                 </div>

// //                 <div>
// //                   <p className="text-xs border border-primary px-2 py-0.5 rounded-full">
// //                     Online
// //                   </p>
// //                 </div>

// //                 <p className="hidden sm:block">28</p>
// //                 <p>12 Jul 2025, 10:00 AM</p>
// //                 <p>₹500</p>

// //                 <div className="flex gap-2">
// //                   <img
// //                     className="w-8 h-8 cursor-pointer"
// //                     src={assets.cancel_icon}
// //                     alt="Cancel"
// //                   />
// //                   <img
// //                     className="w-8 h-8 cursor-pointer"
// //                     src={assets.tick_icon}
// //                     alt="Complete"
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorAppointments;
















// // import { useEffect, useState } from "react";
// // import Sidebar from "../../components/SideBarAdmin";
// // import Navbar from "../../components/NavbarAdmin";
// // import axiosInstance from "../../utils/axios";
// // import { assets } from "../../assets/assets2";
// // import { useDoctorStore } from "../../store/doctorStore";

// // // Utility to calculate age from date string
// // const calculateAge = (dob: string): number => {
// //   const birthDate = new Date(dob);
  
// //   const today = new Date();
  
// //   let age = today.getFullYear() - birthDate.getFullYear();
  
// //   const m = today.getMonth() - birthDate.getMonth();
// //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
// //     age--;
// //   }
// //   return age;
// // };

// // interface Appointment {
// //   _id: string;
// //   doctorId: string;
// //   user: {
// //     _id: string;
// //     name: string;
// //     email: string;
// //     photo?: string;
// //     isVerified: boolean;
// //     isBlocked: boolean;
// //     dateOfBirth?: string;
// //     gender?: string;
// //     houseName?: string;
// //     city?: string;
// //     state?: string;
// //     country?: string;
// //     pin?: number;
// //     profilePhoto?: string;
// //   };
// //   date: string;
// //   time: string;
// //   status: string;
// //   transactionId?: string;
// // }

// // const DoctorAppointments = () => {
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const doctorData = useDoctorStore((state) => state.doctorData);

// //   useEffect(() => {
// //     async function fetchAppointments() {
// //       try {
// //         const res = await axiosInstance.get("/doctor-appointments");
// //         setAppointments(res.data);
// //       } catch (err) {
// //         console.error("Error fetching appointments:", err);
// //       }
// //     }

// //     fetchAppointments();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col">
// //       <Navbar />

// //       <div className="flex flex-1 flex-row">
// //         <Sidebar />

// //         <main className="flex-1 p-4 md:p-6 lg:p-8">
// //           <p className="mb-4 text-lg font-semibold text-gray-700">All Appointments</p>

// //           <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto shadow-sm">
// //             {/* Table Header */}
// //             <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50">
// //               <p>#</p>
// //               <p>Patient</p>
// //               <p>Age</p>
// //               <p>Payment</p>
// //               <p>Date & Time</p>
// //               <p>Fees</p>
// //               <p>Action</p>
// //             </div>

// //             {/* Dynamic Rows */}
// //             {appointments.map((app, index) => (
// //               <div
// //                 key={app._id}
// //                 className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-3 text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition"
// //               >
// //                 <p className="hidden sm:block">{index + 1}</p>

// //                 {/* Patient */}
// //                 <div className="flex items-center gap-2">
// //                   <img
// //                     src={app.user.photo || "/default-avatar.png"}
// //                     className="w-8 h-8 rounded-full"
// //                     alt="Patient"
// //                   />
// //                   <p>{app.user.name}</p>
// //                 </div>

// //                 {/* Age */}
// //                 <p>{app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}</p>
                 
// //                 {/* Payment */}
// //                 <div>
// //                   <p className="text-xs border border-primary px-2 py-0.5 rounded-full">
// //                     {app.status}
// //                   </p>
// //                 </div>

// //                 {/* Date & Time */}
// //                 <p>
// //                   {app.date}, {app.time}
// //                 </p>

// //                 {/* Fee (you can show static or dynamic if needed) */}
// //                 <p>₹{doctorData?.fee || "500"}</p>

// //                 {/* Actions */}
// //                 <div className="flex gap-2">
// //                   <img
// //                     className="w-8 h-8 cursor-pointer"
// //                     src={assets.cancel_icon}
// //                     alt="Cancel"
// //                   />
// //                   <img
// //                     className="w-8 h-8 cursor-pointer"
// //                     src={assets.tick_icon}
// //                     alt="Complete"
// //                   />
// //                 </div>
// //               </div>
// //             ))}

// //             {/* Empty State */}
// //             {appointments.length === 0 && (
// //               <div className="text-center py-10 text-gray-400">No appointments found.</div>
// //             )}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorAppointments;







// import { useEffect, useState } from "react";
// import Sidebar from "../../components/SideBarAdmin";
// import Navbar from "../../components/NavbarAdmin";
// import axiosInstance from "../../utils/axios";
// import { useDoctorStore } from "../../store/doctorStore";

// // Utility to calculate age from date string
// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// interface Appointment {
//   _id: string;
//   doctorId: string;
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     photo?: string;
//     isVerified: boolean;
//     isBlocked: boolean;
//     dateOfBirth?: string;
//     gender?: string;
//     houseName?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//     pin?: number;
//     profilePhoto?: string;
//   };
//   date: string;
//   time: string;
//   status: "pending" | "confirmed" | "cancelled";
//   transactionId?: string;
// }

// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const doctorData = useDoctorStore((state) => state.doctorData);

//   useEffect(() => {
//     async function fetchAppointments() {
//       try {
//         const res = await axiosInstance.get("/doctor-appointments");
//         setAppointments(res.data);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//       }
//     }

//     fetchAppointments();
//   }, []);

//   const getStatusBadge = (status: string) => {
//     const base = "text-xs font-semibold px-3 py-1 rounded-full";
//     switch (status) {
//       case "pending":
//         return `${base} bg-yellow-100 text-yellow-800`;
//       case "cancelled":
//         return `${base} bg-red-100 text-red-700`;
//       case "confirmed":
//         return `${base} bg-green-100 text-green-700`;
//       default:
//         return `${base} bg-gray-100 text-gray-600`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <div className="flex flex-1 flex-row">
//         <Sidebar />

//         <main className="flex-1 p-4 md:p-6 lg:p-8">
//           <p className="mb-4 text-lg font-semibold text-gray-700">All Appointments</p>

//           <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto shadow-sm">
//             {/* Table Header */}
//             <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50">
//               <p>#</p>
//               <p>Patient</p>
//               <p>Age</p>
//               <p>Status</p>
//               <p>Date & Time</p>
//               {/* <p>Fees</p> */}
//               <p>Action</p>
//             </div>

//             {/* Dynamic Rows */}
//             {appointments.map((app, index) => (
//               <div
//                 key={app._id}
//                 className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-3 text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition"
//               >
//                 {/* Index */}
//                 <p className="hidden sm:block">{index + 1}</p>

//                 {/* Patient */}
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={app.user.photo || "/default-avatar.png"}
//                     className="w-8 h-8 rounded-full object-cover"
//                     alt="Patient"
//                   />
//                   <p className="font-medium">{app.user.name}</p>
//                 </div>

//                 {/* Age */}
//                 <p>{app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}</p>

//                 {/* Status */}
//                 <span className={getStatusBadge(app.status)}>{app.status}</span>

//                 {/* Date & Time */}
//                 <p>{app.date}, {app.time}</p>

//                 {/* Fee */}
//                 {/* <p>₹{doctorData?.fee || "500"}</p> */}

//                 {/* Action */}
//                 <div className="flex gap-2">
//                   <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
//                     Cancel
//                   </button>
//                   <button className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition">
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Empty State */}
//             {appointments.length === 0 && (
//               <div className="text-center py-10 text-gray-400">No appointments found.</div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;







import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBarAdmin";
import Navbar from "../../components/NavbarAdmin";
import axiosInstance from "../../utils/axios";
import { useDoctorStore } from "../../store/doctorStore";

// Utility to calculate age from date string
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

interface Appointment {
  _id: string;
  doctorId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: boolean;
    isBlocked: boolean;
    dateOfBirth?: string;
    gender?: string;
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: number;
    profilePhoto?: string;
  };
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  transactionId?: string;
}

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const doctorData = useDoctorStore((state) => state.doctorData);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await axiosInstance.get("/doctor-appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    }

    fetchAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    const base = "text-xs font-semibold px-3 py-1 rounded-full w-fit";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "cancelled":
        return `${base} bg-red-100 text-red-700`;
      case "confirmed":
        return `${base} bg-green-100 text-green-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-row">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <h1 className="mb-4 text-lg font-semibold text-gray-700">All Appointments</h1>

          <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto shadow-sm">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[40px_2fr_60px_100px_1.5fr_80px_120px] py-3 px-6 border-b bg-gray-50 text-gray-600 font-medium">
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Status</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p className="text-center">Action</p>
            </div>

            {/* Dynamic Rows */}
            {appointments.map((app, index) => (
              <div
                key={app._id}
                className="flex flex-wrap sm:grid sm:grid-cols-[40px_2fr_60px_100px_1.5fr_80px_120px] items-center gap-3 text-gray-700 py-4 px-6 border-b hover:bg-gray-50 transition"
              >
                {/* Index */}
                <p className="hidden sm:block">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-2">
                  <img
                    src={app.user.photo || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="Patient"
                  />
                  <p className="font-medium">{app.user.name}</p>
                </div>

                {/* Age */}
                <p>{app.user.dateOfBirth ? calculateAge(app.user.dateOfBirth) : "-"}</p>

                {/* Status */}
                <span className={getStatusBadge(app.status)}>{app.status}</span>

                {/* Date & Time */}
                <p className="whitespace-nowrap">
                  {app.date}, {app.time}
                </p>

                {/* Fee */}
                <p className="text-sm font-medium">₹{doctorData?.fee || 500}</p>

                {/* Action */}
                <div className="flex gap-2 justify-center">
                  <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition">
                    Confirm
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {appointments.length === 0 && (
              <div className="text-center py-10 text-gray-400">No appointments found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;
