import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Game } from '../types/game';
import { FaPlay, FaInfoCircle, FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface Props {
  games: Game[];
}

const HeroBanner = ({ games }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Get the current featured game
  const currentGame = games.length > 0 ? games[currentIndex] : null;

  // Autoplay slides every 8 seconds
  useEffect(() => {
    if (!isAutoplay || games.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [games.length, isAutoplay]);

  // Pause autoplay when trailer is shown
  useEffect(() => {
    if (showTrailer) {
      setIsAutoplay(false);
    } else {
      setIsAutoplay(true);
    }
  }, [showTrailer]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (!currentGame) return null;

  return (
    <div className="relative w-full overflow-hidden px-4 py-8 mt-16">
      <div className="container mx-auto relative h-[50vh] min-h-[400px] max-h-[600px]">
        {/* Stylized card-like frame with neon border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5),inset_0_0_10px_rgba(6,182,212,0.2)] z-10"></div>
        
        {/* Background Image Container */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentGame.id}
              className="absolute inset-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src={currentGame.background_image}
                alt={currentGame.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[length:20px_20px] opacity-40 mix-blend-overlay"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows with neon effect */}
        {games.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.7)] border border-cyan-500/30"
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.7)] border border-cyan-500/30"
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-8 pt-6">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight text-shadow-neon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentGame.name}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center space-x-4 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-red-600 to-red-500 px-2.5 py-1 text-white text-sm font-bold rounded shadow-glow-red">
                    Rating: {currentGame.rating.toFixed(1)}
                  </div>
                  {currentGame.metacritic && (
                    <div className={`px-2.5 py-1 rounded text-white text-sm font-bold shadow-glow ${
                      currentGame.metacritic >= 75 ? 'bg-gradient-to-r from-green-600 to-green-500' :
                      currentGame.metacritic >= 50 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' : 'bg-gradient-to-r from-red-600 to-red-500'
                    }`}>
                      Metacritic: {currentGame.metacritic}
                    </div>
                  )}
                  {currentGame.released && (
                    <div className="hidden md:block bg-gray-800/80 backdrop-blur-sm px-2.5 py-1 rounded text-white text-sm border border-gray-700">
                      {new Date(currentGame.released).getFullYear()}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {currentGame.genres.slice(0, 4).map((genre: {id: number; name: string}) => (
                    <span
                      key={genre.id}
                      className="text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
                    >
                      {genre.name}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-6 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-2.5 px-6 rounded-md flex items-center font-bold transition-all transform hover:scale-105 shadow-glow-cyan"
                  >
                    <FaPlay className="mr-2" /> Xem Trailer
                  </button>
                  <Link
                    to={`/games/${currentGame.id}`}
                    className="bg-black/60 hover:bg-black/80 text-white py-2.5 px-6 rounded-md flex items-center font-bold backdrop-blur-sm transition-all transform hover:scale-105 border border-cyan-500/30 hover:border-cyan-400/50"
                  >
                    <FaInfoCircle className="mr-2" /> Chi Tiết
                  </Link>
                </motion.div>

                {/* Slide indicators */}
                {games.length > 1 && (
                  <motion.div
                    className="mt-8 flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {games.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentIndex ? 1 : -1);
                          setCurrentIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentIndex
                            ? 'w-8 bg-cyan-500 shadow-glow-cyan'
                            : 'w-4 bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-gray-900 rounded-lg overflow-hidden border border-cyan-500/30 shadow-glow-cyan">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:text-red-500 transition-colors"
              aria-label="Close trailer"
            >
              <FaTimes size={20} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
                title={`${currentGame.name} trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;