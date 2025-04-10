import { FaStar, FaCalendarAlt, FaGamepad, FaDesktop, FaTag } from 'react-icons/fa';

const GameDetailSkeleton = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)]"></div>
          
          {/* Animated lines */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/5 w-3/5 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Dark overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-transparent" />
        </div>

        {/* Content Skeleton */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8 pt-20">
            <div className="max-w-3xl">
              {/* Title Skeleton */}
              <div className="h-14 w-3/4 bg-gray-700 rounded-lg mb-6 animate-pulse"></div>
              
              {/* Metadata Skeleton */}
              <div className="flex flex-wrap items-center space-x-4 mb-6">
                <div className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-40 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              
              {/* Genres Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-8 w-20 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              
              {/* Buttons Skeleton */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="h-12 w-40 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="flex space-x-3">
                  <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Details Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="md:col-span-2">
            {/* About Section Skeleton */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                <FaGamepad className="text-cyan-400" />
              </div>
              <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>

            {/* Screenshots Section Skeleton */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <FaStar className="text-purple-400" />
              </div>
              <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"></div>
              <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"></div>
              <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"></div>
              <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"></div>
            </div>

            {/* System Requirements Skeleton */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <FaDesktop className="text-green-400" />
              </div>
              <div className="h-8 w-56 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div>
            {/* Platforms Section Skeleton */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                  <FaGamepad className="text-red-400 text-sm" />
                </div>
                <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-10 w-28 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-10 w-20 bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Genres Section Skeleton */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                  <FaTag className="text-yellow-400 text-sm" />
                </div>
                <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Buy Game Section Skeleton */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                  <FaCalendarAlt className="text-blue-400 text-sm" />
                </div>
                <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-12 w-full bg-gray-700 rounded-md animate-pulse mb-2"></div>
              <div className="h-12 w-full bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailSkeleton;
