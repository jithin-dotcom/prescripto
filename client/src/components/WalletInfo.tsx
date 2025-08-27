


import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownLeft, Calendar, History, Download } from 'lucide-react';
import Pagination from './Pagination';
import dayjs from 'dayjs';
import type { WalletData } from '../interfaces/IWalletPage';

interface WalletInfoProps {
  walletData: WalletData;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onExport?: () => void; 
}

const WalletInfo: React.FC<WalletInfoProps> = ({
  walletData,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onExport,
}) => {
  const totalPages = Math.ceil(walletData.totalTransactions / pageSize);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY, hh:mm A');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-[#5F6FFF] to-[#4a54e1] text-white rounded-xl shadow-2xl p-6 relative overflow-hidden hover:scale-102 transition duration-300"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
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
          <p className="text-2xl font-bold text-green-600">{formatCurrency(walletData.balance + (walletData.expense || 0))}</p>
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
          <p className="text-2xl font-bold text-red-600">{formatCurrency(walletData.expense || 0)}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border border-[#C9D8FF] rounded-xl shadow-2xl p-6 hover:scale-102 transition duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-[#5F6FFF]" />
            <h2 className="text-xl font-semibold text-gray-700">Transaction History</h2>
          </div>
          {onExport && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="text-[#5F6FFF] hover:bg-[#5F6FFF]/10 px-3 py-1 rounded-lg transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          )}
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
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.type}</p>
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
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p
                  className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {transaction.status}
                </p>
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
      </motion.div>
    </>
  );
};

export default WalletInfo;