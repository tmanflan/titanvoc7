import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroSection from './HeroSection';
import SongMetadata from './SongMetadata';
import GenreSelector from './GenreSelector';
import InstrumentSelector from './InstrumentSelector';
import MoodSelector from './MoodSelector';
import VoiceCloning from './VoiceCloning';
import GenerationPanel from './GenerationPanel';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  
  const [songData, setSongData] = useState({
    metadata: {},
    genres: {},
    instruments: [],
    mood: '',
    voice: null
  });

  const handleDataChange = (section: string, data: any) => {
    setSongData(prev => ({ ...prev, [section]: data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <SongMetadata onDataChange={(data) => handleDataChange('metadata', data)} />
        <GenreSelector onGenreChange={(data) => handleDataChange('genres', data)} />
        <InstrumentSelector onInstrumentChange={(data) => handleDataChange('instruments', data)} />
        <MoodSelector onMoodChange={(data) => handleDataChange('mood', data)} />
        <VoiceCloning onVoiceChange={(data) => handleDataChange('voice', data)} />
        <GenerationPanel songData={songData} />
      </div>
      
      <footer className="bg-black/50 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            TITAN7
          </div>
          <p className="text-gray-400 text-sm">
            Powered by AudioCraft MusicGen-Stereo Large • Professional AI Music Generation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;