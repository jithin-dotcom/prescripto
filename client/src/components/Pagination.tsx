

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const delta = 1;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
     
      pages.push(1);

     
      if (currentPage > 4) {
        pages.push("...");
      }

     
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

    
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

   
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalPages * pageSize);
  const totalItems = Math.floor(totalPages * pageSize);

  return (
    <div className="w-full">
    
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        
      
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
        
          <div className="text-sm text-gray-600 font-medium">
            <span className="hidden sm:inline">Showing </span>
            <span className="font-semibold text-gray-900">{startItem}</span>
            <span className="mx-1">-</span>
            <span className="font-semibold text-gray-900">{endItem}</span>
            <span className="hidden sm:inline"> of </span>
            <span className="sm:hidden"> / </span>
            <span className="font-semibold text-gray-900">{totalItems}</span>
            <span className="hidden sm:inline"> results</span>
          </div>

          {/* Page size selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                onPageSizeChange(size);
              }}
              className="block w-full sm:w-auto px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
            >
              {[1, 4, 5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center lg:justify-end">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium ring-1 ring-inset transition-all duration-200 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentPage === 1
                  ? "bg-gray-50 text-gray-300 ring-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-500 ring-gray-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((pageNumber, idx) => {
              if (typeof pageNumber === "string") {
                return (
                  <span
                    key={idx}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 bg-white cursor-default"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </span>
                );
              }

              const isCurrentPage = pageNumber === currentPage;
              
              return (
                <button
                  key={idx}
                  onClick={() => onPageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset transition-all duration-200 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    isCurrentPage
                      ? "z-10 bg-blue-600 text-white ring-blue-600 shadow-md"
                      : "bg-white text-gray-900 ring-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-300"
                  }`}
                  aria-current={isCurrentPage ? "page" : undefined}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium ring-1 ring-inset transition-all duration-200 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentPage === totalPages
                  ? "bg-gray-50 text-gray-300 ring-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-500 ring-gray-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              }`}
              aria-label="Next page"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile-only simplified navigation */}
      <div className="flex items-center justify-between mt-4 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer shadow-sm"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer shadow-sm"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;