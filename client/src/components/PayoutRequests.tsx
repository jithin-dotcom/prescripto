

import React, { useState, useEffect } from "react";
import Navbar from "./NavbarAdmin";
import SidebarAdmin from "./SideBarAdmin";
import Pagination from "./Pagination";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import { DollarSign, User, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { IPayoutRequest } from "../interfaces/IPayoutRequest";
import { useAuthStore } from "../store/authStore";

const PayoutRequests: React.FC = () => {
  const [payoutRequests, setPayoutRequests] = useState<IPayoutRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [approvingPayoutId, setApprovingPayoutId] = useState<string | null>(null); 
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    const fetchPayoutRequests = async () => {
      setLoading(true);
      try {
        const route =
          role === "admin" ? "/payments/get-allPayout" : "/payments/get-doctorPayout";
        const response = await axiosInstance.get(route, {
          params: { page: currentPage, limit: pageSize },
        });
        console.log("response.data.data : ",response.data.data);
        setPayoutRequests(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        toast.error("Failed to fetch payout requests");
        console.error("Error fetching payout requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayoutRequests();
  }, [currentPage, pageSize, role]);

  const handleApprove = async (requestId: string) => {
    setApprovingPayoutId(requestId); 
    try {
      const payout = payoutRequests.find((req) => req._id.toString() === requestId);
      if (!payout) {
        throw new Error("Payout request not found");
      }

      
      const data: IPayoutRequest = await axiosInstance.post("/payments/initiate-payout", {
        payoutId: requestId,
        doctorId: payout.doctorId._id,
        amount: payout.amount,
      });
      console.log("data : ", data);
     
      setPayoutRequests((prev) =>
        prev.map((req) =>
          req._id.toString() === requestId ? { ...req, status: "approved" as const, decentroTxnId: data.decentroTxnId } : req
        )
      );
      toast.success(`Payout request ${requestId.slice(-6)} approved and processed`);
    } catch (error) {
      toast.error("Failed to process payout");
      console.error("Error initiating payout:", error);
    } finally {
      setApprovingPayoutId(null); 
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="md:w-60 w-0 overflow-hidden md:overflow-auto">
          <SidebarAdmin />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-indigo-600" /> Payout Requests
          </h1>
          {payoutRequests.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No payout requests found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {payoutRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-500 min-h-[250px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                          Request {request._id.toString().slice(-6)}
                        </h3>
                        
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          {request.status === "pending" ? (
                            <AlertCircle className="w-4 h-4 ml-1 inline" />
                          ) : (
                            <CheckCircle className="w-4 h-4 ml-1 inline" />
                          )}
                        </span>
                      </div>
                      <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
                           
                      </h5>
                      <div className="space-y-3 text-sm sm:text-base">
                         {/* <p className="text-gray-600 break-words line-clamp-3"> decentroTxnId: {request?.decentroTxnId}</p> */}
                         {request?.decentroTxnId && (
                            <p className="text-gray-600 break-words line-clamp-3">
                               decentroTxnId: {request.decentroTxnId}
                            </p>
                         )}
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">Doctor: {request.doctorId.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">Amount: ₹{request.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">
                            Requested: {new Date(request.requestedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 break-words line-clamp-3">Reason: {request.reason}</p>
                      </div>
                    </div>
                    {request.status === "pending" && role === "admin" && (
                      <button
                        onClick={() => handleApprove(request._id.toString())}
                        disabled={approvingPayoutId === request._id}
                        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          approvingPayoutId === request._id
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {approvingPayoutId === request._id ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" /> Approve
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PayoutRequests;