import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGamepad, FaArrowRight } from 'react-icons/fa';
import useGameStore from '../store/gameStore';

const GenresPage = () => {
  const { genres, fetchGenres, loading } = useGameStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12">
      {/* Cyberpunk grid overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-8 border-b border-cyan-500/20 mb-8">
          <div className="flex items-center mb-4">
            <FaGamepad className="text-cyan-400 text-3xl mr-3" />
            <h1 className="text-4xl font-bold text-white">Game Genres</h1>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Explore a diverse collection of game genres. From action-packed adventures to strategic simulations, 
            find your perfect gaming experience.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {genres.map(genre => (
              <motion.div 
                key={genre.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-gray-900/50 hover:bg-gray-900/80 transition-all duration-300"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" 
                    style={{ backgroundImage: `url(${genre.image_background})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/30"></div>
                  </div>
                </div>
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {genre.name}
                  </h2>
                  
                  <p className="text-gray-400 mb-4">
                    <span className="text-cyan-400 font-medium">{genre.games_count?.toLocaleString() || 0}</span> games
                  </p>
                  
                  <div className="mt-auto">
                    <Link 
                      to={`/genres/${genre.id}`}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Explore genre <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
                
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-cyan-500/20 w-24 h-3 -right-6 top-6"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GenresPage;
