import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';
import GameHero from '../components/GameHero';
import GameDetailSkeleton from '../components/GameDetailSkeleton';
import { FaStar, FaDesktop, FaGamepad, FaTag, FaCalendarAlt, FaShoppingCart, FaExternalLinkAlt, FaArrowUp, FaTimes } from 'react-icons/fa';

interface Platform {
  platform: {
    id: number;
    name: string;
  };
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}

interface Genre {
  id: number;
  name: string;
}

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedGame, isLoading, error, fetchGameById } = useGameStore();
  
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchGameById(parseInt(id));
    }
    
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, fetchGameById]);

  const handlePlayTrailer = () => {
    if (selectedGame?.clip?.clip) {
      setShowTrailerModal(true);
    } else {
      alert('No trailer available for this game');
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return <GameDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/50 max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4 flex justify-center">
            <FaTimes />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Error Loading Game</h1>
          <p className="text-gray-300 mb-6 text-center">{error}</p>
          <div className="flex justify-center">
            <Link 
              to="/" 
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-2 px-6 rounded-md transition-colors shadow-glow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-yellow-500/50 max-w-md w-full">
          <div className="text-yellow-500 text-6xl mb-4 flex justify-center">
            <FaExternalLinkAlt />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Game Not Found</h1>
          <p className="text-gray-300 mb-6 text-center">The game you're looking for doesn't exist or has been removed.</p>
          <div className="flex justify-center">
            <Link 
              to="/" 
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-2 px-6 rounded-md transition-colors shadow-glow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <GameHero game={selectedGame} onPlayTrailer={handlePlayTrailer} />
      
      <div className="container mx-auto px-4 py-12" ref={contentRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* About Section */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                <FaGamepad className="text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">About {selectedGame.name}</h2>
            </div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedGame.description }} />
              </div>
            </motion.div>

            {/* Screenshots Section */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <FaStar className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Screenshots</h2>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {selectedGame.short_screenshots?.slice(0, 4).map((screenshot: { id: number; image: string }) => (
                <motion.div 
                  key={screenshot.id}
                  className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-cyan-500/50 transition-all"
                  onClick={() => handleImageClick(screenshot.image)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src={screenshot.image} alt={`Screenshot of ${selectedGame.name}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>

            {/* System Requirements Section */}
            {selectedGame.platforms?.some((platform: Platform) => 
              platform.platform.name === "PC" && 
              (platform.requirements?.minimum || platform.requirements?.recommended)
            ) && (
              <>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FaDesktop className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">System Requirements</h2>
                </div>
                
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedGame.platforms?.map((platform: Platform) => {
                      if (platform.platform.name === "PC") {
                        return (
                          <div key={platform.platform.id}>
                            {platform.requirements?.minimum && (
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-4">Minimum Requirements</h3>
                                <div className="text-gray-300 space-y-2">
                                  <div dangerouslySetInnerHTML={{ __html: platform.requirements.minimum }} />
                                </div>
                              </div>
                            )}
                            
                            {platform.requirements?.recommended && (
                              <div>
                                <h3 className="text-xl font-bold text-white mb-4">Recommended Requirements</h3>
                                <div className="text-gray-300 space-y-2">
                                  <div dangerouslySetInnerHTML={{ __html: platform.requirements.recommended }} />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Platforms Section */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                  <FaGamepad className="text-red-400 text-sm" />
                </div>
                <h3 className="text-lg font-bold text-white">Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGame.platforms?.map((platform: Platform) => (
                  <span 
                    key={platform.platform.id}
                    className="bg-gray-700/50 px-3 py-2 rounded-md text-sm text-white border border-gray-600/50"
                  >
                    {platform.platform.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Genres Section */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                  <FaTag className="text-yellow-400 text-sm" />
                </div>
                <h3 className="text-lg font-bold text-white">Genres</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGame.genres?.map((genre: Genre) => (
                  <Link 
                    key={genre.id}
                    to={`/genres/${genre.id}`}
                    className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-cyan-800/30 hover:to-cyan-700/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white transition-colors border border-cyan-500/30 shadow-glow-sm"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Buy Game Section */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                  <FaCalendarAlt className="text-blue-400 text-sm" />
                </div>
                <h3 className="text-lg font-bold text-white">Buy Game</h3>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Price</span>
                  <span className="text-2xl font-bold text-white">$59.99</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white py-3 rounded-md font-bold mb-2 transition-colors shadow-glow-sm flex items-center justify-center">
                <FaShoppingCart className="mr-2" /> Add to Cart
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-3 rounded-md font-bold transition-colors shadow-glow-sm">
                Buy Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailerModal && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                onClick={() => setShowTrailerModal(false)}
              >
                <FaTimes size={20} />
              </button>
              <div className="aspect-video">
                <video 
                  src={selectedGame?.clip?.clip} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div 
              className="relative max-w-5xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                onClick={() => setShowImageModal(false)}
              >
                <FaTimes size={20} />
              </button>
              <img 
                src={selectedImage} 
                alt="Game screenshot" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white p-3 rounded-full shadow-glow z-40"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDetailsPage;