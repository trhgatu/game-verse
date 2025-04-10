const HomePageSkeleton = () => {
  return (
    <div className="bg-gray-950 min-h-screen pb-20 cyberpunk-grid">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-700/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Banner Skeleton */}
        <div className="relative h-[70vh] w-full overflow-hidden bg-gray-900">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-overlay opacity-10"></div>
          
          {/* Animated glowing lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute top-0 left-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
          
          {/* Content skeleton */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                {/* Title skeleton */}
                <div className="h-12 w-3/4 bg-gray-800 rounded-lg mb-4 animate-pulse"></div>
                
                {/* Description skeleton */}
                <div className="h-4 w-full bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-800 rounded mb-6 animate-pulse"></div>
                
                {/* Buttons skeleton */}
                <div className="flex space-x-4">
                  <div className="h-12 w-40 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-40 bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation dots skeleton */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gray-700 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 mt-8">
          {/* Category Navigation Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 py-2">
            {['Popular', 'New Releases', 'Top Rated', 'Genres'].map((_, index) => (
              <div key={index} className="flex items-center bg-black/60 text-white px-5 py-2.5 rounded-lg border border-purple-500/30 animate-pulse">
                <div className="w-5 h-5 mr-2 rounded-full bg-gray-700"></div>
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>

          {/* Trending Now Section Skeleton */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-lg border border-purple-500/20 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <div className="w-full h-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                    <div className="absolute inset-0 bg-grid-overlay opacity-10"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-5 w-24 bg-gray-700 rounded mr-2 animate-pulse"></div>
                      <div className="h-5 w-8 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Grid Sections Skeleton */}
          {['For You', 'Popular Games', 'New Releases'].map((_, index) => (
            <div key={index} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
              </div>
              
              <div className="relative">
                {/* Navigation buttons */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center animate-pulse"></div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center animate-pulse"></div>
                </div>
                
                {/* Game cards */}
                <div className="flex space-x-6 overflow-x-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-none w-[250px] md:w-[280px] lg:w-[300px]"
                    >
                      <div className="animate-pulse">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-[180px] rounded-lg mb-3 overflow-hidden relative border border-cyan-900/30">
                          <div className="absolute inset-0 bg-grid-overlay opacity-10"></div>
                        </div>
                        <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Featured Genres Section Skeleton */}
          <div className="mb-16">
            <div className="h-8 w-48 bg-gray-800 rounded mb-6 animate-pulse"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="relative h-40 rounded-xl overflow-hidden border border-purple-500/20 animate-pulse"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                  <div className="absolute inset-0 cyberpunk-grid opacity-30"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center border border-cyan-500/30 mb-2"></div>
                      <div className="h-5 w-24 mx-auto bg-gray-800 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Games Section Skeleton */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-[3/4] rounded-lg mb-3 overflow-hidden relative border border-cyan-900/30">
                    <div className="absolute inset-0 bg-grid-overlay opacity-10"></div>
                  </div>
                  <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
