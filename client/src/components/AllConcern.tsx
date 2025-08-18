

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Navbar from "./NavbarAdmin";
import SidebarAdmin from "./SideBarAdmin";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Pagination from "./Pagination";
import { Search, Filter, CheckCircle, XCircle, Calendar, User, Stethoscope } from "lucide-react";
import type { Concern, ApiResponse } from "../interfaces/IAllConcerns";
import { APIRoutes } from "../constants/routes.constants";
import { useAuthStore } from "../store/authStore";
import NavbarUser from "./Navbar";


Modal.setAppElement("#root");

const AllConcerns: React.FC = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [pageSize, setPageSize] = useState<number>(10);
  const [role, setRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedConcernId, setSelectedConcernId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<"resolved" | "rejected" | null>(null);
  const [reason, setReason] = useState<string>("");

  const getConcerns = async (page: number = 1, query: string = "", status: string = statusFilter, limit: number = pageSize) => {
    setLoading(true);
    try {
      const role = useAuthStore.getState().role;
      
      setRole(role);
      let res = null;
      if (role === "admin") {
        res = await axiosInstance.get<ApiResponse>(
          `${APIRoutes.ALL_CONCERNS}?page=${page}&limit=${limit}&search=${query}&status=${status === "all" ? "" : status}`
        );
        setConcerns(res.data.data);
        setTotalPages(res.data.pagination.pages);
      } else {
        res = await axiosInstance.get<ApiResponse>(
          `/user-concerns?page=${page}&limit=${limit}&search=${query}&status=${status === "all" ? "" : status}`
        );
        setConcerns(res.data.data);
        setTotalPages(res.data.pagination.pages);
      }
     
    } catch (error) {
      console.error("Failed to fetch concerns", error);
      toast.error("Failed to fetch concerns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    getConcerns(currentPage, debouncedSearch, statusFilter);
  }, [currentPage, debouncedSearch, statusFilter, pageSize]);

  const openModal = (concernId: string, status: "resolved" | "rejected") => {
    setSelectedConcernId(concernId);
    setNewStatus(status);
    setReason(""); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConcernId(null);
    setNewStatus(null);
    setReason("");
  };

  const updateConcernStatus = async () => {
    if (!selectedConcernId || !newStatus || !reason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    try {
      await axiosInstance.patch(`/update-concern/${selectedConcernId}`, {
        status: newStatus,
        reason,
      });
      setConcerns((prev) =>
        prev.map((concern) =>
          concern._id === selectedConcernId
            ? { ...concern, status: newStatus, reason }
            : concern
        )
      );
      toast.success(`Concern marked as ${newStatus}`);
      closeModal();
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error updating concern status";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {role === "user" ? <NavbarUser /> : <Navbar />}
      <div className="flex flex-1 flex-col md:flex-row">
        {role !== "user" && (
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <SidebarAdmin />
          </div>
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto mt-12 md:mt-0 bg-gradient-to-br from-blue-100 to-indigo-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Stethoscope className="w-6 h-6" /> User Concerns
            </h1>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <div className="relative flex-1 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] bg-white rounded-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 " />
                <input
                  type="text"
                  placeholder={
                    role !== "doctor"
                      ? "Search by concern or doctor name..."
                      : "Search by concern"
                  }
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base transition-all duration-300"
                />
              </div>
              <div className="relative w-full sm:w-40 bg-white rounded-lg">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base transition-all duration-300 appearance-none"
                >
                  <option value="all">All Concerns</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : concerns.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No concerns found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {concerns.map((concern) => (
                  <div
                    key={concern._id}
                    className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                          {concern.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 ${
                            concern.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : concern.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {concern.status === "resolved" && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          {concern.status === "rejected" && (
                            <XCircle className="w-4 h-4" />
                          )}
                          {concern.status === "pending" && (
                            <Filter className="w-4 h-4" />
                          )}
                          {concern.status.charAt(0).toUpperCase() +
                            concern.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                        {concern.description}
                      </p>
                      {concern.reason && (
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                          <strong>Reason:</strong> {concern.reason}
                        </p>
                      )}
                      <div className="space-y-3">
                        { role !== "user" && <div className="flex items-center gap-3">
                          <img
                            src={concern.userId.photo}
                            alt={concern.userId.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                              <User className="w-4 h-4" /> {concern.userId.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {concern.userId.email}
                            </p>
                          </div>
                        </div>
                        }
                        { role !== "doctor" && <div className="flex items-center gap-3">
                          <img
                            src={concern.doctorId.photo}
                            alt={concern.doctorId.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                              <Stethoscope className="w-4 h-4" />{" "}
                              {concern.doctorId.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {concern.doctorId.email}
                            </p>
                          </div>
                        </div>
                        }
                        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                          <p>
                            Appointment No: {concern.appointmentId.appointmentNo}
                          </p>
                          <p className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />{" "}
                            {concern.appointmentId.day} at{" "}
                            {concern.appointmentId.time}
                          </p>
                          <p>Fee: ₹{concern.appointmentId.fee}</p>
                          <p>
                            Created:{" "}
                            {new Date(concern.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {concern.status === "pending" && role === "admin" && (
                          <button
                            onClick={() => openModal(concern._id, "resolved")}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" /> Mark as Resolved
                          </button>
                        )}
                        {concern.status === "pending" && role === "admin" && (
                          <button
                            onClick={() => openModal(concern._id, "rejected")}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                          >
                            <XCircle className="w-4 h-4" /> Mark as Rejected
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                {totalPages >= 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={(size: number) => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                  />
                )}
              </div>
            </>
          )}

          {/* Modal for Reason Input */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <h2 className="text-xl font-semibold mb-4">
              Provide Reason for {newStatus === "resolved" ? "Resolving" : "Rejecting"} Concern
            </h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={updateConcernStatus}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default AllConcerns;



