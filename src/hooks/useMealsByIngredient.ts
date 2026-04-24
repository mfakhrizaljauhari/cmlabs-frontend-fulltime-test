import { useState, useEffect, useMemo } from 'react';
import { Meal, MealsResponse } from '@/types/meal';
import { useDebounce } from '@/hooks/useDebounce';

export const useMealsByIngredient = (ingredientName: string) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!ingredientName) return;

      try {
        setIsLoading(true);
        setError(null);
        
        const decodedName = decodeURIComponent(ingredientName);
        // Ensure it is properly URL-encoded for the fetch request
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(decodedName)}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch meals');
        }
        
        const data: MealsResponse = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [ingredientName]);

  const filteredMeals = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return meals;
    
    const lowercasedQuery = debouncedSearchQuery.toLowerCase();
    return meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(lowercasedQuery)
    );
  }, [meals, debouncedSearchQuery]);

  return {
    meals: filteredMeals,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  };
};
