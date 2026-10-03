import React from 'react';
import Header from '../components/layout/Header';
import CameraFeed from '../components/cameras/CameraFeed';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useHome } from '../context/HomeContext';
import { Video, ShieldCheck, HardDrive, Wifi, Info } from 'lucide-react';

export default function Cameras() {
  const { cameras } = useHome();
  const total = cameras.length;
  const online = cameras.filter(c => c.isOnline ?? (c.status === 'online')).length;

  return (
    <div className="space-y-6">
      <Header
        title="Surveillance & Camera Hub"
        subtitle="24/7 high-definition simulated video feeds with AI motion detection"
      />

      {/* Camera System Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ONLINE CAMERAS</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{online} of {total} Online</div>
          </div>
          <Badge variant={online === total ? 'success' : 'warning'}>
            {online === total ? '100% Coverage' : `${total - online} Offline`}
          </Badge>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI MOTION DETECTION</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">Active</div>
          </div>
          <Badge variant="info">Smart Vision</Badge>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">CLOUD STORAGE</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">30 Days Loop</div>
          </div>
          <Badge variant="default">Encrypted</Badge>
        </Card>
      </div>

      {/* Notice info pill */}
      <div className="px-4 py-2.5 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-800 flex items-center gap-2">
        <Info size={15} className="text-blue-600 shrink-0" />
        <span>
          <strong>Prototype Simulation Note:</strong> Camera streams are simulated for demonstration. In deployment, connect ESP32-CAM or RTSP network cameras via local NVR.
        </span>
      </div>

      {/* 4 Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cameras.map((camera) => (
          <CameraFeed key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
}
