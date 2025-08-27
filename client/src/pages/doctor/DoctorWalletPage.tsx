

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { useAuthStore } from '../../store/authStore';
import NavbarAdmin from '../../components/NavbarAdmin';
import WalletInfo from '../../components/WalletInfo';
import { Wallet, Send } from 'lucide-react';
import type { WalletData } from '../../interfaces/IWalletPage';
import { APIUserRoutes } from '../../constants/routes.constants';

const DoctorWalletPage: React.FC = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `${APIUserRoutes.GET_WALLET}?page=${currentPage}&limit=${pageSize}`
        );
        setWalletData(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setError('Failed to load wallet data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [userId, currentPage, pageSize]);

  const handlePayout = () => {
    navigate('/get-requestPayout', {
      state: {
        balance: walletData?.balance,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <motion.div
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading wallet...
        </motion.div>
      </div>
    );
  }

  if (error || !walletData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-600 text-lg mb-4">{error || 'No wallet data available.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <NavbarAdmin />
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
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
              <Wallet className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-700">My Wallet</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayout}
            className="bg-[#5F6FFF] text-white px-4 py-2 rounded-lg hover:bg-[#4a54e1] transition shadow-lg flex items-center gap-2 mt-4 sm:mt-0"
          >
            <Send className="w-4 h-4" />
            Send Money
          </motion.button>
        </motion.div>
        <WalletInfo
          walletData={walletData}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          onExport={() => console.log('Export transactions')} // Placeholder for export functionality
        />
      </main>
    </div>
  );
};

export default DoctorWalletPage;