'use client';

import React, { useCallback, useState } from 'react';
import { useIngredients } from '@/hooks/useIngredients';
import { IngredientCard } from '@/components/molecules/IngredientCard';

const CATEGORIES = ['ALL INGREDIENTS', 'PRODUCE', 'HERBS & SPICES', 'DAIRY', 'MEAT & SEAFOOD'];
const ITEMS_PER_PAGE = 12;

export const IngredientList: React.FC = () => {
  const { ingredients, isLoading, error, searchQuery, setSearchQuery } = useIngredients();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, [setSearchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(ingredients.length / ITEMS_PER_PAGE);
  const paginatedIngredients = ingredients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin-desktop py-stack-lg lg:py-section-gap w-full">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-section-gap gap-stack-md">
        <div className="max-w-xl">
          <h1 className="font-h1 text-h1 text-on-surface mb-stack-sm">Fresh Ingredients</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Explore your pantry and discover new flavor combinations based on what&apos;s available.</p>
        </div>
        <div className="w-full md:w-96 relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full py-3.5 pl-12 pr-4 font-body-md text-body-md text-on-surface outline-none transition-all shadow-sm hover:shadow-md placeholder:text-on-surface-variant/50" 
            placeholder="Search ingredients..." 
          />
        </div>
      </div>

      {/* Categories Chips */}
      <div className="flex flex-wrap gap-stack-sm mb-stack-lg">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors ${
              activeCategory === category 
                ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20' 
                : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {error ? (
          <div role="alert" className="bg-error-container text-on-error-container p-8 rounded-3xl text-center shadow-sm">
            <h2 className="font-semibold text-xl">Failed to load data</h2>
            <p className="mt-2 opacity-80">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="aspect-square bg-surface-variant/30 animate-pulse rounded-[16px]"></div>
            ))}
          </div>
        ) : ingredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant bg-surface rounded-[2rem] border-2 border-outline-variant border-dashed shadow-sm">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
            <h2 className="font-h3 text-h3">No ingredients found</h2>
            <p className="mt-2 font-body-md">We couldn&apos;t find anything matching &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter mb-12">
              {paginatedIngredients.map((ingredient) => (
                <IngredientCard key={ingredient.idIngredient} ingredient={ingredient} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant transition-colors"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="font-label-caps text-on-surface-variant">
                  PAGE {currentPage} OF {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant transition-colors"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
