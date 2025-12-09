const ProgramList = ({ 
  programs, 
  groups, 
  toggleActive, 
  toggleEdit, 
  copyProgram, 
  askDelete, 
  toggleGroupInProgram 
}) => (
  <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6 shadow-md border border-slate-700/40">
    <h2 className="font-bold mb-6 text-slate-100">Program Listesi</h2>
    <div className="space-y-4">
      {programs.map(p => (
        <article key={p.id} className="bg-slate-900/50 p-3 sm:p-4 rounded-xl border border-slate-700/50">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-slate-100 text-base sm:text-lg mb-1 sm:mb-2">{p.name}</h4>
              <div className="mt-2 text-slate-300 text-xs sm:text-sm space-y-1">
                <p>Saat: <span className="text-slate-100 font-medium">{p.time}</span> • Süre: <span className="text-slate-100 font-medium">{p.duration} dk</span></p>
                <p>Günler: <span className="text-slate-100 font-medium">{(p.days || []).join(", ") || "—"}</span></p>
                <div className="mt-1">
                  <span className="text-slate-300 text-xs sm:text-sm mr-2">Valf:</span>
                  {p.valves && p.valves.length > 0 ? (
                    p.valves.map(v => (
                      <span key={v} className="inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs mr-1 sm:mr-2">{v}</span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs">—</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 sm:gap-3 min-w-[110px] sm:min-w-[140px]">
              <window.ToggleSwitch checked={!!p.active} onChange={() => toggleActive(p.id)} />
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-end w-full">
                <button onClick={() => toggleEdit(p.id)} className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm btn-soft font-medium">
                  {p.editing ? "Kaydet" : "Düzenle"}
                </button>
                <button onClick={() => copyProgram(p.id)} className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 px-2 py-1.5 rounded-lg text-xs sm:text-sm btn-soft flex items-center justify-center gap-1 min-w-[60px]">
                  <window.DuplicateIcon /> Kopyala
                </button>
                <button onClick={() => askDelete(p.id)} className="flex-1 sm:flex-none bg-rose-600 hover:bg-rose-500 px-2 py-1.5 rounded-lg text-xs sm:text-sm btn-soft text-white flex items-center justify-center gap-1 min-w-[60px]">
                  <window.TrashIcon /> Sil
                </button>
              </div>
            </div>
          </div>
          {p.editing && (
            <div className="mt-4 pt-4 border-t border-slate-700/40">
              <h5 className="font-semibold text-slate-100 mb-3">Valf Grubu Seç</h5>
              <div className="flex flex-wrap gap-2">
                {groups.map(g => {
                  const active = p.valves.includes(g);
                  return (
                    <label key={g} className="inline-flex items-center cursor-pointer select-none">
                      <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleGroupInProgram(p.id, g)} />
                      <span className={`px-3 py-1 rounded-full text-sm font-medium transition ${active ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                        {g}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

window.ProgramList = ProgramList;
