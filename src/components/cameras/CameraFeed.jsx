import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import { useHome } from '../../context/HomeContext';
import {
  Video,
  Maximize2,
  AlertCircle,
  Clock,
  VideoOff,
  Camera,
  Activity,
  Shield,
  CircleDot
} from 'lucide-react';

export default function CameraFeed({ camera }) {
  const { toggleCamera } = useHome();
  const [time, setTime] = useState(new Date());
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isOnline = camera.isOnline ?? (camera.status === 'online');

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <Card className="p-0 overflow-hidden flex flex-col justify-between">
      {/* Feed Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isOnline ? 'bg-slate-100 text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
            <Video size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{camera.name}</h3>
            <span className="text-[11px] text-slate-400">{camera.location} &bull; {camera.resolution || '1080p Full HD'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {camera.motionDetected && (
            <Badge variant="danger" pulse size="sm">
              <Activity size={12} />
              <span>MOTION</span>
            </Badge>
          )}
          <Badge variant={isOnline ? 'success' : 'default'} size="sm">
            {isOnline ? 'LIVE' : 'OFFLINE'}
          </Badge>
        </div>
      </div>

      {/* Simulated Video Feed Area */}
      <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden group">
        {isOnline ? (
          <>
            {/* Camera feed noise and simulated scanlines */}
            <div className="absolute inset-0 camera-feed-bg" />

            {/* Top-left Overlay: Camera ID & Timestamp */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[11px] font-mono text-white/90">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-semibold uppercase tracking-wider">REC</span>
                <span>&bull;</span>
                <span>CAM #{camera.id.replace('cam-', '').toUpperCase()}</span>
              </div>
              <div className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 w-fit text-[10px]">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>

            {/* Center target indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <CircleDot size={48} className="text-white" />
            </div>

            {/* Simulated Watermark */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="text-[10px] font-semibold bg-black/60 text-slate-300 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-xs">
                SIMULATED RTSP FEED
              </span>
            </div>

            {/* Snapshot notification */}
            {snapshotTaken && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20 text-slate-900 font-bold text-xs animate-fadeIn">
                📸 Snapshot Saved to Secure Vault
              </div>
            )}

            {/* Hover Actions: Snapshot & Fullscreen */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleSnapshot}
                title="Capture Snapshot"
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
              >
                <Camera size={14} />
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                title="Fullscreen View"
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-2 p-6 text-center">
            <VideoOff size={32} className="opacity-40" />
            <span className="text-xs font-semibold text-slate-400">Camera Feed Disconnected</span>
            <span className="text-[11px] text-slate-500">Device is currently powered down</span>
          </div>
        )}
      </div>

      {/* Feed Controls Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-600">Hardware Power Link</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">{isOnline ? 'Active' : 'Offline'}</span>
          <Toggle
            enabled={isOnline}
            onChange={() => toggleCamera(camera.id)}
          />
        </div>
      </div>

      {/* Simulated Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-6 animate-fadeIn">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-bold text-base">{camera.name} &bull; Live Monitor</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-semibold"
            >
              Exit Fullscreen
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center text-white/40 font-mono text-sm tracking-widest">
            [ ULTRA-HD SIMULATED SURVEILLANCE FEED ]
          </div>

          <div className="text-center text-xs text-white/50">
            Press Esc or click Exit to return to dashboard
          </div>
        </div>
      )}
    </Card>
  );
}
