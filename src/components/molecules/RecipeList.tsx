import React, { useMemo } from 'react';
import { MealDetail } from '@/types/meal';
import { getIngredients } from '@/utils/recipeHelper';

interface RecipeListProps {
  meal: MealDetail;
}

export const RecipeList = React.memo(function RecipeList({ meal }: RecipeListProps) {
  const ingredients = useMemo(() => getIngredients(meal), [meal]);

  if (ingredients.length === 0) return null;

  return (
    <article className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ingredients</h3>
      <ul className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
        {ingredients.map((item) => (
          <li key={item.id} className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
            <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize group-hover:translate-x-1 transition-transform">
              {item.ingredient}
            </span>
            <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-100 dark:border-gray-800 shadow-sm">
              {item.measure}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
});
