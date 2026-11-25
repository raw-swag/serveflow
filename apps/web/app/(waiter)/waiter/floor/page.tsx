'use client';

import React, { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { Badge, Button } from '@serveflow/ui-kit';

export default function WaiterFloorPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'alerts' | 'tables'>('all');

  const tables = [
    { id: 'T-01', area: 'Ground Floor', status: 'OCCUPIED', alert: null, items: 3 },
    { id: 'T-02', area: 'Ground Floor', status: 'VACANT', alert: null, items: 0 },
    { id: 'T-03', area: 'Ground Floor', status: 'READY_TO_SERVE', alert: 'Food Ready at Tandoor Pass', items: 4 },
    { id: 'T-04', area: 'AC Hall', status: 'BILL_REQUESTED', alert: 'Guest Requested Bill (Cash)', items: 2 },
    { id: 'T-05', area: 'AC Hall', status: 'OCCUPIED', alert: null, items: 5 },
  ];

  return (
    <div className="min-h-screen bg-light-background max-w-md mx-auto p-4 flex flex-col justify-between">
      {/* Top Mobile Bar */}
      <div>
        <header className="flex items-center justify-between pb-4 mb-4 border-b border-light-outline-variant">
          <div>
            <h1 className="text-lg font-bold font-headline text-light-primary">Waiter Companion</h1>
            <p className="text-xs text-gray-500">Ramesh (Server #04) · Shift: Lunch</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-light-primary text-white flex items-center justify-center text-xs font-bold">
              R
            </span>
          </div>
        </header>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded text-xs font-semibold ${
              activeTab === 'all'
                ? 'bg-light-primary text-white'
                : 'bg-white border border-light-outline-variant text-gray-700'
            }`}
          >
            All Tables
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-1.5 rounded text-xs font-semibold relative ${
              activeTab === 'alerts'
                ? 'bg-light-primary text-white'
                : 'bg-white border border-light-outline-variant text-gray-700'
            }`}
          >
            Alerts (2)
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-2" />
          </button>
        </div>

        {/* Waiter Tables List */}
        <div className="space-y-3">
          {tables.map((t) => (
            <div
              key={t.id}
              className={`p-3.5 rounded-md border transition-all ${
                t.alert
                  ? 'bg-amber-50 border-amber-300'
                  : 'bg-white border-light-outline-variant'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-light-primary">{t.id}</span>
                  <span className="text-xs text-gray-500">{t.area}</span>
                </div>
                <Badge
                  variant={
                    t.status === 'READY_TO_SERVE'
                      ? 'info'
                      : t.status === 'BILL_REQUESTED'
                      ? 'error'
                      : t.status === 'VACANT'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {t.status.replace(/_/g, ' ')}
                </Badge>
              </div>

              {t.alert && (
                <div className="mt-2 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                  <Bell size={14} className="text-amber-600 animate-pulse" />
                  {t.alert}
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">{t.items} items active</span>
                <button className="text-light-secondary font-semibold hover:underline">
                  + Punch KOT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Action */}
      <div className="sticky bottom-4 pt-4">
        <Button variant="secondary" size="lg" className="w-full shadow-md">
          <Plus size={18} /> Take New Order at Table
        </Button>
      </div>
    </div>
  );
}
