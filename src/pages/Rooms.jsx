import React, { useState } from 'react';
import { useHome } from '../context/HomeContext';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import RoomDetail from '../components/rooms/RoomDetail';
import { Thermometer, Droplets } from 'lucide-react';

const Rooms = () => {
  const { rooms } = useHome();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Header title="Rooms" />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(rooms).map(room => {
              const activeDevices = room.devices.filter(d => d.isOn ?? (d.state === 'on')).length;
              const totalDevices = room.devices.length;
              
              return (
                <Card 
                  key={room.id} 
                  className="p-6 cursor-pointer hover:bg-dark-800/80 transition-all duration-300 hover:-translate-y-1 group"
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{room.icon}</span>
                      <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    </div>
                    <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {activeDevices}/{totalDevices} ON
                    </div>
                  </div>
                  
                  <div className="flex gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Thermometer size={16} className="text-amber-500" />
                      <span className="font-semibold">{room.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Droplets size={16} className="text-cyan-500" />
                      <span className="font-semibold">{room.humidity}%</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {room.devices.map(device => {
                      const isAc = device.type === 'ac';
                      const isLight = device.type === 'light';
                      
                      let deviceIcon = '🔌';
                      if (device.type === 'light') deviceIcon = '💡';
                      if (device.type === 'fan') deviceIcon = '🌀';
                      if (device.type === 'ac') deviceIcon = '❄️';
                      if (device.type === 'tv') deviceIcon = '📺';
                      if (device.type === 'computer') deviceIcon = '🖥️';
                      if (device.type === 'smoke_sensor') deviceIcon = '🔥';

                      return (
                        <div 
                          key={device.id} 
                          title={device.name}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                            (device.isOn ?? (device.state === 'on')) 
                              ? 'bg-dark-700 border-white/20' 
                              : 'bg-dark-900/50 border-white/5 opacity-50'
                          }`}
                        >
                          <span className="text-lg">{deviceIcon}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {selectedRoom && (
        <RoomDetail 
          room={selectedRoom} 
          isOpen={!!selectedRoom} 
          onClose={closeRoomDetail} 
        />
      )}
    </div>
  );
};

export default Rooms;
