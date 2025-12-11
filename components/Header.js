const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth kontrolü - giriş yoksa anasayfaya gönder
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false);
      if (!session || !session.user) {
        window.location.href = 'anasayfa.html';
        return;
      }
      setUser(session.user);
    });

    // Auth değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session || !session.user) {
        window.location.href = 'anasayfa.html';
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="bg-gradient-to-r from-slate-900 to-emerald-900 p-4">
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
    </div>
  </div>;

  return (
    <header className="bg-gradient-to-r from-slate-900/95 to-emerald-900/95 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="anasayfa.html" className="flex items-center gap-2">
            <img src="/assets/css/images/leaf.png" alt="GrassCare" className="h-10 w-10" />
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              GrassCare
            </span>
          </a>
        </div>
        
        {/* Giriş yapmış kullanıcı menüsü */}
        <div className="flex items-center gap-4">
          <a href="hesabim.html" className="text-slate-300 hover:text-teal-300 font-medium">
            Hesabım
          </a>
          <a href="prog.html" className="text-slate-300 hover:text-teal-300 font-medium">
            Programlar
          </a>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = 'anasayfa.html';
            }}
            className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 font-medium rounded-xl border border-teal-500/30 transition-all duration-200"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
};

window.Header = Header;
