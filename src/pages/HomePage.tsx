import { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import HeroBanner from '../components/HeroBanner';
import GameGrid from '../components/GameGrid';
import HomePageSkeleton from '../components/HomePageSkeleton';
import { Link } from 'react-router-dom';
import { FaFire, FaCalendarAlt, FaStar, FaGamepad, FaBolt, FaGlobe } from 'react-icons/fa';
import '../assets/cyberpunk.css';

const HomePage = () => {
  const {
    games,
    popularGames,
    newReleases,
    genres,
    isLoading,
    fetchGames,
    fetchPopularGames,
    fetchNewReleases,
    fetchGenres,
  } = useGameStore();

  useEffect(() => {
    fetchGames();
    fetchPopularGames();
    fetchNewReleases();
    fetchGenres();

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [fetchGames, fetchPopularGames, fetchNewReleases, fetchGenres]);

  // Create a "For You" section by mixing popular and new games
  const forYouGames = [...popularGames, ...newReleases]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // Get trending games (top 5 popular games)
  const trendingGames = popularGames.slice(0, 5);

  // Show skeleton during loading
  if (isLoading || !games.length || !popularGames.length) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="bg-gray-950 min-h-screen pb-20 cyberpunk-grid">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-700/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Banner */}
        <HeroBanner games={popularGames.length ? popularGames : games} />

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 mt-8">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 py-2">
            <Link
              to="/popular"
              className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <FaFire className="mr-2 text-red-500 group-hover:text-white transition-colors" /> Popular
            </Link>
            <Link
              to="/new-releases"
              className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <FaCalendarAlt className="mr-2 text-blue-500 group-hover:text-white transition-colors" /> New Releases
            </Link>
            <Link
              to="/top-rated"
              className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <FaStar className="mr-2 text-yellow-500 group-hover:text-white transition-colors" /> Top Rated
            </Link>
            <Link
              to="/genres"
              className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <FaGamepad className="mr-2 text-purple-500 group-hover:text-white transition-colors" /> Genres
            </Link>
            <Link
              to="/all-games"
              className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <FaGlobe className="mr-2 text-cyan-500 group-hover:text-white transition-colors" /> All Games
            </Link>
          </div>

          {/* Trending Now Section with horizontal cards */}
          <div className="mb-16">
            <h2 className="text-white text-2xl font-bold mb-6 relative inline-block">
              Trending Now
              <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-600 to-orange-500"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingGames.map((game, index) => (
                <Link 
                  key={game.id} 
                  to={`/games/${game.id}`}
                  className={`group relative overflow-hidden rounded-lg border border-purple-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                  <img 
                    src={game.background_image} 
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2 flex items-center">
                        <FaBolt className="mr-1" /> Trending #{index + 1}
                      </span>
                      {game.metacritic && (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          game.metacritic >= 75 ? 'bg-green-600' :
                          game.metacritic >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}>
                          {game.metacritic}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors group-hover:text-shadow-neon">
                      {game.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* For You Section */}
          <GameGrid
            title="For You"
            games={forYouGames}
            isLoading={isLoading}
            viewAllLink="/recommended"
          />

          {/* Popular Games */}
          <GameGrid
            title="Popular Games"
            games={popularGames}
            isLoading={isLoading}
            viewAllLink="/popular"
          />

          {/* New Releases */}
          <GameGrid
            title="New Releases"
            games={newReleases}
            isLoading={isLoading}
            viewAllLink="/new-releases"
          />

          {/* All Games */}
          <GameGrid
            title="Discover More Games"
            games={games.slice(0, 8)}
            isLoading={isLoading}
            viewAllLink="/all-games"
          />

          {/* Featured Genres Section */}
          <div className="mb-16">
            <h2 className="text-white text-2xl font-bold mb-6 relative inline-block">
              Explore by Genre
              <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {genres.slice(0, 9).map(genre => (
                <Link
                  key={genre.id}
                  to={`/genres/${genre.id}`}
                  className="group relative h-40 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 border border-purple-500/20 hover:border-cyan-500/50"
                >
                  {/* Cyberpunk-style background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black transition-transform duration-500 group-hover:scale-110"></div>
                  <div className="absolute inset-0 cyberpunk-grid opacity-30"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto bg-black/50 rounded-full flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all mb-2">
                        <FaGamepad className="text-cyan-400 text-xl group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <h3 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors group-hover:text-shadow-neon">
                        {genre.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                to="/genres"
                className="group relative h-40 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 border border-purple-500/20 hover:border-cyan-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-black transition-transform duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 cyberpunk-grid opacity-30"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto bg-black/50 rounded-full flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all mb-2">
                      <FaGlobe className="text-cyan-400 text-xl group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors group-hover:text-shadow-neon">
                      View All Genres
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;