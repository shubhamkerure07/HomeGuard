import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Sliders, ShieldAlert, RefreshCw, Thermometer, Droplets, CheckCircle2 } from 'lucide-react';

export default function SimulationPanel() {
  const {
    simulateIntrusion,
    resetSimulation,
    securitySensors,
    updateSensor,
    temperature,
    humidity,
    setTemperature,
    setHumidity,
    triggerAlert
  } = useHome();

  return (
    <Card className="p-6 bg-slate-50/70 border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <Sliders size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Hardware Simulation Engine</h2>
            <p className="text-xs text-slate-500">Test live IoT events, door triggers, and climate responses</p>
          </div>
        </div>
        <Badge variant="warning">SIMULATION LAB</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Scenarios */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Threat Test Scenarios
          </span>
          <div className="space-y-2">
            <Button
              variant="danger"
              onClick={() => simulateIntrusion('front-door', 'lr-motion-sec', 'cam-front')}
              className="w-full text-xs py-2.5 justify-start"
            >
              <ShieldAlert size={15} />
              <span>Simulate Front Door Intrusion</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                updateSensor('br-window-sec', 'open');
                updateSensor('hall-motion', 'triggered');
                triggerAlert('Bedroom Window Breach & Hallway Movement', 'Master Bedroom', 'br-window-sec');
              }}
              className="w-full text-xs py-2.5 justify-start text-slate-800"
            >
              <span>🪟 Simulate Window Intrusion</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => resetSimulation()}
              className="w-full text-xs py-2.5 justify-start text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
            >
              <RefreshCw size={14} />
              <span>Reset All Sensors to Normal (Safe)</span>
            </Button>
          </div>
        </div>

        {/* Individual Sensor Overrides */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Sensor Status Overrides
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {securitySensors?.map((sensor) => (
              <div
                key={sensor.id}
                className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 text-xs shadow-2xs"
              >
                <span className="font-medium text-slate-700 truncate pr-2">{sensor.name}</span>
                <select
                  value={sensor.status}
                  onChange={(e) => updateSensor(sensor.id, e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900 cursor-pointer"
                >
                  {sensor.type === 'door' && (
                    <>
                      <option value="locked">Locked 🔒</option>
                      <option value="unlocked">Unlocked 🔓</option>
                      <option value="open">Open 🚪</option>
                    </>
                  )}
                  {sensor.type === 'window' && (
                    <>
                      <option value="closed">Closed 🪟</option>
                      <option value="open">Open ⚠️</option>
                    </>
                  )}
                  {sensor.type === 'motion' && (
                    <>
                      <option value="normal">Clear 👤</option>
                      <option value="triggered">Motion 🚨</option>
                    </>
                  )}
                  <option value="offline">Offline ⚪</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Climate Sliders */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Environment Adjustments
          </span>
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-4 shadow-2xs">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <Thermometer size={14} className="text-rose-500" />
                  <span>Ambient Temperature</span>
                </span>
                <span className="font-bold text-slate-900">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="16"
                max="38"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <Droplets size={14} className="text-blue-500" />
                  <span>Indoor Relative Humidity</span>
                </span>
                <span className="font-bold text-slate-900">{humidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
