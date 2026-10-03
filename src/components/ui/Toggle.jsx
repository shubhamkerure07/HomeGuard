export default function Toggle({ enabled, checked, onChange, size = 'md' }) {
  const isEnabled = enabled ?? checked ?? false;
  const sizes = {
    sm: { track: 'w-7 h-4', thumb: 'w-3 h-3', translate: 'translate-x-3' },
    md: { track: 'w-10 h-6', thumb: 'w-5 h-5', translate: 'translate-x-4' },
    lg: { track: 'w-12 h-7', thumb: 'w-6 h-6', translate: 'translate-x-5' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEnabled}
      onClick={() => onChange && onChange(!isEnabled)}
      className={`${s.track} rounded-full transition-colors duration-200 relative focus:outline-none focus:ring-2 focus:ring-slate-900/10 ${
        isEnabled ? 'bg-slate-900' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 ${s.thumb} rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isEnabled ? s.translate : 'translate-x-0'
        }`}
      />
    </button>
  );
}
