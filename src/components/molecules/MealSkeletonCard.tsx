import React from 'react';

export const MealSkeletonCard: React.FC = () => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col animate-pulse h-full" 
      aria-hidden="true"
    >
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3"></div>
        <div className="mt-auto pt-2 h-5 bg-gray-100 dark:bg-gray-700/50 rounded-md w-24"></div>
      </div>
    </div>
  );
};
