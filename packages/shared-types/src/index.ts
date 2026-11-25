/**
 * ServeFlow Core Shared Types & API Envelopes
 */

export interface ApiResponseMeta {
  timestamp: string;
  requestId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  details?: ApiErrorDetail[];
  meta: ApiResponseMeta;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  RESTAURANT_OWNER = 'RESTAURANT_OWNER',
  RESTAURANT_MANAGER = 'RESTAURANT_MANAGER',
  CASHIER = 'CASHIER',
  WAITER = 'WAITER',
  CHEF = 'CHEF',
  GUEST = 'GUEST',
}

export enum TableStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  READY_TO_SERVE = 'READY_TO_SERVE',
  BILL_REQUESTED = 'BILL_REQUESTED',
  SETTLED = 'SETTLED',
}

export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED',
}

export enum DietaryType {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG',
  EGG = 'EGG',
  JAIN = 'JAIN',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  UPI_QR = 'UPI_QR',
  SPLIT = 'SPLIT',
}

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor?: string;
  status: 'ACTIVE' | 'SUSPENDED';
  outletsCount: number;
  planTier: 'STARTER' | 'GROWTH' | 'BUSINESS' | 'ENTERPRISE';
}

export interface MenuItemSummary {
  id: string;
  name: string;
  category: string;
  price: number;
  dietaryType: DietaryType;
  isAvailable: boolean;
  stationName: string;
}

export interface TableSummary {
  id: string;
  tableNumber: string;
  capacity: number;
  areaName: string;
  status: TableStatus;
  currentSessionId?: string;
  qrToken?: string;
}
