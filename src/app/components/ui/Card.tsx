
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'outlined';
}

export function Card({ className, variant = 'elevated', children, ...props }: CardProps) {
  return (
    <div 
      className={twMerge(
        "rounded-[24px] overflow-hidden transition-all duration-300",
        variant === 'elevated' && "bg-white dark:bg-[#121215] shadow-md shadow-gray-200/50 dark:shadow-none hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.98]",
        variant === 'flat' && "bg-gray-100 dark:bg-white/5",
        variant === 'outlined' && "bg-white dark:bg-transparent border border-gray-200 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
