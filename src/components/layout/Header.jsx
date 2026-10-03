import { useState } from 'react';
import { Bell, User, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import { useHome } from '../../context/HomeContext';
import Badge from '../ui/Badge';
import GeminiAssistantModal from '../gemini/GeminiAssistantModal';

export default function Header({ title, subtitle }) {
  const { alarmActive, activeAlert, securityMode, userName, dismissAlert } = useHome();
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Gemini AI Copilot Button */}
          <button
            onClick={() => setIsGeminiOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles size={15} className="animate-spin text-amber-200" style={{ animationDuration: '6s' }} />
            <span>Gemini AI</span>
          </button>
        {/* Alarm badge */}
        {alarmActive && (
          <Badge variant="danger" pulse>
            <AlertTriangle size={12} />
            ALARM ACTIVE
          </Badge>
        )}

        {/* Security mode badge */}
        <Badge
          variant={
            securityMode === 'home'
              ? 'success'
              : securityMode === 'away'
              ? 'danger'
              : securityMode === 'sleep'
              ? 'purple'
              : 'warning'
          }
        >
          <Shield size={12} />
          {securityMode.toUpperCase()}
        </Badge>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl glass-light hover:bg-white/10 transition-colors">
          <Bell size={18} className="text-slate-400" />
          {activeAlert && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full status-blink" />
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline">{userName}</span>
        </div>
        </div>
      </header>
      <GeminiAssistantModal isOpen={isGeminiOpen} onClose={() => setIsGeminiOpen(false)} />
    </>
  );
}
