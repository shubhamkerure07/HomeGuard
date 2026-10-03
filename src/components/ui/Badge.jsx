export default function Badge({ children, variant = 'default', pulse = false, className = '' }) {
  const variants = {
    default: 'bg-dark-600 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        ${variants[variant]}
        ${pulse ? 'alert-pulse' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
