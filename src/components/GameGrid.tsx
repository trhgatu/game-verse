import { useRef } from 'react';
import { motion } from 'framer-motion';
import GameCard from './GameCard';
import { Game } from '../types/game';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

interface Props {
  title: string;
  games: Game[];
  isLoading?: boolean;
  viewAllLink?: string;
}

const GameGrid = ({ title, games, isLoading = false, viewAllLink }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Skeleton loading animation with cyberpunk-style pulsing effect
  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="flex space-x-6 overflow-x-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-none w-[250px] md:w-[280px] lg:w-[300px]"
            >
              <div className="animate-pulse">
                <div className="bg-gray-900 h-[180px] rounded-lg mb-3 overflow-hidden relative border border-cyan-900/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
                </div>
                <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold relative inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
        </h2>
        
        {viewAllLink && (
          <motion.a
            href={viewAllLink}
            className="text-cyan-400 hover:text-cyan-300 flex items-center text-sm font-medium transition-colors group"
            whileHover={{ x: 5 }}
          >
            View All 
            <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform" />
          </motion.a>
        )}
      </div>

      <div className="relative group">
        <motion.div
          ref={rowRef}
          className="flex space-x-6 overflow-x-scroll scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="flex-none w-[250px] md:w-[280px] lg:w-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>

        {games.length > 3 && (
          <>
            <div
              className="absolute top-0 bottom-0 left-0 flex items-center justify-center z-10"
              onClick={() => handleScroll('left')}
            >
              <button
                className="bg-black/50 hover:bg-black/70 p-3 rounded-full text-cyan-400 hover:text-cyan-300 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300 border border-cyan-500/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-lg" />
              </button>
            </div>

            <div
              className="absolute top-0 bottom-0 right-0 flex items-center justify-center z-10"
              onClick={() => handleScroll('right')}
            >
              <button
                className="bg-black/50 hover:bg-black/70 p-3 rounded-full text-cyan-400 hover:text-cyan-300 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300 border border-cyan-500/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameGrid;