import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
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

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
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
