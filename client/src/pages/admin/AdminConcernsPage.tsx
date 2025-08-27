

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuthStore } from '../../store/authStore';
import NavbarAdmin from '../../components/NavbarAdmin';
import SidebarAdmin from '../../components/SideBarAdmin';
import ConcernsList from '../../components/ConcernsList';
import type { Concern, ApiResponse } from '../../interfaces/IAllConcerns';
import { APIRoutes } from '../../constants/routes.constants';

const AdminConcernsPage: React.FC = () => {
  const role = useAuthStore((state) => state.user?.role);
  const navigate = useNavigate();
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedConcernId, setSelectedConcernId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<'resolved' | 'rejected' | null>(null);
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (role !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search, role]);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ApiResponse>(
          `${APIRoutes.ALL_CONCERNS}?page=${currentPage}&limit=${pageSize}&search=${debouncedSearch}&status=${statusFilter === 'all' ? '' : statusFilter}`
        );
        setConcerns(res.data.data);
        setTotalPages(res.data.pagination.pages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch concerns', error);
        setError('Failed to load concerns. Please try again later.');
        setLoading(false);
      }
    };
    fetchConcerns();
  }, [currentPage, debouncedSearch, statusFilter, pageSize]);

  const updateConcernStatus = async () => {
    if (!selectedConcernId || !newStatus || !reason.trim()) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      await axiosInstance.patch(`/update-concern/${selectedConcernId}`, {
        status: newStatus,
        reason,
      });
      setConcerns((prev) =>
        prev.map((concern) =>
          concern._id === selectedConcernId ? { ...concern, status: newStatus, reason } : concern
        )
      );
      toast.success(`Concern marked as ${newStatus}`);
      setIsModalOpen(false);
      setSelectedConcernId(null);
      setNewStatus(null);
      setReason('');
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : 'Error updating concern status';
      console.error(message);
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <NavbarAdmin />
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <SidebarAdmin />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto mt-12 md:mt-0 bg-gradient-to-br from-blue-100 to-indigo-100">
          <ConcernsList
            concerns={concerns}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            search={search}
            statusFilter={statusFilter}
            role="admin"
            isModalOpen={isModalOpen}
            selectedConcernId={selectedConcernId}
            newStatus={newStatus}
            reason={reason}
            onSearchChange={setSearch}
            onStatusFilterChange={setStatusFilter}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onOpenModal={(concernId, status) => {
              setSelectedConcernId(concernId);
              setNewStatus(status);
              setReason('');
              setIsModalOpen(true);
            }}
            onCloseModal={() => {
              setIsModalOpen(false);
              setSelectedConcernId(null);
              setNewStatus(null);
              setReason('');
            }}
            onUpdateConcernStatus={updateConcernStatus}
            onReasonChange={setReason}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminConcernsPage;