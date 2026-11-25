'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ReceiptIndianRupee,
  UtensilsCrossed,
  QrCode,
  Store,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { MetricCard, CurrencyDisplay, Badge, Button } from '@serveflow/ui-kit';

export default function OwnerDashboardPage() {
  const [selectedOutlet, setSelectedOutlet] = useState('indiranagar');

  const outletStats = {
    indiranagar: {
      sales: 142850,
      orders: 148,
      aov: 965,
      tablesOccupied: '18 / 24',
      qrScans: 64,
    },
    koramangala: {
      sales: 98420,
      orders: 94,
      aov: 1047,
      tablesOccupied: '12 / 18',
      qrScans: 41,
    },
    all: {
      sales: 241270,
      orders: 242,
      aov: 997,
      tablesOccupied: '30 / 42',
      qrScans: 105,
    },
  };

  const current = outletStats[selectedOutlet as keyof typeof outletStats] || outletStats.all;

  const liveOrders = [
    { id: '#1042', table: 'T-04', items: 'Paneer Butter Masala, Garlic Naan (2)', time: '8m ago', status: 'IN_KITCHEN' },
    { id: '#1041', table: 'T-11', items: 'Murgh Dum Biryani, Mirchi Ka Salan', time: '14m ago', status: 'READY_TO_SERVE' },
    { id: '#1040', table: 'T-02', items: 'Dal Makhani, Jeera Rice, Tandoori Roti', time: '21m ago', status: 'SERVED' },
    { id: '#1039', table: 'T-08', items: 'Filter Coffee (2), Bun Maska', time: '26m ago', status: 'BILL_REQUESTED' },
  ];

  return (
    <div className="min-h-screen bg-light-background p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-light-outline-variant">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-brand-tamarind text-white flex items-center justify-center font-bold text-sm">
              T
            </span>
            <div>
              <h1 className="text-xl font-bold font-headline text-light-primary">
                Tamarind & Co. Hospitality
              </h1>
              <p className="text-xs text-gray-500">Executive Command & Multi-Outlet Analytics</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedOutlet}
            onChange={(e) => setSelectedOutlet(e.target.value)}
            className="text-xs font-semibold border border-light-outline-variant rounded px-3 py-2 bg-white focus:outline-none"
          >
            <option value="indiranagar">Indiranagar (100ft Rd Flagship)</option>
            <option value="koramangala">Koramangala (4th Block)</option>
            <option value="all">All Outlets Combined (2 Locations)</option>
          </select>
          <Button variant="secondary" size="md">
            + New KOT
          </Button>
        </div>
      </header>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Today's Net Sales"
          value={<CurrencyDisplay amount={current.sales} />}
          subValue="₹18,420 GST collected"
          trend="+14.2% vs yesterday"
          icon={<ReceiptIndianRupee size={18} />}
        />
        <MetricCard
          title="Live Table Occupancy"
          value={current.tablesOccupied}
          subValue="71% floor load"
          trend="8 bill pending"
          icon={<UtensilsCrossed size={18} />}
        />
        <MetricCard
          title="Average Order Value"
          value={<CurrencyDisplay amount={current.aov} />}
          subValue="Target: ₹900"
          trend="+8.5%"
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          title="QR Diner Sessions"
          value={current.qrScans}
          subValue="42% of total orders"
          trend="+19% adoption"
          icon={<QrCode size={18} />}
        />
      </div>

      {/* Main Grid: Orders and Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Orders Feed */}
        <div className="lg:col-span-2 bg-white border border-light-outline-variant rounded-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold font-headline text-light-primary">
              Live Dining Activity
            </h2>
            <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
              <Clock size={12} /> Auto-refreshing
            </span>
          </div>

          <div className="space-y-3">
            {liveOrders.map((o) => (
              <div
                key={o.id}
                className="p-3 border border-light-outline-variant rounded flex items-center justify-between hover:bg-light-surface transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {o.table}
                    </span>
                    <span className="font-mono text-xs text-gray-400">{o.id}</span>
                    <span className="text-xs text-gray-400">· {o.time}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{o.items}</p>
                </div>
                <Badge
                  variant={
                    o.status === 'READY_TO_SERVE'
                      ? 'info'
                      : o.status === 'IN_KITCHEN'
                      ? 'warning'
                      : o.status === 'BILL_REQUESTED'
                      ? 'error'
                      : 'neutral'
                  }
                >
                  {o.status.replace(/_/g, ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operational Actions */}
        <div className="bg-white border border-light-outline-variant rounded-md p-5">
          <h2 className="text-base font-semibold font-headline text-light-primary mb-4">
            Operational Shortcuts
          </h2>
          <div className="space-y-2">
            <a
              href="/owner/menu"
              className="block p-3 border border-light-outline-variant rounded hover:border-light-secondary text-xs transition-colors"
            >
              <p className="font-semibold text-light-primary">Menu & 86 Catalog</p>
              <p className="text-gray-500 text-[11px] mt-0.5">Pause sold out items instantly</p>
            </a>
            <a
              href="/pos/register"
              className="block p-3 border border-light-outline-variant rounded hover:border-light-secondary text-xs transition-colors"
            >
              <p className="font-semibold text-light-primary">Open POS Billing</p>
              <p className="text-gray-500 text-[11px] mt-0.5">Punch orders, split bills & print GST</p>
            </a>
            <a
              href="/kds/pass"
              className="block p-3 border border-light-outline-variant rounded hover:border-light-secondary text-xs transition-colors"
            >
              <p className="font-semibold text-light-primary">Launch KDS Pass</p>
              <p className="text-gray-500 text-[11px] mt-0.5">Kitchen tablet ticket queue</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
