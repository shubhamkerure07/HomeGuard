import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../../components/ui/Card';
import { Map } from 'lucide-react';

const FloorPlan = () => {
  const { securitySensors } = useHome();

  // Helper to get color based on sensor status
  const getSensorColor = (id) => {
    const sensor = securitySensors?.find(s => s.id === id);
    if (!sensor) return '#6b7280'; // gray (offline)
    
    if (sensor.status === 'triggered' || sensor.status === 'open') {
      return '#ef4444'; // red (alert)
    }
    return '#10b981'; // green (normal)
  };

  const getSensorClass = (id) => {
    const sensor = securitySensors?.find(s => s.id === id);
    if (sensor?.status === 'triggered' || sensor?.status === 'open') {
      return 'animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]';
    }
    return '';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Map className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Floor Plan</h2>
      </div>

      <div className="w-full aspect-[4/3] bg-dark-900/50 rounded-xl p-4 flex items-center justify-center border border-white/5">
        <svg viewBox="0 0 400 300" className="w-full h-full max-w-sm">
          {/* Living Room */}
          <g>
            <rect x="20" y="20" width="360" height="120" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="200" y="80" fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="600" textAnchor="middle">Living Room</text>
            {/* Front Door Sensor */}
            <circle cx="200" cy="20" r="6" fill={getSensorColor('front-door')} className={getSensorClass('front-door')} />
            {/* LR Motion */}
            <circle cx="360" cy="80" r="6" fill={getSensorColor('lr-motion-sec')} className={getSensorClass('lr-motion-sec')} />
          </g>

          {/* Bedroom */}
          <g>
            <rect x="20" y="160" width="170" height="120" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="105" y="225" fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="600" textAnchor="middle">Bedroom</text>
            {/* Window Sensor */}
            <circle cx="20" cy="220" r="6" fill={getSensorColor('br-window-sec')} className={getSensorClass('br-window-sec')} />
          </g>

          {/* Kitchen */}
          <g>
            <rect x="210" y="160" width="170" height="120" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="295" y="225" fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="600" textAnchor="middle">Kitchen</text>
            {/* Back Door Sensor */}
            <circle cx="380" cy="220" r="6" fill={getSensorColor('back-door')} className={getSensorClass('back-door')} />
          </g>
        </svg>
      </div>
      
      <div className="flex gap-4 mt-4 justify-center text-xs font-light text-white/60">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Normal</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Alert</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-500"></div> Offline</div>
      </div>
    </Card>
  );
};

export default FloorPlan;
