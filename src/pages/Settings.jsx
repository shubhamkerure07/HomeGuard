import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useHome } from '../context/HomeContext';
import {
  User,
  Home,
  Bell,
  Volume2,
  Shield,
  Smartphone,
  Cpu,
  Save,
  CheckCircle,
  Wifi,
  Radio,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function Settings() {
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
    <div className="space-y-6 max-w-4xl">
      <Header
        title="Settings & System Configuration"
        subtitle="Manage resident profiles, alert preferences, and future ESP32 IoT gateway settings"
      />

      {/* Profile & Home Identity */}
      <Card className="p-6 space-y-5">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Resident Identity & Household</h2>
              <p className="text-xs text-slate-500">Name and property label</p>
            </div>
          </div>
          <Badge variant="default">ADMIN</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
              Resident Full Name
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
              Household Name
            </label>
            <input
              type="text"
              value={formHome}
              onChange={(e) => setFormHome(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || saved}
            className="text-xs"
          >
            {saved ? (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 size={14} /> Saved
              </span>
            ) : isSaving ? (
              'Saving Changes...'
            ) : (
              <span className="flex items-center gap-1.5">
                <Save size={14} /> Save Profile
              </span>
            )}
          </Button>
        </div>
      </Card>

      {/* Alert & Notification Preferences */}
      <Card className="p-6 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Bell size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>
            <p className="text-xs text-slate-500">Configure how HomeGuard delivers intrusion and climate notices</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Mobile Push Alerts</div>
              <div className="text-xs text-slate-500">Receive instant critical push alerts on breach or window open</div>
            </div>
            <Toggle
              enabled={notifications}
              onChange={() => updateSettings({ notifications: !notifications })}
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Audible Siren & Sound Alarms</div>
              <div className="text-xs text-slate-500">Trigger high-decibel local chime and sirens upon motion trigger</div>
            </div>
            <Toggle
              enabled={soundAlerts}
              onChange={() => updateSettings({ soundAlerts: !soundAlerts })}
            />
          </div>
        </div>
      </Card>

      {/* Default Perimeter Security Mode */}
      <Card className="p-6 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Shield size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Default Armed Stance</h2>
            <p className="text-xs text-slate-500">Select standard active state for the house perimeter</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'home', label: 'Home Mode 🏠' },
            { id: 'away', label: 'Away Mode 🚪' },
            { id: 'sleep', label: 'Sleep Mode 🌙' },
            { id: 'maintenance', label: 'Maintenance 🔧' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSecurityMode(mode.id)}
              className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                securityMode === mode.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Future IoT Hardware Integration Guide */}
      <Card className="p-6 bg-slate-50 border-slate-200">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-slate-900 text-white rounded-xl shrink-0">
            <Cpu size={20} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">ESP32 & Real IoT Hardware Bridge</h3>
              <Badge variant="success" size="sm">READY</Badge>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              HomeGuard's simulation layer is designed as a drop-in replacement for physical microcontrollers. Connect PIR sensors, magnetic reed switches, and DHT22 modules over MQTT or WebSocket JSON topics.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-600">
              <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md">MQTT: /homeguard/telemetry</span>
              <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md">Broker: localhost:1883</span>
              <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md">Camera: RTSP / MJPEG</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
