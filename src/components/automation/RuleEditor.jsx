import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useHome } from '../../context/HomeContext';

const RuleEditor = ({ isOpen, onClose }) => {
  const { addRule } = useHome();
  
  const [name, setName] = useState('');
  const [conditionType, setConditionType] = useState('Motion detected after time');
  const [conditionValue, setConditionValue] = useState('22:00');
  const [selectedActions, setSelectedActions] = useState([]);

  const conditionTypes = [
    'Motion detected after time',
    'Security mode changed',
    'Door opened/unlocked'
  ];

  const availableActions = [
    'Turn on lights',
    'Send alert',
    'Activate alarm',
    'Lock doors',
    'Turn off lights',
    'Activate cameras'
  ];

  const handleActionToggle = (action) => {
    setSelectedActions(prev => 
      prev.includes(action) 
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || selectedActions.length === 0) return;
    
    let finalCondition = conditionType;
    if (conditionType === 'Motion detected after time') {
      finalCondition = `Motion detected after ${conditionValue}`;
    } else if (conditionType === 'Security mode changed') {
      finalCondition = `Security mode changed to ${conditionValue}`;
    }

    addRule({
      name,
      condition: finalCondition,
      actions: selectedActions,
      enabled: true
    });
    
    // Reset and close
    setName('');
    setConditionType('Motion detected after time');
    setConditionValue('22:00');
    setSelectedActions([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Automation Rule">
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div>
          <label className="block text-sm font-light text-dark-200 mb-2">Rule Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. Night Mode Activation"
            required
          />
        </div>

        <div className="p-4 bg-dark-900/50 rounded-xl border border-white/5 space-y-4">
          <h4 className="text-sm font-bold text-dark-100 uppercase tracking-wider">IF Condition</h4>
          
          <div>
            <label className="block text-xs font-light text-dark-300 mb-1">Trigger Type</label>
            <select 
              value={conditionType}
              onChange={(e) => setConditionType(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              {conditionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {conditionType === 'Motion detected after time' && (
            <div>
              <label className="block text-xs font-light text-dark-300 mb-1">Time</label>
              <input 
                type="time" 
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {conditionType === 'Security mode changed' && (
            <div>
              <label className="block text-xs font-light text-dark-300 mb-1">Mode</label>
              <select 
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="Armed (Away)">Armed (Away)</option>
                <option value="Armed (Home)">Armed (Home)</option>
                <option value="Disarmed">Disarmed</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-4 bg-dark-900/50 rounded-xl border border-white/5 space-y-4">
          <h4 className="text-sm font-bold text-dark-100 uppercase tracking-wider">THEN Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableActions.map(action => (
              <label key={action} className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg border border-white/5 cursor-pointer hover:bg-dark-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedActions.includes(action)}
                  onChange={() => handleActionToggle(action)}
                  className="w-4 h-4 rounded border-white/20 bg-dark-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-dark-800"
                />
                <span className="text-sm">{action}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={!name || selectedActions.length === 0}>Save Rule</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RuleEditor;
