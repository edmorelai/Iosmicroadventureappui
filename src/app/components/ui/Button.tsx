
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, block, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          // Variants
          variant === 'primary' && "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/20",
          variant === 'secondary' && "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15 dark:active:bg-white/20",
          variant === 'ghost' && "bg-transparent text-gray-600 hover:bg-gray-50 active:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/5 dark:active:bg-white/10 dark:hover:text-slate-200",
          variant === 'danger' && "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20",
          // Sizes
          size === 'sm' && "h-8 px-3 text-xs rounded-lg",
          size === 'md' && "h-12 px-6 text-[15px]",
          size === 'lg' && "h-14 px-8 text-lg rounded-[20px]",
          size === 'icon' && "h-10 w-10 p-0 rounded-full",
          block && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);
