export default function Toggle({ enabled, checked, onChange, size = 'md' }) {
  const isEnabled = enabled ?? checked ?? false;
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const s = sizes[size];

  return (
    <button
      type="button"
      onClick={() => onChange && onChange(!isEnabled)}
      className={`${s.track} rounded-full transition-all duration-300 relative ${
        isEnabled
          ? 'bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.4)]'
          : 'bg-dark-600'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 ${s.thumb} rounded-full bg-white transition-transform duration-300 ${
          isEnabled ? s.translate : 'translate-x-0'
        }`}
      />
    </button>
  );
}
