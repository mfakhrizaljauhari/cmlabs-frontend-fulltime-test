import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
}

export const MealCard = React.memo(function MealCard({ meal }: MealCardProps) {
  return (
    <Link 
      href={`/meal/${meal.idMeal}`} 
      className="block focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-xl outline-none group"
      aria-label={`View recipe for ${meal.strMeal}`}
    >
      <article 
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-transform duration-300 transform hover:scale-105 flex flex-col h-full"
        aria-labelledby={`meal-title-${meal.idMeal}`}
      >
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay gradient tipis konsisten */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
        
        <div className="p-5 flex flex-col flex-1 gap-2 z-10 bg-white dark:bg-gray-800">
          <h3 
            id={`meal-title-${meal.idMeal}`}
            className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight"
          >
            {meal.strMeal}
          </h3>
          <div className="flex items-center gap-1.5 mt-auto pt-2 text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
            <span>View Recipe</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
});
