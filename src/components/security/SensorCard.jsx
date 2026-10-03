import React from 'react';
import { Shield, Unlock, Lock, DoorOpen, DoorClosed, Activity, WifiOff } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function SensorCard({ sensor }) {
  const { name, type, status, location } = sensor;

  const getStatusColor = (status) => {
    switch (status) {
      case 'locked':
      case 'closed':
      case 'normal':
        return 'success';
      case 'open':
      case 'triggered':
      case 'unlocked':
        return 'danger';
      case 'offline':
        return 'default';
      default:
        return 'default';
    }
  };

  const getIcon = (type, status) => {
    if (status === 'offline') return <WifiOff className="w-5 h-5" />;
    
    switch (type) {
      case 'door':
      case 'window':
        return status === 'open' ? <DoorOpen className="w-5 h-5" /> : <DoorClosed className="w-5 h-5" />;
      case 'lock':
        return status === 'unlocked' ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />;
      case 'motion':
        return status === 'triggered' ? <Activity className="w-5 h-5" /> : <Shield className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const isTriggered = ['open', 'triggered', 'unlocked'].includes(status);
  
  return (
    <Card className={`relative overflow-hidden ${isTriggered ? 'border-red-500/50' : ''}`}>
      {isTriggered && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isTriggered ? 'bg-red-500/20 text-red-400' : 'bg-dark-700 text-blue-400'}`}>
            {getIcon(type, status)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{name}</h3>
            <p className="text-sm text-gray-400 font-light">{location}</p>
          </div>
        </div>
        
        <Badge variant={getStatusColor(status)} className={isTriggered ? 'animate-pulse' : ''}>
          {status.toUpperCase()}
        </Badge>
      </div>
    </Card>
  );
}
