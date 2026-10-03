import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Settings, ShieldAlert, RefreshCw } from 'lucide-react';

const SimulationPanel = () => {
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
    <Card className="p-6 border-amber-500/30 bg-dark-800/80">
      <div className="flex items-center gap-2 mb-6 text-amber-500">
        <Settings className="w-6 h-6" />
        <h2 className="text-xl font-bold">Simulation Engine</h2>
        <span className="ml-auto text-xs font-semibold px-2 py-1 bg-amber-500/20 rounded-md">
          [SIMULATION ENGINE] Test IoT Scenarios
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Scenarios */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white/90 text-sm">Quick Threat Scenarios</h3>
          <div className="flex flex-col gap-2.5">
            <Button 
              variant="danger" 
              onClick={() => simulateIntrusion('front-door', 'lr-motion-sec', 'cam-front')}
              className="w-full flex items-center justify-center gap-2 text-xs py-2.5"
            >
              <ShieldAlert className="w-4 h-4" /> Simulate Front Intrusion
            </Button>

            <Button 
              variant="warning" 
              onClick={() => {
                updateSensor('br-window-sec', 'open');
                updateSensor('hall-motion', 'triggered');
                triggerAlert('Bedroom Window Breach & Hallway Movement', 'Bedroom', 'br-window-sec');
              }}
              className="w-full flex items-center justify-center gap-2 text-xs py-2.5"
            >
              🪟 Simulate Window Breach
            </Button>

            <Button 
              variant="outline" 
              onClick={() => resetSimulation()}
              className="w-full flex items-center justify-center gap-2 text-xs py-2.5 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <RefreshCw className="w-4 h-4" /> Reset All Sensors (Safe)
            </Button>
          </div>
        </div>

        {/* Individual Sensors */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white/90 text-sm">Sensor State Controls</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {securitySensors?.map(sensor => (
              <div key={sensor.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-xs">
                <span className="truncate pr-2 text-slate-300">{sensor.name}</span>
                <select 
                  className="bg-dark-900 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-blue-500 text-white"
                  value={sensor.status}
                  onChange={(e) => updateSensor(sensor.id, e.target.value)}
                >
                  {sensor.type === 'door' && (
                    <>
                      <option value="locked">🔒 Locked</option>
                      <option value="unlocked">🔓 Unlocked</option>
                      <option value="open">🚪 Open</option>
                    </>
                  )}
                  {sensor.type === 'window' && (
                    <>
                      <option value="closed">🪟 Closed</option>
                      <option value="open">⚠️ Open</option>
                    </>
                  )}
                  {sensor.type === 'motion' && (
                    <>
                      <option value="normal">👤 Clear</option>
                      <option value="triggered">🚨 Triggered</option>
                    </>
                  )}
                  <option value="offline">⚪ Offline</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white/90 text-sm">Environmental Simulation</h3>
          <div className="space-y-4 p-3 bg-white/5 rounded-xl">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Ambient Temperature</span>
                <span className="font-bold text-amber-400">{temperature}°C</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="42" 
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Relative Humidity</span>
                <span className="font-bold text-cyan-400">{humidity}%</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="90" 
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationPanel;
