import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useHome } from '../context/HomeContext';
import {
  Clock,
  Filter,
  Shield,
  DoorClosed,
  DoorOpen,
  Activity,
  Zap,
  Info,
  Calendar,
  Search,
  Download
} from 'lucide-react';

export default function History() {
  const { events = [] } = useHome();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Security', 'Doors', 'Windows', 'Motion', 'Devices'];

  const filteredEvents = events.filter((evt) => {
    const matchesFilter = filter === 'All' || evt.category?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      evt.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventBadge = (category) => {
    switch (category) {
      case 'security': return { label: 'Security', variant: 'purple' };
      case 'doors': return { label: 'Door Zone', variant: 'info' };
      case 'windows': return { label: 'Window', variant: 'info' };
      case 'motion': return { label: 'Motion', variant: 'warning' };
      case 'devices': return { label: 'Appliance', variant: 'default' };
      default: return { label: 'System', variant: 'default' };
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Security Audit & Event Log"
        subtitle="Chronological audit trail of all perimeter triggers, lock toggles, and mode shifts"
        action={
          <button
            onClick={() => alert('Simulating export of encrypted audit log CSV...')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download size={13} />
            <span>Export Log</span>
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === tab
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search event or zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors w-full sm:w-48"
            />
          </div>
        </div>
      </Card>

      {/* Timeline / Table Hybrid Card */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Event & Description</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Location / Node</th>
                <th className="py-3 px-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No matching security events recorded.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => {
                  const badge = getEventBadge(evt.category);
                  const date = new Date(evt.timestamp);

                  return (
                    <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <span className="text-base p-1.5 rounded-lg bg-slate-100 shrink-0">
                            {evt.icon || '📌'}
                          </span>
                          <div>
                            <span className="font-semibold text-slate-900 block leading-tight">
                              {evt.message}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {evt.id.substring(0, 10)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <Badge variant={badge.variant} size="sm">
                          {badge.label}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-5">
                        <span className="font-medium text-slate-700">{evt.location}</span>
                      </td>

                      <td className="py-3.5 px-5 text-right text-slate-500 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">
                          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
