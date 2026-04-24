import { MealList } from '@/components/organisms/MealList';

export default function IngredientPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900 overflow-x-hidden relative">
      <MealList />
    </main>
  );
}
