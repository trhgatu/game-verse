import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  accentColor?: string;
  hoverColor?: string;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  accentColor = 'bg-cyan-600', 
  hoverColor = 'hover:bg-cyan-700' 
}: PaginationProps) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      </div>
      
      <div className="flex items-center space-x-3 relative z-10 px-6 py-4 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-cyan-900/30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-md ${
            currentPage === 1
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : `bg-gray-800 text-white ${hoverColor} hover:shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all`
          }`}
          aria-label="Previous page"
        >
          <FaArrowLeft />
        </motion.button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="text-gray-400 px-2 cyberpunk-dots">...</span>
          ) : (
            <motion.button
              key={`page-${page}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`w-10 h-10 rounded-md font-mono relative overflow-hidden ${
                currentPage === page
                  ? `${accentColor} text-white shadow-[0_0_12px_rgba(6,182,212,0.7)] border border-cyan-400`
                  : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] transition-all'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {currentPage === page && (
                <motion.div 
                  className="absolute inset-0 bg-cyan-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              {currentPage === page && (
                <div className="absolute inset-0 cyberpunk-grid opacity-30"></div>
              )}
              <span className="relative z-10">{page}</span>
            </motion.button>
          )
        ))}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : `bg-gray-800 text-white ${hoverColor} hover:shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all`
          }`}
          aria-label="Next page"
        >
          <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
