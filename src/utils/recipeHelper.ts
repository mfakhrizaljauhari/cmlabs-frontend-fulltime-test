import { MealDetail } from '@/types/meal';

export interface RecipeItem {
  id: number;
  ingredient: string;
  measure: string;
}

export const getIngredients = (meal: MealDetail): RecipeItem[] => {
  const ingredients: RecipeItem[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== "") {
      ingredients.push({
        id: i,
        ingredient: ingredient.trim(),
        measure: measure && typeof measure === 'string' ? measure.trim() : "",
      });
    }
  }

  return ingredients;
};
