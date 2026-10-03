import React, { useState } from 'react';
import { useHome } from '../context/HomeContext';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Toggle from '../components/ui/Toggle';
import {
  Lightbulb,
  Fan,
  Wind,
  Tv,
  Monitor,
  Flame,
  Lock,
  Filter,
  Sliders,
  CheckCircle2,
  Power
} from 'lucide-react';

export default function Devices() {
  const { rooms, toggleDevice, setDeviceProperty, allLightsOn } = useHome();
  const [filter, setFilter] = useState('All');

  // Flatten devices across all rooms
  const allDevices = Object.values(rooms || {}).flatMap(room =>
    (room.devices || []).map(device => ({ ...device, roomName: room.name, roomId: room.id }))
  );

  const activeDevices = allDevices.filter(d => d.isOn ?? (d.state === 'on'));

  const categories = [
    { id: 'All', label: 'All Appliances' },
    { id: 'light', label: 'Lights' },
    { id: 'fan', label: 'Fans' },
    { id: 'ac', label: 'AC / Climate' },
    { id: 'tv', label: 'TV & Media' },
    { id: 'appliance', label: 'Appliances' },
    { id: 'lock', label: 'Locks' },
  ];

  const filteredDevices = filter === 'All'
    ? allDevices
    : allDevices.filter(d => d.type === filter);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'light': return <Lightbulb size={20} className="text-amber-500" />;
      case 'fan': return <Fan size={20} className="text-blue-500" />;
      case 'ac': return <Wind size={20} className="text-cyan-500" />;
      case 'tv': return <Tv size={20} className="text-purple-500" />;
      case 'appliance': return <Monitor size={20} className="text-slate-700" />;
      case 'lock': return <Lock size={20} className="text-slate-900" />;
      default: return <Lightbulb size={20} className="text-slate-700" />;
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Appliance & Device Hub"
        subtitle="Centralized controls across all connected household smart hardware"
        action={
          <button
            onClick={() => allLightsOn()}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Lightbulb size={13} className="text-amber-500" />
            <span>All Lights On</span>
          </button>
        }
      />

      {/* Top 4 Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL CONNECTED</span>
          <div className="text-2xl font-bold text-slate-900 my-1">{allDevices.length}</div>
          <span className="text-xs text-slate-500">Across 6 zones</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">POWERED NOW</span>
          <div className="text-2xl font-bold text-emerald-600 my-1">{activeDevices.length}</div>
          <span className="text-xs text-slate-500">{((activeDevices.length / (allDevices.length || 1)) * 100).toFixed(0)}% load capacity</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">LIGHTING UNITS</span>
          <div className="text-2xl font-bold text-amber-500 my-1">
            {allDevices.filter(d => d.type === 'light').length}
          </div>
          <span className="text-xs text-slate-500">
            {allDevices.filter(d => d.type === 'light' && (d.isOn ?? (d.state === 'on'))).length} Illuminated
          </span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">HVAC & CLIMATE</span>
          <div className="text-2xl font-bold text-cyan-600 my-1">
            {allDevices.filter(d => d.type === 'ac').length} Units
          </div>
          <span className="text-xs text-slate-500">Dual Inverter Eco</span>
        </Card>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 shadow-2xs'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDevices.map((device) => {
          const isOn = device.isOn ?? (device.state === 'on');

          return (
            <Card
              key={`${device.roomId}-${device.id}`}
              className={`p-5 flex flex-col justify-between transition-all ${
                isOn ? 'bg-white border-slate-300 shadow-sm ring-1 ring-slate-900/5' : 'bg-slate-50/60 border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isOn ? 'bg-slate-100' : 'bg-slate-200/50'}`}>
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{device.name}</h3>
                      <span className="text-[11px] text-slate-400">{device.roomName}</span>
                    </div>
                  </div>

                  <Toggle
                    enabled={isOn}
                    onChange={() => toggleDevice(device.roomId, device.id)}
                  />
                </div>

                {/* Sub controls */}
                {device.type === 'light' && isOn && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Brightness</span>
                      <span className="font-bold text-slate-900">{device.brightness || 80}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={device.brightness || 80}
                      onChange={(e) => setDeviceProperty(device.roomId, device.id, 'brightness', parseInt(e.target.value, 10))}
                      className="w-full accent-slate-900 cursor-pointer"
                    />
                  </div>
                )}

                {device.type === 'fan' && isOn && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Speed</span>
                      <span className="font-bold text-slate-900">Level {device.speed || 1}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setDeviceProperty(device.roomId, device.id, 'speed', spd)}
                          className={`py-1 rounded text-[11px] font-semibold transition-all ${
                            (device.speed || 1) === spd
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {device.type === 'ac' && isOn && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Thermostat</span>
                      <span className="font-bold text-slate-900">{device.temperature || 24}°C</span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="30"
                      value={device.temperature || 24}
                      onChange={(e) => setDeviceProperty(device.roomId, device.id, 'temperature', parseInt(e.target.value, 10))}
                      className="w-full accent-slate-900 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="capitalize font-semibold text-slate-400">Type: {device.type}</span>
                <span className={`font-semibold ${isOn ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {isOn ? '● Running' : '○ Standby'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
