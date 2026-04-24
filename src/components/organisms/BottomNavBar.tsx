import React from 'react';
import Link from 'next/link';

export const BottomNavBar: React.FC = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md text-[#D95D39] text-[10px] uppercase tracking-widest font-medium fixed bottom-0 z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] lg:hidden flex justify-around items-center pt-3 pb-8 px-4 w-full">
      <Link href="/" className="flex flex-col items-center gap-1 text-[#D95D39] font-bold scale-110 transition-transform">
        <span className="material-symbols-outlined" data-icon="grid_view" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
        Pantry
      </Link>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="#">
        <span className="material-symbols-outlined" data-icon="search">search</span>
        Search
      </a>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="#">
        <span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
        Cook
      </a>
      <a className="flex flex-col items-center gap-1 text-stone-400" href="#">
        <span className="material-symbols-outlined" data-icon="person">person</span>
        Profile
      </a>
    </nav>
  );
};
