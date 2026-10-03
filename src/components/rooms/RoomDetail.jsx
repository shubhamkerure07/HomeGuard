import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import DeviceControl from './DeviceControl';
import { Thermometer, Droplets, Shield, Activity, Sparkles } from 'lucide-react';

export default function RoomDetail({ room, isOpen, onClose }) {
  if (!room) return null;

  const activeCount = room.devices?.filter(d => d.isOn ?? (d.state === 'on')).length || 0;
  const totalCount = room.devices?.length || 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${room.icon || '🏠'} ${room.name} Management`} size="lg">
      <div className="space-y-6">
        {/* Environmental Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Thermometer size={16} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Temperature</div>
              <div className="text-sm font-bold text-slate-900">{room.temperature}°C</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Droplets size={16} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Humidity</div>
              <div className="text-sm font-bold text-slate-900">{room.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={16} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Appliances</div>
              <div className="text-sm font-bold text-slate-900">{activeCount} of {totalCount} Active</div>
            </div>
          </div>
        </div>

        {/* Room Sensors Status if present */}
        {room.sensors && Object.keys(room.sensors).length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
              Zone Sensors
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(room.sensors).map(([key, s]) => (
                <div key={key} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{s.name || key}:</span>
                  <span className="font-bold text-slate-900 capitalize">{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Device Controls Grid */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
            Connected Appliances & Lighting
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {room.devices?.map((device) => (
              <DeviceControl key={device.id} device={device} roomId={room.id} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
