import { MealDetailSection } from '@/components/organisms/MealDetailSection';

export default function MealPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 overflow-x-hidden relative">
      {/* Decorative premium background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-[100%] blur-[100px] pointer-events-none" />
      
      <MealDetailSection />
    </main>
  );
}
