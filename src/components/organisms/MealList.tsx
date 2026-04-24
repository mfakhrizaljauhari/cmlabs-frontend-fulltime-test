'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useMealsByIngredient } from '@/hooks/useMealsByIngredient';

import { Meal } from '@/types/meal';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { Badge } from '@/components/atoms/Badge';

export const MealList: React.FC = () => {
  const params = useParams();
  const rawIngredientName = params?.['ingredient-name'] as string || '';
  
  const { meals, isLoading, error } = useMealsByIngredient(rawIngredientName);

  const decodedName = rawIngredientName ? decodeURIComponent(rawIngredientName) : '';
  const ingredientImageUrl = `https://www.themealdb.com/images/ingredients/${decodedName}.png`;

  // Provide deterministic fallback text since MealDB doesn't provide these details
  const mockDescription = `Prized for their vibrant colors and rich, complex flavors, ${decodedName} elevates any dish. Offering a perfect balance of sweetness and savory notes.`;

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-margin-desktop py-8 md:py-section-gap w-full">
      
      {/* Top Bar with Back button and Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-surface-tint transition-colors cursor-pointer w-fit font-semibold px-4 py-2 rounded-full hover:bg-primary/10 bg-primary/5">
          <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
          <span className="font-body-sm tracking-wide">Back to Pantry</span>
        </Link>
        
        {/* Breadcrumb Right Side */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Pantry', href: '/' },
            { label: decodedName }
          ]} 
        />
      </div>

      {/* Ingredient Header Hero */}
      <section className="flex flex-col md:flex-row gap-gutter md:gap-section-gap items-center mb-section-gap">
        <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-sm relative group bg-surface-variant/20 border border-surface-variant p-8 flex items-center justify-center">
          <Image 
            src={ingredientImageUrl}
            alt={decodedName} 
            fill
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-10 drop-shadow-xl" 
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-stack-md">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="surface">Produce</Badge>
            <Badge variant="surface">In Season</Badge>
          </div>
          
          <h1 className="font-h1 text-h1 text-on-background capitalize">{decodedName}</h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
            {mockDescription}
          </p>
          
          <div className="grid grid-cols-2 gap-4 border-y border-outline-variant py-stack-md mb-stack-md">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Flavor Profile</p>
              <p className="font-body-md text-on-surface font-medium">Sweet, Savory, Earthy</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Best Uses</p>
              <p className="font-body-md text-on-surface font-medium">Roasting, Sauces, Raw</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-surface-variant text-on-background px-4 py-2 rounded-lg font-body-sm font-medium hover:bg-outline-variant transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">inventory_2</span>
              Add to Pantry
            </button>
          </div>
        </div>
      </section>

      {/* Curated Recipes Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg border-b border-outline-variant pb-stack-sm gap-4">
          <h2 className="font-h2 text-h2 text-on-background">Curated Pairings</h2>
          <span className="font-body-sm text-on-surface-variant">
            {isLoading ? 'Loading...' : `${meals.length} Recipes Available`}
          </span>
        </div>

        <div aria-live="polite">
          {error ? (
            <div role="alert" className="bg-error-container text-on-error-container p-8 rounded-3xl text-center shadow-sm">
              <h2 className="font-semibold text-xl">Failed to load data</h2>
              <p className="mt-2 opacity-80">{error}</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 h-96 bg-surface-variant/30 animate-pulse rounded-[24px]" />
              <div className="md:col-span-4 h-96 bg-surface-variant/30 animate-pulse rounded-[24px]" />
            </div>
          ) : meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant bg-surface rounded-[2rem] border-2 border-outline-variant border-dashed shadow-sm">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
              <h2 className="font-h3 text-h3">No recipes found</h2>
              <p className="mt-2 font-body-md">We couldn&apos;t find any recipes pairing with this ingredient.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(300px,_auto)]">
              {/* Recipe Card 1 (Large Featured) */}
              {meals[0] && (
                <article className="md:col-span-8 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-surface-container-lowest border border-surface-variant flex flex-col p-2">
                  <div className="h-72 sm:h-96 w-full relative overflow-hidden rounded-2xl bg-surface-variant">
                    <Image 
                      src={meals[0].strMealThumb || ''}
                      alt={meals[0].strMeal} 
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full cursor-pointer hover:bg-primary hover:text-white text-on-surface transition-all shadow-md group/btn">
                      <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">favorite</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow bg-surface-container-lowest">
                    <div className="flex gap-3 mb-4">
                      <span className="bg-surface text-on-surface-variant px-3 py-1.5 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold">Featured</span>
                    </div>
                    <h3 className="font-h3 text-3xl text-on-background mb-4 group-hover:text-primary transition-colors font-bold capitalize">{meals[0].strMeal}</h3>
                    <p className="font-body-md text-on-surface-variant line-clamp-2 mb-8 flex-grow text-lg leading-relaxed">
                      A classic presentation showcasing the rich flavors of {decodedName}. Perfect for any occasion.
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-variant/50">
                      <div className="flex items-center gap-6 text-on-surface-variant font-body-sm font-medium">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">schedule</span> 45m</div>
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">bar_chart</span> Easy</div>
                      </div>
                      <Link href={`/meal/${meals[0].idMeal}`} className="bg-primary text-on-primary px-6 py-3 rounded-xl font-body-sm font-bold hover:bg-surface-tint transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 tracking-wide uppercase text-xs">
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Recipe Card 2 (Standard Vertical) */}
              {meals[1] && (
                <article className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-surface-container-lowest border border-surface-variant flex flex-col p-2">
                  <div className="h-60 w-full relative overflow-hidden rounded-2xl bg-surface-variant">
                    <Image 
                      src={meals[1].strMealThumb || ''}
                      alt={meals[1].strMeal} 
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full cursor-pointer hover:bg-primary hover:text-white text-on-surface transition-all shadow-md group/btn">
                      <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">favorite</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4">
                      <span className="bg-surface text-on-surface-variant px-3 py-1.5 rounded-full text-xs font-label-caps uppercase tracking-wider font-semibold">Popular</span>
                    </div>
                    <h3 className="font-h3 text-2xl text-on-background mb-3 font-bold group-hover:text-primary transition-colors capitalize">{meals[1].strMeal}</h3>
                    <p className="font-body-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow leading-relaxed">
                      A delightful and quick way to enjoy {decodedName} with minimal prep.
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-variant/50">
                      <div className="flex items-center gap-2 text-on-surface-variant font-body-sm font-medium">
                        <span className="material-symbols-outlined text-lg">schedule</span> 30m
                      </div>
                      <Link href={`/meal/${meals[1].idMeal}`} className="bg-primary/10 text-primary px-5 py-2.5 rounded-xl font-body-sm font-bold hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-wide flex items-center gap-2">
                        Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Additional Recipes in Grid */}
              {meals.length > 2 && (
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {meals.slice(2).map((meal) => (
                    <article key={meal.idMeal} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-surface-container-lowest border border-surface-variant flex flex-row min-h-[14rem] sm:min-h-[16rem] p-2">
                      <div className="w-2/5 h-full relative overflow-hidden rounded-2xl shrink-0 bg-surface-variant">
                        <Image 
                          src={meal.strMealThumb || ''}
                          alt={meal.strMeal} 
                          fill
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white text-on-surface transition-all shadow-sm group/btn">
                          <span className="material-symbols-outlined text-sm group-hover/btn:scale-110 transition-transform">favorite</span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow justify-center">
                        <h3 className="font-h3 text-xl sm:text-2xl text-on-background mb-3 font-bold group-hover:text-primary transition-colors line-clamp-2 capitalize">{meal.strMeal}</h3>
                        <p className="font-body-sm text-on-surface-variant line-clamp-2 mb-4 hidden sm:block leading-relaxed">
                          A wonderful recipe highlighting {decodedName}.
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-variant/50">
                          <span className="text-on-surface-variant font-body-sm flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-sm">schedule</span> 20m</span>
                          <Link href={`/meal/${meal.idMeal}`} className="text-primary font-body-sm font-bold hover:text-surface-tint transition-colors uppercase text-xs tracking-wider">
                            View Recipe
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
