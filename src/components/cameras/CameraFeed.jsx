import React, { useState, useEffect } from 'react';
import { Video, Maximize, AlertCircle, Clock, CheckCircle, VideoOff } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import { useHome } from '../../context/HomeContext';

const CameraFeed = ({ camera }) => {
  const { toggleCamera } = useHome();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isOnline = camera.isOnline ?? (camera.status === 'online');

  return (
    <Card className="flex flex-col overflow-hidden p-0 border-white/10 transition-all duration-300 hover:scale-[1.02]">
      <div className="p-4 flex justify-between items-center border-b border-white/10 bg-dark-800/80">
        <div className="flex items-center gap-3">
          <Video className="w-5 h-5 text-cyan-500" />
          <div>
            <h3 className="font-semibold">{camera.name}</h3>
            <p className="text-xs text-dark-300 font-light">{camera.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {camera.motionDetected && (
            <Badge variant="danger" icon={AlertCircle}>Motion</Badge>
          )}
          <Badge variant={isOnline ? 'success' : 'secondary'} icon={isOnline ? CheckCircle : VideoOff}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      <div className="relative aspect-video bg-dark-950 flex items-center justify-center overflow-hidden group">
        {isOnline ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-dark-900/10 camera-noise mix-blend-overlay opacity-30 pointer-events-none"></div>
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
              <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                {camera.name} - CAM{camera.id}
              </span>
              <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="text-dark-400 font-mono text-sm tracking-widest opacity-20">
              [ NO SIGNAL PREVIEW ]
            </div>

            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-1 rounded backdrop-blur-sm border border-cyan-500/20">
                Simulated Feed
              </span>
            </div>

            <button 
              onClick={() => alert('Fullscreen simulation')}
              className="absolute bottom-4 right-4 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-lg backdrop-blur-sm text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-dark-400 gap-3">
            <VideoOff className="w-12 h-12 opacity-50" />
            <p className="text-sm font-light">Camera Offline</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-dark-800/80 border-t border-white/10 flex justify-between items-center">
        <span className="text-sm text-dark-200">Device Power</span>
        <Toggle 
          checked={isOnline} 
          onChange={() => toggleCamera(camera.id)} 
        />
      </div>
    </Card>
  );
};

export default CameraFeed;
