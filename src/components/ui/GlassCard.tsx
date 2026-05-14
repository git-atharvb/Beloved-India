import React from 'react';
import clsx from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export function GlassCard({ children, className, interactive = false, ...props }: GlassCardProps) {
  return (
    <div 
      className={clsx(
        "relative overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-300",
        "bg-white/40 border-white/40 shadow-premium-glass",
        "dark:bg-black/40 dark:border-white/10",
        interactive && "hover:-translate-y-1 hover:shadow-premium-md cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Optional subtle inner shine layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
