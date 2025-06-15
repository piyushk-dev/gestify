// components/FeedNavigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'; // Keep for potential active link in main nav if desired later

interface FeedNavigationProps {
  categories: string[]; // These are now the main site categories (Trending, Politics, etc.)
}

export default function FeedNavigation({ categories }: FeedNavigationProps) {
  const pathname = usePathname();

  // This component will represent the main top navigation like in image_c91e9f.jpg
  // The 'categories' prop passed here will likely be the ALL_CATEGORIES or a subset
  // of main site sections (e.g., Trending, Politics, International, etc.)
  // For simplicity, let's assume this is the 'My Feed' page's primary nav, so it won't
  // necessarily scroll to sections *within* the feed, but navigate to different root pages.
  // If you want it to scroll to the feed sections, we'd need to adjust this.

  // For the purpose of the top nav, the 'scrollToSection' logic is probably not needed.
  // Instead, these links would typically be Next.js <Link> components to actual page routes.
  // For now, I'll keep the button structure, assuming it's a simplified representation
  // of buttons that *could* navigate to /trending, /politics etc.
  // If you only want 'My Feed' and 'Preferences' links, adjust this map.

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md py-3 px-6 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Replace with your logo/site title */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Gestify
        </Link>

        {/* Primary Navigation Links */}
        <ul className="flex items-center space-x-6">
          {/* Example static links as seen in image_c91e9f.jpg */}
          <li><Link href="/trending" className="text-gray-700 hover:text-blue-600 font-medium">Trending</Link></li>
          <li><Link href="/politics" className="text-gray-700 hover:text-blue-600 font-medium">Politics</Link></li>
          <li><Link href="/feed" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">My Feed</Link></li> {/* Highlight 'My Feed' */}
          <li><Link href="/preferences" className="text-gray-700 hover:text-blue-600 font-medium">Preferences</Link></li>
          {/* You can dynamically add more categories here if needed */}
          {/* {categories.map((category) => (
            <li key={category}>
              <Link href={`/${category.replace(/\s+/g, '-').toLowerCase()}`} className="capitalize text-gray-700 hover:text-blue-600 font-medium">
                {category.replace("sports/", "")}
              </Link>
            </li>
          ))} */}
          {/* More links as per your image: International, Technology, Cricket, Education, More */}
        </ul>

        {/* User Profile/Avatar (if any) */}
        <div className="flex items-center space-x-4">
          {/* Example: <img src="/path/to/avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
          <span className="text-gray-800 font-medium">John Doe</span> {/* Replace with actual user name */}
        </div>
      </div>
    </nav>
  );
}