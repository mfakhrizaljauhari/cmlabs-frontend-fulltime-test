import { useState, useEffect } from 'react';
import { MealDetail, MealDetailResponse } from '@/types/meal';

export const useMealDetail = (mealId: string) => {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      if (!mealId) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Sanitize and format the input ID
        const decodedId = decodeURIComponent(mealId);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(decodedId)}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch meal details');
        }
        
        const data: MealDetailResponse = await res.json();
        
        // Edge case: Handle null returned by the API
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetail();
  }, [mealId]);

  return { meal, isLoading, error };
};
