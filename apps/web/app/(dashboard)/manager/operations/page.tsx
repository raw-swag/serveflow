'use client';

import React, { useState } from 'react';
import { Users, Clock, AlertCircle, Utensils, CheckCircle } from 'lucide-react';
import { Badge, Button } from '@serveflow/ui-kit';

export default function ManagerOperationsPage() {
  const [selectedArea, setSelectedArea] = useState('ALL');

  const tables = [
    { id: 'T-01', area: 'Ground Floor', capacity: 4, status: 'OCCUPIED', orderTotal: '₹1,240', time: '32m' },
    { id: 'T-02', area: 'Ground Floor', capacity: 2, status: 'VACANT', orderTotal: '-', time: '-' },
    { id: 'T-03', area: 'Ground Floor', capacity: 6, status: 'READY_TO_SERVE', orderTotal: '₹2,480', time: '18m' },
    { id: 'T-04', area: 'AC Hall', capacity: 4, status: 'OCCUPIED', orderTotal: '₹1,850', time: '41m' },
    { id: 'T-05', area: 'AC Hall', capacity: 4, status: 'BILL_REQUESTED', orderTotal: '₹3,120', time: '58m' },
    { id: 'T-06', area: 'Garden Terrace', capacity: 8, status: 'OCCUPIED', orderTotal: '₹4,690', time: '14m' },
    { id: 'T-07', area: 'Garden Terrace', capacity: 2, status: 'VACANT', orderTotal: '-', time: '-' },
    { id: 'T-08', area: 'Garden Terrace', capacity: 4, status: 'OCCUPIED', orderTotal: '₹890', time: '22m' },
  ];

  const filtered = selectedArea === 'ALL' ? tables : tables.filter((t) => t.area === selectedArea);

  return (
    <div className="min-h-screen bg-light-background p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-light-outline-variant">
        <div>
          <h1 className="text-2xl font-bold font-headline text-light-primary">
            Manager Live Floor Operations
          </h1>
          <p className="text-xs text-gray-500">
            Real-time floor grid, dining occupancy, kitchen readiness & shift coordination
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Floor Active: 6 / 8 Tables</Badge>
        </div>
      </header>

      {/* Area Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {['ALL', 'Ground Floor', 'AC Hall', 'Garden Terrace'].map((area) => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-colors ${
              selectedArea === area
                ? 'bg-light-primary text-white'
                : 'bg-white border border-light-outline-variant text-gray-700 hover:bg-gray-100'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-light-outline-variant rounded-md p-4 flex flex-col justify-between hover:border-light-secondary transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-base text-light-primary">{t.id}</span>
                <Badge
                  variant={
                    t.status === 'VACANT'
                      ? 'success'
                      : t.status === 'READY_TO_SERVE'
                      ? 'info'
                      : t.status === 'BILL_REQUESTED'
                      ? 'error'
                      : 'warning'
                  }
                >
                  {t.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{t.area} · Max {t.capacity} Guests</p>
            </div>

            <div className="mt-4 pt-3 border-t border-light-outline-variant flex items-center justify-between text-xs">
              <span className="font-mono text-gray-500">{t.time}</span>
              <span className="font-mono font-semibold text-light-primary">{t.orderTotal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
