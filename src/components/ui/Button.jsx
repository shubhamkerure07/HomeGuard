export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled = false, className = '' }) {
  const variants = {
    primary: 'bg-accent-blue hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    danger: 'bg-accent-red hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    success: 'bg-accent-green hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    warning: 'bg-accent-amber hover:bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    ghost: 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10',
    outline: 'bg-transparent hover:bg-white/5 text-slate-300 border border-white/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl font-medium transition-all duration-300
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        inline-flex items-center justify-center gap-2
        ${className}
      `}
    >
      {children}
    </button>
  );
}
