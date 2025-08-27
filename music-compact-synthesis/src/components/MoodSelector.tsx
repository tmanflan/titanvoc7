import React, { useState } from 'react';
import { moods } from '../data/musicData';

interface MoodSelectorProps {
  onMoodChange: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodChange }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsOpen(false);
    onMoodChange(mood);
  };

  const getMoodColor = (mood: string) => {
    const colorMap: {[key: string]: string} = {
      'Happy': 'text-yellow-400',
      'Sad': 'text-blue-400',
      'Energetic': 'text-red-400',
      'Calm': 'text-green-400',
      'Romantic': 'text-pink-400',
      'Melancholic': 'text-indigo-400',
      'Uplifting': 'text-orange-400',
      'Dark': 'text-gray-400',
      'Mysterious': 'text-purple-400',
      'Nostalgic': 'text-amber-400'
    };
    return colorMap[mood] || 'text-gray-300';
  };

  const getMoodEmoji = (mood: string) => {
    const emojiMap: {[key: string]: string} = {
      'Happy': '😊',
      'Sad': '😢',
      'Energetic': '⚡',
      'Calm': '😌',
      'Romantic': '💕',
      'Melancholic': '😔',
      'Uplifting': '🌟',
      'Dark': '🌑',
      'Mysterious': '🔮',
      'Nostalgic': '🕰️',
      'Aggressive': '🔥',
      'Peaceful': '🕊️',
      'Dreamy': '☁️',
      'Intense': '💥',
      'Playful': '🎈',
      'Serious': '🎭',
      'Hopeful': '🌅',
      'Lonely': '🌙',
      'Confident': '💪',
      'Anxious': '😰'
    };
    return emojiMap[mood] || '🎵';
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center text-sm">💭</span>
        Moods & Feelings
      </h2>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white flex items-center justify-between hover:border-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
        >
          <span className="flex items-center">
            {selectedMood ? (
              <>
                <span className="mr-2">{getMoodEmoji(selectedMood)}</span>
                <span className={getMoodColor(selectedMood)}>{selectedMood}</span>
              </>
            ) : (
              <span className="text-gray-400">Select a mood or feeling...</span>
            )}
          </span>
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div className="p-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors flex items-center hover:bg-gray-700 ${
                    selectedMood === mood ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50' : ''
                  }`}
                >
                  <span className="mr-3">{getMoodEmoji(mood)}</span>
                  <span className={getMoodColor(mood)}>{mood}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {selectedMood && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">{getMoodEmoji(selectedMood)}</span>
            <span className={`font-semibold ${getMoodColor(selectedMood)}`}>{selectedMood}</span>
          </div>
          <p className="text-gray-400 text-sm">
            This mood will influence the musical style, tempo, and emotional tone of your generated song.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;