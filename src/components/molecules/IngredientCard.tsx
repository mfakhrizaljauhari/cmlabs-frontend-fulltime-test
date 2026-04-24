import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Ingredient } from '@/types/ingredient';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export const IngredientCard = React.memo(function IngredientCard({ ingredient }: IngredientCardProps) {
  if (!ingredient || !ingredient.strIngredient) return null;

  const slug = encodeURIComponent(ingredient.strIngredient);
  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`;

  return (
    <Link 
      href={`/ingredient/${slug}`} 
      className="bg-white rounded-[16px] relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-stone-100 flex flex-col items-center text-center aspect-square justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
      aria-label={`View details for ${ingredient.strIngredient}`}
    >
      <Image 
        src={imageUrl}
        alt={ingredient.strIngredient} 
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-0 p-8" 
      />
      
      {/* Dark overlay specifically matching Stitch design */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors z-10"></div>
      
      {/* Top right Add icon */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <span className="material-symbols-outlined text-white text-sm" data-icon="add">add</span>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center p-4">
        <h3 className="font-h3 text-h3 text-white transition-colors capitalize">
          {ingredient.strIngredient}
        </h3>
        <p className="font-body-sm text-body-sm text-white/80 mt-1 capitalize">
          {ingredient.strType || 'Produce'}
        </p>
      </div>
    </Link>
  );
});
