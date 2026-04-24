/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { TopNavBar } from "@/components/organisms/TopNavBar";
import { BottomNavBar } from "@/components/organisms/BottomNavBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MealApp",
  description: "Explore your pantry and discover new flavor combinations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased light`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-on-background min-h-screen flex flex-col">
        <TopNavBar />
        <main className="flex-1 min-h-screen bg-white w-full">
          {children}
        </main>
        <BottomNavBar />
      </body>
    </html>
  );
}
