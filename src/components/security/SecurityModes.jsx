import React from 'react';
import { useHome } from '../../context/HomeContext';
import { SECURITY_MODES } from '../../data/initialData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Shield, Home, Moon, Wrench, CheckCircle2 } from 'lucide-react';

const iconMap = {
  home: Home,
  away: Shield,
  sleep: Moon,
  maintenance: Wrench,
};

export default function SecurityModes() {
  const { securityMode, setSecurityMode } = useHome();

  const modes = Object.values(SECURITY_MODES || {});

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Security Arming Modes</h2>
          <p className="text-xs text-slate-500">Select perimeter defense posture</p>
        </div>
        <Badge variant={securityMode === 'away' ? 'danger' : 'success'}>
          ACTIVE: {securityMode.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {modes.map((mode) => {
          const Icon = iconMap[mode.id] || Shield;
          const isActive = securityMode === mode.id;

          return (
            <div
              key={mode.id}
              onClick={() => setSecurityMode(mode.id)}
              className={`
                p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left
                ${isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-xs'
                }
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Icon size={18} />
                </div>
                {isActive && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    <span>ARMED</span>
                  </span>
                )}
              </div>

              <h3 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {mode.name} Mode
              </h3>

              <p className={`text-xs leading-relaxed line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {mode.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
