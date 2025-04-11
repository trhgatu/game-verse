import { useState } from 'react';
import { motion } from 'framer-motion';
import GameCard from './GameCard';
import { Game } from '../types/game';
import { Button } from './ui/button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  title: string;
  games: Game[];
  isLoading?: boolean;
  gamesPerPage?: number;
  currentPage?: number;
  totalGames?: number;
  onPageChange?: (page: number) => void;
}

const GamePagination = ({ 
  title, 
  games, 
  isLoading = false, 
  gamesPerPage = 12,
  currentPage = 1,
  totalGames,
  onPageChange
}: Props) => {
  // If onPageChange is provided, we're using API pagination
  // Otherwise, we're using client-side pagination
  const isApiPagination = !!onPageChange;
  
  // For client-side pagination
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = isApiPagination && totalGames 
    ? Math.ceil(totalGames / gamesPerPage)
    : Math.ceil(games.length / gamesPerPage);
  
  // Get current games for client-side pagination
  const indexOfLastGame = localCurrentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = isApiPagination ? games : games.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const goToPage = (pageNumber: number) => {
    if (isApiPagination && onPageChange) {
      onPageChange(pageNumber);
    } else {
      setLocalCurrentPage(pageNumber);
      // Scroll to top of the game section
      window.scrollTo({ top: document.getElementById('game-pagination')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  // Skeleton loading animation with cyberpunk-style pulsing effect
  if (isLoading) {
    return (
      <div className="mb-12" id="game-pagination">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(gamesPerPage)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-900 h-[180px] rounded-lg mb-3 overflow-hidden relative border border-cyan-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
              </div>
              <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return null;
  }

  // Display information text
  const displayInfo = isApiPagination && totalGames
    ? `Showing ${(currentPage - 1) * gamesPerPage + 1}-${Math.min(currentPage * gamesPerPage, totalGames)} of ${totalGames} games`
    : `Showing ${indexOfFirstGame + 1}-${Math.min(indexOfLastGame, games.length)} of ${games.length} games`;

  // Current page to use
  const pageToUse = isApiPagination ? currentPage : localCurrentPage;

  return (
    <div className="mb-16" id="game-pagination">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold relative inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
        </h2>
        
        <div className="text-sm text-gray-400">
          {displayInfo}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(pageToUse - 1)}
              disabled={pageToUse === 1}
              className="border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white disabled:opacity-50"
            >
              <FaChevronLeft className="mr-1" /> Prev
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // If we have more than 5 pages, show a smart pagination
                if (totalPages > 5) {
                  if (pageToUse <= 3) {
                    // Show first 5 pages
                    return i + 1;
                  } else if (pageToUse >= totalPages - 2) {
                    // Show last 5 pages
                    return totalPages - 4 + i;
                  } else {
                    // Show current page and 2 pages before and after
                    return pageToUse - 2 + i;
                  }
                }
                // Otherwise show all pages
                return i + 1;
              }).map((page) => (
                <Button
                  key={page}
                  variant={pageToUse === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={
                    pageToUse === page 
                      ? "bg-cyan-600 hover:bg-cyan-700" 
                      : "border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white"
                  }
                >
                  {page}
                </Button>
              ))}
              
              {/* If we have more than 5 pages and we're not showing the last pages, add an ellipsis and the last page */}
              {totalPages > 5 && pageToUse < totalPages - 2 && (
                <>
                  <span className="text-gray-400 px-1">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    className="border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(pageToUse + 1)}
              disabled={pageToUse === totalPages}
              className="border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white disabled:opacity-50"
            >
              Next <FaChevronRight className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePagination;
