import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Badge from '../components/ui/Badge';
import RuleEditor from '../components/automation/RuleEditor';
import { useHome } from '../context/HomeContext';
import { Plus, Trash2, Zap, Clock, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Automation() {
  const { automationRules = [], toggleRule, deleteRule } = useHome();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const getConditionText = (rule) => {
    if (rule.conditionText) return rule.conditionText;
    if (typeof rule.condition === 'string') return rule.condition;
    if (rule.condition && typeof rule.condition === 'object') {
      return rule.condition.time ? `Clock reaches ${rule.condition.time}` : (rule.condition.type || 'Custom Condition');
    }
    return 'Custom Condition';
  };

  const getActionText = (action) => {
    if (typeof action === 'string') return action;
    if (action && typeof action === 'object') return action.text || action.type || 'Action';
    return String(action);
  };

  return (
    <div className="space-y-6">
      <Header
        title="Smart Home Automations"
        subtitle="Conditional routines and security actions that run automatically"
        action={
          <Button
            variant="primary"
            onClick={() => setIsEditorOpen(true)}
            className="text-xs"
          >
            <Plus size={14} />
            <span>Create Rule</span>
          </Button>
        }
      />

      {/* Rules List */}
      <div className="space-y-4">
        {automationRules.length === 0 ? (
          <Card className="p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Zap size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No automation routines active</h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4">
              Automate perimeter lockdowns, morning lighting, or night time climate control.
            </p>
            <Button variant="primary" size="sm" onClick={() => setIsEditorOpen(true)}>
              <Plus size={14} />
              <span>Add Your First Routine</span>
            </Button>
          </Card>
        ) : (
          automationRules.map((rule) => {
            const condText = getConditionText(rule);
            const isEnabled = rule.enabled;

            return (
              <Card
                key={rule.id}
                className={`p-5 transition-all ${
                  isEnabled ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/60 border-slate-200/60 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isEnabled ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      <Zap size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{rule.name}</h3>
                      <span className="text-[11px] text-slate-400">
                        {isEnabled ? '● Routine Active' : '○ Disabled'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <Toggle
                      enabled={isEnabled}
                      onChange={() => toggleRule(rule.id)}
                    />
                    <button
                      onClick={() => deleteRule(rule.id)}
                      title="Delete Rule"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* IF -> THEN Flow */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                  {/* IF Block */}
                  <div className="md:col-span-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      IF Trigger
                    </span>
                    <span className="font-semibold text-slate-800">{condText}</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="hidden md:flex md:col-span-1 items-center justify-center text-slate-300">
                    <ArrowRight size={16} />
                  </div>

                  {/* THEN Block */}
                  <div className="md:col-span-6 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      THEN Execute ({rule.actions?.length || 0} Actions)
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {rule.actions?.map((act, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shadow-2xs"
                        >
                          {getActionText(act)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <RuleEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
    </div>
  );
}
