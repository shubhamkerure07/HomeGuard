import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useHome } from '../../context/HomeContext';
import {
  AlertTriangle,
  X,
  Eye,
  VolumeX,
  LayoutDashboard,
  Shield,
  Home,
  Camera,
  MoreHorizontal,
  Cpu,
  Workflow,
  Clock,
  Zap,
  Settings,
  ShieldCheck
} from 'lucide-react';

export default function Layout({ children }) {
  const { activeAlert, alarmActive, dismissAlert, silenceAlarm } = useHome();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const moreNavItems = [
    { path: '/devices', icon: Cpu, label: 'Devices' },
    { path: '/automation', icon: Workflow, label: 'Automation' },
    { path: '/events', icon: Clock, label: 'Events' },
    { path: '/energy', icon: Zap, label: 'Energy' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Mobile Top Header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <span className="font-bold text-slate-900 text-sm">HomeGuard</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Global Security Threat Banner (Clean White UI Red Accent) */}
        {activeAlert && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 sm:px-8 py-3 flex items-center justify-between animate-fadeIn z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide mr-2">Security Alert</span>
                <span className="text-xs sm:text-sm font-medium text-rose-900">
                  {activeAlert.message} &bull; {new Date(activeAlert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/security')}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-colors"
              >
                <Eye size={12} />
                <span>Inspect</span>
              </button>
              {alarmActive && (
                <button
                  onClick={silenceAlarm}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                >
                  <VolumeX size={12} />
                  <span>Silence</span>
                </button>
              )}
              <button
                onClick={dismissAlert}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Page Inner Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto page-fade-enter">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Home | Security | Rooms | Cameras | More) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/security"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors relative ${
            isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield size={18} />
          {alarmActive && <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
          <span>Security</span>
        </NavLink>

        <NavLink
          to="/rooms"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home size={18} />
          <span>Rooms</span>
        </NavLink>

        <NavLink
          to="/cameras"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Camera size={18} />
          <span>Cameras</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-900`}
        >
          <MoreHorizontal size={18} />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile More Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-t-2xl p-5 border-t border-slate-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">More Features</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    <Icon size={16} className="text-slate-600" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
