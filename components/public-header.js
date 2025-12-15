const PublicHeader = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

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

  return (
    <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Sol: logo */}
          <a href="anasayfa.html" className="flex items-center gap-2">
            <img
              src="/assets/css/images/leaf.png"
              alt="GrassCare"
              className="h-9 w-9"
            />
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              GrassCare
            </span>
          </a>

          {/* Sağ: menü */}
          <nav className="flex items-center gap-4">
            {loggedIn ? (
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
            ) : (
              <React.Fragment>
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
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

window.Header = PublicHeader;
