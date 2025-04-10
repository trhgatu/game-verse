import { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore';
import GameCard from '../components/GameCard';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import { FaGamepad } from 'react-icons/fa';
import '../assets/cyberpunk.css';

const AllGamesPage = () => {
  const { games, isLoading, totalGames, setGameQuery, fetchGames } = useGameStore();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;
  
  useEffect(() => {
    // Update the game query with the current page
    setGameQuery({ page: currentPage, pageSize: gamesPerPage });
    // Fetch games with the updated query
    fetchGames();
    // Smooth scroll to top when component mounts or page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchGames, setGameQuery, currentPage, gamesPerPage]);
  
  // Calculate total pages from the total games count returned by the API
  const totalPages = Math.ceil(totalGames / gamesPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-950 min-h-screen pb-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-700/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 relative z-10">
        {/* Page Header */}
        <PageHeader
          icon={<FaGamepad />}
          title="All Games"
          description="Explore our complete collection of games. Discover new favorites and hidden gems across all genres and platforms."
          iconBgColor="bg-cyan-500/20"
          iconColor="text-cyan-400"
        />

        {/* Game Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden h-80 animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                accentColor="bg-cyan-600"
                hoverColor="hover:bg-cyan-700"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllGamesPage;
