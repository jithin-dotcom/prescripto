



import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore"; 
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { DollarSign, FileText, CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const RequestPayout: React.FC = () => {
//   const { userId, hasHydrated } = useAuthStore((state) => ({
//     userId: state.user?._id || null,
//     hasHydrated: state.hasHydrated,
//   }));

  const userId = useAuthStore((state) => state.user?._id);
//   const role = useAuthStore((state) => state.user?.role);
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
    //   setError("Amount must be greater than zero");
       toast.error("Amount must be greater than zero")
      setLoading(false);
      return;
    }

    if(reason.trim().length <= 0){
        // setError("Reason cannot be empty");
        toast.error("Reason cannot be Empty")
         setLoading(false);
         return;
    }
    
    if(amount > balance){
         toast.error("Request amount is larger than wallet Balance");
         setLoading(false);
         return;
      }

    try {
      
      
      
      await axiosInstance.post("/payments/create-payout", {
        doctorId: userId,
        amount: amount , 
        reason,
      });
     
      toast.success("Payout request submitted successfully");
      setAmount(0);
      setReason("");
      navigate("/wallet");
    }catch (error) {
       console.error(error); 
    //   toast.error("Failed to submit payout request");
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasHydrated) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-6 flex items-center justify-center gap-2">
          <DollarSign className="w-6 h-6 text-indigo-600" /> Request Payout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                // type="number"
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
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
    </div>
  );
};

export default RequestPayout;