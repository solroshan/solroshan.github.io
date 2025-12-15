<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="/assets/css/images/leaf.png" rel="shortcut icon" type="image/png" />
  <title>GrassCare Programlar</title>

  <!-- Tailwind + React + Babel -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Supabase -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
  <script>
    const supabaseUrl = 'https://puurwgrzknxttjsjxdit.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dXJ3Z3J6a254dHRqc2p4ZGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTIyODUsImV4cCI6MjA4MTAyODI4NX0.tYoFbwWeuPCAXLXVp8yX0ThbvWPgboYOCUqPuKtAoaI';
    window.supabase = supabase.createClient(supabaseUrl, supabaseKey); /* [web:386] */
  </script>

  <!-- Ortak header/footer -->
  <script type="text/babel" src="./components/public-header.js"></script>
  <script type="text/babel" src="./components/Footer.js"></script>
  <script type="text/babel" src="./components/ConfirmModal.js"></script>

  <style>
    .btn-soft {
      transition: box-shadow .18s, background .18s, color .18s;
    }
    .btn-soft:hover {
      box-shadow: 0 6px 18px rgba(2,6,23,0.18), 0 1.5px 8px rgba(20,184,166,0.09);
      background: linear-gradient(90deg, #0891b2 0%, #0ea5e9 100%);
      color: #fff;
    }
  </style>
</head>
<body class="bg-slate-900 font-sans text-slate-100">
  <div id="root" class="min-h-screen"></div>

  <script type="text/babel">
    const { useState, useEffect, useMemo } = React;
    const { createRoot } = ReactDOM;

    const daysOfWeek = ["Pzt","Sal","Çar","Per","Cum","Cts","Paz"];

    /* ========== Yeni Program Formu (gönderdiğinin revize hali) ========== */

    const NewProgramForm = ({
      form,
      setForm,
      valves,
      onCreate,
      toggleDayInForm,
      saving
    }) => {
      // Benzersiz grup listesi (Ön, Orta, Arka...)
      const groups = useMemo(
        () =>
          Array.from(
            new Set(valves.map(v => v.group).filter(Boolean))
          ),
        [valves]
      );

      const toggleGroupInForm = (groupName) => {
        const groupValveIds = valves.filter(v => v.group === groupName).map(v => v.id);
        if (groupValveIds.length === 0) return;

        const allSelected = groupValveIds.every(id => form.valveIds.includes(id));

        setForm(prev => {
          if (allSelected) {
            // Hepsi seçiliyse hepsini çıkar
            return {
              ...prev,
              valveIds: prev.valveIds.filter(id => !groupValveIds.includes(id))
            };
          }
          // Eksik olanları ekle
          const next = new Set(prev.valveIds);
          groupValveIds.forEach(id => next.add(id));
          return { ...prev, valveIds: Array.from(next) };
        });
      };

      const toggleValveId = (id) => {
        setForm(prev =>
          prev.valveIds.includes(id)
            ? { ...prev, valveIds: prev.valveIds.filter(v => v !== id) }
            : { ...prev, valveIds: [...prev.valveIds, id] }
        );
      };

      return (
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
              value={form.startTime}
              onChange={e => setForm({ ...form, startTime: e.target.value })}
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

          {/* Valf Grupları */}
          <div className="mt-4">
            <p className="text-slate-300 text-sm mb-2">Valf Grubu Seç</p>
            <div className="flex flex-wrap gap-2">
              {groups.map(g => {
                const groupValveIds = valves.filter(v => v.group === g).map(v => v.id);
                const active =
                  groupValveIds.length > 0 &&
                  groupValveIds.every(id => form.valveIds.includes(id));

                return (
                  <label key={g} className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleGroupInForm(g)}
                    />
                    <span
                      className={
                        "px-3 py-1 rounded-full text-sm font-medium transition " +
                        (active ? "bg-teal-600 text-white" : "bg-slate-700 text-slate-200")
                      }
                    >
                      {g}
                    </span>
                  </label>
                );
              })}
              {groups.length === 0 && (
                <p className="text-xs text-slate-500">
                  Henüz grup atanmış valf yok, önce dashboard’da grup belirleyin.
                </p>
              )}
            </div>
          </div>

          {/* Tekil valfler (opsiyonel, gruplara ek olarak) */}
          <div className="mt-4">
            <p className="text-slate-300 text-sm mb-2">Valf Seçimi (isteğe bağlı)</p>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-auto">
              {valves.map(v => {
                const active = form.valveIds.includes(v.id);
                return (
                  <label key={v.id} className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleValveId(v.id)}
                    />
                    <span
                      className={
                        "px-3 py-1 rounded-full text-sm font-medium transition " +
                        (active ? "bg-teal-600 text-white" : "bg-slate-700 text-slate-200")
                      }
                    >
                      {v.name}{v.group ? ` · ${v.group}` : ""}
                    </span>
                  </label>
                );
              })}
              {valves.length === 0 && (
                <p className="text-xs text-slate-500">
                  Henüz valf yok, önce dashboard’dan valf ekleyin.
                </p>
              )}
            </div>
          </div>

          {/* Gün seçimi */}
          <div className="mt-4">
            <p className="text-slate-300 text-sm mb-2">Gün Seçimi</p>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => {
                const active = form.days.includes(day);
                return (
                  <label key={day} className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleDayInForm(day)}
                    />
                    <span
                      className={
                        "px-3 py-1 rounded-full text-sm font-medium transition " +
                        (active ? "bg-teal-600 text-white" : "bg-slate-700 text-slate-200")
                      }
                    >
                      {day}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {form.days.length > 0 ? form.days.join(", ") : "—"}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={onCreate}
              disabled={
                saving ||
                !form.name.trim() ||
                !form.startTime ||
                !form.duration ||
                form.valveIds.length === 0 ||
                form.days.length === 0
              }
              className="w-full bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:bg-teal-400 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg btn-soft disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Kaydediliyor..." : "Program Oluştur"}
            </button>
          </div>
        </section>
      );
    };

    /* ========== Program Listesi ========== */

    const ProgramList = ({ programs, onToggleActive, onAskDelete, onCopy }) => (
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-md border border-slate-700/40">
        <h2 className="font-bold mb-4 text-slate-100">Program Listesi</h2>
        {programs.length === 0 && (
          <p className="text-xs text-slate-500">Henüz program oluşturulmamış.</p>
        )}
        <div className="space-y-3">
          {programs.map(p => (
            <div
              key={p.id}
              className="border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm bg-slate-900/60"
            >
              <div className="flex justify-between items-center gap-2 mb-1.5">
                <div>
                  <p className="font-semibold text-slate-100">{p.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {p.start_time} · {p.duration} dk · Günler: {p.days.join(", ")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => onToggleActive(p.id, !p.active)}
                    className={
                      "px-2.5 py-1 rounded-md text-[11px] font-semibold border " +
                      (p.active
                        ? "bg-teal-600/40 text-teal-100 border-teal-400"
                        : "bg-slate-700 text-slate-100 border-slate-500")
                    }
                  >
                    {p.active ? "Aktif" : "Pasif"}
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onCopy(p.id)}
                      className="px-2 py-0.5 rounded-md border border-slate-600 text-[11px] text-slate-200 hover:bg-slate-800"
                    >
                      Kopyala
                    </button>
                    <button
                      onClick={() => onAskDelete(p.id)}
                      className="px-2 py-0.5 rounded-md border border-rose-500 text-[11px] text-rose-300 hover:bg-rose-900/30"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-1.5 text-[11px] text-slate-300">
                Valfler: {p.valvesSummary || "Seçilmiş valf yok"}
              </div>
            </div>
          ))}
        </div>
      </section>
    );

    /* ========== Ana Sayfa ========== */

    const ProgramPage = () => {
      const [user, setUser] = useState(null);
      const [loadingUser, setLoadingUser] = useState(true);

      const [valves, setValves] = useState([]);
      const [programs, setPrograms] = useState([]);
      const [loadingData, setLoadingData] = useState(true);

      const [form, setForm] = useState({
        name: "",
        startTime: "",
        duration: "",
        days: [],
        valveIds: []
      });

      const [savingProgram, setSavingProgram] = useState(false);
      const [confirmDeleteId, setConfirmDeleteId] = useState(null);

      // Kullanıcı
      useEffect(() => {
        const loadUser = async () => {
          const { data, error } = await supabase.auth.getUser(); /* [web:123] */
          if (error || !data?.user) {
            window.location.href = "anasayfa.html#giris";
            return;
          }
          setUser(data.user);
          setLoadingUser(false);
        };
        loadUser();
      }, []);

      // Valf + programlar
      useEffect(() => {
        if (!user) return;

        const loadAll = async () => {
          setLoadingData(true);

          // Valfler
          const { data: valvesData } = await supabase
            .from("valves")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: true }); /* [web:386] */

          setValves(valvesData || []);

          // Programlar
          const { data: programsData, error: progErr } = await supabase
            .from("programs")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (progErr) {
            console.error("Programlar alınamadı:", progErr);
            setPrograms([]);
            setLoadingData(false);
            return;
          }

          const programIds = (programsData || []).map(p => p.id);
          let pvMap = {};
          if (programIds.length > 0) {
            const { data: pvData, error: pvErr } = await supabase
              .from("program_valves")
              .select("program_id, valve_id")
              .in("program_id", programIds); /* [web:386] */

            if (!pvErr && pvData) {
              pvMap = programIds.reduce((acc, pid) => ({ ...acc, [pid]: [] }), {});
              pvData.forEach(row => {
                if (!pvMap[row.program_id]) pvMap[row.program_id] = [];
                pvMap[row.program_id].push(row.valve_id);
              });
            }
          }

          const valvesById = (valvesData || []).reduce((acc, v) => {
            acc[v.id] = v;
            return acc;
          }, {});

          const mappedPrograms = (programsData || []).map(p => {
            const valveIds = pvMap[p.id] || [];
            const groups = new Set();
            valveIds.forEach(id => {
              const v = valvesById[id];
              if (v?.group) groups.add(v.group); // Burada "Program -" yok, direkt grup adı
            });

            return {
              ...p,
              days: p.days || [],
              valvesSummary:
                valveIds.length === 0
                  ? ""
                  : `${valveIds.length} valf · Gruplar: ${
                      groups.size > 0 ? Array.from(groups).join(", ") : "-"
                    }`
            };
          });

          setPrograms(mappedPrograms);
          setLoadingData(false);
        };

        loadAll();
      }, [user]);

      const toggleDayInForm = (day) => {
        setForm(prev =>
          prev.days.includes(day)
            ? { ...prev, days: prev.days.filter(d => d !== day) }
            : { ...prev, days: [...prev.days, day] }
        );
      };

      // Program oluştur
      const createProgram = async () => {
        if (
          !form.name.trim() ||
          !form.startTime ||
          !form.duration ||
          form.days.length === 0 ||
          form.valveIds.length === 0 ||
          !user
        ) {
          return;
        }

        setSavingProgram(true);

        const { data: progData, error: progErr } = await supabase
          .from("programs")
          .insert({
            user_id: user.id,
            name: form.name.trim(),
            start_time: form.startTime,
            duration: Number(form.duration),
            days: form.days,
            active: true
          })
          .select()
          .single(); /* [web:498] */

        if (progErr) {
          alert("Program kaydedilemedi: " + progErr.message);
          setSavingProgram(false);
          return;
        }

        const rows = form.valveIds.map(valveId => ({
          program_id: progData.id,
          valve_id: valveId
        }));

        const { error: pvErr } = await supabase
          .from("program_valves")
          .insert(rows); /* [web:498] */

        if (pvErr) {
          alert("Program-valf ilişkileri kaydedilemedi: " + pvErr.message);
          setSavingProgram(false);
          return;
        }

        const valvesById = valves.reduce((acc, v) => {
          acc[v.id] = v;
          return acc;
        }, {});

        const groups = new Set();
        form.valveIds.forEach(id => {
          const v = valvesById[id];
          if (v?.group) groups.add(v.group);
        });

        const newProgram = {
          ...progData,
          days: progData.days || [],
          valvesSummary: `${form.valveIds.length} valf · Gruplar: ${
            groups.size > 0 ? Array.from(groups).join(", ") : "-"
          }`
        };

        setPrograms(prev => [newProgram, ...prev]);

        setForm({
          name: "",
          startTime: "",
          duration: "",
          days: [],
          valveIds: []
        });
        setSavingProgram(false);
      };

      const handleToggleActive = async (id, newActive) => {
        const { error } = await supabase
          .from("programs")
          .update({ active: newActive })
          .eq("id", id); /* [web:502] */

        if (error) {
          alert("Program güncellenemedi: " + error.message);
          return;
        }

        setPrograms(prev =>
          prev.map(p => (p.id === id ? { ...p, active: newActive } : p))
        );
      };

      const askDelete = (id) => setConfirmDeleteId(id);
      const cancelDelete = () => setConfirmDeleteId(null);

      const doDelete = async () => {
        if (!confirmDeleteId) return;

        const { error } = await supabase
          .from("programs")
          .delete()
          .eq("id", confirmDeleteId); /* [web:502] */

        if (error) {
          alert("Program silinemedi: " + error.message);
          return;
        }

        setPrograms(prev => prev.filter(p => p.id !== confirmDeleteId));
        setConfirmDeleteId(null);
      };

      const copyProgram = async (id) => {
        const src = programs.find(p => p.id === id);
        if (!src || !user) return;

        const { data: newProg, error: progErr } = await supabase
          .from("programs")
          .insert({
            user_id: user.id,
            name: src.name + " (Kopya)",
            start_time: src.start_time,
            duration: src.duration,
            days: src.days,
            active: src.active
          })
          .select()
          .single(); /* [web:498] */

        if (progErr) {
          alert("Kopya oluşturulamadı: " + progErr.message);
          return;
        }

        const { data: oldLinks } = await supabase
          .from("program_valves")
          .select("valve_id")
          .eq("program_id", src.id);

        if (oldLinks && oldLinks.length > 0) {
          const rows = oldLinks.map(r => ({
            program_id: newProg.id,
            valve_id: r.valve_id
          }));
          await supabase.from("program_valves").insert(rows); /* [web:498] */
        }

        const valvesById = valves.reduce((acc, v) => {
          acc[v.id] = v;
          return acc;
        }, {});
        const groups = new Set();
        (oldLinks || []).forEach(r => {
          const v = valvesById[r.valve_id];
          if (v?.group) groups.add(v.group);
        });

        const mapped = {
          ...newProg,
          days: newProg.days || [],
          valvesSummary:
            (oldLinks || []).length === 0
              ? ""
              : `${oldLinks.length} valf · Gruplar: ${
                  groups.size > 0 ? Array.from(groups).join(", ") : "-"
                }`
        };

        setPrograms(prev => [mapped, ...prev]);
      };

      if (loadingUser || loadingData) {
        return (
          <div className="min-h-screen flex flex-col">
            <window.Header />
            <main className="flex-1 flex items-center justify-center">
              <p className="text-slate-300">Yükleniyor...</p>
            </main>
            <Footer />
          </div>
        );
      }

      return (
        <div className="min-h-screen flex flex-col">
          <window.Header />
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-3 py-4 md:px-6 md:py-8">
              <div className="bg-slate-900 rounded-2xl p-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 md:grid-cols-2">
                  <NewProgramForm
                    form={form}
                    setForm={setForm}
                    valves={valves}
                    onCreate={createProgram}
                    toggleDayInForm={toggleDayInForm}
                    saving={savingProgram}
                  />
                  <ProgramList
                    programs={programs}
                    onToggleActive={handleToggleActive}
                    onAskDelete={askDelete}
                    onCopy={copyProgram}
                  />
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <ConfirmModal
            open={confirmDeleteId !== null}
            title="Programı Sil"
            text="Bu programı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
            onCancel={cancelDelete}
            onConfirm={doDelete}
          />
        </div>
      );
    };

    const root = createRoot(document.getElementById("root"));
    root.render(<ProgramPage />);
  </script>
</body>
</html>
