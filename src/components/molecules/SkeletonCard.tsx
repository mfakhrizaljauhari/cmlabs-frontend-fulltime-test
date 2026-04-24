import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div 
      className="h-[130px] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800/50 p-6 flex flex-col justify-between animate-pulse" 
      aria-hidden="true"
    >
      <div className="h-6 bg-zinc-200/80 dark:bg-zinc-700/50 rounded-md w-3/4"></div>
      <div className="mt-4 flex">
        <div className="h-7 bg-blue-50 dark:bg-blue-900/20 rounded-full w-24"></div>
      </div>
    </div>
  );
};
