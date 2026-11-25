'use client';

import React, { useState } from 'react';
import { Search, Printer, CreditCard, QrCode, Banknote, Split, Trash2 } from 'lucide-react';
import { CurrencyDisplay, DietaryBadge, Badge, Button } from '@serveflow/ui-kit';

export default function CashierPosPage() {
  const [billItems, setBillItems] = useState([
    { id: '1', name: 'Paneer Butter Masala', qty: 2, price: 340, diet: 'VEG' as const },
    { id: '2', name: 'Garlic Naan (Butter)', qty: 4, price: 65, diet: 'VEG' as const },
    { id: '3', name: 'Murgh Dum Biryani', qty: 1, price: 420, diet: 'NON_VEG' as const },
  ]);

  const [activePaymentMethod, setActivePaymentMethod] = useState<'CASH' | 'CARD' | 'UPI_QR' | 'SPLIT'>('UPI_QR');

  const catalog = [
    { id: 'c1', name: 'Paneer Tikka', price: 320, diet: 'VEG' as const },
    { id: 'c2', name: 'Dal Makhani', price: 290, diet: 'VEG' as const },
    { id: 'c3', name: 'Butter Chicken', price: 440, diet: 'NON_VEG' as const },
    { id: 'c4', name: 'Jeera Rice', price: 180, diet: 'VEG' as const },
    { id: 'c5', name: 'Tandoori Roti', price: 45, diet: 'VEG' as const },
    { id: 'c6', name: 'Gulab Jamun (2 pcs)', price: 120, diet: 'VEG' as const },
  ];

  const addItemToBill = (item: (typeof catalog)[0]) => {
    setBillItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setBillItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = billItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cgst = subtotal * 0.025; // 2.5% CGST
  const sgst = subtotal * 0.025; // 2.5% SGST
  const grandTotal = Math.round(subtotal + cgst + sgst);

  return (
    <div className="min-h-screen bg-light-background flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Pane (Catalog & Quick Order) - 58% width */}
      <section className="flex-1 flex flex-col border-r border-light-outline-variant bg-light-surface p-4 overflow-y-auto">
        <header className="flex items-center justify-between pb-3 border-b border-light-outline-variant mb-4">
          <div>
            <h1 className="text-lg font-bold font-headline text-light-primary">
              POS Terminal #01 · Cashier Billing
            </h1>
            <p className="text-xs text-gray-500">Tamarind & Co. (GSTIN: 29AABCS1429B1Z8)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
              Shift: Lunch POS
            </span>
          </div>
        </header>

        {/* Search Catalog */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items or punch code (F2)..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-light-outline-variant rounded bg-white focus:outline-none focus:border-light-secondary"
          />
        </div>

        {/* Item Catalog Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {catalog.map((item) => (
            <button
              key={item.id}
              onClick={() => addItemToBill(item)}
              className="bg-white border border-light-outline-variant p-3 rounded text-left hover:border-light-secondary hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <DietaryBadge type={item.diet} />
                <span className="font-mono font-bold text-xs text-light-primary">
                  <CurrencyDisplay amount={item.price} />
                </span>
              </div>
              <p className="font-semibold text-xs text-light-primary truncate">{item.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Right Pane (Live Bill Tape & Settlement) - 42% width */}
      <aside className="w-full lg:w-[460px] bg-white flex flex-col justify-between p-5 border-l border-light-outline-variant overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-light-outline-variant mb-4">
            <div>
              <span className="font-mono font-bold text-sm bg-gray-100 px-2 py-1 rounded">
                Table: T-04
              </span>
              <span className="ml-2 text-xs font-mono text-gray-400">#INV-2026-084</span>
            </div>
            <Badge variant="warning">Billing Pending</Badge>
          </div>

          {/* Bill Line Items */}
          <div className="space-y-3 mb-6 max-h-[320px] overflow-y-auto pr-1">
            {billItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <DietaryBadge type={item.diet} />
                  <span className="font-medium text-light-primary">{item.name}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-gray-500">x{item.qty}</span>
                  <span className="font-semibold tabular-nums">
                    <CurrencyDisplay amount={item.price * item.qty} />
                  </span>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* GST Calculation Breakdown */}
          <div className="bg-light-surface p-3.5 rounded border border-light-outline-variant text-xs space-y-1.5 font-mono mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Item Subtotal:</span>
              <CurrencyDisplay amount={subtotal} />
            </div>
            <div className="flex justify-between text-gray-500">
              <span>CGST (2.5%):</span>
              <CurrencyDisplay amount={cgst} />
            </div>
            <div className="flex justify-between text-gray-500">
              <span>SGST (2.5%):</span>
              <CurrencyDisplay amount={sgst} />
            </div>
            <div className="flex justify-between font-bold text-sm text-light-primary pt-2 border-t border-gray-200">
              <span>Grand Total:</span>
              <CurrencyDisplay amount={grandTotal} />
            </div>
          </div>
        </div>

        {/* Settlement Panel */}
        <div className="pt-4 border-t border-light-outline-variant space-y-3">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => setActivePaymentMethod('UPI_QR')}
              className={`p-2 rounded border flex flex-col items-center gap-1 font-semibold ${
                activePaymentMethod === 'UPI_QR'
                  ? 'bg-light-primary text-white border-light-primary'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <QrCode size={14} /> UPI QR
            </button>
            <button
              onClick={() => setActivePaymentMethod('CASH')}
              className={`p-2 rounded border flex flex-col items-center gap-1 font-semibold ${
                activePaymentMethod === 'CASH'
                  ? 'bg-light-primary text-white border-light-primary'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <Banknote size={14} /> Cash
            </button>
            <button
              onClick={() => setActivePaymentMethod('CARD')}
              className={`p-2 rounded border flex flex-col items-center gap-1 font-semibold ${
                activePaymentMethod === 'CARD'
                  ? 'bg-light-primary text-white border-light-primary'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <CreditCard size={14} /> Card
            </button>
            <button
              onClick={() => setActivePaymentMethod('SPLIT')}
              className={`p-2 rounded border flex flex-col items-center gap-1 font-semibold ${
                activePaymentMethod === 'SPLIT'
                  ? 'bg-light-primary text-white border-light-primary'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <Split size={14} /> Split
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" className="flex-1">
              <Printer size={16} /> Print KOT
            </Button>
            <Button variant="secondary" size="lg" className="flex-1">
              Collect <CurrencyDisplay amount={grandTotal} />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
