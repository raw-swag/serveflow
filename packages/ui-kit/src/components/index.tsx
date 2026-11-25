import React from 'react';

// ==========================================
// 1. Button & IconButton
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-label rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-[#001428] text-white hover:bg-[#0F2942] focus:ring-[#0F2942]',
    secondary: 'bg-[#006C53] text-white hover:bg-[#00513E] focus:ring-[#006C53]',
    outline: 'border border-[#C3C6CE] bg-white text-[#111C2D] hover:bg-[#F0F3FF]',
    destructive: 'bg-[#BA1A1A] text-white hover:bg-[#93000A]',
    ghost: 'text-[#111C2D] hover:bg-[#F0F3FF]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'outline',
  size = 'md',
  ariaLabel,
  icon,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const variantClasses = {
    primary: 'bg-[#001428] text-white hover:bg-[#0F2942]',
    secondary: 'bg-[#006C53] text-white hover:bg-[#00513E]',
    outline: 'border border-[#C3C6CE] bg-white text-[#111C2D] hover:bg-[#F0F3FF]',
    ghost: 'text-[#111C2D] hover:bg-[#F0F3FF]',
  };

  return (
    <button
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

// ==========================================
// 2. Badge & StatusIndicator
// ==========================================
export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-[#DCFCE7] text-[#14532D] border-[#BBF7D0]',
    warning: 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]',
    error: 'bg-[#FFDAD6] text-[#93000A] border-[#FFCDD2]',
    info: 'bg-[#E0F2FE] text-[#0C4A6E] border-[#BAE6FD]',
    neutral: 'bg-[#F0F3FF] text-[#111C2D] border-[#C3C6CE]',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-label border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className = '',
}) => {
  const statusColors = {
    online: 'bg-[#15803D]',
    offline: 'bg-[#74777E]',
    busy: 'bg-[#BA1A1A]',
    away: 'bg-[#B45309]',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-label ${className}`}>
      <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      {label && <span className="text-[#111C2D]">{label}</span>}
    </div>
  );
};

// ==========================================
// 3. Card & MetricCard
// ==========================================
export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#C3C6CE] rounded-md p-4 transition-all ${
        onClick ? 'cursor-pointer hover:border-[#006C53] hover:shadow-xs' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  subValue?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  icon,
  trend,
  trendPositive = true,
}) => {
  return (
    <div className="bg-white border border-[#C3C6CE] rounded-md p-4 flex flex-col justify-between shadow-none">
      <div className="flex items-center justify-between text-[#43474D]">
        <span className="text-xs font-label uppercase tracking-wider">{title}</span>
        {icon && <div className="text-[#001428]">{icon}</div>}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-display font-bold text-[#111C2D] tabular-nums">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span
              className={`text-xs font-label ${
                trendPositive ? 'text-[#15803D]' : 'text-[#BA1A1A]'
              }`}
            >
              {trend}
            </span>
          )}
          {subValue && <span className="text-xs text-[#74777E]">{subValue}</span>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Input & SearchInput
// ==========================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-label text-[#43474D] mb-1">{label}</label>}
      <input
        className={`w-full px-3 py-2 text-xs border rounded bg-white text-[#111C2D] focus:outline-none transition-colors ${
          error ? 'border-[#BA1A1A] focus:ring-1 focus:ring-[#BA1A1A]' : 'border-[#C3C6CE] focus:border-[#006C53]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-[#BA1A1A] mt-1">{error}</p>}
    </div>
  );
};

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onClear,
  className = '',
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        className={`w-full pl-8 pr-7 py-1.5 text-xs border border-[#C3C6CE] rounded bg-white text-[#111C2D] focus:outline-none focus:border-[#006C53] ${className}`}
        {...props}
      />
      <span className="absolute left-2.5 top-2 text-[#74777E] text-xs">🔍</span>
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 top-1.5 text-[#74777E] hover:text-[#111C2D] text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// ==========================================
// 5. Tabs
// ==========================================
export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-[#001428] text-white'
                : 'bg-white border border-[#C3C6CE] text-[#43474D] hover:bg-[#F0F3FF]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#0F2942] text-white' : 'bg-[#E0E2EA] text-[#111C2D]'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ==========================================
// 6. Modal Foundation
// ==========================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="bg-white border border-[#C3C6CE] rounded-lg max-w-lg w-full p-5 shadow-xl relative animate-in fade-in-50">
        <div className="flex items-center justify-between pb-3 border-b border-[#C3C6CE] mb-4">
          <h3 className="font-headline font-bold text-base text-[#111C2D]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-[#74777E] hover:text-[#111C2D] text-sm p-1"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// ==========================================
// 7. DataTable Foundation
// ==========================================
export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#74777E] border border-[#C3C6CE] rounded bg-white">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-[#C3C6CE] rounded-md bg-white">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-[#C3C6CE] bg-[#F9F9FF] text-[#43474D] font-label">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2.5 px-4 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#C3C6CE]">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-[#F0F3FF] transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-3 px-4 ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 8. CurrencyDisplay & DietaryBadge & TicketTimer
// ==========================================
export interface CurrencyDisplayProps {
  amount: number;
  prefix?: string;
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  prefix = '₹',
  className = '',
}) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formatted}
    </span>
  );
};

export interface DietaryBadgeProps {
  type: 'VEG' | 'NON_VEG' | 'EGG' | 'JAIN';
  className?: string;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ type, className = '' }) => {
  if (type === 'VEG' || type === 'JAIN') {
    return (
      <span
        title={type === 'JAIN' ? 'Jain (No Root Veg)' : 'Pure Vegetarian'}
        className={`inline-flex items-center justify-center w-4 h-4 border border-[#15803D] rounded-sm p-[2px] ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
      </span>
    );
  }
  if (type === 'EGG') {
    return (
      <span
        title="Contains Egg"
        className={`inline-flex items-center justify-center w-4 h-4 border border-[#B45309] rounded-sm p-[2px] ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-[#B45309]" />
      </span>
    );
  }
  return (
    <span
      title="Non-Vegetarian"
      className={`inline-flex items-center justify-center w-4 h-4 border border-[#BA1A1A] rounded-sm p-[2px] ${className}`}
    >
      <span className="w-2 h-2 rotate-45 bg-[#BA1A1A]" />
    </span>
  );
};

export interface TicketTimerProps {
  seconds: number;
  className?: string;
}

export const TicketTimer: React.FC<TicketTimerProps> = ({ seconds, className = '' }) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const alertClass =
    seconds < 600
      ? 'bg-[#15803D] text-white' // Green (<10m)
      : seconds < 1200
      ? 'bg-[#B45309] text-white' // Amber (10-20m)
      : 'bg-[#BA1A1A] text-white animate-pulse'; // Red alert (>20m)

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded ${alertClass} ${className}`}
    >
      ⏱ {formatted}
    </span>
  );
};
