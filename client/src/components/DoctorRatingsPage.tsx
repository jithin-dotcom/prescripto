// import React, { useState, useEffect } from "react";
// import { Star,  TrendingUp, Award, MessageCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Pagination from "./Pagination";
// import Navbar from "./NavbarAdmin";
// import Sidebar from "./SideBar";
// import { StarRating } from "./StarRating";
// import { RatingCard } from "./RatingCard";
// import { StatsCard } from "./StatsCard";

// // Star Rating Component


// // Rating Card Component


// // Stats Card Component


// // Main Component - Just the content area
// const DoctorRatingsPage: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [isLoading, setIsLoading] = useState(true);

//   // Sample API response data
//   const apiData = {
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 5,
//     itemsPerPage: 5,
//     data: [
//       {
//         userName: "user",
//         rating: 4,
//         review: "good doctor",
//         time: "2025-07-29T14:32:56.877Z"
//       },
//       {
//         userName: "user",
//         rating: 4,
//         review: "good doctor",
//         time: "2025-07-29T14:28:34.373Z"
//       },
//       {
//         userName: "user",
//         rating: 5,
//         review: "unbelivable doctor\n ",
//         time: "2025-07-29T10:59:34.841Z"
//       },
//       {
//         userName: "user",
//         rating: 4,
//         review: "fabolus doctor",
//         time: "2025-07-29T10:53:54.784Z"
//       },
//       {
//         userName: "user",
//         rating: 3,
//         review: "great doctor",
//         time: "2025-07-29T06:33:14.685Z"
//       }
//     ]
//   };

//   useEffect(() => {
//     // Simulate API loading
//     setTimeout(() => setIsLoading(false), 1000);
//   }, []);

//   const calculateStats = () => {
//     const ratings = apiData.data.map(item => item.rating);
//     const totalRatings = ratings.length;
//     const averageRating = ratings.reduce((a, b) => a + b, 0) / totalRatings;
//     const fiveStarCount = ratings.filter(r => r === 5).length;
//     const fiveStarPercentage = ((fiveStarCount / totalRatings) * 100).toFixed(0);

//     return {
//       totalRatings,
//       averageRating: averageRating.toFixed(1),
//       fiveStarPercentage
//     };
//   };

//   const stats = calculateStats();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//           />
//           <p className="text-gray-600">Loading your ratings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       {/* Header */}
//       <Navbar/>
//       <div className="flex items-center justify-between">
//         <Sidebar/>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
//           <p className="text-gray-600 mt-2">Monitor and manage your patient feedback</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Award className="w-6 h-6 text-yellow-500" />
//           <span className="text-xl font-bold text-gray-900">{stats.averageRating}</span>
//           <StarRating rating={Math.round(parseFloat(stats.averageRating))} size="md" />
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard
//           title="Total Reviews"
//           value={stats.totalRatings.toString()}
//           icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
//           color="blue"
//         />
//         <StatsCard
//           title="Average Rating"
//           value={stats.averageRating}
//           icon={<Star className="w-6 h-6 text-yellow-600" />}
//           color="yellow"
//           trend={`${stats.fiveStarPercentage}% are 5-star`}
//         />
//         <StatsCard
//           title="Patient Satisfaction"
//           value={`${stats.fiveStarPercentage}%`}
//           icon={<TrendingUp className="w-6 h-6 text-green-600" />}
//           color="green"
//           trend="Excellent performance"
//         />
//       </div>

//       {/* Reviews Section */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Star className="w-5 h-5 text-blue-600" />
//               <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
//             </div>
//             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//               {apiData.totalItems} reviews
//             </span>
//           </div>
//         </div>

//         <div className="p-6">
//           <AnimatePresence mode="wait">
//             <div className="space-y-6">
//               {apiData.data.map((review, index) => (
//                 <RatingCard
//                   key={`${review.time}-${index}`}
//                   review={review}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </AnimatePresence>

//           {/* Pagination - Replace with your Pagination component */}
//           {apiData.totalPages > 1 && (
//             <div className="mt-8 pt-6 border-t border-gray-200">
              
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={apiData.totalPages}
//                 onPageChange={setCurrentPage}
//                 pageSize={pageSize}
//                 onPageSizeChange={setPageSize}
//               />
             
//               <div className="text-center text-gray-500 py-4">
//                 Replace this with your Pagination component
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Empty State */}
//       {apiData.data.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
//           <p className="text-gray-600">Your patient reviews will appear here once they start rating your services.</p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DoctorRatingsPage;















// import React, { useEffect, useState } from "react";
// import { Star, TrendingUp, Award, MessageCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// // import axios from "axios";
// import axiosInstance from "../utils/axios";
// import Navbar from "./NavbarAdmin";
// import Sidebar from "./SideBar";
// import { StarRating } from "./StarRating";
// import { RatingCard } from "./RatingCard";
// import { StatsCard } from "./StatsCard";
// import Pagination from "./Pagination";
// import { useAuthStore } from "../store/authStore";

// interface Review {
//   userName: string;
//   rating: number;
//   review: string;
//   time: string;
// }

// interface RatingResponse {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   data: Review[];
// }

// const DoctorRatingsPage: React.FC = () => {
//   const [data, setData] = useState<RatingResponse | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [isLoading, setIsLoading] = useState(true);

//   const { user } = useAuthStore();
//   const doctorId = user?._id;
  

// //   const doctorId = "6869413b713181fc49853522"; // Replace with dynamic doctorId if needed

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axiosInstance.get<RatingResponse>(
//         `/get-rating/${doctorId}?page=${currentPage}&limit=${pageSize}`
//       );
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching ratings:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, pageSize]);

//   const calculateStats = () => {
//     if (!data) return { totalRatings: 0, averageRating: "0.0", fiveStarPercentage: "0" };

//     const ratings = data.data.map((item) => item.rating);
//     const totalRatings = ratings.length;
//     const averageRating = ratings.reduce((a, b) => a + b, 0) / totalRatings || 0;
//     const fiveStarCount = ratings.filter((r) => r === 5).length;
//     const fiveStarPercentage = ((fiveStarCount / totalRatings) * 100 || 0).toFixed(0);

//     return {
//       totalRatings,
//       averageRating: averageRating.toFixed(1),
//       fiveStarPercentage,
//     };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="flex min-h-screen">
      
//        <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="p-6 space-y-8"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
//               <p className="text-gray-600 mt-1">Monitor and manage your patient feedback</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <Award className="w-6 h-6 text-yellow-500" />
//               <span className="text-xl font-bold text-gray-900">{stats.averageRating}</span>
//               <StarRating rating={Math.round(parseFloat(stats.averageRating))} size="md" />
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatsCard
//               title="Total Reviews"
//               value={stats.totalRatings.toString()}
//               icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
//               color="blue"
//             />
//             <StatsCard
//               title="Average Rating"
//               value={stats.averageRating}
//               icon={<Star className="w-6 h-6 text-yellow-600" />}
//               color="yellow"
//               trend={`${stats.fiveStarPercentage}% are 5-star`}
//             />
//             <StatsCard
//               title="Patient Satisfaction"
//               value={`${stats.fiveStarPercentage}%`}
//               icon={<TrendingUp className="w-6 h-6 text-green-600" />}
//               color="green"
//               trend="Excellent performance"
//             />
//           </div>

//           {/* Loading State */}
//           {isLoading ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//                 />
//                 <p className="text-gray-600">Loading your ratings...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Reviews Section */}
//               <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Star className="w-5 h-5 text-blue-600" />
//                       <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
//                     </div>
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {data?.totalItems || 0} reviews
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   {data?.data.length ? (
//                     <AnimatePresence mode="wait">
//                       <div className="space-y-6">
//                         {data.data.map((review, index) => (
//                           <RatingCard key={`${review.time}-${index}`} review={review} index={index} />
//                         ))}
//                       </div>
//                     </AnimatePresence>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-center py-12"
//                     >
//                       <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
//                       <p className="text-gray-600">
//                         Your patient reviews will appear here once they start rating your services.
//                       </p>
//                     </motion.div>
//                   )}

//                   {/* Pagination */}
//                   {data && data.totalPages > 1 && (
//                     <div className="mt-8 pt-6 border-t border-gray-200">
//                       <Pagination
//                         currentPage={currentPage}
//                         totalPages={data.totalPages}
//                         onPageChange={setCurrentPage}
//                         pageSize={pageSize}
//                         onPageSizeChange={setPageSize}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default DoctorRatingsPage;






















// import React, { useEffect, useState } from "react";
// import { Star, TrendingUp, Award, MessageCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "../utils/axios";
// import Navbar from "./NavbarAdmin";
// import Sidebar from "./SideBar";
// import { StarRating } from "./StarRating";
// import { RatingCard } from "./RatingCard";
// import { StatsCard } from "./StatsCard";
// import Pagination from "./Pagination";
// import { useAuthStore } from "../store/authStore";

// interface Review {
//   userName: string;
//   rating: number;
//   review: string;
//   time: string;
// }

// interface RatingResponse {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   data: Review[];
// }

// const DoctorRatingsPage: React.FC = () => {
//   const [data, setData] = useState<RatingResponse | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [isLoading, setIsLoading] = useState(true);

//   const { user } = useAuthStore();
//   const doctorId = user?._id;

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axiosInstance.get<RatingResponse>(
//         `/get-rating/${doctorId}?page=${currentPage}&limit=${pageSize}`
//       );

//       console.log("res.data : ", res.data);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching ratings:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, pageSize]);

//   const calculateStats = () => {
//     if (!data) return { totalRatings: 0, averageRating: "0.0", fiveStarPercentage: "0" };

//     const ratings = data.data.map((item) => item.rating);
//     const totalRatings = ratings.length;
//     const averageRating = ratings.reduce((a, b) => a + b, 0) / totalRatings || 0;
//     const fiveStarCount = ratings.filter((r) => r === 5).length;
//     const fiveStarPercentage = ((fiveStarCount / totalRatings) * 100 || 0).toFixed(0);

//     return {
//       totalRatings,
//       averageRating: averageRating.toFixed(1),
//       fiveStarPercentage,
//     };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Full-width Navbar */}
//       <Navbar />

//       {/* Sidebar + Main Content Layout */}
//       <div className="flex flex-1">
//         <Sidebar />

//         <div className="flex-1 p-6 space-y-8 overflow-y-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-8"
//           >
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
//                 <p className="text-gray-600 mt-1">Monitor and manage your patient feedback</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Award className="w-6 h-6 text-yellow-500" />
//                 <span className="text-xl font-bold text-gray-900">{stats.averageRating}</span>
//                 <StarRating rating={Math.round(parseFloat(stats.averageRating))} size="md" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatsCard
//                 title="Total Reviews"
//                 value={stats.totalRatings.toString()}
//                 icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
//                 color="blue"
//               />
//               <StatsCard
//                 title="Average Rating"
//                 value={stats.averageRating}
//                 icon={<Star className="w-6 h-6 text-yellow-600" />}
//                 color="yellow"
//                 trend={`${stats.fiveStarPercentage}% are 5-star`}
//               />
//               <StatsCard
//                 title="Patient Satisfaction"
//                 value={`${stats.fiveStarPercentage}%`}
//                 icon={<TrendingUp className="w-6 h-6 text-green-600" />}
//                 color="green"
//                 trend="Excellent performance"
//               />
//             </div>

//             {isLoading ? (
//               <div className="flex items-center justify-center py-20">
//                 <div className="text-center">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//                   />
//                   <p className="text-gray-600">Loading your ratings...</p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                   <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Star className="w-5 h-5 text-blue-600" />
//                         <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
//                       </div>
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                         {data?.totalItems || 0} reviews
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     {data?.data.length ? (
//                       <AnimatePresence mode="wait">
//                         <div className="space-y-6">
//                           {data.data.map((review, index) => (
//                             <RatingCard key={`${review.time}-${index}`} review={review} index={index} />
//                           ))}
//                         </div>
//                       </AnimatePresence>
//                     ) : (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-center py-12"
//                       >
//                         <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
//                         <p className="text-gray-600">
//                           Your patient reviews will appear here once they start rating your services.
//                         </p>
//                       </motion.div>
//                     )}

//                     {data && data.totalPages > 0 && (
//                       <div className="mt-8 pt-6 border-t border-gray-200">
//                         <Pagination
//                           currentPage={currentPage}
//                           totalPages={data.totalPages}
//                           onPageChange={setCurrentPage}
//                           pageSize={pageSize}
//                           onPageSizeChange={setPageSize}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorRatingsPage;




















import React, { useEffect, useState } from "react";
import { Star, TrendingUp, Award, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axios";
import NavbarAdmin from "./NavbarAdmin";
import Navbar from "./Navbar";

import Sidebar from "./SideBar";
import { StarRating } from "./StarRating";
import { RatingCard } from "./RatingCard";
import { StatsCard } from "./StatsCard";
import Pagination from "./Pagination";
import { useAuthStore } from "../store/authStore";
import SidebarAdmin from "./SideBarAdmin";


interface Review {
  userName: string;
  rating: number;
  review: string;
  time: string;
}

interface RatingResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  data: Review[];               
  totalReviews: number;           
  averageRating: number;         
  satisfactionPercent: number;    
}

const DoctorRatingsPage: React.FC = () => {
  const [data, setData] = useState<RatingResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthStore();
  const role = user?.role;
  const doctorId = (sessionStorage.getItem("doctorId") && (role === "admin" || role === "user")) ? sessionStorage.getItem("doctorId") :  user?._id;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<RatingResponse>(
        `/get-rating/${doctorId}?page=${currentPage}&limit=${pageSize}`
      );

      console.log("res.data : ", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const averageRating = data?.averageRating?.toFixed(1) ?? "0.0";
  const totalReviews = data?.totalReviews ?? 0;
  const satisfaction = data?.satisfactionPercent ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      {role !== "user" ? <NavbarAdmin /> : <Navbar />}

      <div className="flex flex-1">
       {role === "doctor" ? <Sidebar /> : role === "admin" ? <SidebarAdmin /> : null}

        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
                <p className="text-gray-600 mt-1">Monitor and manage your patient feedback</p>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold text-gray-900">{averageRating}</span>
                <StarRating rating={Math.round(parseFloat(averageRating))} size="md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Reviews"
                value={totalReviews.toString()}
                icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
                color="blue"
              />
              <StatsCard
                title="Average Rating"
                value={averageRating}
                icon={<Star className="w-6 h-6 text-yellow-600" />}
                color="yellow"
                trend={`${satisfaction}% are 5-star`}
              />
              <StatsCard
                title="Patient Satisfaction"
                value={`${satisfaction}%`}
                icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                color="green"
                trend="Excellent performance"
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600">Loading your ratings...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {data?.totalItems || 0} reviews
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {data?.data?.length ? (
                      <AnimatePresence mode="wait">
                        <div className="space-y-6">
                          {data.data.map((review, index) => (
                            <RatingCard key={`${review.time}-${index}`} review={review} index={index} />
                          ))}
                        </div>
                      </AnimatePresence>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-600">
                          Your patient reviews will appear here once they start rating your services.
                        </p>
                      </motion.div>
                    )}

                    {data && data.totalPages > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={data.totalPages}
                          onPageChange={setCurrentPage}
                          pageSize={pageSize}
                          onPageSizeChange={setPageSize}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRatingsPage;
