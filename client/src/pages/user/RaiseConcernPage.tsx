


// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";

// interface LocationState {
//   appointmentId: string;
//   userId: string;
//   doctorId: string;
// }

// const RaiseConcernPage: React.FC = () => {
//   const { state } = useLocation() as { state: LocationState };
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const concernTitles = [
//     "Late",
//     "Unprofessional",
//     "Technical Issue",
//     "Billing Error",
//     "Other"
//   ];

//   useEffect(() => {
//     if (!state?.appointmentId || !state?.userId || !state?.doctorId) {
//       setError("Invalid data. Please go back and try again.");
//     }
//   }, [state]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     if (!state?.appointmentId || !state?.userId || !state?.doctorId) {
//       setError("Missing required data. Please go back and try again.");
//       return;
//     }
//     try {
//       const response = await axiosInstance.post("/raise-concern", {
//         appointmentId: state.appointmentId,
//         userId: state.userId,
//         doctorId: state.doctorId,
//         title,
//         description,
//       });
//       console.log("response : ",response);
//       setSuccess("Concern raised successfully!");
//       toast.success("Concern raised successfully");
//       navigate("/my-appointments");
//       setTitle("");
//       setDescription("");
//       setTimeout(() => setIsModalOpen(false), 2000);
//     }catch (err) {
//       console.log(err);
//       navigate("/my-appointments");
//       setError("Failed to raise concern. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
//         <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Raise a Concern</h1>
//         <p className="text-gray-600 text-center mb-8">Share your feedback about your appointment to help us improve.</p>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           disabled={!state?.appointmentId}
//         >
//           Raise Concern
//         </button>

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 animate-fadeIn">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Concern</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                   <select
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 appearance-none"
//                     required
//                   >
//                     <option value="" disabled>Select a concern</option>
//                     {concernTitles.map((option) => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 h-24 resize-none"
//                     placeholder="e.g., The doctor joined the video call 30 minutes late."
//                     required
//                   />
//                 </div>
//                 {error && <p className="text-red-500 text-sm">{error}</p>}
//                 {success && <p className="text-green-500 text-sm">{success}</p>}
//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.3s ease-out;
//           }
//           @media (max-width: 640px) {
//             .max-w-md {
//               max-width: 100%;
//               margin: 0 1rem;
//             }
//             .p-8 {
//               padding: 1.5rem;
//             }
//             .text-3xl {
//               font-size: 1.875rem;
//             }
//             .text-2xl {
//               font-size: 1.5rem;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default RaiseConcernPage;




















import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

interface LocationState {
  appointmentId: string;
  userId: string;
  doctorId: string;
}

const RaiseConcernPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const concernTitles = [
    "Late",
    "Unprofessional",
    "Technical Issue",
    "Billing Error",
    "Other"
  ];

  useEffect(() => {
    if (!state?.appointmentId || !state?.userId || !state?.doctorId) {
      setError("Invalid data. Please go back and try again.");
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!state?.appointmentId || !state?.userId || !state?.doctorId) {
      setError("Missing required data. Please go back and try again.");
      return;
    }
    try {
      const response = await axiosInstance.post("/raise-concern", {
        appointmentId: state.appointmentId,
        userId: state.userId,
        doctorId: state.doctorId,
        title,
        description,
      });
      console.log("response : ", response);
      setSuccess("Concern raised successfully!");
      toast.success("Concern raised successfully");
      navigate("/my-appointments");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
      // navigate("/my-appointments");
      // setError("Failed to raise concern. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Raise a Concern</h1>
        <p className="text-gray-600 text-center mb-8">Share your feedback about your appointment to help us improve.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <select
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 appearance-none"
              required
            >
              <option value="" disabled>Select a concern</option>
              {concernTitles.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 h-24 resize-none"
              placeholder="e.g., The doctor joined the video call 30 minutes late."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-appointments")}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          @media (max-width: 640px) {
            .max-w-md {
              max-width: 100%;
              margin: 0 1rem;
            }
            .p-8 {
              padding: 1.5rem;
            }
            .text-3xl {
              font-size: 1.875rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RaiseConcernPage;