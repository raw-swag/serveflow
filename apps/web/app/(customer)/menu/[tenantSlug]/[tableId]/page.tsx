'use client';

import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { DietaryBadge, CurrencyDisplay, Badge, Button } from '@serveflow/ui-kit';

export default function CustomerQrMenuPage({
  params,
}: {
  params: { tenantSlug: string; tableId: string };
}) {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [dietaryFilter, setDietaryFilter] = useState<'ALL' | 'VEG'>('ALL');
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([
    { id: '1', name: 'Paneer Tikka Angara', price: 340, qty: 1 },
    { id: '2', name: 'Garlic Naan (Butter)', price: 65, qty: 2 },
  ]);

  const menu = [
    {
      id: '1',
      name: 'Paneer Tikka Angara',
      category: 'Starters',
      desc: 'Cottage cheese marinated in Kashmiri red chilies and roasted in clay oven.',
      price: 340,
      diet: 'VEG' as const,
    },
    {
      id: '2',
      name: 'Murgh Malai Kebab',
      category: 'Starters',
      desc: 'Tender chicken skewers infused with cheese, cardamom and rich clotted cream.',
      price: 420,
      diet: 'NON_VEG' as const,
    },
    {
      id: '3',
      name: 'Dal Makhani Bukhara',
      category: 'Main Course',
      desc: 'Black lentils slow simmered overnight with vine-ripened tomatoes and butter.',
      price: 360,
      diet: 'VEG' as const,
    },
    {
      id: '4',
      name: 'Dum Biryani (Chicken)',
      category: 'Rice & Biryani',
      desc: 'Fragrant basmati rice layered with spiced chicken and sealed in clay handi.',
      price: 460,
      diet: 'NON_VEG' as const,
    },
  ];

  const addToCart = (item: (typeof menu)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const filtered = menu.filter((item) => {
    const matchCat = item.category === activeCategory;
    const matchDiet = dietaryFilter === 'ALL' || item.diet === 'VEG';
    return matchCat && matchDiet;
  });

  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="min-h-screen bg-light-background max-w-md mx-auto flex flex-col justify-between pb-24">
      {/* Restaurant Branding Header */}
      <header className="bg-white border-b border-light-outline-variant p-4 sticky top-0 z-10 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-brand-tamarind text-white flex items-center justify-center font-bold text-sm">
              T
            </span>
            <div>
              <h1 className="text-base font-bold font-headline text-light-primary">
                Tamarind & Co.
              </h1>
              <p className="text-[11px] text-gray-500">Table: {params.tableId || 'T-04'}</p>
            </div>
          </div>
          <Badge variant="success">Kitchen Open</Badge>
        </div>

        {/* Veg Only Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-700">Filter Pure Veg</span>
          <button
            onClick={() => setDietaryFilter(dietaryFilter === 'ALL' ? 'VEG' : 'ALL')}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
              dietaryFilter === 'VEG' ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-white shadow-xs" />
          </button>
        </div>
      </header>

      {/* Category Pills */}
      <div className="p-4 bg-white border-b border-light-outline-variant flex items-center gap-2 overflow-x-auto">
        {['Starters', 'Main Course', 'Rice & Biryani'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-light-primary text-white'
                : 'bg-light-surface text-gray-600 border border-light-outline-variant'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Catalog Items */}
      <main className="p-4 space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-light-outline-variant rounded-md p-4 flex items-start justify-between gap-3 shadow-none"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <DietaryBadge type={item.diet} />
                <h3 className="font-semibold text-sm text-light-primary">{item.name}</h3>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.desc}</p>
              <p className="font-mono font-bold text-sm text-light-primary">
                <CurrencyDisplay amount={item.price} />
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => addToCart(item)}
              className="shrink-0 text-light-secondary border-light-secondary hover:bg-emerald-50"
            >
              + Add
            </Button>
          </div>
        ))}
      </main>

      {/* Sticky Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-xs border-t border-light-outline-variant z-20">
          <div className="bg-light-primary text-white p-3.5 rounded-md flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-semibold">{cartCount} items in cart</p>
              <p className="text-sm font-bold font-mono">
                <CurrencyDisplay amount={cartTotal} />
              </p>
            </div>
            <button className="flex items-center gap-1.5 bg-light-secondary text-white px-4 py-2 rounded text-xs font-semibold hover:opacity-95">
              <span>View Order</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
