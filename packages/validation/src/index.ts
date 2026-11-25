import { z } from 'zod';

export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const FSSAI_REGEX = /^[0-9]{14}$/;

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const tenantCreateSchema = z.object({
  name: z.string().min(2, 'Restaurant name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lower-case alphanumeric with dashes'),
  ownerEmail: z.string().email(),
  ownerName: z.string().min(2),
  planTier: z.enum(['STARTER', 'GROWTH', 'BUSINESS', 'ENTERPRISE']),
});

export const outletTaxConfigSchema = z.object({
  gstin: z.string().regex(GSTIN_REGEX, 'Invalid 15-digit GSTIN format').optional(),
  fssaiNumber: z.string().regex(FSSAI_REGEX, 'Invalid 14-digit FSSAI number format').optional(),
  defaultGstRate: z.number().min(0).max(28).default(5),
  isCompositionScheme: z.boolean().default(false),
});

export const menuItemCreateSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  categoryId: z.string().uuid(),
  price: z.number().positive('Price must be greater than 0'),
  dietaryType: z.enum(['VEG', 'NON_VEG', 'EGG', 'JAIN']),
  isAvailable: z.boolean().default(true),
  kitchenStationId: z.string().uuid(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type TenantCreateInput = z.infer<typeof tenantCreateSchema>;
export type OutletTaxConfigInput = z.infer<typeof outletTaxConfigSchema>;
export type MenuItemCreateInput = z.infer<typeof menuItemCreateSchema>;
