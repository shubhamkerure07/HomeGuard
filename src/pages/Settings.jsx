import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { useHome } from '../context/HomeContext';
import { User, Home, Bell, Volume2, Shield, Smartphone, Cpu, Save, CheckCircle } from 'lucide-react';

const Settings = () => {
  const { 
    userName = 'Shubham',
    homeName = 'My Home',
    updateSettings, 
    notifications = true, 
    soundAlerts = true,
    securityMode,
    setSecurityMode
  } = useHome();

  const [formName, setFormName] = useState(userName);
  const [formHome, setFormHome] = useState(homeName);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings({ userName: formName, homeName: formHome });
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      <Header title="Settings" />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
          
          {/* Profile Section */}
          <section>
            <h2 className="text-sm font-bold text-dark-300 uppercase tracking-wider mb-4 px-2">Profile & System</h2>
            <Card className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-dark-200">
                  <User className="w-4 h-4" /> User Name
                </label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-dark-200">
                  <Home className="w-4 h-4" /> Home Name
                </label>
                <input 
                  type="text" 
                  value={formHome}
                  onChange={e => setFormHome(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="pt-2 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving || saved} className="w-32 flex justify-center">
                  {saved ? <CheckCircle className="w-5 h-5 text-green-400" /> : 
                   isSaving ? 'Saving...' : 
                   <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save</span>}
                </Button>
              </div>
            </Card>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-sm font-bold text-dark-300 uppercase tracking-wider mb-4 px-2">Preferences</h2>
            <Card className="divide-y divide-white/5">
              <div className="flex items-center justify-between py-4 first:pt-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Bell className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-semibold">Push Notifications</h3>
                    <p className="text-sm text-dark-400 font-light">Receive alerts on your device</p>
                  </div>
                </div>
                <Toggle enabled={notifications} onChange={() => updateSettings({ notifications: !notifications })} />
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Volume2 className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-semibold">Sound Alerts</h3>
                    <p className="text-sm text-dark-400 font-light">Play sounds for critical events</p>
                  </div>
                </div>
                <Toggle enabled={soundAlerts} onChange={() => updateSettings({ soundAlerts: !soundAlerts })} />
              </div>
            </Card>
          </section>

          {/* Security Section */}
          <section>
            <h2 className="text-sm font-bold text-dark-300 uppercase tracking-wider mb-4 px-2">Security Status</h2>
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Shield className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold">Current Mode</h3>
                  <p className="text-sm text-dark-400 font-light">Change default system behavior</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'home', label: 'Home 🏠' },
                  { id: 'away', label: 'Away 🚪' },
                  { id: 'sleep', label: 'Sleep 🌙' },
                  { id: 'maintenance', label: 'Maintenance 🔧' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setSecurityMode(mode.id)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      securityMode === mode.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'bg-dark-900 border border-white/5 text-dark-200 hover:bg-dark-800'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </Card>
          </section>

          {/* Integration Section */}
          <section>
            <h2 className="text-sm font-bold text-dark-300 uppercase tracking-wider mb-4 px-2">IoT Integration</h2>
            <Card className="bg-gradient-to-br from-dark-800 to-dark-900 border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0"><Cpu className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold text-lg text-cyan-50">ESP32 Ready</h3>
                  <p className="text-sm text-dark-300 mt-2 leading-relaxed">
                    HomeGuard is built to integrate seamlessly with ESP32 microcontrollers. 
                    Connect your custom hardware sensors, relays, and cameras via MQTT or local WebSockets.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="text-xs font-mono bg-dark-950 px-2 py-1 rounded text-cyan-400 border border-cyan-500/20">MQTT: Enable</span>
                    <span className="text-xs font-mono bg-dark-950 px-2 py-1 rounded text-cyan-400 border border-cyan-500/20">WSS: Ready</span>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* About Section */}
          <section className="text-center space-y-2 pt-6">
            <Smartphone className="w-8 h-8 text-dark-500 mx-auto" />
            <h3 className="font-bold text-lg tracking-tight">HomeGuard</h3>
            <p className="text-sm text-dark-400 font-light">Version 1.0.0</p>
            <p className="text-xs text-dark-500 font-light pt-2">Next-generation smart home security</p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Settings;
