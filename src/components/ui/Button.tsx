import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl motion-safe:animate-fade-in-up',
        {
          'bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-light hover:to-primary shadow-lg hover:shadow-2xl focus:ring-primary': variant === 'primary',
          'bg-gradient-to-r from-accent to-accent-dark text-gray-900 hover:from-accent-light hover:to-accent shadow-lg hover:shadow-2xl focus:ring-accent': variant === 'secondary',
          'border-2 border-neutral text-neutral hover:bg-neutral-light dark:hover:bg-neutral-dark focus:ring-neutral': variant === 'outline',
          'text-neutral hover:text-primary hover:bg-neutral-light dark:hover:text-accent dark:hover:bg-neutral-dark': variant === 'ghost',
          'bg-neutral-dark dark:bg-neutral-light text-white dark:text-neutral-dark hover:bg-neutral focus:ring-neutral': variant === 'dark',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className
      )}
      aria-label={typeof children === 'string' ? children : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}