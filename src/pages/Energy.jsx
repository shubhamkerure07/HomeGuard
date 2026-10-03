import React, { useState } from 'react';
import { useHome } from '../context/HomeContext';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Zap, TrendingUp, DollarSign, Leaf, Clock, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

export default function Energy() {
  const { energyUsage, energyData, energyDataWeekly, energyDataMonthly, deviceConsumption } = useHome();
  const [timeRange, setTimeRange] = useState('daily'); // 'daily' | 'weekly' | 'monthly'

  const currentKw = energyUsage || 2.4;
  const estimatedCostPerHour = (currentKw * 0.12).toFixed(2);
  const estimatedMonthlyBill = (currentKw * 24 * 30 * 0.12).toFixed(1);

  const getChartData = () => {
    if (timeRange === 'weekly') return energyDataWeekly || [];
    if (timeRange === 'monthly') return energyDataMonthly || [];
    return energyData || [];
  };

  const getXKey = () => {
    if (timeRange === 'weekly') return 'day';
    if (timeRange === 'monthly') return 'month';
    return 'time';
  };

  return (
    <div className="space-y-6">
      <Header
        title="Energy Consumption"
        subtitle="Real-time electricity monitoring, breakdown by appliance, and cost analytics"
      />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>CURRENT LOAD</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Zap size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{currentKw} kW</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <ArrowDownRight size={14} />
            <span>4.2% lower than peak</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>TODAY'S TOTAL</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">18.6 kWh</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Est. cost: $2.23 today</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>PROJECTED MONTHLY</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">${estimatedMonthlyBill}</div>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
            <span>Based on current usage</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>ECO SCORE</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Leaf size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">92 / 100</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span>Top 10% in community</span>
          </div>
        </Card>
      </div>

      {/* Main Energy Chart with Tabs */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Power Consumption Trend</h2>
            <p className="text-xs text-slate-500 mt-0.5">Energy usage plotted over time</p>
          </div>

          {/* Time range pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === 'daily'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === 'weekly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Clean Recharts Area/Bar Chart in White Theme */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="energyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey={getXKey()} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
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
                name="Usage (kWh)"
                stroke="#0f172a"
                strokeWidth={2}
                fill="url(#energyFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Device Breakdown & Efficiency Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Appliance Consumption Breakdown</h3>
              <p className="text-xs text-slate-500 mt-0.5">Where your power is actively going</p>
            </div>
            <Badge variant="default">Real-time</Badge>
          </div>

          <div className="space-y-4">
            {(deviceConsumption || []).map((device, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{device.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{device.kwh}</span>
                    <span className="font-bold text-slate-900 w-10 text-right">{device.usage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${device.usage}%`,
                      backgroundColor: device.color || '#3b82f6'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Energy Optimization Card */}
        <Card className="p-6 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf size={16} />
              <span>Smart Efficiency Advice</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Automated Savings</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Your Living Room dual inverter AC is operating at peak cooling. Raising target temperature by 1°C can save approximately 8% power.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="font-semibold text-slate-900">Auto-Eco Night Schedule</div>
                <div className="text-slate-500">Auto-turn off water heaters and EV chargers after midnight.</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="font-semibold text-slate-900">Away Mode Disconnect</div>
                <div className="text-slate-500">Automatically cuts phantom standby power to office workstation.</div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-200/60">
            <Button variant="outline" className="w-full text-xs">
              Apply Recommended Automation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
