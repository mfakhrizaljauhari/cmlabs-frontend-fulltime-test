import React from 'react';

interface StatItemProps {
  icon: string;
  label: string;
  value: string | number;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div>
        <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="font-body-md text-lg font-semibold text-on-background capitalize">
          {value}
        </p>
      </div>
    </div>
  );
};
