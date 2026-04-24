import { IngredientList } from '@/components/organisms/IngredientList';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 overflow-x-hidden relative">
      <IngredientList />
    </main>
  );
}
