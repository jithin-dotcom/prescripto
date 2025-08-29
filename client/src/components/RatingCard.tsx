


import {  Clock, User, MessageCircle } from "lucide-react";
import { motion} from "framer-motion";
import { StarRating } from "./StarRating";


export const RatingCard: React.FC<{
  review: {
    userName: string;
    rating: number;
    review: string;
    time: string;
  };
  index: number;
}> = ({ review, index }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };




  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 bg-green-50";
    if (rating >= 3.5) return "text-blue-600 bg-blue-50";
    if (rating >= 2.5) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
    >
      

  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
    
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
      <User className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 capitalize">{review.userName}</h3>
      <div className="flex items-center gap-2 mt-1">
        <StarRating rating={review.rating}  />
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(review.rating)}`}>
          {review.rating}.0
        </span>
      </div>
    </div>
  </div>

  <div className="flex items-center gap-1 text-gray-500 text-sm">
    <Clock className="w-4 h-4 flex-shrink-0" />
    <span>{formatDate(review.time)}</span>
  </div>
</div>


      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-gray-700 leading-relaxed">{review.review}</p>
        </div>
      </div>
    </motion.div>
  );
};