

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { useAuthStore } from '../../store/authStore';
import NavbarAdmin from '../../components/NavbarAdmin';
import SidebarAdmin from '../../components/SideBarAdmin';
import PayoutRequestList from '../../components/PayoutRequestList';
import { DollarSign } from 'lucide-react';
import type { IPayoutRequest } from '../../interfaces/IPayoutRequest';
import { APIDoctorRoutes } from '../../constants/routes.constants';

const DoctorPayoutRequestsPage: React.FC = () => {
  const role = useAuthStore((state) => state.user?.role);
  const navigate = useNavigate();
  const [payoutRequests, setPayoutRequests] = useState<IPayoutRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (role !== 'doctor') {
      setError('Unauthorized access. Please log in as a doctor.');
      setLoading(false);
      return;
    }

    const fetchPayoutRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`${APIDoctorRoutes.GET_DOCTOR_PAYOUT}`, {
          params: { page: currentPage, limit: pageSize },
        });
        setPayoutRequests(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payout requests:', error);
        setError('Failed to load payout requests. Please try again later.');
        setLoading(false);
      }
    };
    fetchPayoutRequests();
  }, [role, currentPage, pageSize]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-600 text-lg mb-4">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col">
      <NavbarAdmin />
      <div className="flex flex-1">
        <div className="md:w-60 w-0 overflow-hidden md:overflow-auto">
          <SidebarAdmin />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <DollarSign className="w-7 h-7 text-indigo-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800">Payout Requests</h1>
          </motion.div>
          <PayoutRequestList
            payoutRequests={payoutRequests}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            role="doctor"
          />
        </main>
      </div>
    </div>
  );
};

export default DoctorPayoutRequestsPage;