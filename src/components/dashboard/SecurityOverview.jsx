import React from 'react';
import { useHome } from '../../context/HomeContext';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { Shield, DoorOpen, DoorClosed, CheckCircle, AlertTriangle, Camera } from 'lucide-react';

const SecurityOverview = () => {
  const { securityMode, allDoorsLocked, allWindowsClosed, motionClear, camerasOnline, cameras } = useHome();

  const getModeColor = (mode) => {
    switch(mode) {
      case 'away': return 'text-red-400';
      case 'sleep': return 'text-purple-400';
      case 'maintenance': return 'text-amber-400';
      default: return 'text-emerald-400';
    }
  };

  const getBadgeVariant = (mode) => {
    switch(mode) {
      case 'away': return 'danger';
      case 'sleep': return 'purple';
      case 'maintenance': return 'warning';
      default: return 'success';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield className={`w-6 h-6 ${getModeColor(securityMode)}`} />
          Security Status
        </h2>
        <Badge variant={getBadgeVariant(securityMode)}>
          {securityMode ? securityMode.toUpperCase() : 'ARMED'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            {allDoorsLocked ? <DoorClosed className="text-green-400" /> : <DoorOpen className="text-amber-400" />}
            <span className="font-light">Doors</span>
          </div>
          <span className={`font-semibold ${allDoorsLocked ? 'text-green-400' : 'text-amber-400'}`}>
            {allDoorsLocked ? 'LOCKED' : 'UNLOCKED'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            {allWindowsClosed ? <CheckCircle className="text-green-400" /> : <AlertTriangle className="text-amber-400" />}
            <span className="font-light">Windows</span>
          </div>
          <span className={`font-semibold ${allWindowsClosed ? 'text-green-400' : 'text-amber-400'}`}>
            {allWindowsClosed ? 'CLOSED' : 'OPEN'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            {motionClear ? <CheckCircle className="text-green-400" /> : <AlertTriangle className="text-red-400" />}
            <span className="font-light">Motion</span>
          </div>
          <span className={`font-semibold ${motionClear ? 'text-green-400' : 'text-red-400'}`}>
            {motionClear ? 'CLEAR' : 'DETECTED'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <Camera className="text-blue-400" />
            <span className="font-light">Cameras</span>
          </div>
          <span className="font-semibold text-blue-400">
            {camerasOnline}/{cameras?.length || 0} ONLINE
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SecurityOverview;
