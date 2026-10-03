export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled = false, className = '', type = 'button' }) {
  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-transparent',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-transparent',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-transparent',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-5 py-2.5 text-base rounded-xl font-medium',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant] || variants.primary} ${sizes[size] || sizes.md}
        font-medium transition-all duration-150 inline-flex items-center justify-center gap-2
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}
