# Culina - Meal Discovery App 🍳
> **Frontend Developer Fulltime Test Assessment**

🚀 **Live Demo:** [https://cmlabs-frontend-fulltime-test-coral.vercel.app/](https://cmlabs-frontend-fulltime-test-coral.vercel.app/)

Culina is a modern, premium, and fully responsive web application that allows users to explore fresh ingredients, discover curated recipes, and watch video tutorials to elevate their cooking experience. It fetches live data from the public **MealDB API**.

This project was built to demonstrate proficiency in modern frontend development, advanced UI/UX implementation, robust state management, and clean architecture.

## 🌟 Key Features
- **Pantry Explorer**: Browse and search through a massive list of raw ingredients.
- **Curated Pairings**: Discover delicious meals and recipes based on a selected ingredient.
- **Interactive Recipe Detail**: View step-by-step instructions, ingredients list, and embedded YouTube video tutorials.
- **Premium UI/UX**: Implements a high-end "Stitch-inspired" design system featuring glassmorphism, smooth micro-animations, Bento Grid layouts, and custom typography.
- **Fully Responsive**: Perfectly adapts to Mobile, iPad/Tablet, and Desktop screens with dynamic navigation (Top Navbar on Desktop, sticky Bottom Navbar on Mobile).
- **Advanced UX Patterns**: Features Skeleton loading states, graceful error handling, empty states, and optimized image rendering.
- **Performance Optimized**: Implements pagination and debounced search to prevent UI freezing and reduce API load.

## 🚀 Technology Stack
This project leverages the bleeding-edge of modern web development:
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@theme inline` configuration)
- **Language**: TypeScript
- **Fonts & Icons**: Google Fonts (Inter & Noto Serif), Google Material Symbols

## 🏗️ Architecture & Clean Code
The project strictly follows the **Atomic Design Methodology** to ensure components are reusable, isolated, and highly maintainable:
- `atoms/`: `Badge`, `Input`
- `molecules/`: `Breadcrumb`, `IngredientCard`, `MealCard`, `SkeletonCard`, `StatItem`, `VideoEmbed`
- `organisms/`: `BottomNavBar`, `IngredientList`, `MealDetailSection`, `MealList`, `TopNavBar`

**Custom Hooks (`src/hooks/`)** are used to cleanly separate business logic and API fetching from UI components:
- `useIngredients`, `useMealsByIngredient`, `useMealDetail`, `useDebounce`

**Edge Cases Handled (Senior Level)**:
- Filtered out corrupt/null data from the MealDB API before rendering.
- Missing YouTube links gracefully hide the video section without throwing errors.
- Handled long text overflows smoothly using `line-clamp` and dynamic min-heights.

## 🛠️ Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment
This project is fully production-ready and has been successfully deployed on **Vercel**.
- All external image domains (`www.themealdb.com`) are pre-configured in `next.config.ts`.
- Passes all strict ESLint and TypeScript compilation checks.
