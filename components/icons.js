const PlusIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M6 8a1 1 0 112 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
    <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 011 1v1H4V5z" clipRule="evenodd" />
  </svg>
);

const DuplicateIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M4 3a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V3z"/>
    <path d="M8 7a2 2 0 012-2h4a2 2 0 012 2v8a2 2 0 01-2 2h-4a2 2 0 01-2-2V7z"/>
  </svg>
);

const LogoIcon = () => (
  <svg className="h-8 w-8 text-amber-300" viewBox="0 0 24 24" fill="none">
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

window.PlusIcon = PlusIcon;
window.TrashIcon = TrashIcon;
window.DuplicateIcon = DuplicateIcon;
window.LogoIcon = LogoIcon;
