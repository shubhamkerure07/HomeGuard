import React from 'react';
import { useHome } from '../../context/HomeContext';
import Card from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EnergyChart() {
  const { energyData, energyUsage } = useHome();
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Zap size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Energy Consumption</h2>
            <p className="text-xs text-slate-500">24-hour demand profile ({energyUsage || 2.4} kW active)</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/energy')}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 group"
        >
          <span>Analytics</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energyData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                color: '#0f172a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="usage"
              name="Load (kW)"
              stroke="#0f172a"
              strokeWidth={2}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
