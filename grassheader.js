import React from 'react';

// Header component
const MainHeader = () => (
  <header className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-3">
      <LogoIcon />
      <div>
        <h1 className="text-xl font-bold">GrassCare</h1>
        <p className="text-xs text-slate-400">Program Yönetimi</p>
      </div>
    </div>
    <nav className="flex items-center gap-3 text-sm">
      <a href="/dashboard.html" className="px-3 py-1 rounded text-slate-300 hover:text-teal-300">Anasayfa</a>
      <a href="/dashboard.html" className="px-3 py-1 rounded text-slate-300 hover:text-teal-300">Valfler</a>
      <a href="/prog.html" className="px-3 py-1 rounded bg-slate-800 text-teal-300">Program</a>
      <a href="/dashboard.html" className="px-3 py-1 rounded text-slate-300 hover:text-teal-300">Hesabım</a>
    </nav>
  </header>
);

// Logo icon component
const LogoIcon = () => (
  <svg className="h-8 w-8 text-amber-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" className="fill-amber-300" />
    <g className="stroke-amber-300" strokeWidth="1.6" strokeLinecap="round">
      <line x1="12" y1="1.5" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" />
      <line x1="4.2" y1="4.2" x2="6.2" y2="6.2" />
      <line x1="17.8" y1="17.8" x2="19.8" y2="19.8" />
      <line x1="1.5" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" />
      <line x1="4.2" y1="19.8" x2="6.2" y2="17.8" />
      <line x1="17.8" y1="6.2" x2="19.8" y2="4.2" />
    </g>
  </svg>
);

export default MainHeader;
