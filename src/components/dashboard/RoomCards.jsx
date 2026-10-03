import React from 'react';
import { useHome } from '../../context/HomeContext';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Home, Zap, Thermometer, Power } from 'lucide-react';

const RoomCards = () => {
  const { rooms } = useHome();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.values(rooms || {}).map((room) => {
        const activeDevices = room.devices?.filter(d => d.isOn ?? (d.state === 'on')).length || 0;
        const totalDevices = room.devices?.length || 0;
        const lightDevice = room.devices?.find(d => d.type === 'light');

        return (
          <Card 
            key={room.id} 
            className="p-5 cursor-pointer hover:border-blue-500/50 transition-all duration-300 group"
            onClick={() => navigate('/rooms')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl p-2 bg-white/5 rounded-xl">
                  {room.icon || '🏠'}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">{room.name}</h3>
                  <span className="text-xs text-slate-400">{activeDevices}/{totalDevices} Active</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                {room.temperature}°C
              </span>
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <Button 
                variant={lightDevice?.isOn ? "primary" : "outline"} 
                className="flex-1 text-xs py-1.5" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  navigate('/rooms');
                }}
              >
                💡 {lightDevice?.isOn ? 'Lights On' : 'Controls'}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default RoomCards;
