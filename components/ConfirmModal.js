const ConfirmModal = ({ open, title, text, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel}></div>
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700/40">
        <h4 className="text-lg font-semibold text-slate-100 mb-2">{title}</h4>
        <p className="text-slate-300">{text}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onCancel} className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600">Vazgeç</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white">Sil</button>
        </div>
      </div>
    </div>
  );
};

window.ConfirmModal = ConfirmModal;
