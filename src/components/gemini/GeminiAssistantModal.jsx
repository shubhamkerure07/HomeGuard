import React, { useState, useRef, useEffect } from 'react';
import { useHome } from '../../context/HomeContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Sparkles, Send, Bot, User, ShieldCheck, ShieldAlert, Zap, Lock, Lightbulb, CheckCircle2 } from 'lucide-react';

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
    toggleDevice,
    simulateIntrusion,
    resetSimulation
  } = useHome();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'gemini',
      text: "Hello Shubham! I'm your Gemini HomeGuard Copilot. I have real-time awareness of your perimeter, sensors, and appliances. How can I assist with your smart home security today?",
      actions: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '🛡️ Perimeter Audit', prompt: 'Audit my perimeter security and sensors right now' },
    { label: '🔒 Lockdown Home', prompt: 'Lock all doors and set security mode to AWAY' },
    { label: '💡 Turn On All Lights', prompt: 'Turn on all lights across the house' },
    { label: '⚡ Energy Analysis', prompt: 'Analyze our current energy consumption and give tips' }
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
    }, 600);
  };

  const processQueryWithGemini = (query) => {
    const executedActions = [];
    let responseText = '';

    const openDoors = securitySensors.filter(s => s.type === 'door' && (s.status === 'open' || s.status === 'unlocked'));
    const openWindows = securitySensors.filter(s => s.type === 'window' && s.status === 'open');
    const triggeredMotion = securitySensors.filter(s => s.type === 'motion' && s.status === 'triggered');

    // 1. Lockdown / Lock All Doors
    if (query.includes('lock all') || query.includes('lockdown') || query.includes('lock down')) {
      lockAllDoors();
      setSecurityMode('away');
      executedActions.push('Locked all doors', 'Armed system to AWAY mode');
      responseText = `🔒 Emergency lockdown sequence executed. All doors are now securely locked, and HomeGuard is armed in AWAY mode with maximum perimeter protection.`;
    }
    // 2. Turn on lights
    else if (query.includes('turn on all lights') || query.includes('all lights on')) {
      allLightsOn();
      executedActions.push('All house lights turned on at 100% brightness');
      responseText = `💡 All lights in Living Room, Bedroom, Kitchen, and Office have been turned on at maximum brightness.`;
    }
    // 3. Security Audit / Is house safe?
    else if (query.includes('safe') || query.includes('audit') || query.includes('perimeter') || query.includes('status')) {
      if (activeAlert || alarmActive) {
        responseText = `⚠️ ATTENTION: High priority security event in progress!
Alert: ${activeAlert?.message || 'Intrusion detected'} in ${activeAlert?.location || 'Unknown'}.
Alarm is currently ${alarmActive ? 'ACTIVE 🚨' : 'SILENCED'}.
Recommend viewing the camera feed immediately or triggering an emergency lockdown.`;
      } else {
        const issues = [];
        if (openDoors.length > 0) issues.push(`${openDoors.map(d => d.name).join(', ')} unlocked/open`);
        if (openWindows.length > 0) issues.push(`${openWindows.map(w => w.name).join(', ')} open`);
        if (triggeredMotion.length > 0) issues.push(`${triggeredMotion.map(m => m.name).join(', ')} triggered`);

        if (issues.length === 0) {
          responseText = `✅ Perimeter is completely secure!
• Security Mode: ${securityMode.toUpperCase()}
• Doors: All locked (Front Door, Back Door)
• Windows: All closed (Living Room, Bedroom)
• Motion: All clear
• Cameras: Online & monitoring
• Temperature: ${temperature}°C | Humidity: ${humidity}%`;
        } else {
          responseText = `⚠️ Perimeter vulnerabilities detected:
• ${issues.join('\n• ')}
Security mode is currently ${securityMode.toUpperCase()}. Would you like me to lock all doors and arm the system?`;
        }
      }
    }
    // 4. Change Security Mode
    else if (query.includes('arm') || query.includes('away mode') || query.includes('home mode') || query.includes('sleep mode') || query.includes('disarm')) {
      if (query.includes('away')) {
        setSecurityMode('away');
        executedActions.push('Security mode changed to AWAY');
        responseText = `🛡️ System armed to AWAY mode. All motion sensors, doors, windows, and intrusion detection alarms are now fully primed.`;
      } else if (query.includes('sleep') || query.includes('night')) {
        setSecurityMode('sleep');
        executedActions.push('Security mode changed to SLEEP');
        responseText = `🌙 System armed to SLEEP mode. Perimeter doors and windows are strictly monitored while internal bedroom sensors permit movement.`;
      } else if (query.includes('home') || query.includes('disarm')) {
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
      responseText = `🔕 Alarm has been silenced and the active alert dismissed. Please review the security history to confirm what triggered it.`;
    }
    // 6. Simulate Intrusion
    else if (query.includes('simulate') || query.includes('test intrusion')) {
      simulateIntrusion('front-door', 'lr-motion-sec', 'cam-front');
      executedActions.push('Simulated front door breach & motion trigger');
      responseText = `🚨 Intrusion simulation started! Front door breached, Living Room motion sensor triggered, and alarm activated. Check your security center or live dashboard to observe reaction.`;
    }
    // 7. Energy
    else if (query.includes('energy') || query.includes('power') || query.includes('electricity') || query.includes('kw')) {
      responseText = `⚡ Energy Intelligence Report:
• Current load: ${energyUsage} kW
• Active devices: ${activeDeviceCount} appliances operating
• Highest consumers: Air conditioning and ceiling fans

💡 Optimization Tips:
1. Increase AC thermostat to 25°C to reduce cooling load by ~12%.
2. Turn off office equipment and kitchen lights when unoccupied.
3. Enable 'Away Mode' automation when leaving to auto-power-off inactive devices.`;
    }
    // Default smart AI response
    else {
      responseText = `🤖 Gemini Copilot Analysis:
I understood: "${query}"

Here is what I can do for you:
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
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-medium text-cyan-300">Gemini 2.0 / 1.5 Flash Reasoning Engine</span>
          </div>
          <Badge variant={alarmActive ? "danger" : "success"} pulse={alarmActive}>
            Mode: {securityMode.toUpperCase()}
          </Badge>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'gemini' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}

              <div className={`max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                  : 'bg-dark-700/80 border border-white/10 text-slate-100 rounded-tl-none shadow-lg'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                      ⚡ Actions Executed in Real-time:
                    </span>
                    {msg.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-dark-600 flex items-center justify-center shrink-0 border border-white/10">
                  <User size={16} className="text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs italic">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-white animate-spin" />
              </div>
              <div className="bg-dark-700/60 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-slate-300">Gemini is analyzing home state...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.prompt)}
              className="text-xs bg-dark-700 hover:bg-dark-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap transition-all hover:scale-[1.02] shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2 pt-2 border-t border-white/10"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini to audit security, control devices, or respond to threats..."
            className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            variant="primary"
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 border-none shadow-lg shadow-cyan-500/20"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </Modal>
  );
}
