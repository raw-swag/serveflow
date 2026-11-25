'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  CreditCard,
  Activity,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';
import { MetricCard, Badge, Button } from '@serveflow/ui-kit';

export default function SuperAdminOverviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const tenants = [
    {
      id: 'ten-01',
      name: 'Tamarind & Co. Hospitality',
      slug: 'tamarind-and-co',
      outlets: 3,
      tables: 54,
      mrr: '₹14,999',
      status: 'ACTIVE',
      plan: 'BUSINESS',
      created: '12 Oct 2026',
    },
    {
      id: 'ten-02',
      name: 'Roast & Bloom Specialty Café',
      slug: 'roast-and-bloom',
      outlets: 1,
      tables: 16,
      mrr: '₹4,999',
      status: 'ACTIVE',
      plan: 'STARTER',
      created: '28 Oct 2026',
    },
    {
      id: 'ten-03',
      name: 'Spice Route Express',
      slug: 'spice-route',
      outlets: 2,
      tables: 32,
      mrr: '₹9,999',
      status: 'ACTIVE',
      plan: 'GROWTH',
      created: '05 Nov 2026',
    },
    {
      id: 'ten-04',
      name: 'Bakehouse 7',
      slug: 'bakehouse-7',
      outlets: 1,
      tables: 8,
      mrr: '₹0',
      status: 'SUSPENDED',
      plan: 'STARTER',
      created: '19 Nov 2026',
    },
  ];

  const filtered = tenants.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-light-background">
      {/* Platform Sidebar */}
      <aside className="w-full lg:w-60 bg-light-primary text-white flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="w-8 h-8 rounded bg-light-secondary flex items-center justify-center font-bold text-sm">
              SF
            </span>
            <div>
              <p className="font-headline font-bold text-sm leading-tight">ServeFlow</p>
              <p className="text-[11px] text-gray-400">Platform Control</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin/overview"
              className="flex items-center gap-3 px-3 py-2 rounded bg-light-primary-container text-white text-xs font-semibold"
            >
              <LayoutDashboard size={16} />
              Global Overview
            </Link>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded text-gray-300 hover:bg-light-primary-container text-xs transition-colors"
            >
              <Store size={16} />
              Tenants & Outlets
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded text-gray-300 hover:bg-light-primary-container text-xs transition-colors"
            >
              <CreditCard size={16} />
              Subscriptions
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded text-gray-300 hover:bg-light-primary-container text-xs transition-colors"
            >
              <Activity size={16} />
              Platform Telemetry
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800 text-xs text-gray-400 px-2">
          <p>Super Admin Console</p>
          <p className="text-[10px] mt-0.5 text-gray-500">v0.1.0-phase01</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-headline text-light-primary">
              Global Platform Overview
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Multi-tenant operations, MRR telemetry, and restaurant provisioning
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">
              <Plus size={16} />
              Provision Tenant
            </Button>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Active Tenants"
            value="42"
            subValue="Across 98 Outlets"
            trend="+12% this mo"
            icon={<Store size={18} />}
          />
          <MetricCard
            title="Monthly Recurring Revenue"
            value="₹4,85,000"
            subValue="Target: ₹5.5L"
            trend="+18.4%"
            icon={<TrendingUp size={18} />}
          />
          <MetricCard
            title="Live Dining Tables"
            value="1,420"
            subValue="842 Occupied now"
            trend="+5% vs last hr"
            icon={<Activity size={18} />}
          />
          <MetricCard
            title="System Availability"
            value="99.98%"
            subValue="Zero incident today"
            trend="Healthy"
            icon={<ArrowUpRight size={18} />}
          />
        </div>

        {/* Tenant Directory Table */}
        <div className="bg-white border border-light-outline-variant rounded-md p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-semibold font-headline text-light-primary">
                Tenant Directory
              </h2>
              <p className="text-xs text-gray-500">Manage client restaurant brands</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-light-outline-variant rounded focus:outline-none focus:border-light-secondary w-48 sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-light-outline-variant rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-light-outline-variant text-gray-500 font-label">
                <tr>
                  <th className="py-2.5 px-3">Restaurant Brand</th>
                  <th className="py-2.5 px-3">Outlets</th>
                  <th className="py-2.5 px-3">Tables</th>
                  <th className="py-2.5 px-3">Plan</th>
                  <th className="py-2.5 px-3">MRR</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-outline-variant">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-light-surface transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-light-primary">{t.name}</p>
                      <p className="text-[11px] font-mono text-gray-400">{t.slug}</p>
                    </td>
                    <td className="py-3 px-3 tabular-nums">{t.outlets} Outlets</td>
                    <td className="py-3 px-3 tabular-nums">{t.tables} Tables</td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] font-medium bg-gray-100 px-2 py-0.5 rounded">
                        {t.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium tabular-nums">{t.mrr}</td>
                    <td className="py-3 px-3">
                      <Badge variant={t.status === 'ACTIVE' ? 'success' : 'error'}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-light-secondary hover:underline font-medium text-xs">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
