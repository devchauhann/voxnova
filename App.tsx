
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Default to light mode for the Awwwards aesthetic
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950' : 'bg-[#FAF9F6]'}`}>
      {view === 'landing' ? (
        <Landing onStart={() => setView('studio')} />
      ) : (
        <Dashboard onBack={() => setView('landing')} />
      )}
    </div>
  );
};

export default App;
