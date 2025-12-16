import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../utils/supabase'; // supabase client'ınızı import edin

const PublicHeader = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Auth state hook'u
  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (mounted) {
          setLoggedIn(!error && !!data?.user);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) {
          setLoggedIn(false);
          setLoading(false);
        }
      }
    };

    checkUser();

    // Real-time auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          setLoggedIn(!!session?.user);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Memoized toggle handler
  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // Memoized close menu handler (outside click için)
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  // Memoized links
  const LoggedInLinks = useMemo(() => (
    <>
      <a
        href="dashboard.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
        onClick={closeMenu}
      >
        Dashboard
      </a>
      <a
        href="prog.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
        onClick={closeMenu}
      >
        Programlar
      </a>
      <a
        href="hesabim.html"
        className="inline-flex items-center rounded-xl border border-teal-500/40 bg-teal-500/15 px-4 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-500/30 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Hesabım
      </a>
    </>
  ), [closeMenu]);

  const LoggedOutLinks = useMemo(() => (
    <>
      <a
        href="uyelik.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
        onClick={closeMenu}
      >
        Üyelik
      </a>
      <a
        href="anasayfa.html#giris"
        className="inline-flex items-center rounded-xl border border-teal-500/40 bg-teal-500/15 px-4 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-500/30 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Giriş / Üye Ol
      </a>
    </>
  ), [closeMenu]);

  // Loading skeleton
  if (loading) {
    return (
      <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-slate-700 animate-pulse rounded-lg" />
              <div className="h-7 w-24 bg-slate-700 animate-pulse rounded" />
            </div>
            <div className="w-24 h-6 bg-slate-700 animate-pulse rounded md:hidden" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Üst satır: logo + hamburger + desktop menü */}
          <div className="flex h-16 items-center justify-between">
            {/* Sol: logo */}
            <a href="anasayfa.html" className="flex items-center gap-2 min-w-0" onClick={closeMenu}>
              <img
                src="/assets/css/images/leaf.png"
                alt="GrassCare"
                className="h-9 w-9 shrink-0"
                loading="lazy"
              />
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                GrassCare
              </span>
            </a>

            {/* Sağ: desktop menü */}
            <nav className="hidden md:flex items-center gap-4" role="navigation">
              {loggedIn ? LoggedInLinks : LoggedOutLinks}
            </nav>

            {/* Sağ: mobil hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:text-teal-300 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 md:hidden"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobil açılır menü */}
          {open && (
            <div 
              id="mobile-menu" 
              className="md:hidden pb-3 backdrop-blur-sm"
              role="menu"
            >
              <nav className="flex flex-col gap-3 border-t border-slate-800/60 pt-4 px-2">
                {loggedIn ? LoggedInLinks : LoggedOutLinks}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Outside click handler */}
      {open && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default PublicHeader;
// window.Header = PublicHeader; // Bu satırı kaldırın, modern ES6 export kullanın
