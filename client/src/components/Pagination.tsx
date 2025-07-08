
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const delta = 1;
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex justify-center items-center flex-wrap gap-2 text-sm sm:text-base">
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
        }`}
      >
        ← Previous
      </button>

     
      {getPageNumbers().map((item, idx) =>
        typeof item === "string" ? (
          <span key={idx} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(item)}
            className={`px-4 py-2 rounded-lg border transition duration-200 ${
              item === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {item}
          </button>
        )
      )}

     
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition duration-200 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
