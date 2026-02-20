
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
        variant === 'elevated' && "bg-white shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.98]",
        variant === 'flat' && "bg-gray-100",
        variant === 'outlined' && "bg-white border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
