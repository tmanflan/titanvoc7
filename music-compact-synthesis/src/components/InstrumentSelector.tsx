import React, { useState } from 'react';
import { countryInstruments } from '../data/musicData';

interface InstrumentSelectorProps {
  onInstrumentChange: (instruments: string[]) => void;
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ onInstrumentChange }) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  const handleInstrumentToggle = (instrument: string) => {
    const updated = selectedInstruments.includes(instrument)
      ? selectedInstruments.filter(i => i !== instrument)
      : [...selectedInstruments, instrument];
    
    setSelectedInstruments(updated);
    onInstrumentChange(updated);
  };

  const instrumentIcons: {[key: string]: string} = {
    'Acoustic Guitar': '🎸',
    'Electric Guitar': '🎸',
    'Bass Guitar': '🎸',
    'Drums': '🥁',
    'Fiddle': '🎻',
    'Banjo': '🪕',
    'Mandolin': '🎵',
    'Steel Guitar': '🎸',
    'Harmonica': '🎵',
    'Piano': '🎹',
    'Organ': '🎹',
    'Dobro': '🎸',
    'Upright Bass': '🎻',
    'Washboard': '🎵',
    'Spoons': '🥄',
    'Autoharp': '🎵',
    'Dulcimer': '🎵',
    'Lap Steel': '🎸',
    'Telecaster': '🎸',
    'Stratocaster': '🎸'
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg mr-3 flex items-center justify-center text-sm">🎺</span>
        Country Music Instruments
        {selectedInstruments.length > 0 && (
          <span className="ml-3 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm rounded-full">
            {selectedInstruments.length} selected
          </span>
        )}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {countryInstruments.map((instrument) => (
          <button
            key={instrument}
            onClick={() => handleInstrumentToggle(instrument)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center group ${
              selectedInstruments.includes(instrument)
                ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-400 shadow-lg shadow-yellow-500/25'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
            }`}
          >
            <div className="text-2xl mb-2">
              {instrumentIcons[instrument] || '🎵'}
            </div>
            <div className="text-xs font-medium leading-tight">
              {instrument}
            </div>
            {selectedInstruments.includes(instrument) && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedInstruments.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Selected Instruments:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedInstruments.map((instrument) => (
              <span
                key={instrument}
                className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs rounded-full flex items-center"
              >
                {instrumentIcons[instrument] || '🎵'} {instrument}
                <button
                  onClick={() => handleInstrumentToggle(instrument)}
                  className="ml-2 text-white hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentSelector;