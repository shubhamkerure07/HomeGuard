import React, { useState, useRef, useEffect } from 'react';
import { useHome } from '../../context/HomeContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import {
  Sparkles,
  Send,
  User,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Lock,
  Lightbulb,
  CheckCircle2,
  Bot
} from 'lucide-react';

export default function GeminiAssistantModal({ isOpen, onClose }) {
  const {
    securityMode,
    securitySensors,
    rooms,
    activeAlert,
    alarmActive,
    temperature,
    humidity,
    energyUsage,
    activeDeviceCount,
    setSecurityMode,
    lockAllDoors,
    allLightsOn,
    silenceAlarm,
    dismissAlert,
    simulateIntrusion,
    resetSimulation
  } = useHome();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'gemini',
      text: "Hello Shubham! I'm your Gemini HomeGuard AI Copilot. I have real-time awareness of your perimeter sensors, appliances, and climate across all 6 rooms. How can I assist you with your home security today?",
      actions: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '🛡️ Audit Perimeter', prompt: 'Audit my perimeter security and sensors right now' },
    { label: '🔒 Lockdown Home', prompt: 'Lock all doors and set security mode to AWAY' },
    { label: '💡 All Lights On', prompt: 'Turn on all lights across the house' },
    { label: '⚡ Energy Report', prompt: 'Analyze our current energy consumption and give tips' }
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processQueryWithGemini(query.toLowerCase());
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 500);
  };

  const processQueryWithGemini = (query) => {
    const executedActions = [];
    let responseText = '';

    const openDoors = securitySensors.filter(s => s.type === 'door' && (s.status === 'open' || s.status === 'unlocked'));
    const openWindows = securitySensors.filter(s => s.type === 'window' && s.status === 'open');
    const triggeredMotion = securitySensors.filter(s => s.type === 'motion' && s.status === 'triggered');

    // 1. Lockdown
    if (query.includes('lock all') || query.includes('lockdown') || query.includes('lock down')) {
      lockAllDoors();
      setSecurityMode('away');
      executedActions.push('Locked all perimeter doors', 'Armed system to AWAY mode');
      responseText = `🔒 Emergency lockdown sequence executed. All doors are now securely locked, and HomeGuard is armed in AWAY mode with maximum perimeter protection.`;
    }
    // 2. Turn on lights
    else if (query.includes('turn on all lights') || query.includes('all lights on') || query.includes('illuminate')) {
      allLightsOn();
      executedActions.push('All house lighting illuminated at 100% brightness');
      responseText = `💡 All lights across Living Room, Bedroom, Kitchen, Office, Bathroom, and Garage have been turned on at maximum brightness.`;
    }
    // 3. Security Audit / Status
    else if (query.includes('safe') || query.includes('audit') || query.includes('perimeter') || query.includes('status')) {
      if (activeAlert || alarmActive) {
        responseText = `⚠️ ATTENTION: High priority security event in progress!
Alert: ${activeAlert?.message || 'Intrusion detected'} in ${activeAlert?.location || 'Living Room'}.
Alarm is currently ${alarmActive ? 'AUDIBLE 🚨' : 'SILENCED'}.
Recommend inspecting camera feeds immediately or triggering an emergency lockdown.`;
      } else {
        const issues = [];
        if (openDoors.length > 0) issues.push(`${openDoors.map(d => d.name).join(', ')} unlocked/open`);
        if (openWindows.length > 0) issues.push(`${openWindows.map(w => w.name).join(', ')} open`);
        if (triggeredMotion.length > 0) issues.push(`${triggeredMotion.map(m => m.name).join(', ')} triggered`);

        if (issues.length === 0) {
          responseText = `✅ Perimeter is completely secure!
• Security Mode: ${securityMode.toUpperCase()}
• Doors: All locked (Front, Patio, Garage)
• Windows: All closed (Living Room, Bedroom)
• Motion: All clear
• Surveillance: 4 Cameras online & monitoring
• Temperature: ${temperature}°C | Humidity: ${humidity}%`;
        } else {
          responseText = `⚠️ Perimeter vulnerabilities detected:
• ${issues.join('\n• ')}
Security mode is currently ${securityMode.toUpperCase()}. Would you like me to lock all doors and arm the system?`;
        }
      }
    }
    // 4. Change Security Mode
    else if (query.includes('arm') || query.includes('away') || query.includes('sleep') || query.includes('home') || query.includes('disarm')) {
      if (query.includes('away')) {
        setSecurityMode('away');
        executedActions.push('Security mode changed to AWAY');
        responseText = `🛡️ System armed to AWAY mode. All motion sensors, doors, windows, and intrusion detection alarms are now fully primed.`;
      } else if (query.includes('sleep') || query.includes('night')) {
        setSecurityMode('sleep');
        executedActions.push('Security mode changed to SLEEP');
        responseText = `🌙 System armed to SLEEP mode. Perimeter doors and windows are strictly monitored while internal bedroom sensors permit movement.`;
      } else {
        setSecurityMode('home');
        executedActions.push('Security mode changed to HOME');
        responseText = `🏠 System set to HOME mode. Normal perimeter protection is active.`;
      }
    }
    // 5. Silence Alarm
    else if (query.includes('silence') || query.includes('stop alarm') || query.includes('dismiss')) {
      silenceAlarm();
      dismissAlert();
      executedActions.push('Alarm silenced & alert dismissed');
      responseText = `🔕 Alarm has been silenced and the active alert dismissed. Please review the security log to confirm what triggered it.`;
    }
    // 6. Simulate Intrusion
    else if (query.includes('simulate') || query.includes('test')) {
      simulateIntrusion('front-door', 'lr-motion-sec', 'cam-front');
      executedActions.push('Simulated front door breach & motion trigger');
      responseText = `🚨 Intrusion simulation started! Front door breached, Living Room motion sensor triggered, and alarm activated. Check your security center or live dashboard to observe reaction.`;
    }
    // 7. Energy
    else if (query.includes('energy') || query.includes('power') || query.includes('electricity') || query.includes('kw')) {
      responseText = `⚡ Energy Intelligence Report:
• Current load: ${energyUsage} kW
• Active appliances: ${activeDeviceCount} units operating
• Highest consumers: Dual inverter AC and EV Charger

💡 Optimization Advice:
1. Increase AC thermostat by 1°C to reduce cooling load by ~8%.
2. Auto-power-off office workstation overnight.
3. Switch system to 'Away Mode' when departing to auto-cut standby loads.`;
    }
    // Default smart AI response
    else {
      responseText = `🤖 Gemini Copilot Analysis:
I processed: "${query}"

Here are commands you can test:
• "Audit perimeter" — complete scan of doors, windows & sensors
• "Lock all doors" — immediate lockdown
• "Set mode to Away / Sleep / Home"
• "Turn on all lights"
• "Simulate intrusion" — test safety workflows
• "Silence alarm"`;
    }

    return {
      id: `g-${Date.now()}`,
      sender: 'gemini',
      text: responseText,
      actions: executedActions
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gemini AI Security Copilot" size="lg">
      <div className="flex flex-col h-[520px]">
        {/* Subheader info bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-700">Gemini 2.0 / 1.5 Flash Reasoning Engine</span>
          </div>
          <Badge variant={alarmActive ? "danger" : "success"} size="sm">
            MODE: {securityMode.toUpperCase()}
          </Badge>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'gemini' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles size={15} className="text-amber-300" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      ⚡ Action Executed in Real-time:
                    </span>
                    {msg.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <User size={15} className="text-slate-700" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-500 text-xs italic">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-amber-300 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-slate-600 font-medium">Gemini is analyzing home state...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="pt-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.prompt)}
              className="text-xs bg-white hover:bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-all shadow-2xs shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2 pt-2 border-t border-slate-100"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini to audit security, lock doors, or optimize energy..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            variant="primary"
            className="px-4 py-2.5 text-xs shadow-xs"
          >
            <Send size={15} />
          </Button>
        </form>
      </div>
    </Modal>
  );
}
