import React, { useState } from 'react';
import { useHome } from '../context/HomeContext';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Toggle from '../components/ui/Toggle';
import { Filter } from 'lucide-react';

const Devices = () => {
  const { rooms, toggleDevice } = useHome();
  const [filter, setFilter] = useState('All');

  const allDevices = Object.values(rooms).flatMap(room => 
    room.devices.map(device => ({ ...device, roomName: room.name, roomId: room.id }))
  );

  const activeDevices = allDevices.filter(d => d.isOn ?? (d.state === 'on'));
  
  const typeCounts = allDevices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1;
    return acc;
  }, {});

  const filteredDevices = filter === 'All' 
    ? allDevices 
    : filter === 'Other'
      ? allDevices.filter(d => !['light', 'fan', 'ac'].includes(d.type))
      : allDevices.filter(d => d.type === filter.toLowerCase());

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

  const getFilterOptions = () => ['All', 'Light', 'Fan', 'AC', 'Other'];

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Header title="Devices" />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-white">{allDevices.length}</div>
              <div className="text-gray-400 text-sm font-light mt-1">Total Devices</div>
            </Card>
            <Card className="p-4 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-green-400">{activeDevices.length}</div>
              <div className="text-gray-400 text-sm font-light mt-1">Active Now</div>
            </Card>
            <Card className="p-4 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-amber-400">{typeCounts.light || 0}</div>
              <div className="text-gray-400 text-sm font-light mt-1">Lights</div>
            </Card>
            <Card className="p-4 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-cyan-400">{typeCounts.ac || 0}</div>
              <div className="text-gray-400 text-sm font-light mt-1">AC Units</div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="text-gray-400 mr-2 flex items-center gap-2">
              <Filter size={18} />
              <span className="font-medium text-sm">Filter:</span>
            </div>
            {getFilterOptions().map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === opt
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-dark-800/80 text-gray-400 border border-white/5 hover:bg-dark-700'
                }`}
              >
                {opt} {opt !== 'All' && opt !== 'Other' && typeCounts[opt.toLowerCase()] ? `(${typeCounts[opt.toLowerCase()]})` : ''}
              </button>
            ))}
          </div>

          {/* Device Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDevices.map(device => (
              <Card key={`${device.roomId}-${device.id}`} className="p-5 flex flex-col justify-between h-full hover:bg-dark-800/80 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-dark-700/50 p-3 rounded-xl border border-white/5 text-2xl">
                    {getIcon(device.type)}
                  </div>
                  <Toggle 
                    enabled={device.isOn ?? (device.state === 'on')} 
                    onChange={() => toggleDevice(device.roomId, device.id)} 
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{device.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-light">{device.roomName}</span>
                    <Badge variant={(device.isOn ?? (device.state === 'on')) ? 'success' : 'default'} size="sm">
                      {(device.isOn ?? (device.state === 'on')) ? 'ON' : 'OFF'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredDevices.length === 0 && (
              <div className="col-span-full text-center py-12 bg-dark-800/40 rounded-2xl border border-white/5 text-gray-400">
                No devices found for this filter.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Devices;
