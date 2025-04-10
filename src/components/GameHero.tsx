import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Game } from '../types/game';
import { FaPlay, FaTimes, FaHeart, FaBookmark, FaShare, FaStar, FaCalendarAlt, FaGamepad } from 'react-icons/fa';

interface Props {
  game: Game;
  onPlayTrailer: () => void;
}

const GameHero = ({ game, onPlayTrailer }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isBackgroundVideo, setIsBackgroundVideo] = useState(true);

  const shortDescription = game.description 
    ? game.description.substring(0, 180) + (game.description.length > 180 ? '...' : '')
    : 'No description available for this game.';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsBackgroundVideo(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={game.background_image}
            alt={game.name}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isBackgroundVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {isVideoLoaded && isBackgroundVideo && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-full object-cover scale-110 animate-slowZoom"
                />
                
                {/* Animated overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
                
                {/* Animated scan lines */}
                <div className="absolute inset-0 bg-scan-lines opacity-10"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 bg-particle-overlay"></div>
              </div>
            </div>
          )}

          {/* Dark overlay gradients with enhanced cyberpunk effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-transparent" />
          
          {/* Cyberpunk grid effect */}
          <div className="absolute inset-0 bg-grid-overlay opacity-10"></div>
          
          {/* Glowing accent lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute top-0 left-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {/* Game title with glitch effect */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 leading-tight relative glitch-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative z-10">{game.name}</span>
              <span className="glitch-effect" aria-hidden="true" data-content={game.name}></span>
            </motion.h1>

            {/* Short description */}
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {shortDescription}
            </motion.p>

            {/* Game metadata with improved styling */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {game.rating > 0 && (
                <div className="flex items-center bg-gradient-to-r from-red-600/80 to-red-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-glow-sm">
                  <FaStar className="text-yellow-300 mr-1.5" />
                  <span className="text-white font-bold">{game.rating.toFixed(1)}</span>
                </div>
              )}

              {game.metacritic && (
                <div className={`flex items-center px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-glow-sm ${
                  game.metacritic >= 75 ? 'bg-gradient-to-r from-green-600/80 to-green-500/80' :
                  game.metacritic >= 50 ? 'bg-gradient-to-r from-yellow-600/80 to-yellow-500/80' : 
                  'bg-gradient-to-r from-red-600/80 to-red-500/80'
                }`}>
                  <span className="mr-1.5 font-bold">MC</span>
                  <span>{game.metacritic}</span>
                </div>
              )}

              {game.released && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white shadow-glow-sm">
                  <FaCalendarAlt className="mr-1.5 text-cyan-300" />
                  <span>Released: {new Date(game.released).toLocaleDateString()}</span>
                </div>
              )}
            </motion.div>

            {/* Genres with improved styling */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {game.genres.map((genre: {id: number; name: string}) => (
                <Link
                  to={`/genres/${genre.id}`}
                  key={genre.id}
                  className="text-sm bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-cyan-800/30 hover:to-cyan-700/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white transition-colors border border-cyan-500/30 shadow-glow-sm flex items-center"
                >
                  <FaGamepad className="mr-1.5 text-cyan-400 text-xs" />
                  {genre.name}
                </Link>
              ))}
            </motion.div>

            {/* Action buttons with improved styling */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button
                onClick={onPlayTrailer}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3 px-8 rounded-md flex items-center font-bold transition-colors shadow-glow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="mr-2" /> Watch Trailer
              </motion.button>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full flex items-center justify-center transition shadow-glow-sm ${
                    isLiked 
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' 
                      : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-white backdrop-blur-sm'
                  }`}
                  aria-label="Like game"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart size={18} />
                </motion.button>

                <motion.button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-full flex items-center justify-center transition shadow-glow-sm ${
                    isSaved 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                      : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-white backdrop-blur-sm'
                  }`}
                  aria-label="Save game"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaBookmark size={18} />
                </motion.button>

                <motion.button
                  className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-white flex items-center justify-center transition backdrop-blur-sm shadow-glow-sm"
                  aria-label="Share game"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaShare size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Controls - Would be used for actual video backgrounds */}
      {isVideoLoaded && isBackgroundVideo && (
        <div className="absolute bottom-6 right-6">
          <motion.button
            onClick={() => setIsBackgroundVideo(false)}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm border border-white/10"
            aria-label="Pause video"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes size={16} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default GameHero;