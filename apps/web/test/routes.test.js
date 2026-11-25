const fs = require('fs');
const path = require('path');

function testRoutes() {
  console.log('Testing @serveflow/web route availability...');

  const appDir = path.join(__dirname, '../app');

  const requiredRoutes = [
    { name: 'Super Admin Overview', file: '(super-admin)/admin/overview/page.tsx' },
    { name: 'Owner Dashboard', file: '(dashboard)/owner/dashboard/page.tsx' },
    { name: 'Owner Menu', file: '(dashboard)/owner/menu/page.tsx' },
    { name: 'Manager Operations', file: '(dashboard)/manager/operations/page.tsx' },
    { name: 'Waiter Floor', file: '(waiter)/waiter/floor/page.tsx' },
    { name: 'Cashier POS', file: '(pos)/pos/register/page.tsx' },
    { name: 'Kitchen KDS', file: '(kds)/kds/pass/page.tsx' },
    { name: 'Customer Ordering', file: '(customer)/menu/[tenantSlug]/[tableId]/page.tsx' },
  ];

  for (const r of requiredRoutes) {
    const fullPath = path.join(appDir, r.file);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Route file missing for ${r.name}: ${r.file}`);
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.length < 100) {
      throw new Error(`Route file too small/empty for ${r.name}: ${r.file}`);
    }
  }

  console.log(`✅ All ${requiredRoutes.length} required application route skeletons verified.`);
}

testRoutes();
