
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  ChevronLeft, 
  Play, 
  Pause,
  Settings as SettingsIcon,
  Mic2,
  FileText,
  Download,
  Share2,
  Database
} from 'lucide-react';
import VoiceSettings from './VoiceSettings';
import HistoryPanel from './HistoryPanel';
import Waveform from './Waveform';
import { ttsService } from '../services/ttsService';
import { TTSHistoryItem, AudioSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [selectedPersonaId, setSelectedPersonaId] = useState('');
  const [history, setHistory] = useState<TTSHistoryItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const MAX_CHARS = 5000;

  useEffect(() => {
    const savedHistory = localStorage.getItem('voxnova_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (txt: string) => {
    const newItem: TTSHistoryItem = {
      id: crypto.randomUUID(),
      text: txt.slice(0, 100),
      voiceId: selectedPersonaId || settings.voiceId,
      timestamp: Date.now(),
    };
    const newHistory = [newItem, ...history.slice(0, 19)];
    setHistory(newHistory);
    localStorage.setItem('voxnova_history', JSON.stringify(newHistory));
  };

  const handleGenerate = () => {
    if (!text.trim()) return;
    if (isPlaying && !isPaused) { ttsService.pause(); setIsPaused(true); return; }
    if (isPaused) { ttsService.resume(); setIsPaused(false); return; }

    ttsService.speak(
      text, settings, selectedPersonaId,
      () => setIsPlaying(true),
      () => { setIsPlaying(false); setIsPaused(false); },
      () => setIsPaused(true),
      () => setIsPaused(false)
    );

    saveToHistory(text);
  };

  const handleExportScript = () => {
    if (!text.trim()) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VoxNova_Script_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLibrary = () => {
    if (confirm('Clear all historical clips and session data? This cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem('voxnova_history');
    }
  };

  const handleBackupLibrary = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VoxNova_Library_Backup_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Editorial Header */}
      <header className="h-16 px-6 border-b border-slate-200/60 flex items-center justify-between glass sticky top-0 z-[100]">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h2 className="font-serif text-lg font-bold leading-none">Studio Canvas</h2>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Persona Engine v2.4</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleBackupLibrary}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors"
          >
            <Database className="w-3.5 h-3.5" /> Backup
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="lg:hidden p-2 bg-slate-100 rounded-xl"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Editor Side */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto h-full flex flex-col">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Editorial Script</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={handleExportScript} className="text-xs font-bold text-indigo-600 hover:opacity-70 flex items-center gap-1 transition-opacity">
                      <Download className="w-3.5 h-3.5" /> Export .txt
                    </button>
                    <button onClick={() => setText('')} className="text-xs font-bold text-red-500 hover:opacity-70 flex items-center gap-1 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
               </div>
               <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Begin your narrative journey here..."
                  className="w-full flex-1 bg-transparent border-none text-2xl md:text-4xl font-serif text-editorial leading-tight focus:ring-0 placeholder:text-slate-200 resize-none pb-20"
               />
               <div className="py-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <div className="flex gap-4">
                    <span>{text.length} / {MAX_CHARS} Chars</span>
                    <span>{text.split(/\s+/).filter(b => b).length} Words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span>HD Neural Render Active</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar for Desktop */}
        <aside className={`fixed inset-0 z-[110] lg:relative lg:inset-auto lg:w-[420px] bg-white border-l border-slate-200 transition-transform duration-500 transform ${showSettings ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="h-full flex flex-col p-8 space-y-8">
            <div className="lg:hidden flex justify-between items-center mb-4">
              <h3 className="font-bold text-xs uppercase tracking-widest">Studio Config</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 bg-slate-100 rounded-full">
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
               <VoiceSettings 
                  settings={settings} 
                  selectedPersonaId={selectedPersonaId}
                  onChange={(newSettings, personaId) => {
                    setSettings(newSettings);
                    if (personaId) setSelectedPersonaId(personaId);
                  }} 
               />
               <div className="h-[400px]">
                 <HistoryPanel 
                    items={history} 
                    onPlay={(item) => { setText(item.text); setSelectedPersonaId(item.voiceId); }}
                    onDelete={(id) => {
                      const newHistory = history.filter(i => i.id !== id);
                      setHistory(newHistory);
                      localStorage.setItem('voxnova_history', JSON.stringify(newHistory));
                    }}
                 />
                 <button 
                  onClick={handleClearLibrary}
                  className="w-full mt-4 py-3 border border-dashed border-red-100 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50 hover:border-red-200 transition-all"
                 >
                    Purge Library
                 </button>
               </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Floating Action Player */}
      <footer className="p-6 md:p-8 flex justify-center sticky bottom-0 z-[120] pointer-events-none">
         <div className="w-full max-w-2xl bg-black text-white rounded-[40px] px-10 py-6 flex items-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] pointer-events-auto">
            <button 
              onClick={handleGenerate}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isPlaying && !isPaused ? 'bg-white text-black' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30'}`}
            >
              {isPlaying && !isPaused ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
            <div className="flex-1 flex flex-col gap-2">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">Persona Render Stream</span>
                  <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{isPlaying ? 'Modulating...' : 'Standby'}</span>
               </div>
               <div className="h-10 overflow-hidden">
                 <Waveform isPlaying={isPlaying} isPaused={isPaused} />
               </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Agent</span>
               <span className="text-sm font-serif italic text-white">{selectedPersonaId || 'Neural Standard'}</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Dashboard;
