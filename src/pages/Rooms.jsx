import React, { useState } from 'react';
import { useHome } from '../context/HomeContext';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import RoomDetail from '../components/rooms/RoomDetail';
import {
  Thermometer,
  Droplets,
  Lightbulb,
  Activity,
  Camera,
  ArrowRight,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function Rooms() {
  const { rooms, cameras, securitySensors } = useHome();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const getCameraStatusForRoom = (roomName) => {
    const cam = cameras?.find(c => c.location.toLowerCase().includes(roomName.toLowerCase()) || roomName.toLowerCase().includes(c.location.toLowerCase()));
    if (!cam) return 'No Camera';
    return cam.isOnline ? 'Camera Online' : 'Camera Offline';
  };

  const getMotionStatusForRoom = (roomName) => {
    const sensor = securitySensors?.find(s => s.type === 'motion' && (s.location.toLowerCase().includes(roomName.toLowerCase()) || s.name.toLowerCase().includes(roomName.toLowerCase())));
    if (!sensor) return 'Clear';
    return sensor.status === 'triggered' ? 'Motion Detected' : 'Motion Clear';
  };

  return (
    <div className="space-y-6">
      <Header
        title="Smart Rooms"
        subtitle="Individual room climate monitoring, lighting scenes, and appliance management"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.values(rooms || {}).map((room) => {
          const activeDevices = room.devices?.filter(d => d.isOn ?? (d.state === 'on')).length || 0;
          const totalDevices = room.devices?.length || 0;
          const lightDevices = room.devices?.filter(d => d.type === 'light');
          const lightsOn = lightDevices?.filter(d => d.isOn ?? (d.state === 'on')).length || 0;
          const motionStatus = getMotionStatusForRoom(room.name);
          const cameraStatus = getCameraStatusForRoom(room.name);

          return (
            <Card
              key={room.id}
              hover
              onClick={() => setSelectedRoom(room)}
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                      {room.icon || '🏠'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                        {room.name}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {activeDevices} of {totalDevices} Devices Active
                      </span>
                    </div>
                  </div>

                  <Badge variant={activeDevices > 0 ? 'success' : 'default'} size="sm">
                    {activeDevices > 0 ? 'Operating' : 'Standby'}
                  </Badge>
                </div>

                {/* Climate & Lighting Stats */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Thermometer size={14} className="text-rose-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Temp</span>
                      <span className="font-bold text-slate-900">{room.temperature}°C</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplets size={14} className="text-blue-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Humidity</span>
                      <span className="font-bold text-slate-900">{room.humidity}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-amber-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Lights</span>
                      <span className="font-bold text-slate-900">{lightsOn}/{lightDevices?.length || 0} On</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">PIR Motion</span>
                      <span className={`font-bold ${motionStatus.includes('Detected') ? 'text-rose-600' : 'text-slate-900'}`}>
                        {motionStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Camera preview badge */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Camera size={13} className="text-slate-400" />
                    <span>{cameraStatus}</span>
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Tap to inspect controls</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                <span className="flex items-center gap-1">
                  <Sliders size={13} />
                  <span>Configure Appliances</span>
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomDetail
          room={selectedRoom}
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
