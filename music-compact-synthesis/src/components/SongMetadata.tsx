import React, { useState } from 'react';

interface SongMetadataProps {
  onDataChange: (data: any) => void;
}

const SongMetadata: React.FC<SongMetadataProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    artist: '',
    lyrics: '',
    description: ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const getCharacterCount = (field: string) => {
    const limits = { title: 50, writer: 50, artist: 50, lyrics: 5000, description: 2000 };
    return `${formData[field as keyof typeof formData].length}/${limits[field as keyof typeof limits]}`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg mr-3 flex items-center justify-center text-sm">📝</span>
        Song Metadata
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Song Title</label>
          <input
            type="text"
            maxLength={50}
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            placeholder="Enter song title..."
          />
          <div className="text-xs text-gray-500 mt-1">{getCharacterCount('title')}</div>
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Writer</label>
          <input
            type="text"
            maxLength={50}
            value={formData.writer}
            onChange={(e) => handleChange('writer', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Enter writer name..."
          />
          <div className="text-xs text-gray-500 mt-1">{getCharacterCount('writer')}</div>
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Artist</label>
          <input
            type="text"
            maxLength={50}
            value={formData.artist}
            onChange={(e) => handleChange('artist', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
            placeholder="Enter artist name..."
          />
          <div className="text-xs text-gray-500 mt-1">{getCharacterCount('artist')}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Lyrics</label>
          <textarea
            maxLength={5000}
            rows={8}
            value={formData.lyrics}
            onChange={(e) => handleChange('lyrics', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
            placeholder="Enter song lyrics..."
          />
          <div className="text-xs text-gray-500 mt-1">{getCharacterCount('lyrics')}</div>
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
          <textarea
            maxLength={2000}
            rows={8}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
            placeholder="Describe the mood, style, and vision for your song..."
          />
          <div className="text-xs text-gray-500 mt-1">{getCharacterCount('description')}</div>
        </div>
      </div>
    </div>
  );
};

export default SongMetadata;