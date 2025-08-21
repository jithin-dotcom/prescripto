
import { Star } from "lucide-react";

export const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          } transition-colors`}
        />
      ))}
    </div>
  );
};
