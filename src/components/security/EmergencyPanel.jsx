import React, { useState } from 'react';
import { useHome } from '../../context/HomeContext';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import {
  AlertTriangle,
  Lock,
  Lightbulb,
  Phone,
  ShieldAlert,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export default function EmergencyPanel() {
  const { triggerAlert, lockAllDoors, allLightsOn, alarmActive } = useHome();
  const [confirmAction, setConfirmAction] = useState(null); // 'alarm' | 'lock' | null
  const [calledContact, setCalledContact] = useState(null);

  const handleTriggerAlarm = () => {
    triggerAlert('Manual SOS Alarm Activated by Resident', 'Entire House', 'manual-sos');
    setConfirmAction(null);
  };

  const handleLockAll = () => {
    lockAllDoors();
    setConfirmAction(null);
  };

  const handleSimulatedCall = (contact) => {
    setCalledContact(contact);
    setTimeout(() => {
      setCalledContact(null);
    }, 3000);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Emergency Response</h2>
          <p className="text-xs text-slate-500">Critical perimeter overrides & emergency dispatch</p>
        </div>
        <Badge variant={alarmActive ? 'danger' : 'default'} pulse={alarmActive}>
          {alarmActive ? 'ALARM ACTIVE' : 'STANDBY'}
        </Badge>
      </div>

      {/* Emergency Overrides */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
          One-Touch Quick Actions
        </span>

        {/* Lock All Doors */}
        <Button
          variant="outline"
          onClick={() => setConfirmAction('lock')}
          className="w-full justify-start text-xs py-2.5 text-slate-800 border-slate-200 hover:bg-slate-50"
        >
          <Lock size={15} className="text-slate-600" />
          <span>Lock All Perimeter Doors Now</span>
        </Button>

        {/* Turn On All Lights */}
        <Button
          variant="outline"
          onClick={() => allLightsOn()}
          className="w-full justify-start text-xs py-2.5 text-slate-800 border-slate-200 hover:bg-slate-50"
        >
          <Lightbulb size={15} className="text-amber-500" />
          <span>Illuminate All House Lights (100%)</span>
        </Button>

        {/* Trigger Siren */}
        <Button
          variant="danger"
          onClick={() => setConfirmAction('alarm')}
          className="w-full justify-start text-xs py-2.5"
        >
          <ShieldAlert size={15} />
          <span>Trigger High-Decibel Siren / Alarm</span>
        </Button>
      </div>

      {/* Confirmation Dialog Overlay */}
      {confirmAction && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-slate-900">
            {confirmAction === 'alarm' ? '🚨 Sound Emergency Alarm?' : '🔒 Lock All Doors Across House?'}
          </div>
          <p className="text-[11px] text-slate-500">
            {confirmAction === 'alarm'
              ? 'This will trigger the audible intrusion alarm and broadcast alerts to emergency contacts.'
              : 'This will lock front door, patio back door, and garage shutter immediately.'}
          </p>
          <div className="flex gap-2">
            <Button
              variant={confirmAction === 'alarm' ? 'danger' : 'primary'}
              size="sm"
              onClick={confirmAction === 'alarm' ? handleTriggerAlarm : handleLockAll}
              className="text-xs"
            >
              Confirm
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConfirmAction(null)}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Emergency Contacts Directory */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
          Direct Emergency Contacts
        </span>

        <div className="space-y-2">
          {(EMERGENCY_CONTACTS || []).map((contact) => (
            <div
              key={contact.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{contact.icon || '📞'}</span>
                <div>
                  <div className="font-bold text-slate-900 leading-snug">{contact.name}</div>
                  <div className="text-[11px] text-slate-500">{contact.number} &bull; {contact.role}</div>
                </div>
              </div>

              <button
                onClick={() => handleSimulatedCall(contact)}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-2xs"
                title={`Call ${contact.name}`}
              >
                <PhoneCall size={14} />
              </button>
            </div>
          ))}
        </div>

        {calledContact && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            <span>Simulating secure dispatch call to {calledContact.name} ({calledContact.number})...</span>
          </div>
        )}
      </div>

      <div className="pt-2 text-[11px] text-slate-400 text-center">
        * Prototype Interface: GSM & 911 auto-dispatch are simulated for portfolio demo.
      </div>
    </Card>
  );
}
