

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, TrendingUp, Award } from 'lucide-react';
import { StarRating } from './StarRating';
import { RatingCard } from './RatingCard';
import { StatsCard } from './StatsCard';
import Pagination from './Pagination';
import type { RatingResponse } from '../interfaces/IDoctorRatings';

interface RatingsListProps {
  data: RatingResponse | null;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading: boolean;
}

const RatingsList: React.FC<RatingsListProps> = ({
  data,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading,
}) => {
  const averageRating = data?.averageRating?.toFixed(1) ?? '0.0';
  const totalReviews = data?.totalReviews ?? 0;
  const satisfaction = data?.satisfactionPercent ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your patient feedback</p>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-bold text-gray-900">{averageRating}</span>
          <StarRating rating={Math.round(parseFloat(averageRating))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Reviews"
          value={totalReviews.toString()}
          icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
          color="blue"
        />
        <StatsCard
          title="Average Rating"
          value={averageRating}
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="yellow"
          trend={`${satisfaction}% are 5-star`}
        />
        <StatsCard
          title="Patient Satisfaction"
          value={`${satisfaction}%`}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          color="green"
          trend="Excellent performance"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Loading your ratings...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {data?.totalItems || 0} reviews
              </span>
            </div>
          </div>

          <div className="p-6">
            {data?.data?.length ? (
              <AnimatePresence mode="wait">
                <div className="space-y-6">
                  {data.data.map((review, index) => (
                    <RatingCard key={`${review.time}-${index}`} review={review} index={index} />
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">
                  Your patient reviews will appear here once they start rating your services.
                </p>
              </motion.div>
            )}

            {data && data.totalPages > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                  pageSize={pageSize}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RatingsList;