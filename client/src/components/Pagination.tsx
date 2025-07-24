
// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const getPageNumbers = (): (number | string)[] => {
//     const delta = 1;
//     const pages: (number | string)[] = [];

//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);

//       if (currentPage > 3) pages.push("...");

//       const start = Math.max(2, currentPage - delta);
//       const end = Math.min(totalPages - 1, currentPage + delta);

//       for (let i = start; i <= end; i++) pages.push(i);

//       if (currentPage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <div className="mt-8 flex justify-center items-center flex-wrap gap-2 text-sm sm:text-base">
      
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-4 py-2 rounded-lg transition duration-200 ${
//           currentPage === 1
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
//         }`}
//       >
//         ← Previous
//       </button>

     
//       {getPageNumbers().map((item, idx) =>
//         typeof item === "string" ? (
//           <span key={idx} className="px-3 py-2 text-gray-500">
//             ...
//           </span>
//         ) : (
//           <button
//             key={idx}
//             onClick={() => onPageChange(item)}
//             className={`px-4 py-2 rounded-lg border transition duration-200 ${
//               item === currentPage
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
//             }`}
//           >
//             {item}
//           </button>
//         )
//       )}

     
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-2 rounded-lg transition duration-200 ${
//           currentPage === totalPages
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
//         }`}
//       >
//         Next →
//       </button>
//     </div>
//   );
// };

// export default Pagination;














// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   pageSize: number;
//   onPageSizeChange: (size: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   pageSize,
//   onPageSizeChange,
// }) => {
//   const getPageNumbers = (): (number | string)[] => {
//     const delta = 1;
//     const pages: (number | string)[] = [];

//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);

//       if (currentPage > 3) pages.push("...");

//       const start = Math.max(2, currentPage - delta);
//       const end = Math.min(totalPages - 1, currentPage + delta);

//       for (let i = start; i <= end; i++) pages.push(i);

//       if (currentPage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base">
      
//       {/* Page Size Dropdown */}
//       <div className="flex items-center gap-2">
//         <span className="text-gray-600">Show:</span>
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             const size = parseInt(e.target.value);
//             onPageSizeChange(size);
//           }}
//           className="px-3 py-2 border rounded-md bg-white"
//         >
//           {[1, 5, 10, 25, 50, 100].map((size) => (
//             <option key={size} value={size}>
//               {size} per page
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex flex-wrap items-center gap-2">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-lg transition duration-200 ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
//           }`}
//         >
//           ← Previous
//         </button>

//         {getPageNumbers().map((item, idx) =>
//           typeof item === "string" ? (
//             <span key={idx} className="px-3 py-2 text-gray-500">
//               ...
//             </span>
//           ) : (
//             <button
//               key={idx}
//               onClick={() => onPageChange(item)}
//               className={`px-4 py-2 rounded-lg border transition duration-200 ${
//                 item === currentPage
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
//               }`}
//             >
//               {item}
//             </button>
//           )
//         )}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-lg transition duration-200 ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white border border-gray-300 hover:bg-blue-100 text-blue-600"
//           }`}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
















import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm sm:text-base">
      
      {/* Page Size Dropdown */}
      <div className="flex items-center gap-2 ">
        <label htmlFor="pageSize" className="text-gray-700 font-medium ">
         
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            onPageSizeChange(size);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:text-white hover:bg-[#155DFC] cursor-pointer"
        >
          {[1, 4, 5, 8, 10].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`px-3 py-2 rounded-lg flex items-center gap-1 transition duration-200  ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-blue-600 hover:bg-blue-100 cursor-pointer"
          }`}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((item, idx) =>
          typeof item === "string" ? (
            <span key={idx} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              className={`px-4 py-2 rounded-lg border font-medium transition duration-200 cursor-pointer ${
                item === currentPage
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 "
              }`}
            >
              {item}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`px-3 py-2 rounded-lg flex items-center gap-1 transition duration-200  ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed "
              : "bg-white border border-gray-300 text-blue-600 hover:bg-blue-100 cursor-pointer "
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
