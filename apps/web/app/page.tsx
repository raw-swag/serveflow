import Link from 'next/link';

export default function HomePage() {
  const routes = [
    { name: 'Super Admin Overview', path: '/admin/overview', desc: 'Platform Control & Multi-Tenant Directory' },
    { name: 'Restaurant Owner Dashboard', path: '/owner/dashboard', desc: 'Executive Analytics & Outlet Performance' },
    { name: 'Owner Menu & Multi-Tenant Brand', path: '/owner/menu', desc: 'Menu Engineering & 86 Availability Toggle' },
    { name: 'Manager Live Operations', path: '/manager/operations', desc: 'Floor Tables, Order Queue & Shift Roster' },
    { name: 'Waiter Floor & Table Ordering', path: '/waiter/floor', desc: 'Mobile-First Server Companion & Kitchen Alerts' },
    { name: 'Cashier POS & GST Billing', path: '/pos/register', desc: 'Split Billing, Dual GST, BharatQR & Thermal POS' },
    { name: 'Kitchen Display System (KDS)', path: '/kds/pass', desc: 'Dedicated Dark Mode Ticket Pass & Aging Timers' },
    { name: 'Customer QR Ordering Experience', path: '/menu/tamarind-and-co/table-04', desc: 'Zero-Install Diner QR Menu & Self-Ordering' },
  ];

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-10 pb-6 border-b border-light-outline-variant flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-light-secondary text-white flex items-center justify-center font-bold text-sm">
              SF
            </span>
            <h1 className="text-2xl font-bold font-headline text-light-primary">ServeFlow</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Phase 01 Foundation & Official Google Stitch UI/UX Integration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Phase 01 Active
          </span>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold font-headline mb-4">
          Integrated Stitch Visual Screen Prototypes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="p-5 bg-white border border-light-outline-variant rounded-md hover:border-light-secondary hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-light-primary group-hover:text-light-secondary transition-colors">
                  {r.name}
                </h3>
                <span className="text-xs font-mono text-gray-400 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{r.desc}</p>
              <span className="inline-block mt-3 text-[11px] font-mono bg-light-surface-container px-2 py-0.5 rounded text-gray-600">
                {r.path}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
