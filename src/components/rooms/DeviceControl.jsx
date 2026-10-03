import React from 'react';
import { useHome } from '../../context/HomeContext';
import Toggle from '../ui/Toggle';
import Card from '../ui/Card';

const DeviceControl = ({ device, roomId }) => {
  const { toggleDevice, setDeviceProperty } = useHome();

  const getIcon = (type) => {
    switch (type) {
      case 'light': return '💡';
      case 'fan': return '🌀';
      case 'ac': return '❄️';
      case 'tv': return '📺';
      case 'computer': return '🖥️';
      case 'smoke_sensor': return '🔥';
      default: return '🔌';
    }
  };

  const handleToggle = () => {
    toggleDevice(roomId, device.id);
  };

  const handleSliderChange = (e) => {
    setDeviceProperty(roomId, device.id, 'brightness', parseInt(e.target.value, 10));
  };

  const handleSpeedChange = (speed) => {
    setDeviceProperty(roomId, device.id, 'speed', speed);
  };

  const handleTempChange = (e) => {
    setDeviceProperty(roomId, device.id, 'temperature', parseInt(e.target.value, 10));
  };

  const handleModeChange = (mode) => {
    setDeviceProperty(roomId, device.id, 'mode', mode);
  };

  const isOn = device.isOn ?? (device.state === 'on');

  return (
    <Card className="p-4 bg-dark-800/40 border border-white/5 rounded-xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getIcon(device.type)}</span>
          <div>
            <h4 className="font-semibold text-white">{device.name}</h4>
            <span className={`text-xs ${isOn ? 'text-green-400' : 'text-gray-400'}`}>
              {isOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
        <Toggle enabled={isOn} onChange={handleToggle} />
      </div>

      {device.type === 'light' && isOn && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Brightness</span>
            <span>{device.brightness || 100}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={device.brightness || 100}
            onChange={handleSliderChange}
            className="w-full accent-blue-500"
          />
        </div>
      )}

      {device.type === 'fan' && isOn && (
        <div className="mt-2">
          <div className="text-xs text-gray-400 mb-2">Speed</div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`flex-1 py-1 rounded-md text-xs font-medium transition-colors ${
                  (device.speed || 1) === speed 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-dark-900/50 text-gray-400 border border-white/5 hover:bg-dark-700'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      )}

      {device.type === 'ac' && isOn && (
        <div className="mt-2 space-y-4">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Temperature</span>
              <span>{device.temperature || 24}°C</span>
            </div>
            <input 
              type="range" 
              min="16" max="30" 
              value={device.temperature || 24}
              onChange={handleTempChange}
              className="w-full accent-cyan-500"
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-2">Mode</div>
            <div className="flex gap-2">
              {['cool', 'heat', 'auto'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`flex-1 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    (device.mode || 'cool') === mode 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'bg-dark-900/50 text-gray-400 border border-white/5 hover:bg-dark-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DeviceControl;
