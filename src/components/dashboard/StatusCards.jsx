import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../ui/Card';
import { Thermometer, Droplets, Zap, Smartphone, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatusCards() {
  const { temperature, humidity, energyUsage, activeDeviceCount } = useHome();

  const cards = [
    {
      label: 'INDOOR TEMPERATURE',
      value: `${temperature}°C`,
      subtitle: 'Optimal comfort',
      icon: Thermometer,
      iconColor: 'text-rose-500 bg-rose-50',
    },
    {
      label: 'HUMIDITY LEVEL',
      value: `${humidity}%`,
      subtitle: 'Healthy indoor air',
      icon: Droplets,
      iconColor: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'CURRENT ENERGY',
      value: `${energyUsage} kW`,
      subtitle: 'Normal baseline draw',
      icon: Zap,
      iconColor: 'text-amber-500 bg-amber-50',
    },
    {
      label: 'ACTIVE APPLIANCES',
      value: `${activeDeviceCount} Active`,
      subtitle: 'Across 6 rooms',
      icon: Smartphone,
      iconColor: 'text-purple-500 bg-purple-50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card key={idx} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl ${card.iconColor}`}>
                <Icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
              {card.value}
            </div>
            <div className="text-xs text-slate-500 font-normal">
              {card.subtitle}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
