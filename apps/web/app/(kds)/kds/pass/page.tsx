'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, ChefHat } from 'lucide-react';
import { Badge, Button } from '@serveflow/ui-kit';

export default function KitchenDisplayPage() {
  const [stationFilter, setStationFilter] = useState('ALL');

  const [tickets, setTickets] = useState([
    {
      id: '#KOT-104',
      table: 'T-04',
      elapsedSeconds: 240, // 4 mins (green)
      station: 'Tandoor Station',
      items: [
        { name: 'Paneer Tikka Angara', qty: 2, notes: 'Extra Spicy', ready: false },
        { name: 'Garlic Naan (Butter)', qty: 4, notes: 'Crispy', ready: false },
      ],
    },
    {
      id: '#KOT-103',
      table: 'T-11',
      elapsedSeconds: 840, // 14 mins (amber)
      station: 'Curry Station',
      items: [
        { name: 'Dal Makhani Bukhara', qty: 1, notes: 'No extra butter', ready: true },
        { name: 'Murgh Lababdar', qty: 1, notes: 'Standard', ready: false },
      ],
    },
    {
      id: '#KOT-101',
      table: 'T-02',
      elapsedSeconds: 1350, // 22.5 mins (red alert)
      station: 'Main Kitchen',
      items: [
        { name: 'Dum Pukht Biryani', qty: 2, notes: 'Double Raita', ready: false },
      ],
    },
  ]);

  const toggleItemReady = (ticketId: string, itemIdx: number) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const nextItems = [...t.items];
          const curr = nextItems[itemIdx];
          if (curr) {
            nextItems[itemIdx] = { ...curr, ready: !curr.ready };
          }
          return { ...t, items: nextItems };
        }
        return t;
      })
    );
  };

  const getAgingColor = (sec: number) => {
    if (sec < 600) return 'bg-emerald-800 text-white'; // <10m
    if (sec < 1200) return 'bg-amber-800 text-white'; // 10-20m
    return 'bg-red-800 text-white animate-pulse'; // >20m
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const filtered =
    stationFilter === 'ALL' ? tickets : tickets.filter((t) => t.station === stationFilter);

  return (
    <div className="min-h-screen bg-dark-background text-dark-on-background p-6">
      {/* Top KDS Control Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-dark-outline-variant">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded bg-dark-secondary text-dark-on-secondary flex items-center justify-center font-bold">
            <ChefHat size={22} />
          </span>
          <div>
            <h1 className="text-xl font-bold font-headline text-white">
              Kitchen Display System (KDS Pass)
            </h1>
            <p className="text-xs text-gray-400">Station ticket aging, prep queues & chef dispatch</p>
          </div>
        </div>

        {/* Station Filter Pills */}
        <div className="flex items-center gap-2">
          {['ALL', 'Tandoor Station', 'Curry Station', 'Main Kitchen'].map((st) => (
            <button
              key={st}
              onClick={() => setStationFilter(st)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                stationFilter === st
                  ? 'bg-dark-secondary text-dark-on-secondary'
                  : 'bg-dark-surface-container-low text-gray-300 hover:bg-dark-surface-container'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </header>

      {/* Ticket Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-dark-surface-container-low border border-dark-outline-variant rounded-md overflow-hidden flex flex-col justify-between"
          >
            {/* Ticket Header */}
            <div className={`p-3 flex items-center justify-between ${getAgingColor(ticket.elapsedSeconds)}`}>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base">{ticket.table}</span>
                <span className="font-mono text-xs opacity-80">{ticket.id}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                <Clock size={14} />
                <span>{formatTimer(ticket.elapsedSeconds)}</span>
              </div>
            </div>

            {/* Ticket Items */}
            <div className="p-4 space-y-3 flex-1">
              <p className="text-xs text-gray-400 font-mono mb-2">Station: {ticket.station}</p>
              {ticket.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleItemReady(ticket.id, idx)}
                  className={`p-2.5 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    item.ready
                      ? 'bg-dark-surface-container border-emerald-600/50 opacity-60'
                      : 'bg-dark-surface-container-high border-dark-outline-variant hover:border-dark-secondary'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-white">
                        {item.qty}x
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          item.ready ? 'line-through text-gray-400' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-amber-400 mt-0.5 font-mono">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>

                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center ${
                      item.ready ? 'bg-emerald-500 text-white' : 'border border-gray-500'
                    }`}
                  >
                    {item.ready && <CheckCircle2 size={16} />}
                  </span>
                </div>
              ))}
            </div>

            {/* Ticket Footer Action */}
            <div className="p-3 border-t border-dark-outline-variant bg-dark-surface flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Tap items to mark ready</span>
              <button className="px-3 py-1 rounded bg-dark-secondary text-dark-on-secondary text-xs font-semibold hover:opacity-90">
                Complete Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
