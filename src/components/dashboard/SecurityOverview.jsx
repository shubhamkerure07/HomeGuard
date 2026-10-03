import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import {
  ShieldCheck,
  ShieldAlert,
  DoorClosed,
  DoorOpen,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecurityOverview() {
  const {
    securityMode,
    allDoorsLocked,
    allWindowsClosed,
    motionClear,
    camerasOnline,
    cameras,
    alarmActive,
    setSecurityMode
  } = useHome();
  const navigate = useNavigate();

  const getModeBadge = () => {
    switch (securityMode) {
      case 'away':
        return { label: 'AWAY • ARMED', variant: 'danger' };
      case 'sleep':
        return { label: 'SLEEP • ARMED', variant: 'info' };
      case 'maintenance':
        return { label: 'MAINTENANCE', variant: 'warning' };
      default:
        return { label: 'HOME • ARMED', variant: 'success' };
    }
  };

  const badge = getModeBadge();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${alarmActive ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {alarmActive ? <ShieldAlert size={20} className="animate-pulse" /> : <ShieldCheck size={20} />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Perimeter Status</h2>
            <p className="text-xs text-slate-500">Continuous intrusion monitoring</p>
          </div>
        </div>
        <Badge variant={alarmActive ? 'danger' : badge.variant} pulse={alarmActive}>
          {alarmActive ? 'BREACH ALERT' : badge.label}
        </Badge>
      </div>

      {/* 4 Sensor Checklist Items */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {allDoorsLocked ? (
              <DoorClosed size={16} className="text-emerald-600" />
            ) : (
              <DoorOpen size={16} className="text-rose-600" />
            )}
            <span className="text-xs font-medium text-slate-700">Doors</span>
          </div>
          <span className={`text-[11px] font-bold ${allDoorsLocked ? 'text-emerald-700' : 'text-rose-600'}`}>
            {allDoorsLocked ? 'LOCKED' : 'OPEN'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {allWindowsClosed ? (
              <CheckCircle2 size={16} className="text-emerald-600" />
            ) : (
              <AlertTriangle size={16} className="text-amber-600" />
            )}
            <span className="text-xs font-medium text-slate-700">Windows</span>
          </div>
          <span className={`text-[11px] font-bold ${allWindowsClosed ? 'text-emerald-700' : 'text-amber-600'}`}>
            {allWindowsClosed ? 'CLOSED' : 'OPEN'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {motionClear ? (
              <CheckCircle2 size={16} className="text-emerald-600" />
            ) : (
              <Activity size={16} className="text-rose-600 animate-pulse" />
            )}
            <span className="text-xs font-medium text-slate-700">Motion</span>
          </div>
          <span className={`text-[11px] font-bold ${motionClear ? 'text-emerald-700' : 'text-rose-600'}`}>
            {motionClear ? 'CLEAR' : 'DETECTED'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Camera size={16} className="text-slate-600" />
            <span className="text-xs font-medium text-slate-700">Cameras</span>
          </div>
          <span className="text-[11px] font-bold text-slate-900">
            {camerasOnline}/{cameras?.length || 4} ON
          </span>
        </div>
      </div>

      {/* Quick Security Mode Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Quick Arm / Disarm
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'home', label: 'Home' },
            { id: 'away', label: 'Away' },
            { id: 'sleep', label: 'Sleep' },
            { id: 'maintenance', label: 'Pause' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSecurityMode(mode.id)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                securityMode === mode.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Link to Security Center */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => navigate('/security')}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 group"
        >
          <span>Open Full Security Center</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </Card>
  );
}
