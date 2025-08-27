import React, { useState } from 'react';
import axios from 'axios';

interface VoiceCloningProps {
  onVoiceChange: (voiceData: any) => void;
}

const instrumentList = ['drums', 'bass', 'guitar', 'piano', 'strings', 'vocals'];

const VoiceCloning: React.FC<VoiceCloningProps> = ({ onVoiceChange }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    pitch: 0,
    speed: 1,
    emotion: 'neutral',
    clarity: 0.8
  });
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [stems, setStems] = useState<{[key: string]: string}>({});
  const [vocalStemUrl, setVocalStemUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onVoiceChange({ file, settings: voiceSettings });
      }, 2000);
    }
  };

  const handleSettingChange = (setting: string, value: number | string) => {
    const newSettings = { ...voiceSettings, [setting]: value };
    setVoiceSettings(newSettings);
    if (uploadedFile) {
      onVoiceChange({ file: uploadedFile, settings: newSettings });
    }
  };

  const handleInstrumentChange = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  };

  const requestInstrumentStems = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        '/generate-rhythm-stems',
        new URLSearchParams({
          text: 'Generate rhythm stems',
          instruments: JSON.stringify(selectedInstruments)
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      setStems(response.data.stems || {});
    } catch (err) {
      setStems({});
    }
    setIsProcessing(false);
  };

  const synthesizeVocals = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    try {
      // Prepare form data for DiffSinger vocal synthesis
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('pitch', String(voiceSettings.pitch));
      formData.append('speed', String(voiceSettings.speed));
      formData.append('emotion', voiceSettings.emotion);
      formData.append('clarity', String(voiceSettings.clarity));
      // You may want to pass additional context, e.g. lyrics or melody
      const response = await axios.post('/clone-voice', formData);
      setVocalStemUrl(response.data.output_audio_path || null);
    } catch (err) {
      setVocalStemUrl(null);
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mr-3 flex items-center justify-center text-sm">🎤</span>
        Voice Cloning & Synthesis
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Upload Voice Sample</h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="voice-upload"
            />
            <label htmlFor="voice-upload" className="cursor-pointer">
              {uploadedFile ? (
                <div className="text-green-400">
                  <div className="text-4xl mb-2">✓</div>
                  <div className="font-medium">{uploadedFile.name}</div>
                  <div className="text-sm text-gray-400 mt-1">Click to replace</div>
                </div>
              ) : (
                <div className="text-gray-400">
                  <div className="text-4xl mb-2">🎙️</div>
                  <div className="font-medium">Upload Audio File</div>
                  <div className="text-sm mt-1">WAV, MP3, or FLAC format</div>
                </div>
              )}
            </label>
          </div>
          {isProcessing && (
            <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
                <span className="text-blue-400">Processing voice sample...</span>
              </div>
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Select Instruments</h3>
            <div className="flex flex-wrap gap-2">
              {instrumentList.map((inst) => (
                <button
                  key={inst}
                  className={`px-3 py-1 rounded-lg border ${selectedInstruments.includes(inst) ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => handleInstrumentChange(inst)}
                >
                  {inst.charAt(0).toUpperCase() + inst.slice(1)}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold"
              onClick={requestInstrumentStems}
              disabled={selectedInstruments.length === 0 || isProcessing}
            >
              Generate Instrument Stems
            </button>
            {Object.keys(stems).length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-semibold text-white mb-2">Generated Stems:</h4>
                <ul>
                  {Object.entries(stems).map(([inst, url]) => (
                    <li key={inst} className="text-gray-200 mb-1">
                      {inst}: <a href={url} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Download</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold"
              onClick={synthesizeVocals}
              disabled={!uploadedFile || isProcessing}
            >
              Synthesize Vocals (DiffSinger)
            </button>
            {vocalStemUrl && (
              <div className="mt-4">
                <h4 className="text-md font-semibold text-white mb-2">Synthesized Vocal Stem:</h4>
                <a href={vocalStemUrl} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Download Vocal Stem</a>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Voice Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Pitch Adjustment: {voiceSettings.pitch > 0 ? '+' : ''}{voiceSettings.pitch}
              </label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={voiceSettings.pitch}
                onChange={(e) => handleSettingChange('pitch', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Speed: {voiceSettings.speed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.speed}
                onChange={(e) => handleSettingChange('speed', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Emotion</label>
              <select
                value={voiceSettings.emotion}
                onChange={(e) => handleSettingChange('emotion', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="neutral">Neutral</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="excited">Excited</option>
                <option value="calm">Calm</option>
                <option value="dramatic">Dramatic</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Voice Clarity: {Math.round(voiceSettings.clarity * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={voiceSettings.clarity}
                onChange={(e) => handleSettingChange('clarity', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCloning;