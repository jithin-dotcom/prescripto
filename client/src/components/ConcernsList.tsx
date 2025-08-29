

import React from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Search, Filter, CheckCircle, XCircle, Calendar, User, Stethoscope } from 'lucide-react';
import Pagination from './Pagination';
import dayjs from 'dayjs';
import type { Concern } from '../interfaces/IAllConcerns';

interface ConcernsListProps {
  concerns: Concern[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  search: string;
  statusFilter: string;
  role: 'admin' | 'doctor' | 'user';
  isModalOpen: boolean;
  selectedConcernId: string | null;
  newStatus: 'resolved' | 'rejected' | null;
  reason: string;
  onSearchChange: (search: string) => void;
  onStatusFilterChange: (status: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onOpenModal: (concernId: string, status: 'resolved' | 'rejected') => void;
  onCloseModal: () => void;
  onUpdateConcernStatus: () => void;
  onReasonChange: (reason: string) => void;
}

const ConcernsList: React.FC<ConcernsListProps> = ({
  concerns,
  currentPage,
  totalPages,
  pageSize,
  search,
  statusFilter,
  role,
  isModalOpen,
  newStatus,
  reason,
  onSearchChange,
  onStatusFilterChange,
  onPageChange,
  onPageSizeChange,
  onOpenModal,
  onCloseModal,
  onUpdateConcernStatus,
  onReasonChange,
}) => {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" /> User Concerns
        </h1>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] bg-white rounded-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={role !== 'doctor' ? 'Search by concern or doctor name...' : 'Search by concern'}
              value={search}
              onChange={(e) => {
                onSearchChange(e.target.value);
                onPageChange(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base transition-all duration-300"
            />
          </div>
          <div className="relative w-full sm:w-40 bg-white rounded-lg">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                onStatusFilterChange(e.target.value);
                onPageChange(1);
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

      {concerns.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600 text-lg"
        >
          No concerns found.
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {concerns.map((concern, index) => (
              <motion.div
                key={concern._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {concern.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 ${
                        concern.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : concern.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {concern.status === 'resolved' && <CheckCircle className="w-4 h-4" />}
                      {concern.status === 'rejected' && <XCircle className="w-4 h-4" />}
                      {concern.status === 'pending' && <Filter className="w-4 h-4" />}
                      {concern.status.charAt(0).toUpperCase() + concern.status.slice(1)}
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
                    {role !== 'user' && (
                      <div className="flex items-center gap-3">
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
                    )}
                    {role !== 'doctor' && (
                      <div className="flex items-center gap-3">
                        <img
                          src={concern.doctorId.photo}
                          alt={concern.doctorId.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Stethoscope className="w-4 h-4" /> {concern.doctorId.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {concern.doctorId.email}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>Appointment No: {concern.appointmentId.appointmentNo}</p>
                      <p className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {concern.appointmentId.day} at{' '}
                        {concern.appointmentId.time}
                      </p>
                      <p>Fee: ₹{concern.appointmentId.fee}</p>
                      <p>Created: {formatDate(concern.createdAt)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {concern.status === 'pending' && role === 'admin' && (
                      <>
                        <button
                          onClick={() => onOpenModal(concern._id, 'resolved')}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" /> Mark as Resolved
                        </button>
                        <button
                          onClick={() => onOpenModal(concern._id, 'rejected')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                        >
                          <XCircle className="w-4 h-4" /> Mark as Rejected
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            {totalPages >= 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
              />
            )}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          Provide Reason for {newStatus === 'resolved' ? 'Resolving' : 'Rejecting'} Concern
        </h2>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="Enter the reason..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          rows={4}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onUpdateConcernStatus}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConcernsList;