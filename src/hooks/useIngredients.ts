import { useState, useEffect, useMemo } from 'react';
import { Ingredient, IngredientsResponse } from '@/types/ingredient';
import { useDebounce } from '@/hooks/useDebounce';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 1. Debounce the search query to optimize filtering and prevent excessive re-renders
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    let isMounted = true;

    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        
        if (!res.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        
        const data: IngredientsResponse = await res.json();
        
        if (isMounted) {
          // SAFEGUARD: filter out any potential corrupt data where strIngredient is missing
          const safeIngredients = (data.meals || []).filter(
            (item) => item && item.idIngredient && item.strIngredient
          );
          
          setIngredients(safeIngredients);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIngredients();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Gunakan useMemo untuk filtering agar hanya berjalan jika ingredients atau query yang di-debounce berubah
  const filteredIngredients = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return ingredients;
    
    const lowercasedQuery = debouncedSearchQuery.toLowerCase();
    return ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(lowercasedQuery)
    );
  }, [ingredients, debouncedSearchQuery]);

  return {
    ingredients: filteredIngredients,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  };
};
