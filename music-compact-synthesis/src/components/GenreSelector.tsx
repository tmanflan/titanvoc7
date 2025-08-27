import React, { useState } from 'react';
import { genres } from '../data/musicData';

interface GenreSelectorProps {
  onGenreChange: (selectedGenres: any) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ onGenreChange }) => {
  const [selectedGenres, setSelectedGenres] = useState<{[key: string]: string[]}>({});
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null);

  const handleSubgenreToggle = (genre: string, subgenre: string) => {
    const current = selectedGenres[genre] || [];
    const updated = current.includes(subgenre) 
      ? current.filter(s => s !== subgenre)
      : [...current, subgenre];
    
    const newSelection = { ...selectedGenres, [genre]: updated };
    setSelectedGenres(newSelection);
    onGenreChange(newSelection);
  };

  const genreColors = {
    Country: 'from-yellow-600 to-orange-600',
    Christian: 'from-blue-600 to-purple-600',
    Rock: 'from-red-600 to-pink-600',
    Pop: 'from-pink-600 to-purple-600',
    Jazz: 'from-blue-600 to-indigo-600',
    Blues: 'from-indigo-600 to-blue-600'
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center text-sm">🎼</span>
        Genre Selection
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(genres).map(([genre, subgenres]) => (
          <div key={genre} className="bg-gray-800/50 rounded-lg border border-gray-600/50 overflow-hidden">
            <button
              onClick={() => setExpandedGenre(expandedGenre === genre ? null : genre)}
              className={`w-full px-4 py-3 bg-gradient-to-r ${genreColors[genre as keyof typeof genreColors]} text-white font-semibold flex items-center justify-between hover:opacity-90 transition-opacity`}
            >
              <span>{genre}</span>
              <span className={`transform transition-transform ${expandedGenre === genre ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {expandedGenre === genre && (
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {subgenres.map((subgenre) => (
                    <label key={subgenre} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={(selectedGenres[genre] || []).includes(subgenre)}
                        onChange={() => handleSubgenreToggle(genre, subgenre)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                        (selectedGenres[genre] || []).includes(subgenre)
                          ? 'bg-gradient-to-br from-red-500 to-orange-500 border-red-500'
                          : 'border-gray-500 group-hover:border-gray-400'
                      }`}>
                        {(selectedGenres[genre] || []).includes(subgenre) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        {subgenre}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {(selectedGenres[genre] || []).length > 0 && (
              <div className="px-4 py-2 bg-gray-700/50 border-t border-gray-600/50">
                <span className="text-xs text-gray-400">
                  {(selectedGenres[genre] || []).length} selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;