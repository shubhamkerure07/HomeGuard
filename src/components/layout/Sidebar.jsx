import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  Home,
  Cpu,
  Camera,
  Workflow,
  Clock,
  Zap,
  Settings,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useHome } from '../../context/HomeContext';

const primaryNavItems = [
  { path: '/', icon: LayoutDashboard, label: 'Overview' },
  { path: '/security', icon: Shield, label: 'Security' },
  { path: '/rooms', icon: Home, label: 'Rooms' },
  { path: '/devices', icon: Cpu, label: 'Devices' },
  { path: '/cameras', icon: Camera, label: 'Cameras' },
  { path: '/automation', icon: Workflow, label: 'Automation' },
  { path: '/events', icon: Clock, label: 'Events' },
  { path: '/energy', icon: Zap, label: 'Energy' },
];

export default function Sidebar() {
  const { securityMode, alarmActive } = useHome();
  const location = useLocation();

  const getModeBadge = () => {
    switch (securityMode) {
      case 'away':
        return { text: 'Away Mode', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'sleep':
        return { text: 'Sleep Mode', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'maintenance':
        return { text: 'Maintenance', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { text: 'Home Armed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const modeBadge = getModeBadge();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 select-none shrink-0 z-30">
      <div>
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">HomeGuard</h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">SMART LIVING & SECURITY</p>
          </div>
        </div>

        {/* Security Status Card */}
        <div className="mx-1 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${alarmActive ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
            <div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Perimeter</div>
              <div className="text-xs font-semibold text-slate-900">
                {alarmActive ? 'THREAT DETECTED' : modeBadge.text}
              </div>
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 font-semibold rounded-md border ${modeBadge.color}`}>
            {securityMode.toUpperCase()}
          </span>
        </div>

        {/* Navigation Section */}
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase px-2 mb-2">Menu</div>
        <nav className="space-y-1">
          {primaryNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/events' && location.pathname === '/history');
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.path === '/security' && alarmActive && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Settings & System */}
      <div className="pt-4 border-t border-slate-100">
        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 mb-3
            ${isActive ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}
          `}
        >
          <Settings size={18} className="text-slate-400" />
          <span>Settings</span>
        </NavLink>

        <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="font-medium text-slate-700">Hub v1.0 • ESP32 Ready</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>
    </aside>
  );
}
