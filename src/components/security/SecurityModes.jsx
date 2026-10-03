import React from 'react';
import { useHome } from '../../context/HomeContext';
import { SECURITY_MODES } from '../../data/initialData';
import Card from '../ui/Card';
import { Shield, Home, Moon, Wrench } from 'lucide-react';

const icons = {
  home: Home,
  away: Shield,
  sleep: Moon,
  maintenance: Wrench,
};

export default function SecurityModes() {
  const { securityMode, setSecurityMode } = useHome();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Security Modes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SECURITY_MODES.map((mode) => {
          const Icon = icons[mode.icon] || Shield;
          const isActive = securityMode === mode.id;
          
          return (
            <button 
              key={mode.id}
              onClick={() => setSecurityMode(mode.id)}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Card className={`h-full border transition-colors ${
                isActive 
                  ? `border-${mode.color}-500 bg-${mode.color}-500/10 shadow-[0_0_15px_rgba(var(--color-${mode.color}-500),0.15)]` 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? `bg-${mode.color}-500/20 text-${mode.color}-400` : 'bg-dark-700 text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold ${isActive ? `text-${mode.color}-400` : 'text-white'}`}>
                    {mode.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-400 font-light mb-3">
                  {mode.description}
                </p>
                
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-400">Active Sensors:</span> {mode.activeSensors.join(', ')}
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
