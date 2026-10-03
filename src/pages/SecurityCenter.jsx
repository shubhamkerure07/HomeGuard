import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { useHome } from '../context/HomeContext';
import SecurityModes from '../components/security/SecurityModes';
import SensorCard from '../components/security/SensorCard';
import EmergencyPanel from '../components/security/EmergencyPanel';
import SecurityAlert from '../components/security/SecurityAlert';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import {
  ShieldAlert,
  ShieldCheck,
  Filter,
  CheckCircle2,
  RefreshCw,
  Clock,
  Radio
} from 'lucide-react';

export default function SecurityCenter() {
  const { activeAlert, securitySensors = [], simulateIntrusion, resetSimulation, events = [] } = useHome();
  const [sensorFilter, setSensorFilter] = useState('all'); // all, door, window, motion

  const filteredSensors = sensorFilter === 'all'
    ? securitySensors
    : securitySensors.filter(s => s.type === sensorFilter);

  const securityEvents = events.filter(e => e.category === 'security' || e.category === 'doors' || e.category === 'windows' || e.category === 'motion');

  return (
    <div className="space-y-6">
      <Header
        title="Security Operations Center"
        subtitle="Manage perimeter intrusion zones, armed modes, and active surveillance"
      />

      {/* Prominent Alert Modal */}
      {activeAlert && <SecurityAlert />}

      {/* Security Modes Selector */}
      <SecurityModes />

      {/* 2-Column Layout: Sensors & Threat Sim on Left (8 cols), Emergency Panel & Timeline on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sensors Section with Filter Tabs */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Perimeter & Motion Sensors</h3>
                <p className="text-xs text-slate-500">Live magnetic reed switches and PIR infrared nodes</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { id: 'all', label: 'All Sensors' },
                  { id: 'door', label: 'Doors' },
                  { id: 'window', label: 'Windows' },
                  { id: 'motion', label: 'Motion' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSensorFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      sensorFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sensors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredSensors.map((sensor) => (
                <SensorCard key={sensor.id} sensor={sensor} />
              ))}
            </div>
          </Card>

          {/* Rapid Threat Testing Lab */}
          <Card className="p-6 bg-slate-50/80 border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Radio size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Intrusion Verification Diagnostics</h4>
                  <p className="text-xs text-slate-500">Simulate physical breaches to verify alarm readiness</p>
                </div>
              </div>
              <Badge variant="warning">HARDWARE SIMULATION</Badge>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button
                variant="danger"
                size="sm"
                onClick={() => simulateIntrusion('front-door', 'lr-motion-sec', 'cam-front')}
                className="text-xs"
              >
                <ShieldAlert size={14} />
                <span>Simulate Front Door Intrusion</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateIntrusion('back-door', 'hall-motion', 'cam-backyard')}
                className="text-xs text-slate-800"
              >
                <span>Backyard Patio Breach</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => resetSimulation()}
                className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
              >
                <RefreshCw size={13} />
                <span>Reset All Zones to Secure</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <EmergencyPanel />

          {/* Security Event Timeline */}
          <Card className="p-6">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <Clock size={16} className="text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">Perimeter Log</h3>
            </div>

            <div className="space-y-3">
              {securityEvents.slice(0, 5).map((evt) => (
                <div key={evt.id} className="text-xs flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <span className="text-sm shrink-0">{evt.icon || '🛡️'}</span>
                  <div className="flex-1 truncate">
                    <div className="font-semibold text-slate-800 truncate">{evt.message}</div>
                    <div className="text-[11px] text-slate-400">{evt.location}</div>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
