import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Badge from '../components/ui/Badge';
import RuleEditor from '../components/automation/RuleEditor';
import { useHome } from '../context/HomeContext';
import { Trash2, Plus, Zap, ArrowRight, Clock, Activity, Lock } from 'lucide-react';

const Automation = () => {
  const { automationRules, toggleRule, deleteRule } = useHome();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const getConditionText = (rule) => {
    if (rule.conditionText) return rule.conditionText;
    if (typeof rule.condition === 'string') return rule.condition;
    if (rule.condition && typeof rule.condition === 'object') {
      return rule.condition.time ? `Motion detected after ${rule.condition.time}` : (rule.condition.type || 'Custom Condition');
    }
    return 'Custom Condition';
  };

  const getActionText = (action) => {
    if (typeof action === 'string') return action;
    if (action && typeof action === 'object') return action.text || action.type || 'Action';
    return String(action);
  };

  const getIconForCondition = (conditionStr) => {
    const text = String(conditionStr).toLowerCase();
    if (text.includes('time') || text.includes('pm') || text.includes('am')) return <Clock className="w-4 h-4 text-cyan-400" />;
    if (text.includes('motion')) return <Activity className="w-4 h-4 text-amber-400" />;
    if (text.includes('door') || text.includes('mode') || text.includes('away')) return <Lock className="w-4 h-4 text-red-400" />;
    return <Zap className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      <Header title="Automation" />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-dark-800/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div>
              <h2 className="text-xl font-bold">Routines & Rules</h2>
              <p className="text-dark-300 font-light mt-1">Automate your home security based on events</p>
            </div>
            <Button onClick={() => setIsEditorOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Rule
            </Button>
          </div>

          <div className="space-y-4">
            {automationRules.length === 0 ? (
              <Card className="text-center p-12 flex flex-col items-center border-white/5">
                <Zap className="w-12 h-12 text-dark-400 mb-4" />
                <h3 className="text-lg font-semibold text-dark-200">No automation rules</h3>
                <p className="text-sm text-dark-400 mt-2">Create your first rule to automate your home.</p>
              </Card>
            ) : (
              automationRules.map(rule => {
                const condText = getConditionText(rule);
                return (
                  <Card key={rule.id} className={`flex flex-col md:flex-row gap-6 p-6 border-l-4 ${rule.enabled ? 'border-l-blue-500' : 'border-l-dark-500'} transition-all duration-300 hover:bg-dark-800/80`}>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{rule.name}</h3>
                          {!rule.enabled && <Badge variant="default">Disabled</Badge>}
                        </div>
                        <Toggle enabled={rule.enabled} onChange={() => toggleRule(rule.id)} />
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-dark-950/50 p-4 rounded-xl">
                        <div className="flex-1">
                          <div className="text-xs text-dark-400 font-bold tracking-wider mb-1">IF</div>
                          <div className="flex items-center gap-2 text-sm">
                            {getIconForCondition(condText)}
                            <span>{condText}</span>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center text-dark-500">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <div className="flex-[2]">
                          <div className="text-xs text-dark-400 font-bold tracking-wider mb-1">THEN</div>
                          <div className="flex flex-wrap gap-2">
                            {rule.actions.map((action, idx) => (
                              <span key={idx} className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-md">
                                {getActionText(action)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  <div className="flex items-center justify-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <Button variant="danger" onClick={() => deleteRule(rule.id)} className="p-2" aria-label="Delete Rule">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              );
            }))}
          </div>
        </div>
      </main>

      <RuleEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
    </div>
  );
};

export default Automation;
