import React from 'react';
import Link from 'next/link';

export const TopNavBar: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm shadow-stone-200/40 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-[1440px] mx-auto">
        <Link href="/" className="text-2xl font-serif font-bold text-[#D95D39] tracking-tight">
          MealApp
        </Link>
        <div className="hidden lg:flex gap-8 items-center font-serif text-stone-900">
          <Link href="/" className="text-[#D95D39] border-b-2 border-[#D95D39] pb-1 font-bold">
            Pantry
          </Link>
          <a className="text-stone-500 hover:text-stone-800 transition-colors" href="#">Recipes</a>
          <a className="text-stone-500 hover:text-stone-800 transition-colors" href="#">Collections</a>
          <a className="text-stone-500 hover:text-stone-800 transition-colors" href="#">Techniques</a>
        </div>
        <div className="flex gap-2 text-[#D95D39]">
          <span className="material-symbols-outlined cursor-pointer hover:bg-stone-100 transition-colors duration-200 p-2 rounded-full" data-icon="search">search</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-stone-100 transition-colors duration-200 p-2 rounded-full" data-icon="account_circle">account_circle</span>
        </div>
      </div>
    </header>
  );
};
