import React from 'react';
import Modal from '../ui/Modal';
import DeviceControl from './DeviceControl';
import { Thermometer, Droplets } from 'lucide-react';

const RoomDetail = ({ room, isOpen, onClose }) => {
  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={room.name} size="lg">
      <div className="space-y-6">
        {/* Environment Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
              <Thermometer size={24} />
            </div>
            <div>
              <div className="text-gray-400 text-sm font-light">Temperature</div>
              <div className="text-xl font-bold text-white">{room.temperature}°C</div>
            </div>
          </div>
          <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-500">
              <Droplets size={24} />
            </div>
            <div>
              <div className="text-gray-400 text-sm font-light">Humidity</div>
              <div className="text-xl font-bold text-white">{room.humidity}%</div>
            </div>
          </div>
        </div>

        {/* Devices */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Devices</h3>
          {room.devices && room.devices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.devices.map(device => (
                <DeviceControl key={device.id} device={device} roomId={room.id} />
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8 bg-dark-900/30 rounded-xl border border-white/5">
              No devices in this room.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RoomDetail;
