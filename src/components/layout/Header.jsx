import React, { useState } from 'react';
import { Bell, User, ShieldCheck, AlertTriangle, Sparkles, Lock } from 'lucide-react';
import { useHome } from '../../context/HomeContext';
import Badge from '../ui/Badge';
import GeminiAssistantModal from '../gemini/GeminiAssistantModal';

export default function Header({ title, subtitle, action }) {
  const { alarmActive, activeAlert, securityMode, userName, lockAllDoors } = useHome();
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7 pb-4 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {action}

          {/* Quick Lock Button */}
          <button
            onClick={() => lockAllDoors()}
            title="Emergency Lock All Doors"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium shadow-xs transition-colors"
          >
            <Lock size={13} className="text-slate-500" />
            <span>Lock Doors</span>
          </button>

          {/* Gemini AI Copilot Button */}
          <button
            onClick={() => setIsGeminiOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Gemini AI</span>
          </button>

          {/* Security Mode Pill */}
          <Badge
            variant={
              securityMode === 'away'
                ? 'danger'
                : securityMode === 'sleep'
                ? 'info'
                : securityMode === 'maintenance'
                ? 'warning'
                : 'success'
            }
          >
            <ShieldCheck size={13} />
            <span className="font-semibold uppercase">{securityMode}</span>
          </Badge>

          {/* Alarm Badge */}
          {alarmActive && (
            <Badge variant="danger" pulse>
              <AlertTriangle size={13} />
              <span>ALARM ON</span>
            </Badge>
          )}

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              {userName ? userName.charAt(0).toUpperCase() : 'S'}
            </div>
            <span className="text-xs font-medium text-slate-700 hidden md:inline">{userName || 'Shubham'}</span>
          </div>
        </div>
      </header>

      <GeminiAssistantModal isOpen={isGeminiOpen} onClose={() => setIsGeminiOpen(false)} />
    </>
  );
}
