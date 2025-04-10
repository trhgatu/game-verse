import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Game } from '../types/game';
import { FaStar, FaGamepad } from 'react-icons/fa';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg neon-border group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/games/${game.id}`}>
        <div className="relative">
          {/* Cyberpunk-style border glow effect on hover */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-70 transition duration-500 ${isHovered ? 'animate-pulse' : ''}`}></div>
          
          {/* Game image */}
          <div className="relative rounded-lg overflow-hidden">
            {!imgError ? (
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-64 object-cover transition-transform duration-500"
                style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
                <FaGamepad className="text-cyan-500 text-4xl" />
              </div>
            )}

            {/* Scanline effect overlay */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
            
            {/* Content overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col justify-end transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-90'
            }`}>
              {/* Game title with neon text effect */}
              <h3 className={`text-white text-lg font-bold mb-1 line-clamp-2 transition-all duration-300 ${isHovered ? 'text-shadow-neon text-cyan-300' : ''}`}>
                {game.name}
              </h3>

              <div className="flex items-center mt-1">
                <div className="flex items-center mr-4">
                  <FaStar className={`${isHovered ? 'text-yellow-400' : 'text-yellow-500'} mr-1 ${isHovered ? 'animate-pulse' : ''}`} />
                  <span className="text-white text-sm">{game.rating.toFixed(1)}</span>
                </div>

                {game.metacritic && (
                  <div className={`px-2 py-0.5 rounded text-xs font-bold transition-all duration-300 ${
                    game.metacritic >= 75 ? 'bg-green-600' :
                    game.metacritic >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                  } ${isHovered ? 'shadow-glow' : ''}`}>
                    {game.metacritic}
                  </div>
                )}
              </div>

              {/* Game genres with animated reveal */}
              <motion.div
                className="mt-2 flex flex-wrap gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {game.genres.slice(0, 3).map(genre => (
                  <span
                    key={genre.id}
                    className="text-xs bg-black/60 border border-cyan-500/30 px-2 py-0.5 rounded-full text-cyan-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </motion.div>
              
              {/* Animated "Play" button on hover */}
              {isHovered && (
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center shadow-glow-cyan cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;