import Sidebar from './Sidebar';
import { useHome } from '../../context/HomeContext';
import { AlertTriangle, X, Eye, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { activeAlert, alarmActive, dismissAlert, silenceAlarm } = useHome();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar />

      <main className="flex-1 min-h-screen">
        {/* Global Security Alert Banner */}
        {activeAlert && (
          <div className={`${alarmActive ? 'bg-red-500/20 border-red-500/40' : 'bg-amber-500/10 border-amber-500/30'} border-b px-6 py-3 flex items-center justify-between animate-slide-in`}>
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className={alarmActive ? 'text-red-400 status-blink' : 'text-amber-400'} />
              <span className={`text-sm font-medium ${alarmActive ? 'text-red-300' : 'text-amber-300'}`}>
                🚨 {activeAlert.message} — {new Date(activeAlert.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/security')}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all"
              >
                <Eye size={12} />
                View
              </button>
              {alarmActive && (
                <button
                  onClick={silenceAlarm}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all"
                >
                  <VolumeX size={12} />
                  Silence
                </button>
              )}
              <button
                onClick={dismissAlert}
                className="p-1 rounded-lg hover:bg-white/10 transition-all"
              >
                <X size={14} className="text-white/60" />
              </button>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-8 lg:pl-8">
          <div className="page-enter">{children}</div>
        </div>
      </main>
    </div>
  );
}
