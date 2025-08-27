import React, { useState } from 'react';

interface GenerationPanelProps {
  songData: any;
}

const GenerationPanel: React.FC<GenerationPanelProps> = ({ songData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedSong, setGeneratedSong] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedSong('titan7_generated_song.wav');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const exportFormats = ['WAV', 'MP3', 'FLAC', 'OGG'];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mr-3 flex items-center justify-center text-sm">⚡</span>
        Generate Music
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
            <h3 className="text-lg font-semibold text-white mb-3">Generation Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Duration (seconds)</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  defaultValue="120"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Quality</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                  <option value="high">High Quality (Slower)</option>
                  <option value="medium">Medium Quality</option>
                  <option value="fast">Fast Generation</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Stereo Mode</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                  <option value="stereo">Stereo (Recommended)</option>
                  <option value="mono">Mono</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50">
            <h3 className="text-lg font-semibold text-white mb-3">Export Options</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Output Formats</label>
                <div className="grid grid-cols-2 gap-2">
                  {exportFormats.map((format) => (
                    <label key={format} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={format === 'WAV'}
                        className="sr-only"
                      />
                      <div className="w-4 h-4 border-2 border-gray-500 rounded mr-2 flex items-center justify-center">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 text-sm">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {!isGenerating && !generatedSong && (
          <button
            onClick={handleGenerate}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🎵</span>
            Generate Music with TITAN7
          </button>
        )}
        
        {isGenerating && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Generating your music...</span>
              <span className="text-green-400 font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-sm">
              Using AudioCraft MusicGen-Stereo Large model...
            </div>
          </div>
        )}
        
        {generatedSong && (
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-500/50">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🎉</span>
              Music Generated Successfully!
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{generatedSong}</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                      ▶ Play
                    </button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                      ⬇ Download
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setGeneratedSong(null);
                  setProgress(0);
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Generate Another Song
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerationPanel;