


// // // import React, { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { Star, X } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Card, CardContent } from "@/components/ui/card";

// // // const stars = [1, 2, 3, 4, 5];

// // // const DoctorRating = ({ onClose }: { onClose: () => void }) => {
// // //   const [selectedRating, setSelectedRating] = useState<number | null>(null);
// // //   const [review, setReview] = useState("");

// // //   const handleRating = (star: number) => {
// // //     setSelectedRating(star);
// // //   };

// // //   const handleSubmit = () => {
// // //     const payload = {
// // //       doctorId: "dummyDoctorId",
// // //       appointmentId: "dummyAppointmentId",
// // //       rating: selectedRating,
// // //       review,
// // //     };
// // //     console.log("Rating submitted:", payload);
// // //     onClose();
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, scale: 0.8 }}
// // //       animate={{ opacity: 1, scale: 1 }}
// // //       exit={{ opacity: 0, scale: 0.8 }}
// // //       className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
// // //     >
// // //       <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white relative">
// // //         <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
// // //           <X className="w-5 h-5" />
// // //         </button>
// // //         <CardContent className="flex flex-col items-center gap-4">
// // //           <h2 className="text-xl font-semibold text-gray-800">Rate Your Consultation</h2>

// // //           <div className="flex gap-1 mt-2">
// // //             {stars.map((star) => (
// // //               <button
// // //                 key={star}
// // //                 onClick={() => handleRating(star)}
// // //                 className={`transition-transform ${
// // //                   selectedRating && star <= selectedRating ? "text-yellow-400 scale-110" : "text-gray-300"
// // //                 }`}
// // //               >
// // //                 <Star className="w-7 h-7" fill={selectedRating && star <= selectedRating ? "#facc15" : "none"} />
// // //               </button>
// // //             ))}
// // //           </div>

// // //           <Textarea
// // //             placeholder="Write a review (optional)"
// // //             className="mt-4 w-full min-h-[100px] resize-none rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
// // //             value={review}
// // //             onChange={(e) => setReview(e.target.value)}
// // //           />

// // //           <div className="flex justify-end gap-2 w-full mt-6">
// // //             <Button variant="ghost" onClick={onClose}>
// // //               Later
// // //             </Button>
// // //             <Button onClick={handleSubmit} disabled={!selectedRating}>
// // //               Submit
// // //             </Button>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     </motion.div>
// // //   );
// // // };

// // // export default DoctorRating;








// // // import { motion } from "framer-motion";
// // // import { X, Star } from "lucide-react";
// // // import { useState } from "react";

// // // // type RatingModalProps = {
// // // //   onClose: () => void;
// // // // };

// // // const RateDoctor = () => {
// // //   const [rating, setRating] = useState(0);
// // //   const [hovered, setHovered] = useState(0);
// // //   const [reviewText, setReviewText] = useState("");

// // //   const handleSubmit = () => {
// // //     const payload = {
// // //       rating,
// // //       reviewText,
// // //     };

// // //     console.log("Submitted Review:", payload);
// // //     // onClose();
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: -30 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         exit={{ opacity: 0, y: -30 }}
// // //         className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
// // //       >
// // //         <button onClick={} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
// // //           <X size={20} />
// // //         </button>
// // //         <h2 className="text-xl font-semibold text-center mb-4">Rate Your Consultation</h2>

// // //         {/* Stars */}
// // //         <div className="flex justify-center mb-4">
// // //           {[1, 2, 3, 4, 5].map((star) => (
// // //             <Star
// // //               key={star}
// // //               size={32}
// // //               className={`cursor-pointer transition ${
// // //                 star <= (hovered || rating)
// // //                   ? "text-yellow-400 fill-yellow-400"
// // //                   : "text-gray-300"
// // //               }`}
// // //               onMouseEnter={() => setHovered(star)}
// // //               onMouseLeave={() => setHovered(0)}
// // //               onClick={() => setRating(star)}
// // //             />
// // //           ))}
// // //         </div>

// // //         {/* Textarea */}
// // //         <textarea
// // //           rows={4}
// // //           placeholder="Write a review (optional)"
// // //           value={reviewText}
// // //           onChange={(e) => setReviewText(e.target.value)}
// // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
// // //         />

// // //         {/* Buttons */}
// // //         <div className="flex justify-end gap-3 mt-6">
// // //           <button
// // //             onClick={}
// // //             className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
// // //           >
// // //             Later
// // //           </button>
// // //           <button
// // //             onClick={handleSubmit}
// // //             className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// // //           >
// // //             Submit
// // //           </button>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default RateDoctor;











// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, X } from 'lucide-react';

// // Dummy doctor data
// const doctor = {
//   id: 1,
//   name: 'Dr. Jane Smith',
//   specialty: 'Cardiologist',
// };

// // Modal component
// export const RateDoctor = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isOpen = new URLSearchParams(location.search).get('rate') === 'true';
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState('');

//   const handleClose = () => {
//     // Remove the rate query parameter to close the modal
//     navigate({ search: '' });
//   };

//   const handleSubmit = () => {
//     // Simulate submitting rating and review
//     console.log({ doctorId: doctor.id, rating, review });
//     handleClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.7, y: 50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.7, y: 50 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Rate {doctor.name}
//               </h2>
//               <button onClick={handleClose}>
//                 <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
//               </button>
//             </div>

//             {/* Specialty */}
//             <p className="text-gray-600 mb-6">{doctor.specialty}</p>

//             {/* Star Rating */}
//             <div className="flex justify-center mb-6">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <motion.button
//                   key={star}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHover(star)}
//                   onMouseLeave={() => setHover(rating)}
//                   className="focus:outline-none"
//                 >
//                   <Star
//                     className={`w-8 h-8 ${
//                       star <= (hover || rating)
//                         ? 'text-yellow-400 fill-yellow-400'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 </motion.button>
//               ))}
//             </div>

//             {/* Review Textarea */}
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Share your experience (optional)"
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
//             />

//             {/* Buttons */}
//             <div className="flex justify-end gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleClose}
//                 className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
//               >
//                 Later
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSubmit}
//                 disabled={rating === 0}
//                 className={`px-4 py-2 text-white rounded-lg ${
//                   rating === 0
//                     ? 'bg-blue-300 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 Rate
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };











// import  { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, X } from 'lucide-react';

// // Dummy doctor data
// const doctor = {
//   id: 1,
//   name: 'Dr. Jane Smith',
//   specialty: 'Cardiologist',
// };

// // Modal component
// export const RateDoctor = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const isOpen = searchParams.get('rate') === 'true';
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState('');

//   // Automatically add ?rate=true when accessing /rate-doctor
//   useEffect(() => {
//     if (!isOpen) {
//       navigate({ pathname: '/rate-doctor', search: '?rate=true' }, { replace: true });
//     }
//   }, [isOpen, navigate]);

//   const handleClose = () => {
//     // Navigate back to user dashboard or remove query param
//     navigate('/user-dashboard');
//   };

//   const handleSubmit = () => {
//     // Simulate submitting rating and review
//     console.log({ doctorId: doctor.id, rating, review });
//     handleClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.7, y: 50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.7, y: 50 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Rate {doctor.name}
//               </h2>
//               <button onClick={handleClose}>
//                 <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
//               </button>
//             </div>

//             {/* Specialty */}
//             <p className="text-gray-600 mb-6">{doctor.specialty}</p>

//             {/* Star Rating */}
//             <div className="flex justify-center mb-6">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <motion.button
//                   key={star}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHover(star)}
//                   onMouseLeave={() => setHover(rating)}
//                   className="focus:outline-none"
//                 >
//                   <Star
//                     className={`w-8 h-8 ${
//                       star <= (hover || rating)
//                         ? 'text-yellow-400 fill-yellow-400'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 </motion.button>
//               ))}
//             </div>

//             {/* Review Textarea */}
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Share your experience (optional)"
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
//             />

//             {/* Buttons */}
//             <div className="flex justify-end gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleClose}
//                 className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
//               >
//                 Later
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSubmit}
//                 disabled={rating === 0}
//                 className={`px-4 py-2 text-white rounded-lg ${
//                   rating === 0
//                     ? 'bg-blue-300 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 Rate
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };












// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, X } from 'lucide-react';
// import { toast } from 'react-toastify';
// import axiosInstance from '../../utils/axios'; // adjust path as needed

// export const RateDoctor = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get appointmentId, doctorId, userId from state
//   console.log("locatoion : ", location);
//   const { appointmentId, doctorId, userId } = location.state || {};

//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState('');

//   // Automatically add ?rate=true when accessing /rate-doctor
//   const searchParams = new URLSearchParams(location.search);
//   const isOpen = searchParams.get('rate') === 'true';

//   useEffect(() => {
//     if (!isOpen) {
//       navigate({ pathname: '/rate-doctor', search: '?rate=true' }, { replace: true });
//     }
//   }, [isOpen, navigate]);

//   const handleClose = () => {
//     navigate('/my-appointments'); 
//   };

//   const handleSubmit = async () => {
//     if (!rating || !appointmentId || !userId || !doctorId) {
//         console.log("rating : ", rating);
//         console.log("appointmentId : ",appointmentId );
//         console.log("userId : ", userId);
//         console.log("doctorId : ",doctorId);
//       toast.error("Missing data");
//       return;
//     }

//     try {
//       const res = await axiosInstance.post('/api/ratings', {
//         appointmentId,
//         userId,
//         doctorId,
//         rating,
//         review,
//       });
//       console.log("res: ",res);
//       toast.success("Thank you for your feedback!");
//       handleClose();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit rating.");
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm"
//         >
//           <motion.div
//             initial={{ scale: 0.7, y: 50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.7, y: 50 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-800">Rate your doctor</h2>
//               <button onClick={handleClose}>
//                 <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
//               </button>
//             </div>

//             <p className="text-gray-600 mb-6">How was your consultation experience?</p>

//             {/* Star Rating */}
//             <div className="flex justify-center mb-6">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <motion.button
//                   key={star}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHover(star)}
//                   onMouseLeave={() => setHover(rating)}
//                   className="focus:outline-none"
//                 >
//                   <Star
//                     className={`w-8 h-8 ${
//                       star <= (hover || rating)
//                         ? 'text-yellow-400 fill-yellow-400'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 </motion.button>
//               ))}
//             </div>

//             {/* Review Textarea */}
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Share your experience (optional)"
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
//             />

//             {/* Buttons */}
//             <div className="flex justify-end gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleClose}
//                 className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
//               >
//                 Later
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSubmit}
//                 disabled={rating === 0}
//                 className={`px-4 py-2 text-white rounded-lg ${
//                   rating === 0
//                     ? 'bg-blue-300 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 Rate
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


















import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

export const RateDoctor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract from location.state once and persist into local state
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  // Capture location.state only on mount
  useEffect(() => {
    if (location.state) {
      const { appointmentId, doctorId, userId } = location.state;
      setAppointmentId(appointmentId);
      setDoctorId(doctorId);
      setUserId(userId);
    }
  }, [location.state]);

  // Always ensure ?rate=true is in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('rate') !== 'true') {
      navigate({ pathname: '/rate-doctor', search: '?rate=true' }, { replace: true });
    }
  }, [location.search, navigate]);

  const handleClose = () => {
    navigate('/my-appointments');
  };

  const handleSubmit = async () => {
                 console.log("rating : ", rating);
        console.log("appointmentId : ",appointmentId );
        console.log("userId : ", userId);
        console.log("doctorId : ",doctorId);
    if (!rating || !appointmentId || !userId || !doctorId) {
   
      toast.error("Missing required data for rating.");
      return;
    }

    try {
      const res = await axiosInstance.post('/api/ratings', {
        appointmentId,
        userId,
        doctorId,
        rating,
        review,
      });

      console.log("res : ",res);
      toast.success("Thank you for your feedback!");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit rating.");
    }
  };

  const isOpen = new URLSearchParams(location.search).get('rate') === 'true';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Rate your doctor</h2>
              <button onClick={handleClose}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">How was your consultation experience?</p>

            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hover || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience (optional)"
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6"
            />

            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Later
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`px-4 py-2 text-white rounded-lg ${
                  rating === 0
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Rate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

