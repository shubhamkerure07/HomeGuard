import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useHome } from '../../context/HomeContext';
import { Plus, Zap, Clock, Shield, DoorClosed, Lightbulb, Bell, Lock } from 'lucide-react';

export default function RuleEditor({ isOpen, onClose }) {
  const { addRule } = useHome();

  const [name, setName] = useState('');
  const [triggerType, setTriggerType] = useState('time');
  const [triggerTime, setTriggerTime] = useState('23:00');
  const [triggerMode, setTriggerMode] = useState('away');
  const [selectedActions, setSelectedActions] = useState([
    'Lock all perimeter doors',
    'Turn off non-essential lights'
  ]);

  const availableActionOptions = [
    'Lock all perimeter doors',
    'Turn off non-essential lights',
    'Arm security to AWAY mode',
    'Arm security to SLEEP mode',
    'Illuminate all house floodlights',
    'Activate all indoor & outdoor cameras',
    'Set bedroom climate to 22°C',
    'Send critical mobile push notification',
  ];

  const handleToggleAction = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || selectedActions.length === 0) return;

    let conditionText = '';
    let conditionObj = {};

    if (triggerType === 'time') {
      conditionText = `Clock reaches ${triggerTime}`;
      conditionObj = { type: 'time', time: triggerTime };
    } else if (triggerType === 'mode') {
      conditionText = `Security mode set to ${triggerMode.toUpperCase()}`;
      conditionObj = { type: 'mode_change', mode: triggerMode };
    } else if (triggerType === 'motion') {
      conditionText = 'Motion detected during AWAY mode';
      conditionObj = { type: 'motion_away' };
    } else {
      conditionText = 'Front door unlocked by resident';
      conditionObj = { type: 'door_unlock' };
    }

    const newRule = {
      id: `rule-${Date.now()}`,
      name: name.trim(),
      enabled: true,
      conditionText,
      condition: conditionObj,
      actions: selectedActions.map((act) => ({ type: 'custom', text: act })),
    };

    addRule(newRule);
    setName('');
    setSelectedActions(['Lock all perimeter doors', 'Turn off non-essential lights']);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Smart Automation Routine" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Routine Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Routine Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Midnight Lockdown or Morning Wakeup"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
          />
        </div>

        {/* IF Trigger Condition */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            IF Condition (Trigger)
          </span>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'time', label: 'Specific Time' },
              { id: 'mode', label: 'Security Mode Change' },
              { id: 'motion', label: 'Motion Breach' },
              { id: 'door', label: 'Door Unlocked' },
            ].map((trig) => (
              <button
                key={trig.id}
                type="button"
                onClick={() => setTriggerType(trig.id)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${
                  triggerType === trig.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {trig.label}
              </button>
            ))}
          </div>

          {triggerType === 'time' && (
            <div className="pt-2">
              <label className="block text-xs text-slate-600 mb-1">Trigger Time</label>
              <input
                type="time"
                value={triggerTime}
                onChange={(e) => setTriggerTime(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-semibold"
              />
            </div>
          )}

          {triggerType === 'mode' && (
            <div className="pt-2">
              <label className="block text-xs text-slate-600 mb-1">When Mode Changes To</label>
              <select
                value={triggerMode}
                onChange={(e) => setTriggerMode(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-semibold cursor-pointer"
              >
                <option value="away">Away Mode (Maximum Fortress)</option>
                <option value="sleep">Sleep Mode (Night Perimeter)</option>
                <option value="home">Home Mode (Disarmed)</option>
              </select>
            </div>
          )}
        </div>

        {/* THEN Actions Selection */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            THEN Actions (Select 1 or more)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableActionOptions.map((act) => {
              const isChecked = selectedActions.includes(act);
              return (
                <label
                  key={act}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleAction(act)}
                    className="sr-only"
                  />
                  <span className="truncate">{act}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" disabled={!name.trim() || selectedActions.length === 0}>
            Save Automation Routine
          </Button>
        </div>
      </form>
    </Modal>
  );
}
