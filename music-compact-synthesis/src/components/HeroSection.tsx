import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/68af6ffa18172dcf7b437c51_1756327974540_171d6c50.webp')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
            TITAN7
          </h1>
          <div className="text-2xl md:text-4xl font-light text-white mb-4">
            AI Music Generation Studio
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your musical vision into reality with AudioCraft's MusicGen-Stereo Large. 
            Create professional-quality music with advanced voice cloning and synthesis.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
            Start Creating Music
          </button>
          <button className="px-8 py-4 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold rounded-lg transition-all duration-200">
            Explore Features
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-gray-400">Advanced MusicGen-Stereo Large model</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎤</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Voice Cloning</h3>
            <p className="text-gray-400">Professional voice synthesis technology</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-gray-400">Generate high-quality music in seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;