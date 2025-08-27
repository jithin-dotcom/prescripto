

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Pagination from './Pagination';
import dayjs from 'dayjs';
import type { IPayoutRequest } from '../interfaces/IPayoutRequest';

interface PayoutRequestListProps {
  payoutRequests: IPayoutRequest[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onApprove?: (requestId: string) => void;
  approvingPayoutId?: string | null;
  role: 'admin' | 'doctor';
}

const PayoutRequestList: React.FC<PayoutRequestListProps> = ({
  payoutRequests,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onApprove,
  approvingPayoutId,
  role,
}) => {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY');
  };

  return (
    <>
      {payoutRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600 text-lg"
        >
          No payout requests found.
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {payoutRequests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-500 min-h-[250px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Request {request._id.toString().slice(-6)}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      {request.status === 'pending' ? (
                        <AlertCircle className="w-4 h-4 ml-1 inline" />
                      ) : (
                        <CheckCircle className="w-4 h-4 ml-1 inline" />
                      )}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    {request.decentroTxnId && (
                      <p className="text-gray-600 break-words line-clamp-3">
                        Decentro Txn ID: {request.decentroTxnId}
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
                        Requested: {formatDate(request.requestedAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 break-words line-clamp-3">Reason: {request.reason}</p>
                  </div>
                </div>
                {request.status === 'pending' && role === 'admin' && onApprove && (
                  <button
                    onClick={() => onApprove(request._id.toString())}
                    disabled={approvingPayoutId === request._id}
                    className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      approvingPayoutId === request._id
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
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
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              pageSize={pageSize}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PayoutRequestList;