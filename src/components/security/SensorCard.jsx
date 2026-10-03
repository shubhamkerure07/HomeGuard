import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { DoorClosed, DoorOpen, Shield, Activity, WifiOff, Battery } from 'lucide-react';

export default function SensorCard({ sensor }) {
  const { name, type, status, location, battery = 90 } = sensor;

  const isTriggered = status === 'open' || status === 'triggered' || status === 'unlocked';

  const getStatusBadge = () => {
    switch (status) {
      case 'locked':
        return { label: 'LOCKED', variant: 'success' };
      case 'closed':
        return { label: 'CLOSED', variant: 'success' };
      case 'normal':
        return { label: 'CLEAR', variant: 'success' };
      case 'open':
        return { label: 'OPEN', variant: 'danger' };
      case 'unlocked':
        return { label: 'UNLOCKED', variant: 'warning' };
      case 'triggered':
        return { label: 'TRIGGERED', variant: 'danger' };
      default:
        return { label: 'OFFLINE', variant: 'default' };
    }
  };

  const getIcon = () => {
    if (status === 'offline') return <WifiOff size={18} className="text-slate-400" />;
    switch (type) {
      case 'door':
        return status === 'open' ? <DoorOpen size={18} className="text-rose-600" /> : <DoorClosed size={18} className="text-slate-700" />;
      case 'window':
        return status === 'open' ? <DoorOpen size={18} className="text-rose-600" /> : <DoorClosed size={18} className="text-slate-700" />;
      case 'motion':
        return status === 'triggered' ? <Activity size={18} className="text-rose-600 animate-pulse" /> : <Shield size={18} className="text-slate-700" />;
      default:
        return <Shield size={18} className="text-slate-700" />;
    }
  };

  const badge = getStatusBadge();

  return (
    <Card className={`p-4 transition-all ${isTriggered ? 'border-rose-300 ring-2 ring-rose-500/10 bg-rose-50/20' : 'bg-white'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isTriggered ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-800'}`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{name}</h3>
            <span className="text-[11px] text-slate-500">{location}</span>
          </div>
        </div>

        <Badge variant={badge.variant} pulse={isTriggered} size="sm">
          {badge.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
        <span className="uppercase font-semibold tracking-wider text-slate-500">Zone: {type}</span>
        <div className="flex items-center gap-1">
          <Battery size={13} className="text-slate-400" />
          <span>{battery}%</span>
        </div>
      </div>
    </Card>
  );
}
