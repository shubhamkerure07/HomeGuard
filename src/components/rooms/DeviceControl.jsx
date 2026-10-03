import React from 'react';
import { useHome } from '../../context/HomeContext';
import Toggle from '../ui/Toggle';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Lightbulb, Fan, Wind, Tv, Monitor, Shield, Flame, Lock } from 'lucide-react';

export default function DeviceControl({ device, roomId }) {
  const { toggleDevice, setDeviceProperty } = useHome();

  const getIcon = (type) => {
    switch (type) {
      case 'light': return <Lightbulb size={20} className="text-amber-500" />;
      case 'fan': return <Fan size={20} className="text-blue-500" />;
      case 'ac': return <Wind size={20} className="text-cyan-500" />;
      case 'tv': return <Tv size={20} className="text-purple-500" />;
      case 'computer':
      case 'appliance': return <Monitor size={20} className="text-slate-700" />;
      case 'smoke_sensor': return <Flame size={20} className="text-rose-500" />;
      case 'lock': return <Lock size={20} className="text-slate-900" />;
      default: return <Lightbulb size={20} className="text-slate-700" />;
    }
  };

  const handleToggle = () => {
    toggleDevice(roomId, device.id);
  };

  const isOn = device.isOn ?? (device.state === 'on');

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isOn
        ? 'bg-white border-slate-300 shadow-sm ring-1 ring-slate-900/5'
        : 'bg-slate-50/60 border-slate-200/70 opacity-80'
    }`}>
      {/* Top row: Icon, Name, On/Off Toggle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isOn ? 'bg-slate-100' : 'bg-slate-200/50'}`}>
            {getIcon(device.type)}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{device.name}</h4>
            <span className={`text-[11px] font-semibold ${isOn ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isOn ? 'Active & Powered' : 'Standby / Off'}
            </span>
          </div>
        </div>

        <Toggle enabled={isOn} onChange={handleToggle} />
      </div>

      {/* Sub-controls based on device type */}
      {/* 1. Light Brightness Slider */}
      {device.type === 'light' && isOn && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 animate-fadeIn">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Brightness</span>
            <span className="font-bold text-slate-900">{device.brightness || 80}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.brightness || 80}
            onChange={(e) => setDeviceProperty(roomId, device.id, 'brightness', parseInt(e.target.value, 10))}
            className="w-full accent-slate-900 cursor-pointer"
          />
        </div>
      )}

      {/* 2. Fan Speed Selector */}
      {device.type === 'fan' && isOn && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-fadeIn">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Fan Speed</span>
            <span className="font-bold text-slate-900">Level {device.speed || 1}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setDeviceProperty(roomId, device.id, 'speed', speed)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  (device.speed || 1) === speed
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Climate Control / AC */}
      {device.type === 'ac' && isOn && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-fadeIn">
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Thermostat Target</span>
              <span className="font-bold text-slate-900">{device.temperature || 24}°C</span>
            </div>
            <input
              type="range"
              min="16"
              max="30"
              value={device.temperature || 24}
              onChange={(e) => setDeviceProperty(roomId, device.id, 'temperature', parseInt(e.target.value, 10))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Climate Mode</div>
            <div className="grid grid-cols-3 gap-1.5">
              {['cool', 'heat', 'auto'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDeviceProperty(roomId, device.id, 'mode', mode)}
                  className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    (device.mode || 'cool') === mode
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Power rating footer */}
      {device.power && (
        <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100/60">
          <span>Rated Power</span>
          <span className="font-medium text-slate-500">{device.power}W</span>
        </div>
      )}
    </div>
  );
}
