
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface NavbarProps {
  title?: string;
  largeTitle?: boolean;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Navbar({ title, largeTitle, showBack, rightAction, className, children }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <div className={twMerge("sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 pb-2 pt-14 transition-all dark:bg-black/80 dark:border-white/10", className)}>
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center flex-1">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-primary hover:opacity-70 active:opacity-50 transition-opacity dark:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {!largeTitle && title && (
            <h1 className="text-[17px] font-semibold text-center absolute left-0 right-0 pointer-events-none text-foreground dark:text-white">
              {title}
            </h1>
          )}
        </div>
        
        <div className="flex items-center justify-end flex-1">
          {rightAction}
        </div>
      </div>
      
      {largeTitle && title && (
        <div className="px-4 pb-2">
          <h1 className="text-[34px] font-bold tracking-tight text-foreground leading-tight dark:text-white">
            {title}
          </h1>
        </div>
      )}
      {children}
    </div>
  );
}
