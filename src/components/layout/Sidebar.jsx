import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  Home,
  Cpu,
  Camera,
  Workflow,
  Clock,
  Settings,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useHome } from '../../context/HomeContext';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/security', icon: Shield, label: 'Security' },
  { path: '/rooms', icon: Home, label: 'Rooms' },
  { path: '/devices', icon: Cpu, label: 'Devices' },
  { path: '/cameras', icon: Camera, label: 'Cameras' },
  { path: '/automation', icon: Workflow, label: 'Automation' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { alarmActive, securityMode } = useHome();

  const modeColors = {
    home: 'text-emerald-400',
    away: 'text-red-400',
    sleep: 'text-purple-400',
    maintenance: 'text-amber-400',
  };

  const sidebar = (
    <div
      className={`h-full flex flex-col glass border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
          <Zap size={22} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-white tracking-tight">HomeGuard</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
              Smart Living. Safer Home.
            </p>
          </div>
        )}
      </div>

      {/* Security Mode Indicator */}
      <div className={`mx-4 mt-4 p-3 rounded-xl glass-light ${alarmActive ? 'glow-red' : ''}`}>
        <div className="flex items-center gap-2">
          {alarmActive && (
            <span className="w-2 h-2 rounded-full bg-red-500 status-blink flex-shrink-0" />
          )}
          <Shield size={16} className={modeColors[securityMode]} />
          {!collapsed && (
            <span className={`text-xs font-semibold ${modeColors[securityMode]}`}>
              {securityMode.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-accent-blue/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon
              size={20}
              className="flex-shrink-0 transition-transform group-hover:scale-110"
            />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block p-4 border-t border-white/5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <Menu size={18} />
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-screen sticky top-0">{sidebar}</div>
    </>
  );
}
