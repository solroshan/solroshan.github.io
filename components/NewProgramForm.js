const NewProgramForm = ({ form, setForm, groups, daysOfWeek, onCreate, toggleGroupInForm, toggleDayInForm }) => (
  <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-md border border-slate-700/40">
    <h2 className="font-bold mb-4 text-slate-100">Yeni Program Oluştur</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm"
        placeholder="Program adı"
      />
      <input
        value={form.time}
        onChange={e => setForm({ ...form, time: e.target.value })}
        type="time"
        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm"
      />
      <input
        value={form.duration}
        onChange={e => setForm({ ...form, duration: e.target.value })}
        type="number"
        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm"
        placeholder="Süre (dk)"
      />
    </div>
    <div className="mt-3">
      <p className="text-slate-300 text-sm mb-2">Valf Grubu Seç</p>
      <div className="flex flex-wrap gap-2">
        {groups.map(g => {
          const active = form.valves.includes(g);
          return (
            <label key={g} className="inline-flex items-center cursor-pointer select-none">
              <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleGroupInForm(g)} />
              <span className={`px-3 py-1 rounded-full text-sm font-medium transition ${active ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}>{g}</span>
            </label>
          );
        })}
      </div>
      <div className="mt-4">
        <p className="text-slate-300 text-sm mb-2">Gün Seçimi</p>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map(day => {
            const active = form.days.includes(day);
            return (
              <label key={day} className="inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleDayInForm(day)} />
                <span className={`px-3 py-1 rounded-full text-sm font-medium transition ${active ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}>{day}</span>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-1">{form.days.length > 0 ? `${form.days.join(", ")}` : "—"}</p>
      </div>
      <div className="mt-4">
        <button onClick={onCreate} className="w-full bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:bg-teal-400 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg btn-soft">
          Ekle
        </button>
      </div>
    </div>
  </section>
);

window.NewProgramForm = NewProgramForm;
