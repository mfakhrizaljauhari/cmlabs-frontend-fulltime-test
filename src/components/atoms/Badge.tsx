import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'surface' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'surface', className = '' }) => {
  const baseStyles = "px-3 py-1.5 rounded-full text-[10px] font-label-caps uppercase tracking-wider font-semibold";
  
  const variants = {
    primary: "bg-primary/10 text-primary",
    surface: "bg-surface text-on-surface-variant",
    outline: "border border-outline-variant text-on-surface-variant"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
