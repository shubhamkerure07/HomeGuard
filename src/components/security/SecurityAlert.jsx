import React from 'react';
import { useHome } from '../../context/HomeContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { AlertTriangle, Camera, VolumeX, ShieldCheck, Clock, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecurityAlert() {
  const { activeAlert, alarmActive, securityMode, silenceAlarm, dismissAlert } = useHome();
  const navigate = useNavigate();

  if (!activeAlert) return null;

  const handleViewCamera = () => {
    navigate('/cameras');
  };

  return (
    <Modal isOpen={!!activeAlert} onClose={dismissAlert} title="Perimeter Security Alert" size="md">
      <div className="space-y-5">
        {/* Threat Header */}
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-rose-50 border border-rose-200">
          <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0 shadow-xs">
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-rose-950 uppercase tracking-wide">Intrusion Detected</h3>
              <Badge variant="danger" size="sm">HIGH PRIORITY</Badge>
            </div>
            <p className="text-xs text-rose-800 mt-1">
              Active sensor breach reported while system is armed in {securityMode.toUpperCase()} mode.
            </p>
          </div>
        </div>

        {/* Breach Details */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-400" />
              <span>Location:</span>
            </span>
            <span className="font-bold text-slate-900">{activeAlert.location || 'Living Room'}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400" />
              <span>Timestamp:</span>
            </span>
            <span className="font-semibold text-slate-800">
              {new Date(activeAlert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Security Mode:</span>
            <span className="font-semibold uppercase text-rose-700">{securityMode}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">Alarm Status:</span>
            <span className={`font-bold ${alarmActive ? 'text-rose-600 animate-pulse' : 'text-slate-600'}`}>
              {alarmActive ? 'AUDIBLE SIREN ACTIVE' : 'SILENCED'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <Button
            variant="primary"
            onClick={handleViewCamera}
            className="flex-1 text-xs py-2.5"
          >
            <Camera size={14} />
            <span>View Camera Feed</span>
          </Button>

          {alarmActive && (
            <Button
              variant="outline"
              onClick={silenceAlarm}
              className="text-xs py-2.5 text-slate-700"
            >
              <VolumeX size={14} />
              <span>Silence Alarm</span>
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={dismissAlert}
            className="text-xs py-2.5"
          >
            Acknowledge & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
