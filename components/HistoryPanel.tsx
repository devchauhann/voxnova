
import React from 'react';
import { History, Play, Trash2, Clock, FileAudio } from 'lucide-react';
import { TTSHistoryItem } from '../types';

interface HistoryPanelProps {
  items: TTSHistoryItem[];
  onPlay: (item: TTSHistoryItem) => void;
  onDelete: (id: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ items, onPlay, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl h-full shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-xs">Recent Clips</h3>
        </div>
        <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400">
          {items.length} sessions
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 opacity-60">
            <FileAudio className="w-12 h-12" />
            <p className="text-xs">No audio history yet</p>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id}
              className="group bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl p-3 border border-slate-100 dark:border-slate-800 transition-all cursor-pointer"
              onClick={() => onPlay(item)}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 flex-1">
                  "{item.text}"
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:text-red-500 dark:text-slate-500 transition-all"
                  aria-label="Delete history item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                  {item.voiceId}
                </div>
                <div className="flex items-center gap-1 text-indigo-500 font-bold text-[10px] uppercase">
                  <Play className="w-3 h-3 fill-current" /> Play
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
