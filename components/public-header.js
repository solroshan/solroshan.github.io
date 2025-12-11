const PublicHeader = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await supabase.auth.getUser(); // [web:123]
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
    <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <a href="anasayfa.html" className="flex items-center gap-2">
            <img src="/assets/css/images/leaf.png" alt="GrassCare" className="h-10 w-10" />
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              GrassCare
            </span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="anasayfa.html#ozellikler" className="text-slate-300 hover:text-teal-300 font-medium">
            Özellikler
          </a>
          <a href="uyelik.html" className="text-slate-300 hover:text-teal-300 font-medium">
            Üyelik
          </a>

          {loggedIn ? (
            <a
              href="hesabim.html"
              className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 font-medium rounded-xl border border-teal-500/30 transition-all duration-200"
            >
              Profilim
            </a>
          ) : (
            <a
              href="anasayfa.html#giris"
              className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 font-medium rounded-xl border border-teal-500/30 transition-all duration-200"
            >
              Giriş / Üye Ol
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

window.Header = PublicHeader;
