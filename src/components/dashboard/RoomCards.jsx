import React from 'react';
import { useHome } from '../../context/HomeContext';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Thermometer, Droplets, ArrowRight } from 'lucide-react';

export default function RoomCards() {
  const { rooms } = useHome();
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Room Status</h2>
          <p className="text-xs text-slate-500">Quick appliance & climate glance</p>
        </div>
        <button
          onClick={() => navigate('/rooms')}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 group"
        >
          <span>All 6 Rooms</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.values(rooms || {}).slice(0, 4).map((room) => {
          const activeDevices = room.devices?.filter(d => d.isOn ?? (d.state === 'on')).length || 0;
          const totalDevices = room.devices?.length || 0;

          return (
            <Card
              key={room.id}
              hover
              onClick={() => navigate('/rooms')}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                  {room.icon || '🏠'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{room.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-500">{activeDevices} of {totalDevices} On</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-[11px] font-semibold text-slate-700">{room.temperature}°C</span>
                  </div>
                </div>
              </div>
              <Badge variant={activeDevices > 0 ? 'success' : 'default'} size="sm">
                {activeDevices > 0 ? `${activeDevices} Active` : 'Idle'}
              </Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
