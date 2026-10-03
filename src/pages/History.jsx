import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useHome } from '../context/HomeContext';
import { Shield, Lock, Unlock, Activity, Zap, Info, Bell, MapPin, Clock } from 'lucide-react';

const History = () => {
  const { events } = useHome();
  const [filter, setFilter] = useState('All');

  const tabs = ['All', 'Security', 'Doors', 'Windows', 'Motion', 'Devices'];

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category === filter.toLowerCase());

  const getIcon = (type) => {
    switch (type) {
      case 'security': return <Shield className="w-5 h-5" />;
      case 'doors': return <Lock className="w-5 h-5" />;
      case 'motion': return <Activity className="w-5 h-5" />;
      case 'devices': return <Zap className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'security': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'doors': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'motion': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'devices': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-dark-300 bg-dark-700 border-white/10';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    let relative = '';
    if (diffMins < 60) relative = `${diffMins}m ago`;
    else if (diffHours < 24) relative = `${diffHours}h ago`;
    else if (diffDays === 1) relative = 'Yesterday';
    else relative = `${diffDays}d ago`;

    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      relative
    };
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      <Header title="History" />
      
      <div className="border-b border-white/10 bg-dark-800/40 backdrop-blur-md sticky top-0 z-10 px-4 md:px-8 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max mx-auto max-w-4xl">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === tab 
                  ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-900/20' 
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {filteredEvents.length === 0 ? (
            <Card className="text-center p-12 flex flex-col items-center border-white/5">
              <Bell className="w-12 h-12 text-dark-400 mb-4" />
              <h3 className="text-lg font-semibold text-dark-200">No events found</h3>
              <p className="text-sm text-dark-400 mt-2">Try changing your filters or check back later.</p>
            </Card>
          ) : (
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 md:before:ml-8 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-dark-700 before:via-dark-700 before:to-transparent">
              {filteredEvents.map((event, idx) => {
                const timeInfo = formatTime(event.timestamp);
                const colorClasses = getColor(event.category);
                
                return (
                  <div key={event.id} className="relative flex items-start gap-4 md:gap-6 pl-2 md:pl-0">
                    <div className="sticky top-20 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-dark-900 border-4 border-dark-900 shrink-0 shadow-sm mt-1">
                      <div className={`w-full h-full flex items-center justify-center rounded-full border ${colorClasses}`}>
                        {getIcon(event.category)}
                      </div>
                    </div>
                    
                    <Card className="flex-1 p-5 hover:bg-dark-800/80 transition-colors border-white/5 shadow-md group">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <h3 className="text-base font-semibold group-hover:text-blue-400 transition-colors">{event.message}</h3>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-dark-400 whitespace-nowrap bg-dark-900 px-3 py-1 rounded-full w-fit">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium text-dark-200">{timeInfo.time}</span>
                          <span>•</span>
                          <span>{timeInfo.relative}</span>
                        </div>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-sm text-dark-300 font-light mt-3">
                          <MapPin className="w-4 h-4 text-dark-400" />
                          {event.location}
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
