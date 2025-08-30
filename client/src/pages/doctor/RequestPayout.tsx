


import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore"; 
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { DollarSign, FileText, CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIDoctorRoutes } from "../../constants/routes.constants";


import NavbarAdmin from "../../components/NavbarAdmin";
import Sidebar from "../../components/SideBarAdmin";

const RequestPayout: React.FC = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const location = useLocation();
  const balance = location.state?.balance;
  const navigate = useNavigate();

  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (amount <= 0) {
      toast.error("Amount must be greater than zero");
      setLoading(false);
      return;
    }

    if (reason.trim().length <= 0) {
      toast.error("Reason cannot be Empty");
      setLoading(false);
      return;
    }

    if (amount > balance) {
      toast.error("Request amount is larger than wallet Balance");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post(APIDoctorRoutes.PAYOUT_REQUEST, {
        doctorId: userId,
        amount,
        reason,
      });

      toast.success("Payout request submitted successfully");
      setAmount(0);
      setReason("");
      navigate("/wallet");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasHydrated)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1 overflow-hidden">
       
        <div className="hidden md:block w-64 bg-white shadow-lg">
          <Sidebar />
        </div>

        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8 hover:scale-102 transition duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-6 flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-indigo-600" /> Request Payout
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    min="1"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter amount"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 transform text-gray-400 w-5 h-5" />
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base resize-none h-24"
                    placeholder="Enter reason for payout request"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" /> Submit Request
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-4">
              Note: Payout requests are subject to admin approval.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestPayout;
