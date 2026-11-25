import { test, expect } from '@playwright/test';

test.describe('ServeFlow Route Smoke Tests', () => {
  test('1. Super Admin Overview renders successfully', async ({ page }) => {
    const res = await page.goto('/admin/overview');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Global Platform Overview');
    await expect(page.locator('text=Tenant Directory')).toBeVisible();
  });

  test('2. Owner Dashboard renders successfully', async ({ page }) => {
    const res = await page.goto('/owner/dashboard');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Tamarind & Co.');
    await expect(page.locator("text=Today's Net Sales")).toBeVisible();
  });

  test('3. Owner Menu & Multi-Tenant Branding renders successfully', async ({ page }) => {
    const res = await page.goto('/owner/menu');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Dynamic Menu Engineering');
    await expect(page.locator('text=Paneer Tikka Angara')).toBeVisible();
  });

  test('4. Manager Live Operations renders successfully', async ({ page }) => {
    const res = await page.goto('/manager/operations');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Manager Live Floor Operations');
    await expect(page.locator('text=T-01')).toBeVisible();
  });

  test('5. Waiter Floor & Table Ordering renders successfully', async ({ page }) => {
    const res = await page.goto('/waiter/floor');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Waiter Companion');
    await expect(page.locator('text=Take New Order at Table')).toBeVisible();
  });

  test('6. Cashier POS & GST Billing renders successfully', async ({ page }) => {
    const res = await page.goto('/pos/register');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('POS Terminal #01');
    await expect(page.locator('text=CGST (2.5%)')).toBeVisible();
  });

  test('7. Kitchen Display System (KDS Pass) renders successfully in dark mode', async ({ page }) => {
    const res = await page.goto('/kds/pass');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Kitchen Display System');
    await expect(page.getByRole('button', { name: 'Tandoor Station' })).toBeVisible();
  });

  test('8. Customer QR Ordering Experience renders for table', async ({ page }) => {
    const res = await page.goto('/menu/demo/table-1');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Tamarind & Co.');
    await expect(page.locator('text=Filter Pure Veg')).toBeVisible();
  });
});
