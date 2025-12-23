
import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Volume2, FastForward, Activity, Star, Loader2 } from 'lucide-react';
import { AudioSettings } from '../types';
import { ttsService, VoicePersona } from '../services/ttsService';

interface VoiceSettingsProps {
  settings: AudioSettings;
  onChange: (settings: AudioSettings, personaId?: string) => void;
  selectedPersonaId: string;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ settings, onChange, selectedPersonaId }) => {
  const [personas, setPersonas] = useState<VoicePersona[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPersonas = useCallback(() => {
    const curated = ttsService.getCuratedPersonas();
    if (curated.length > 0) {
      setPersonas(curated);
      setIsLoading(false);
      
      // Auto-select first voice if none selected or current voice is invalid
      const currentExists = curated.some(p => p.id === selectedPersonaId);
      if (!currentExists) {
        onChange({ ...settings, voiceId: curated[0].name }, curated[0].id);
      }
    } else {
      // Browsers often load voices asynchronously
      setTimeout(loadPersonas, 100);
    }
  }, [onChange, selectedPersonaId, settings]);

  useEffect(() => {
    loadPersonas();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadPersonas;
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [loadPersonas]);

  const updateSetting = (key: keyof AudioSettings, value: string | number) => {
    onChange({ ...settings, [key]: value }, selectedPersonaId);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-600" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Voice Persona</h3>
        </div>
        <div className="flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
           <Star className="w-2.5 h-2.5 text-indigo-600 fill-indigo-600" />
           <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter">HD Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 min-h-[140px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/50 backdrop-blur-[2px] rounded-[20px] z-10">
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Syncing Neural Engines...</span>
          </div>
        ) : null}

        {personas.map((p) => (
          <button 
            key={p.id}
            onClick={() => onChange({ ...settings, voiceId: p.name }, p.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-[20px] border transition-all text-center group relative overflow-hidden ${selectedPersonaId === p.id ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-200'}`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform relative z-10">{p.icon}</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest relative z-10 ${selectedPersonaId === p.id ? 'text-white' : 'text-slate-600'}`}>
              {p.label.split(' ')[0]}
            </span>
            {selectedPersonaId === p.id && (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-indigo-500 opacity-50" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        {/* Speed / Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <FastForward className="w-3.5 h-3.5" /> Tempo
            </label>
            <span className="text-[11px] font-bold text-indigo-600">{settings.rate}x</span>
          </div>
          <input 
            type="range" min="0.5" max="1.5" step="0.1" 
            value={settings.rate}
            onChange={(e) => updateSetting('rate', parseFloat(e.target.value))}
            className="w-full accent-black h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Pitch */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Tone Pitch
            </label>
            <span className="text-[11px] font-bold text-indigo-600">{settings.pitch}</span>
          </div>
          <input 
            type="range" min="0.8" max="1.2" step="0.05" 
            value={settings.pitch}
            onChange={(e) => updateSetting('pitch', parseFloat(e.target.value))}
            className="w-full accent-black h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Volume */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5" /> Output
            </label>
            <span className="text-[11px] font-bold text-indigo-600">{Math.round(settings.volume * 100)}%</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={settings.volume}
            onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
            className="w-full accent-black h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 rounded-2xl text-[9px] text-slate-400 leading-relaxed font-medium italic">
        * Using localized native neural engines for zero-latency studio playback. If voices are missing, check your system speech settings.
      </div>
    </div>
  );
};

export default VoiceSettings;
