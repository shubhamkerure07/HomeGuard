import React from 'react';
import Header from '../components/layout/Header';
import StatusCards from '../components/dashboard/StatusCards';
import SecurityOverview from '../components/dashboard/SecurityOverview';
import EnergyChart from '../components/dashboard/EnergyChart';
import RoomCards from '../components/dashboard/RoomCards';
import FloorPlan from '../components/floorplan/FloorPlan';
import SimulationPanel from '../components/simulation/SimulationPanel';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useHome } from '../context/HomeContext';
import { Shield, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userName, events, securityMode, alarmActive } = useHome();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      <Header
        title={`${getGreeting()}, ${userName || 'Shubham'}`}
        subtitle="Your smart home is currently operating under normal parameters."
      />

      {/* Top 4 Real-time Metric Cards */}
      <StatusCards />

      {/* Main Grid: Security & Floorplan on Left, Energy, Rooms & Events on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Security & Architectural Map (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <SecurityOverview />
          <FloorPlan />
        </div>

        {/* Right Column: Energy, Rooms & Recent Events (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <EnergyChart />
          <RoomCards />

          {/* Quick Security Events Feed */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Security Activity</h3>
                  <p className="text-xs text-slate-500">Live system audit trail</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/events')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 group"
              >
                <span>Full Log</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {(events || []).slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-sm shrink-0">{evt.icon || '📌'}</span>
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 truncate">{evt.message}</div>
                      <div className="text-[11px] text-slate-400">{evt.location}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0 ml-2">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Interactive Simulation Lab */}
      <SimulationPanel />
    </div>
  );
}
