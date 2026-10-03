import React, { useState } from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../ui/Card';
import { Compass, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FloorPlan() {
  const { securitySensors, rooms } = useHome();
  const navigate = useNavigate();
  const [activePin, setActivePin] = useState(null);

  const getSensor = (id) => securitySensors?.find(s => s.id === id);

  const isTriggered = (id) => {
    const s = getSensor(id);
    return s && (s.status === 'open' || s.status === 'triggered' || s.status === 'unlocked');
  };

  const getPinColor = (id) => {
    const s = getSensor(id);
    if (!s) return '#94a3b8'; // neutral
    if (s.status === 'open' || s.status === 'triggered' || s.status === 'unlocked') {
      return '#ef4444'; // alert red
    }
    return '#10b981'; // safe emerald
  };

  const pins = [
    { id: 'front-door', name: 'Front Entrance Door', x: 215, y: 35, room: 'Hallway' },
    { id: 'lr-motion-sec', name: 'Living Room PIR', x: 130, y: 95, room: 'Living Room' },
    { id: 'lr-window-sec', name: 'Living Room Bay Window', x: 30, y: 110, room: 'Living Room' },
    { id: 'br-window-sec', name: 'Bedroom Balcony Window', x: 30, y: 220, room: 'Bedroom' },
    { id: 'hall-motion', name: 'Hall Corridor Motion', x: 215, y: 155, room: 'Hallway' },
    { id: 'back-door', name: 'Kitchen Patio Door', x: 400, y: 240, room: 'Kitchen' },
    { id: 'backyard-motion', name: 'Backyard Perimeter', x: 310, y: 275, room: 'Backyard' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Interactive Floor Plan</h2>
          <p className="text-xs text-slate-500">Live 2D architectural map with real-time sensor points</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium">Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[11px] font-medium">Breach</span>
          </div>
        </div>
      </div>

      {/* Architectural SVG Plan */}
      <div className="relative w-full bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 440 300" className="w-full max-w-lg h-auto select-none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="440" height="300" fill="url(#grid)" />

          {/* Exterior Walls */}
          <rect x="25" y="25" width="390" height="250" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />

          {/* Room 1: Living Room (Top-Left) */}
          <g onClick={() => navigate('/rooms')} className="cursor-pointer group">
            <rect x="25" y="25" width="160" height="135" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="105" y="55" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">LIVING ROOM</text>
            <text x="105" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">{rooms?.['living-room']?.temperature || 24}°C &bull; 62%</text>
            {/* Sofa representation */}
            <rect x="50" y="80" width="70" height="24" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          </g>

          {/* Room 2: Master Bedroom (Bottom-Left) */}
          <g onClick={() => navigate('/rooms')} className="cursor-pointer group">
            <rect x="25" y="160" width="160" height="115" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="105" y="195" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">BEDROOM</text>
            <text x="105" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">{rooms?.bedroom?.temperature || 22}°C &bull; 58%</text>
            {/* Bed representation */}
            <rect x="55" y="225" width="60" height="40" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          </g>

          {/* Hallway & Foyer (Center column) */}
          <g>
            <rect x="185" y="25" width="65" height="250" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="217" y="145" fill="#64748b" fontSize="9" fontWeight="600" textAnchor="middle" transform="rotate(-90, 217, 145)">CENTRAL FOYER</text>
          </g>

          {/* Room 3: Kitchen & Dining (Top-Right) */}
          <g onClick={() => navigate('/rooms')} className="cursor-pointer group">
            <rect x="250" y="25" width="165" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="332" y="55" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">KITCHEN</text>
            <text x="332" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">{rooms?.kitchen?.temperature || 26}°C &bull; 55%</text>
            {/* Counter */}
            <path d="M 360 80 L 395 80 L 395 140" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </g>

          {/* Room 4: Office & Garage (Bottom-Right) */}
          <g onClick={() => navigate('/rooms')} className="cursor-pointer group">
            <rect x="250" y="160" width="165" height="115" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="332" y="195" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">OFFICE / LAB</text>
            <text x="332" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">{rooms?.office?.temperature || 23}°C &bull; 50%</text>
            {/* Desk */}
            <rect x="310" y="225" width="50" height="24" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          </g>

          {/* Main Front Door Cutout Representation */}
          <path d="M 205 25 L 230 25" stroke="#0f172a" strokeWidth="4" />
          <path d="M 205 25 A 25 25 0 0 1 230 50" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

          {/* Back Door Cutout */}
          <path d="M 415 225 L 415 255" stroke="#0f172a" strokeWidth="4" />

          {/* Interactive Sensor Pins */}
          {pins.map((pin) => {
            const triggered = isTriggered(pin.id);
            const color = getPinColor(pin.id);
            return (
              <g
                key={pin.id}
                onMouseEnter={() => setActivePin(pin)}
                onMouseLeave={() => setActivePin(null)}
                className="cursor-pointer transition-transform hover:scale-125"
              >
                {/* Glow ring if triggered */}
                {triggered && (
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="10"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    className="animate-ping opacity-75"
                  />
                )}
                {/* Outer halo */}
                <circle cx={pin.x} cy={pin.y} r="6" fill="#ffffff" stroke={color} strokeWidth="2" />
                {/* Inner dot */}
                <circle cx={pin.x} cy={pin.y} r="3" fill={color} />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {activePin && (
          <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-3 py-1.5 shadow-md text-xs pointer-events-none animate-fadeIn">
            <span className="font-bold text-slate-900">{activePin.name}</span>
            <div className="text-[11px] text-slate-500">
              {activePin.room} &bull; Status: <span className={`font-semibold ${isTriggered(activePin.id) ? 'text-rose-600' : 'text-emerald-600'}`}>{getSensor(activePin.id)?.status.toUpperCase() || 'NORMAL'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Click on any room to access appliance controls</span>
        <button
          onClick={() => navigate('/rooms')}
          className="font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          View all 6 rooms &rarr;
        </button>
      </div>
    </Card>
  );
}
