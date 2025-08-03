

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import axiosInstance from "../utils/axios";
// import { useAuthStore } from "../store/authStore";
// import { motion } from "framer-motion";
// import Pagination from "./Pagination";
// import { 
//   Wallet, 
//   Plus, 
//   ArrowUpRight, 
//   ArrowDownLeft, 
//   Calendar,
//   DollarSign,
//   TrendingUp,
//   History,
//   CreditCard,
//   Send,
//   Download
// } from "lucide-react";

// interface Transaction {
//   _id: string;
//   walletId: string;
//   appointmentId?: string;
//   transactionId?: string;
//   amount: number;
//   type: 'credit' | 'debit';
//   source: string;
//   status: 'success' | 'pending' | 'failed';
//   createdAt: string;
// //   updatedAt: string;
// //   __v: number;
// }

// interface WalletData {
//   userId: string;
//   role: string;
//   balance: number;
//   history: Transaction[];
// }

// const WalletPage = () => {

//   const userId = useAuthStore((state) => state.user?._id);
//   const [walletData, setWalletData] = useState<WalletData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) return;

//     async function fetchWalletData() {
//       try {
//         setLoading(true);
       
//         const res = await axiosInstance.get(`/get-wallet?${page}&${limit}`);
//         console.log("res : ",res);
//         setWalletData(res.data);
//       } catch (error) {
//         console.error("Error fetching wallet data:", error);
        
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchWalletData();
//   }, [userId]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR'
//     }).format(amount);
//   };



//   const calculateTotalIncome = () => {
//     return walletData?.history
//       .filter(t => t.type === 'credit')
//       .reduce((sum, t) => sum + t.amount, 0) || 0;
//   };

//   const calculateTotalExpense = () => {
//     return walletData?.history
//       .filter(t => t.type === 'debit')
//       .reduce((sum, t) => sum + t.amount, 0) || 0;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
//         <div className="text-gray-600 text-lg">Loading wallet...</div>
//       </div>
//     );
//   }

//   if (!walletData) return null;

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
//       <Navbar />

//       <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col sm:flex-row justify-between items-center mb-8"
//         >
//           <div className="flex items-center gap-3">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="bg-[#5F6FFF] p-2 rounded-lg"
//             >
//               <Wallet className="w-6 h-6 text-white" />
//             </motion.div>
//             <h1 className="text-2xl font-semibold text-gray-700">My Wallet</h1>
//           </div>
          
//           <div className="flex gap-3 mt-4 sm:mt-0">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-lg flex items-center gap-2"
//             >
//               <Plus className="w-4 h-4" />
//               Add Money
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[#5F6FFF] text-white px-4 py-2 rounded-lg hover:bg-[#4a54e1] transition shadow-lg flex items-center gap-2"
//             >
//               <Send className="w-4 h-4" />
//               Send Money
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Wallet Balance Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="bg-gradient-to-r from-[#5F6FFF] to-[#4a54e1] text-white rounded-xl shadow-2xl p-6 relative overflow-hidden"
//           >
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <DollarSign className="w-8 h-8" />
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                   className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center"
//                 >
//                   <div className="w-6 h-6 bg-white/30 rounded-full" />
//                 </motion.div>
//               </div>
//               <p className="text-white/80 text-sm mb-1">Total Balance</p>
//               <p className="text-3xl font-bold">{formatCurrency(walletData.balance)}</p>
//             </div>
//             <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <TrendingUp className="w-8 h-8 text-green-500" />
//               <ArrowUpRight className="w-5 h-5 text-green-500" />
//             </div>
//             <p className="text-[#5C5C5C] text-sm mb-1">Total Income</p>
//             <p className="text-2xl font-bold text-green-600">{formatCurrency(calculateTotalIncome())}</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <CreditCard className="w-8 h-8 text-red-500" />
//               <ArrowDownLeft className="w-5 h-5 text-red-500" />
//             </div>
//             <p className="text-[#5C5C5C] text-sm mb-1">Total Expense</p>
//             <p className="text-2xl font-bold text-red-600">{formatCurrency(calculateTotalExpense())}</p>
//           </motion.div>
//         </div>

//         {/* Transaction History */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <History className="w-6 h-6 text-[#5F6FFF]" />
//               <h2 className="text-xl font-semibold text-gray-700">Transaction History</h2>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-[#5F6FFF] hover:bg-[#5F6FFF]/10 px-3 py-1 rounded-lg transition flex items-center gap-2"
//             >
//               <Download className="w-4 h-4" />
//               Export
//             </motion.button>
//           </div>

//            <div className="space-y-4">
//             {walletData.history.map((transaction, index) => (
//               <motion.div
//                 key={transaction._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`p-2 rounded-full ${
//                     transaction.type === 'credit' 
//                       ? 'bg-green-100 text-green-600' 
//                       : 'bg-red-100 text-red-600'
//                   }`}>
//                     {transaction.type === 'credit' ? (
//                       <ArrowDownLeft className="w-5 h-5" />
//                     ) : (
//                       <ArrowUpRight className="w-5 h-5" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">{transaction.type}</p>
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         {formatDate(transaction.createdAt)}
//                       </span>
//                       {transaction.source && (
//                         <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
//                           {transaction.source}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                   <p className={`font-semibold ${
//                     transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
//                   }`}>
//                     {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
//                   </p>
//                   <p className={`text-xs px-2 py-1 rounded-full ${
//                     transaction.status === 'success' 
//                       ? 'bg-green-100 text-green-700'
//                       : transaction.status === 'pending'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : 'bg-red-100 text-red-700'
//                   }`}>
//                     {transaction.status}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div> 

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="mt-6 text-center"
//           >
//             {/* <button className="text-[#5F6FFF] hover:underline font-medium">
//               View All Transactions
//             </button> */}
//               <div className="mt-8">
//                             {totalPages >= 1 && (
                              
//                               <Pagination
//                                currentPage={currentPage}
//                                totalPages={totalPages}
//                                onPageChange={setCurrentPage}
//                                pageSize={pageSize}
//                                onPageSizeChange={(size) => {
//                                setPageSize(size);
//                                setCurrentPage(1); 
//                               }}
//                             />
//                             )}
//                           </div>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default WalletPage;


















import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import NavbarAdmin from "./NavbarAdmin"
import {
  Wallet,
  // Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  History,
  CreditCard,
  // Send,
  Download,
} from "lucide-react";

interface Transaction {
  _id: string;
  walletId: string;
  appointmentId?: string;
  transactionId?: string;
  amount: number;
  type: "credit" | "debit";
  source: string;
  status: "success" | "pending" | "failed";
  createdAt: string;
}

interface WalletData {
  userId: string;
  role: string;
  balance: number;
  history: Transaction[];
  totalTransactions: number;
}

const WalletPage = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const role = useAuthStore((state) => state.user?.role);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const totalPages = walletData ? Math.ceil(walletData.totalTransactions/ pageSize) : 1;

  useEffect(() => {
    if (!userId) return;

    async function fetchWalletData() {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/get-wallet?page=${currentPage}&limit=${pageSize}`
        );
        console.log("res.data : ",res.data);
        setWalletData(res.data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWalletData();
  }, [userId, currentPage, pageSize]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const calculateTotalIncome = () => {
    return (
      walletData?.history
        .filter((t) => t.type === "credit")
        .reduce((sum, t) => sum + t.amount, 0) || 0
    );
  };

  const calculateTotalExpense = () => {
    return (
      walletData?.history
        .filter((t) => t.type === "debit")
        .reduce((sum, t) => sum + t.amount, 0) || 0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading wallet...</div>
      </div>
    );
  }

  if (!walletData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      {role === "user" ? <Navbar /> : <NavbarAdmin />}

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        
     {/* Header */}
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#5F6FFF] p-2 rounded-lg hover:scale-105 transition duration-300"
            >
              <Wallet className="w-6 h-6 text-white " />
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-700">My Wallet</h1>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-0">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Money
            </motion.button> */}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5F6FFF] text-white px-4 py-2 rounded-lg hover:bg-[#4a54e1] transition shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Money
            </motion.button> */}
          </div>
        </motion.div>

     {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-[#5F6FFF] to-[#4a54e1] text-white rounded-xl shadow-2xl p-6 relative overflow-hidden hover:scale-102 transition duration-300"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 ">
                <DollarSign className="w-8 h-8" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-white/30 rounded-full" />
                </motion.div>
              </div>
              <p className="text-white/80 text-sm mb-1">Total Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(walletData.balance)}</p>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <ArrowUpRight className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-[#5C5C5C] text-sm mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(calculateTotalIncome())}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-red-500" />
              <ArrowDownLeft className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-[#5C5C5C] text-sm mb-1">Total Expense</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(calculateTotalExpense())}</p>
          </motion.div>
        </div>


        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-[#5F6FFF]" />
              <h2 className="text-xl font-semibold text-gray-700">
                Transaction History
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#5F6FFF] hover:bg-[#5F6FFF]/10 px-3 py-1 rounded-lg transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>

          <div className="space-y-4">
            {walletData.history.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.type}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(transaction.createdAt)}
                      </span>
                      {transaction.source && (
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                          {transaction.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "success"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            {totalPages >= 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default WalletPage;
