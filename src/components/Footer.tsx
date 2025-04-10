import { Link } from 'react-router-dom';
import { FaGamepad, FaGithub, FaTwitter, FaInstagram, FaDiscord, FaTwitch, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4 group">
              <FaGamepad className="text-cyan-400 text-3xl mr-2 transition-transform group-hover:rotate-12 group-hover:text-cyan-300 group-hover:shadow-glow-cyan" />
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                <span className="text-cyan-400">Game</span>Verse
              </h2>
            </Link>
            <p className="text-gray-400 mb-6">
              Explore the gaming universe with GameVerse - your ultimate source for gaming information and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="Discord">
                <FaDiscord size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="Twitch">
                <FaTwitch size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4 relative inline-block">
              <span className="relative z-10">Explore</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-cyan-500/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  All Games
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Genres
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Platforms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4 relative inline-block">
              <span className="relative z-10">Genres</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-cyan-500/50"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/genres/action" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Action
                </Link>
              </li>
              <li>
                <Link to="/genres/rpg" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  RPG
                </Link>
              </li>
              <li>
                <Link to="/genres/strategy" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Strategy
                </Link>
              </li>
              <li>
                <Link to="/genres/adventure" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/genres/simulation" className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Simulation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4 relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-cyan-500/50"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start">
                <span className="text-cyan-400 mr-2">Email:</span>
                <a href="mailto:info@gameverse.com" className="hover:text-cyan-300 transition-colors">info@gameverse.com</a>
              </li>
              <li className="text-gray-400 flex items-start">
                <span className="text-cyan-400 mr-2">Phone:</span>
                <a href="tel:+1234567890" className="hover:text-cyan-300 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="text-gray-400 flex items-start">
                <span className="text-cyan-400 mr-2">Address:</span>
                <span>San Francisco, CA, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} GameVerse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;