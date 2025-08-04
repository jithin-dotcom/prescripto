





import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Pagination from "../../components/Pagination";
import { Search } from "lucide-react";
import type {  Concern,  ApiResponse } from "../../interfaces/IAllConcerns";
import { APIRoutes } from "../../constants/routes.constants";


const AllConcerns: React.FC = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [pageSize, setPageSize] = useState<number>(10);

  const getConcerns = async (page: number = 1, query: string = "", limit: number = pageSize) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<ApiResponse>(`${APIRoutes.ALL_CONCERNS}?page=${page}&limit=${limit}&search=${query}`);
      setConcerns(res.data.data);
      setTotalPages(res.data.pagination.pages);
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
    getConcerns(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch, pageSize]);

  const updateConcernStatus = async (concernId: string, newStatus: "resolved" | "rejected") => {
    try {
      await axiosInstance.patch(`/update-concern/${concernId}`, { status: newStatus });
      setConcerns((prev) =>
        prev.map((concern) =>
          concern._id === concernId ? { ...concern, status: newStatus } : concern
        )
      );
      toast.success(`Concern marked as ${newStatus}`);
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error updating concern status";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Concerns</h1>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search concerns..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base transition-all duration-300"
              />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concerns.map((concern) => (
                  <div
                    key={concern._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">{concern.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            concern.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : concern.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {concern.status.charAt(0).toUpperCase() + concern.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{concern.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={concern.userId.photo}
                            alt={concern.userId.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              User: {concern.userId.name}
                            </p>
                            <p className="text-sm text-gray-500">{concern.userId.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={concern.doctorId.photo}
                            alt={concern.doctorId.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Doctor: {concern.doctorId.name}
                            </p>
                            <p className="text-sm text-gray-500">{concern.doctorId.email}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Appointment No: {concern.appointmentId.appointmentNo}</p>
                          <p>Date: {concern.appointmentId.day} at {concern.appointmentId.time}</p>
                          <p>Fee: ₹{concern.appointmentId.fee}</p>
                          <p>Created: {new Date(concern.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        {concern.status !== "resolved" && (
                          <button
                            onClick={() => updateConcernStatus(concern._id, "resolved")}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        {concern.status !== "rejected" && (
                          <button
                            onClick={() => updateConcernStatus(concern._id, "rejected")}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                          >
                            Mark as Rejected
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
        </main>
      </div>
    </div>
  );
};

export default AllConcerns;