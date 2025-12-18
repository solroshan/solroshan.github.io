const PublicHeader = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await supabase.auth.getUser(); // mevcut oturum kontrolü [web:123]
        const data = result.data;
        const error = result.error;

        if (!error && data && data.user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        setLoggedIn(false);
      }
    };

    checkUser();
  }, []);

  const LoggedInLinks = () => (
    <React.Fragment>
      <a
        href="dashboard.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
      >
        Dashboard
      </a>
      <a
        href="prog.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
      >
        Programlar
      </a>
      <a
        href="hesabim.html"
        className="inline-flex items-center rounded-xl border border-teal-500/40 bg-teal-500/15 px-4 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-500/30 hover:text-white transition-colors"
      >
        Hesabım
      </a>
    </React.Fragment>
  );

  const LoggedOutLinks = () => (
    <React.Fragment>
      <a
        href="store.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
      >
        Mağaza
      </a>
      <a
        href="uyelik.html"
        className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
      >
        Üyelik
      </a>
      <a
        href="anasayfa.html#giris"
        className="inline-flex items-center rounded-xl border border-teal-500/40 bg-teal-500/15 px-4 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-500/30 hover:text-white transition-colors"
      >
        Giriş / Üye Ol
      </a>
    </React.Fragment>
  );

  return (
    <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Üst satır: logo + hamburger + desktop menü */}
        <div className="flex h-16 items-center justify-between">
          {/* Sol: logo */}
          <a href="anasayfa.html" className="flex items-center gap-2 min-w-0">
            <img
              src="/assets/css/images/leaf.png"
              alt="GrassCare"
              className="h-9 w-9 shrink-0"
            />
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              GrassCare
            </span>
          </a>

          {/* Sağ: desktop menü */}
          <nav className="hidden md:flex items-center gap-4">
            {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
          </nav>

          {/* Sağ: mobil hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:text-teal-300 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-teal-500 md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Menüyü aç/kapat</span>
            {open ? (
              // X icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobil açılır menü */}
        {open && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col gap-2 border-t border-slate-800/60 pt-3">
              {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

window.Header = PublicHeader;
