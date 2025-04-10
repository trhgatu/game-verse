import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGameStore from '../store/gameStore';
import GameCard from '../components/GameCard';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { games, totalGames, isLoading, error, gameQuery, setGameQuery, searchGames } = useGameStore();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchText(query);
      searchGames(query);
    }
  }, [searchParams, searchGames]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      setSearchParams({ q: searchText });
      searchGames(searchText);
    }
  };

  const loadMore = () => {
    if (gameQuery.page) {
      setGameQuery({ page: gameQuery.page + 1 });
      searchGames(searchText);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search Games</h1>

          <form onSubmit={handleSearch} className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search for games..."
              className="bg-gray-800 text-white rounded-md px-4 py-3 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-red-600"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-md"
            >
              Search
            </button>
          </form>
        </div>

        {isLoading && games.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg h-64 mb-2"></div>
                <div className="bg-gray-800 h-4 rounded mb-2 w-3/4"></div>
                <div className="bg-gray-800 h-3 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <p className="text-gray-400">Please try another search term</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-xl mb-4">No games found</p>
            <p className="text-gray-400">Try searching for a different game</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">Found {totalGames} games</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {games.length < totalGames && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded-md font-bold transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;