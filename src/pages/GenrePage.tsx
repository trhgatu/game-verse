import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGamepad, FaArrowLeft, FaFilter, FaStar } from 'react-icons/fa';
import useGameStore, { Genre } from '../store/gameStore';
import GameGrid from '../components/GameGrid';
import { Button } from '../components/ui/button';

interface Genre {
  id: number;
  name: string;
  description?: string;
  image_background?: string;
}

const GenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const { genres, games, fetchGenres, fetchGamesByGenre, loading } = useGameStore();
  
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);
  const [sortOrder, setSortOrder] = useState<'rating' | 'name' | 'released'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!genres.length) {
      fetchGenres();
    }
    
    if (genreId) {
      fetchGamesByGenre(parseInt(genreId));
    }
  }, [genreId, fetchGenres, fetchGamesByGenre, genres.length]);

  useEffect(() => {
    if (genreId && genres.length) {
      const genre = genres.find(g => g.id === parseInt(genreId));
      if (genre) {
        setCurrentGenre(genre);
      }
    }
  }, [genreId, genres]);

  const sortedGames = [...games].sort((a, b) => {
    switch (sortOrder) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'released':
        return new Date(b.released).getTime() - new Date(a.released).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12">
      {/* Cyberpunk grid overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Genre Header */}
      <div className="relative">
        {currentGenre?.image_background && (
          <div className="absolute inset-0 h-80 overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${currentGenre.image_background})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/80 to-gray-950"></div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 relative z-10 pt-8 pb-12">
          <Link to="/genres" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to All Genres
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-2">
              <FaGamepad className="text-cyan-400 text-3xl mr-3" />
              <h1 className="text-4xl font-bold text-white">
                {currentGenre?.name || 'Loading genre...'}
              </h1>
            </div>
            
            {currentGenre?.description && (
              <p className="text-gray-300 max-w-3xl mb-6">
                {currentGenre.description.replace(/<\/?[^>]+(>|$)/g, '')}
              </p>
            )}
          </motion.div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-white mr-2">
                Games
              </h2>
              <span className="text-cyan-400 text-lg font-medium">
                ({games.length})
              </span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2 text-cyan-400" /> Filters
            </Button>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-900/80 backdrop-blur-sm rounded-md border border-cyan-500/20"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">Sort By</label>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={sortOrder === 'rating' ? 'default' : 'outline'}
                      className={sortOrder === 'rating' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-cyan-500/30'}
                      onClick={() => setSortOrder('rating')}
                    >
                      <FaStar className="mr-1" /> Rating
                    </Button>
                    <Button 
                      size="sm" 
                      variant={sortOrder === 'name' ? 'default' : 'outline'}
                      className={sortOrder === 'name' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-cyan-500/30'}
                      onClick={() => setSortOrder('name')}
                    >
                      A-Z
                    </Button>
                    <Button 
                      size="sm" 
                      variant={sortOrder === 'released' ? 'default' : 'outline'}
                      className={sortOrder === 'released' ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-cyan-500/30'}
                      onClick={() => setSortOrder('released')}
                    >
                      Newest
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Games Grid */}
      <div className="container mx-auto px-4 mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <>
            {games.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl text-gray-300 mb-4">No games found for this genre</h3>
                <Link to="/genres">
                  <Button>Browse other genres</Button>
                </Link>
              </div>
            ) : (
              <GameGrid 
                title={`${currentGenre?.name || 'Genre'} Games`} 
                games={sortedGames} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
