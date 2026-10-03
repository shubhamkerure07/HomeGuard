import React from 'react';
import { useHome } from '../../context/HomeContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle, Video, BellOff } from 'lucide-react';

export default function SecurityAlert() {
  const { activeAlert, silenceAlarm, dismissAlert, securityMode } = useHome();

  if (!activeAlert) return null;

  return (
    <Modal isOpen={true} onClose={() => {}} title="" className="max-w-md border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
      <div className="flex flex-col items-center text-center pb-4">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-red-500 mb-2 tracking-wide uppercase">
          Security Alert
        </h2>
        
        <p className="text-white text-lg mb-1">
          {activeAlert.message || 'Motion detected in:'} <span className="font-semibold">{activeAlert.location || 'Unknown'}</span>
        </p>
        
        <p className="text-gray-400 text-sm mb-6 font-light">
          {new Date(activeAlert.timestamp || Date.now()).toLocaleTimeString()} &bull; System Mode: <span className="uppercase text-gray-300 font-semibold">{securityMode}</span>
        </p>
        
        <div className="flex flex-col gap-3 w-full">
          <Button variant="primary" className="w-full flex items-center justify-center gap-2" onClick={() => console.log('View Camera clicked')}>
            <Video className="w-4 h-4" /> View Camera
          </Button>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="danger" className="flex items-center justify-center gap-2 bg-dark-700 text-white hover:bg-dark-600 border border-red-500/30" onClick={silenceAlarm}>
              <BellOff className="w-4 h-4" /> Silence Alarm
            </Button>
            
            <Button variant="secondary" onClick={dismissAlert}>
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
