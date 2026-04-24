'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMealDetail } from '@/hooks/useMealDetail';
import { getIngredients } from '@/utils/recipeHelper';
import { VideoEmbed } from '@/components/molecules/VideoEmbed';

import { Badge } from '@/components/atoms/Badge';
import { StatItem } from '@/components/molecules/StatItem';

export const MealDetailSection: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const mealId = params?.['meal-id'] as string || '';
  
  const { meal, isLoading, error } = useMealDetail(mealId);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 font-body-md text-on-surface-variant">Loading recipe...</p>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center">
        <div className="bg-surface p-12 rounded-3xl border border-outline-variant/30 flex flex-col items-center text-center shadow-sm w-full max-w-2xl">
          <span className="material-symbols-outlined text-6xl mb-6 text-on-surface-variant opacity-50">search_off</span>
          <h2 className="text-3xl font-h3 text-on-background">Recipe not found</h2>
          <p className="mt-4 font-body-md text-on-surface-variant max-w-md">
            {error || "We couldn't find the recipe you're looking for. It might have been removed."}
          </p>
          <Link href="/" className="mt-8 px-8 py-3 bg-primary hover:bg-surface-tint text-white font-body-md font-medium rounded-full transition-colors shadow-md">
            Return to Pantry
          </Link>
        </div>
      </section>
    );
  }

  const ingredients = getIngredients(meal);
  const steps = meal.strInstructions.split(/\r?\n/).filter(step => step.trim().length > 0);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full h-[60vh] min-h-[500px] relative">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"></div>
        
        {/* Floating Navigation Helpers (Back) */}
        <div className="absolute top-margin-desktop left-margin-desktop z-10">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface hover:bg-white transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </section>

      {/* Recipe Content Container */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-24 relative z-10 pb-section-gap">
        
        {/* Header Meta */}
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] mb-section-gap border border-outline-variant/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-lg border-b border-outline-variant/50 pb-stack-lg">
            <div className="flex-1">
              <Badge variant="primary" className="mb-4 inline-block">
                {meal.strCategory || 'Recipe'}
              </Badge>
              <h1 className="font-h1 text-4xl md:text-5xl lg:text-6xl text-on-background mb-stack-md leading-tight tracking-tight capitalize">
                {meal.strMeal}
              </h1>
              <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                A wonderful {meal.strArea || 'global'} dish that brings the rich flavors of its origin straight to your dining table.
              </p>
            </div>
            
            {meal.strYoutube && (
              <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-0">
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-[#D95D39] hover:from-[#D95D39] hover:to-primary text-white font-body-lg font-medium py-5 px-10 rounded-full flex items-center justify-center gap-3 transition-all hover:shadow-[0_10px_25px_-5px_rgba(217,93,57,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-lg"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  Watch Video
                </a>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-10 pt-stack-lg">
            <StatItem icon="public" label="Origin" value={meal.strArea || 'Global'} />
            <StatItem icon="category" label="Category" value={meal.strCategory || 'Misc'} />
            <StatItem icon="kitchen" label="Ingredients" value={`${ingredients.length} Items`} />
          </div>
        </div>

        {/* Tabbed Interface Area */}
        <div className="mb-section-gap">
          {/* Tab Headers (Mobile functional, Desktop decorative side-by-side) */}
          <div className="flex border-b border-outline-variant mb-stack-lg gap-8 lg:hidden">
            <button 
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 font-body-lg font-semibold transition-colors ${activeTab === 'ingredients' ? 'border-b-2 border-primary text-primary -mb-[1px]' : 'text-on-surface-variant hover:text-on-background'}`}
            >
              Ingredients
            </button>
            <button 
              onClick={() => setActiveTab('instructions')}
              className={`pb-4 font-body-lg font-semibold transition-colors ${activeTab === 'instructions' ? 'border-b-2 border-primary text-primary -mb-[1px]' : 'text-on-surface-variant hover:text-on-background'}`}
            >
              Instructions
            </button>
          </div>
          
          <div className="hidden lg:flex border-b border-outline-variant mb-stack-lg gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary font-body-lg font-semibold -mb-[1px] cursor-default">
              Recipe Details
            </button>
          </div>

          {/* Tab Content: Bento Grid Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Ingredients */}
            <div className={`lg:col-span-4 space-y-stack-md ${activeTab === 'instructions' ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sticky top-24">
                <h3 className="font-h3 text-2xl text-on-background mb-8 flex items-center justify-between pb-4 border-b border-outline-variant/20">
                  Ingredients
                  <span className="font-label-caps text-[10px] text-primary bg-primary/10 px-3 py-1.5 rounded-full tracking-wider">MEASURE</span>
                </h3>
                
                <ul className="space-y-6">
                  {ingredients.map((item) => (
                    <li key={item.id} className="flex items-start gap-4 group cursor-pointer">
                      <div className="w-6 h-6 rounded-md border-2 border-outline-variant group-hover:border-primary flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors bg-surface-container-lowest" />
                      <div>
                        <span className="font-body-md text-on-background font-semibold block text-[17px] capitalize">
                          {item.ingredient}
                        </span>
                        <span className="font-body-sm text-on-surface-variant mt-1 block">
                          {item.measure}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Instructions */}
            <div className={`lg:col-span-8 ${activeTab === 'ingredients' ? 'hidden lg:block' : 'block'}`}>
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const stepNumber = (index + 1).toString().padStart(2, '0');
                  
                  return (
                    <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-surface p-8 sm:p-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/20 hover:border-outline-variant/50 transition-colors group">
                      <div className="flex-shrink-0">
                        <span className="font-h2 text-5xl text-primary/30 group-hover:text-primary transition-colors block leading-none font-bold">
                          {stepNumber}
                        </span>
                      </div>
                      <div>
                        <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed text-justify md:text-left">
                          {step}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 w-full flex justify-center">
                <VideoEmbed youtubeUrl={meal.strYoutube} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
