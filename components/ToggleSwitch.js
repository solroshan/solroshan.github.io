const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className="w-12 h-7 bg-slate-700/70 rounded-full transition peer peer-checked:bg-teal-500/80 relative after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:transition-all peer-checked:after:translate-x-5"></div>
  </label>
);

export default ToggleSwitch;
