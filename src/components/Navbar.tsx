import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';
import { FaSearch, FaGamepad, FaUser, FaBell, FaBars, FaTimes, FaChevronDown, FaHome, FaFire, FaCalendarAlt, FaHistory, FaGlobe } from 'react-icons/fa';
import { NavMenu, NavItem } from './ui/navigation-menu';
import { Dropdown } from './ui/dropdown';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import '../assets/cyberpunk.css';
import { Game } from '../types/game';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const { searchGames, genres, fetchGenres, games } = useGameStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    fetchGenres();

    // Load search history from localStorage
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGenresDropdown(false);
      }

      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fetchGenres]);

  // Handle live search as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.trim().length >= 2) {
        setIsSearching(true);
        // Filter games that match the search text
        const filteredGames = games.filter(game => 
          game.name.toLowerCase().includes(searchText.toLowerCase())
        ).slice(0, 5);
        
        setSearchResults(filteredGames);
        setIsSearching(false);
        setShowSearchSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSearchSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, games]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      // Save to search history
      const updatedHistory = [searchText, ...searchHistory.filter(item => item !== searchText)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      
      searchGames(searchText);
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      setShowSearchBar(false);
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchItemClick = (text: string) => {
    setSearchText(text);
    searchGames(text);
    navigate(`/search?q=${encodeURIComponent(text)}`);
    setShowSearchBar(false);
    setShowSearchSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchText('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <header>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-gray-950/90 backdrop-blur-md py-2 border-b border-cyan-500/30 shadow-[0_4px_12px_-4px_rgba(6,182,212,0.2)]" 
          : "bg-gradient-to-b from-gray-950/90 to-transparent py-4"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <FaGamepad className="text-cyan-400 text-3xl mr-2 transition-transform group-hover:rotate-12 group-hover:text-cyan-300 group-hover:shadow-glow-cyan" />
            <h1 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              <span className="text-cyan-400">Game</span>Verse
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <NavMenu className="hidden md:flex">
            <NavItem to="/" active={isActive('/')}>
              <span className={`flex items-center transition-colors ${isActive('/') ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`}>
                <FaHome className="mr-1.5" /> Home
              </span>
            </NavItem>

            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-white hover:text-cyan-300 transition-colors font-medium"
                onClick={() => setShowGenresDropdown(!showGenresDropdown)}
              >
                <FaGamepad className="mr-1.5" /> Genres <FaChevronDown className="ml-1 text-xs" />
              </button>

              {showGenresDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md rounded-md border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden z-50 py-1 grid grid-cols-2 gap-1">
                  {genres.slice(0, 10).map(genre => (
                    <Link
                      key={genre.id}
                      to={`/genres/${genre.id}`}
                      className="px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                      onClick={() => setShowGenresDropdown(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                  <Link
                    to="/genres"
                    className="col-span-2 px-4 py-2 text-sm text-center text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors border-t border-gray-800/50 mt-1"
                    onClick={() => setShowGenresDropdown(false)}
                  >
                    View All Genres
                  </Link>
                </div>
              )}
            </div>

            <NavItem to="/new-releases" active={isActive('/new-releases')}>
              <span className={`flex items-center transition-colors ${isActive('/new-releases') ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`}>
                <FaCalendarAlt className="mr-1.5" /> New Releases
              </span>
            </NavItem>

            <NavItem to="/popular" active={isActive('/popular')}>
              <span className={`flex items-center transition-colors ${isActive('/popular') ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`}>
                <FaFire className="mr-1.5" /> Popular
              </span>
            </NavItem>
            
            <NavItem to="/all-games" active={isActive('/all-games')}>
              <span className={`flex items-center transition-colors ${isActive('/all-games') ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`}>
                <FaGlobe className="mr-1.5" /> All Games
              </span>
            </NavItem>
          </NavMenu>

          {/* Search and User Controls */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              {showSearchBar ? (
                <motion.div 
                  ref={searchContainerRef}
                  className="relative"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for games..."
                      className="bg-gray-900/80 text-white rounded-full px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-cyan-500/30 w-64 md:w-80"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onFocus={() => searchText.length >= 2 && setShowSearchSuggestions(true)}
                      autoFocus
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                    {searchText && (
                      <button
                        type="button"
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={handleClearSearch}
                      >
                        <FaTimes />
                      </button>
                    )}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowSearchBar(false)}
                    >
                      <FaTimes />
                    </button>
                  </form>

                  {/* Search Suggestions Dropdown */}
                  {showSearchSuggestions && (
                    <motion.div 
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-md border border-cyan-500/30 shadow-[0_8px_16px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isSearching ? (
                        <div className="p-4 text-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
                        </div>
                      ) : (
                        <>
                          {searchResults.length > 0 ? (
                            <div>
                              <div className="p-2 border-b border-gray-800/50">
                                <p className="text-xs text-gray-400 px-2">Games</p>
                              </div>
                              {searchResults.map(game => (
                                <div 
                                  key={game.id} 
                                  className="px-4 py-2 hover:bg-cyan-500/10 cursor-pointer flex items-center"
                                  onClick={() => navigate(`/games/${game.id}`)}
                                >
                                  {game.background_image && (
                                    <div className="w-8 h-8 rounded overflow-hidden mr-3">
                                      <img 
                                        src={game.background_image} 
                                        alt={game.name} 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <span className="text-white">{game.name}</span>
                                </div>
                              ))}
                            </div>
                          ) : searchText.length >= 2 ? (
                            <div className="p-4 text-gray-400 text-center">No results found</div>
                          ) : null}

                          {searchHistory.length > 0 && (
                            <div>
                              <div className="p-2 border-b border-gray-800/50">
                                <p className="text-xs text-gray-400 px-2">Recent Searches</p>
                              </div>
                              {searchHistory.map((item, index) => (
                                <div 
                                  key={index} 
                                  className="px-4 py-2 hover:bg-cyan-500/10 cursor-pointer flex items-center"
                                  onClick={() => handleSearchItemClick(item)}
                                >
                                  <FaHistory className="text-gray-500 mr-3" />
                                  <span className="text-gray-300">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => setShowSearchBar(true)}
                  className="text-white hover:text-cyan-300 transition-colors relative"
                  aria-label="Search"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSearch size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-cyan-300 transition-colors" aria-label="Notifications">
                <FaBell size={18} />
              </button>

              <Button variant="glass" size="sm" className="border border-cyan-500/30 bg-gray-900/50 hover:bg-cyan-500/10 text-white hover:text-cyan-300 transition-all">
                <Link to="/profile" className="flex items-center space-x-2">
                  <FaUser size={14} className="text-cyan-400" />
                  <span>Account</span>
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-cyan-300 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Menu"
            >
              {showMobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/20 mt-2 pb-4 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3)]">
            <div className="container mx-auto px-4 py-2 space-y-3">
              <NavMenu isMobile>
                <NavItem to="/" isMobile active={isActive('/')}>
                  <span className={`flex items-center transition-colors ${isActive('/') ? 'text-cyan-400' : 'text-white'}`}>
                    <FaHome className="mr-2" /> Home
                  </span>
                </NavItem>

                <Dropdown
                  title={<span className="flex items-center"><FaGamepad className="mr-2" /> Genres</span>}
                  open={showGenresDropdown}
                  onToggle={() => setShowGenresDropdown(!showGenresDropdown)}
                  titleClassName={showGenresDropdown ? 'text-cyan-400' : 'text-white'}
                >
                  {genres.slice(0, 6).map(genre => (
                    <Link
                      key={genre.id}
                      to={`/genres/${genre.id}`}
                      className="py-1.5 text-gray-300 hover:text-cyan-300"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                  <Link
                    to="/genres"
                    className="py-1.5 text-gray-300 hover:text-cyan-300 font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    View All
                  </Link>
                </Dropdown>

                <NavItem to="/new-releases" isMobile active={isActive('/new-releases')}>
                  <span className={`flex items-center transition-colors ${isActive('/new-releases') ? 'text-cyan-400' : 'text-white'}`}>
                    <FaCalendarAlt className="mr-2" /> New Releases
                  </span>
                </NavItem>

                <NavItem to="/popular" isMobile active={isActive('/popular')}>
                  <span className={`flex items-center transition-colors ${isActive('/popular') ? 'text-cyan-400' : 'text-white'}`}>
                    <FaFire className="mr-2" /> Popular
                  </span>
                </NavItem>

                <NavItem to="/all-games" isMobile active={isActive('/all-games')}>
                  <span className={`flex items-center transition-colors ${isActive('/all-games') ? 'text-cyan-400' : 'text-white'}`}>
                    <FaGlobe className="mr-2" /> All Games
                  </span>
                </NavItem>

                <div className="pt-2 border-t border-gray-800/50 mt-2">
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-white hover:text-cyan-300"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FaUser size={14} className="mr-2 text-cyan-400" />
                    <span>Account</span>
                  </Link>
                </div>
              </NavMenu>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;