import { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore';
import GameCard from '../components/GameCard';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import { FaCalendarAlt } from 'react-icons/fa';
import '../assets/cyberpunk.css';

const NewReleasesPage = () => {
  const { newReleases, isLoading, fetchNewReleases } = useGameStore();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;
  
  useEffect(() => {
    fetchNewReleases();
    // Smooth scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchNewReleases]);
  
  // Calculate pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = newReleases.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(newReleases.length / gamesPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          icon={<FaCalendarAlt />}
          title="New Releases"
          description="Discover the latest and most exciting games that have just hit the market. Stay ahead of the curve with these fresh releases."
          iconBgColor="bg-blue-500/20"
          iconColor="text-blue-400"
        />

        {/* Game Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              accentColor="bg-blue-600"
              hoverColor="hover:bg-blue-600"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewReleasesPage;
