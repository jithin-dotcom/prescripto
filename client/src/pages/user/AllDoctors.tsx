


import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../utils/axios";
import type { Doctor } from "../../interfaces/IDoctor";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { APIUserRoutes } from "../../constants/routes.constants";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const specialties = [
  "Clear Filter",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const AllDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [pageSize, setPageSize] = useState<number>(4);
  const [sortBy, setSortBy] = useState(""); // NEW STATE
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);
    setPage(1);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    fetchDoctors();
  }, [page, pageSize, debouncedSearchInput, specialty, sortBy]); 

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `${APIUserRoutes.ALL_DOCTORS}?page=${page}&limit=${pageSize}&search=${debouncedSearchInput}&specialty=${specialty}&sortBy=${sortBy}`
      );
      setDoctors(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
      <Navbar />

      <motion.main
        className="flex-1 p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Search bar and sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-md w-full transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </motion.div>

          <div className="w-full sm:w-auto">
            {/* <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter</option>
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
            </select> */}




            <div className="w-full sm:w-auto flex items-center gap-2">
  <Filter className="text-gray-600 w-5 h-5" />
  <select
    value={sortBy}
    onChange={(e) => {
      setSortBy(e.target.value);
      setPage(1);
    }}
    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Apply Filter</option>
    <option value="rating">Rating</option>
    <option value="experience">Experience</option>
  </select>
</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Sidebar filter */}
          <motion.aside
            className="w-full sm:w-auto lg:w-72"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 text-base text-gray-700">
              {specialties.map((specialtyLabel, index) => (
                <motion.p
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="pl-5 pr-5 py-3 border border-[#C9D8FF] rounded-lg cursor-pointer transition duration-300 hover:bg-[#5F6FFF] hover:text-white bg-white shadow-2xl text-center sm:text-left"
                  onClick={() => {
                    if (specialtyLabel === "Clear Filter") {
                      setSpecialty("");
                    } else {
                      setSpecialty(specialtyLabel);
                    }
                  }}
                >
                  {specialtyLabel}
                </motion.p>
              ))}
            </div>
          </motion.aside>

          {/* Doctor Cards */}
          <div className="w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {loading ? (
                <p className="text-gray-600">Loading doctors...</p>
              ) : doctors.length === 0 ? (
                <p className="text-gray-600">No doctors available.</p>
              ) : (
                doctors.map((doctor) => {
                  const profile = doctor.profile?.[0] || {};
                  return (
                    <motion.div
                      variants={itemVariants}
                      key={doctor._id}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="flex flex-col border border-[#C9D8FF] rounded-xl bg-white shadow-2xl overflow-hidden transition group cursor-pointer"
                    >
                      <div className="w-full aspect-[4/3] bg-[#EAEFFF] hover:bg-[#5F6FFF] transition duration-300">
                        <img
                          src={doctor.photo || "https://via.placeholder.com/300x200?text=Doctor"}
                          alt={doctor.name}
                          className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            doctor.isVerified ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              doctor.isVerified ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          <p>{doctor.isVerified ? "Available" : "Unavailable"}</p>
                        </div>
                        <p className="text-[#262626] text-lg font-medium">{doctor.name}</p>
                        <p className="text-[#5C5C5C] text-sm">
                          {profile.specialization || "Specialization N/A"}
                        </p>
                        {profile.averageRating !== undefined && profile.ratingCount !== undefined && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600">
                            <span className="font-semibold">
                              {profile.averageRating.toFixed(1)}{" "}
                              {"⭐".repeat(Math.round(profile.averageRating))}
                            </span>
                            <span className="text-gray-500">({profile.ratingCount})</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>

            {/* Pagination */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  pageSize={pageSize}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default AllDoctors;
