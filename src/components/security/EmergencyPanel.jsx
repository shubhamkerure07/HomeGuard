import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useHome } from '../../context/HomeContext';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import { ShieldAlert, Lock, Lightbulb, Phone } from 'lucide-react';

export default function EmergencyPanel() {
  const { triggerAlert, lockAllDoors, allLightsOn } = useHome();

  const handleTriggerAlarm = () => {
    if (window.confirm('Are you sure you want to trigger the emergency alarm?')) {
      triggerAlert('Manual alarm triggered', 'System', 'manual');
    }
  };

  const handleLockDoors = () => {
    if (window.confirm('Lock all doors?')) {
      lockAllDoors();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-red-500" /> Emergency Controls
      </h2>
      
      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-gray-400 font-light italic mb-1">
            * Note: These are simulated actions for the demo system.
          </div>
          
          <Button 
            variant="danger" 
            className="w-full flex items-center justify-center gap-2 py-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            onClick={handleTriggerAlarm}
          >
            <ShieldAlert className="w-5 h-5" /> Trigger Alarm
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-2 py-3 border border-white/10"
            onClick={handleLockDoors}
          >
            <Lock className="w-5 h-5 text-blue-400" /> Lock All Doors
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-2 py-3 border border-white/10"
            onClick={allLightsOn}
          >
            <Lightbulb className="w-5 h-5 text-amber-400" /> Turn On All Lights
          </Button>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" /> Emergency Contacts
          </h3>
          <div className="flex flex-col gap-2">
            {EMERGENCY_CONTACTS?.map(contact => (
              <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg bg-dark-700/50">
                <div>
                  <div className="text-white text-sm font-semibold">{contact.name}</div>
                  <div className="text-xs text-gray-400">{contact.role}</div>
                </div>
                <a href={`tel:${contact.phone}`} className="text-blue-400 text-sm hover:text-blue-300">
                  {contact.phone}
                </a>
              </div>
            ))}
            {(!EMERGENCY_CONTACTS || EMERGENCY_CONTACTS.length === 0) && (
              <div className="text-sm text-gray-400 italic">No emergency contacts found.</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
