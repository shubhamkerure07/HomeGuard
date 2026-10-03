export default function Card({ children, className = '', hover = false, glow = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-2xl p-6 transition-all duration-300
        ${hover ? 'hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-[1.02] cursor-pointer' : ''}
        ${glow === 'blue' ? 'glow-blue' : ''}
        ${glow === 'red' ? 'glow-red' : ''}
        ${glow === 'green' ? 'glow-green' : ''}
        ${glow === 'amber' ? 'glow-amber' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
