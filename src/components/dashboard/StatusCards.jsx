import React from 'react';
import { useHome } from '../../context/HomeContext';
import { Thermometer, Droplets, Zap, Smartphone } from 'lucide-react';

const StatusCards = () => {
  const { temperature, humidity, energyUsage, activeDeviceCount } = useHome();

  const cards = [
    { icon: <Thermometer className="w-6 h-6 text-blue-400" />, label: 'Temperature', value: `${temperature}°C` },
    { icon: <Droplets className="w-6 h-6 text-cyan-400" />, label: 'Humidity', value: `${humidity}%` },
    { icon: <Zap className="w-6 h-6 text-amber-400" />, label: 'Energy', value: `${energyUsage} kW` },
    { icon: <Smartphone className="w-6 h-6 text-purple-400" />, label: 'Active Devices', value: activeDeviceCount }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-dark-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
          <div className="p-3 bg-white/5 rounded-xl">
            {card.icon}
          </div>
          <div>
            <div className="text-white/60 font-light text-sm">{card.label}</div>
            <div className="text-2xl font-semibold text-white">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
