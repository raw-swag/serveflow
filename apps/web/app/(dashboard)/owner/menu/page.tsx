'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter, AlertTriangle } from 'lucide-react';
import { DietaryBadge, CurrencyDisplay, Badge, Button } from '@serveflow/ui-kit';

export default function OwnerMenuPage() {
  const [activeBrand, setActiveBrand] = useState<'tamarind' | 'roast'>('tamarind');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const [menuItems, setMenuItems] = useState([
    {
      id: 'item-01',
      name: 'Paneer Tikka Angara',
      category: 'Starters',
      price: 340,
      diet: 'VEG' as const,
      station: 'Tandoor Station',
      isAvailable: true,
    },
    {
      id: 'item-02',
      name: 'Murgh Malai Kebab',
      category: 'Starters',
      price: 420,
      diet: 'NON_VEG' as const,
      station: 'Tandoor Station',
      isAvailable: true,
    },
    {
      id: 'item-03',
      name: 'Dal Makhani Bukhara',
      category: 'Main Course',
      price: 360,
      diet: 'VEG' as const,
      station: 'Curry Station',
      isAvailable: true,
    },
    {
      id: 'item-04',
      name: 'Dum Pukht Gosht Biryani',
      category: 'Rice & Biryani',
      price: 540,
      diet: 'NON_VEG' as const,
      station: 'Main Kitchen',
      isAvailable: false, // 86'd
    },
    {
      id: 'item-05',
      name: 'Jain Paneer Lababdar',
      category: 'Main Course',
      price: 380,
      diet: 'JAIN' as const,
      station: 'Curry Station',
      isAvailable: true,
    },
    {
      id: 'item-06',
      name: 'Masala Egg Bhurji Roll',
      category: 'Starters',
      price: 240,
      diet: 'EGG' as const,
      station: 'Snack Station',
      isAvailable: true,
    },
  ]);

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isAvailable: !i.isAvailable } : i))
    );
  };

  const categories = ['ALL', 'Starters', 'Main Course', 'Rice & Biryani'];

  const filtered = menuItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = activeCategory === 'ALL' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-light-background p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Brand Switcher Demo */}
      <div className="bg-white border border-light-outline-variant rounded-md p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold font-headline text-light-primary">
            Multi-Tenant Brand Customization Preview
          </h2>
          <p className="text-xs text-gray-500">
            Switch between demo brand visual identities to inspect dynamic styling tokens
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveBrand('tamarind')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-2 border transition-all ${
              activeBrand === 'tamarind'
                ? 'bg-brand-tamarind text-white border-brand-tamarind'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            Tamarind & Co. (Terracotta)
          </button>
          <button
            onClick={() => setActiveBrand('roast')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-2 border transition-all ${
              activeBrand === 'roast'
                ? 'bg-brand-roast text-white border-brand-roast'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
            Roast & Bloom (Botanical Olive)
          </button>
        </div>
      </div>

      {/* Catalog Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-headline text-light-primary">
            Dynamic Menu Engineering
          </h1>
          <p className="text-xs text-gray-500">
            Catalog prices, dietary classifications, station routing & real-time 86 stockout toggles
          </p>
        </div>
        <Button variant="secondary" size="md">
          <Plus size={16} /> Add Menu Item
        </Button>
      </header>

      {/* Filter Toolbar */}
      <div className="bg-white border border-light-outline-variant rounded-md p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-light-primary text-white'
                  : 'bg-light-surface text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs border border-light-outline-variant rounded focus:outline-none focus:border-light-secondary w-full sm:w-60"
          />
        </div>
      </div>

      {/* Menu Catalog Table */}
      <div className="bg-white border border-light-outline-variant rounded-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-light-outline-variant text-gray-500 bg-light-surface font-label">
            <tr>
              <th className="py-2.5 px-4">Item Name</th>
              <th className="py-2.5 px-4">Dietary Type</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4">Base Price</th>
              <th className="py-2.5 px-4">Station Routing</th>
              <th className="py-2.5 px-4">Stock Status (86)</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-outline-variant">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-light-surface transition-colors">
                <td className="py-3 px-4 font-semibold text-light-primary">
                  {item.name}
                  {!item.isAvailable && (
                    <span className="ml-2 text-[10px] text-red-600 font-normal">
                      (86&apos;d - Unavailable)
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <DietaryBadge type={item.diet} />
                    <span className="text-[11px] font-medium">{item.diet}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{item.category}</td>
                <td className="py-3 px-4 font-mono font-semibold">
                  <CurrencyDisplay amount={item.price} />
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                    {item.station}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                      item.isAvailable
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock' : "Paused (86'd)"}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-light-secondary hover:underline font-medium text-xs">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
