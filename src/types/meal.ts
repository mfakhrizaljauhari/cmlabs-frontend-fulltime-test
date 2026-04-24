export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  [key: string]: string | null | undefined;
}

export interface MealDetailResponse {
  meals: MealDetail[] | null;
}
