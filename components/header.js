import { LogoIcon } from './icons.js';

const Header = () => (
  <header className="flex justify-between items-center mb-6">
    <div className="flex items-center space-x-2">
      <LogoIcon />
      <div>
        <h1 className="text-xl font-bold">GrassCare</h1>
        <p className="text-xs text-slate-400">Program Yönetimi</p>
      </div>
    </div>
    <nav className="flex flex-wrap items-center justify-end gap-1.5 md:gap-3 text-[11px] sm:text-sm font-medium max-w-full">
      <a href="/dash-test.html" className="px-2 py-1.5 text-slate-300 hover:text-teal-300">Anasayfa</a>
      <a href="/dash-test.html" className="px-2 py-1.5 text-slate-300 hover:text-teal-300">Valfler</a>
      <a href="/grassprog.html" className="px-2 py-1.5 text-slate-300 hover:text-teal-300">Program</a>
      <a href="/dash-test.html" className="flex items-center px-2 py-1.5 text-slate-300
  </header>
);
window.Header = Header;
