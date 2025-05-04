"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Search, User } from "lucide-react";
import MobileMenu from "../mobile-menu";

export default function Header() {
  // Placeholder - replace with your authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    image?: string;
  } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignIn = () => {
    // Placeholder - replace with your authentication logic
    window.location.href = "/login";
  };

  const handleSignOut = () => {
    // Placeholder - replace with your authentication logic
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <header className="border-b border-gray-300 bg-white relative">
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <div className="mb-1 sm:mb-0">
            <span className="font-serif">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Today&rsquo;s Paper</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/subscribe" className="hover:underline">
              Subscribe for $1/week
            </Link>
            <Link href="/account" className="hover:underline flex items-center">
              <span className="hidden sm:inline">Daily Briefing</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Logo and primary navigation */}
        <div className="flex justify-between items-center py-6">
          <Link
            href="/"
            className="font-serif font-bold text-4xl md:text-5xl tracking-tight"
          >
            Gestify
          </Link>
          <div className="flex items-center space-x-6">
            {/* <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button> */}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>
                        {user?.name ? getInitials(user.name) : <User />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-feed">My Feed</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-articles">Saved Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/preferences">Preferences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                className="hidden md:flex"
              >
                Sign in
              </Button>
            )}

            {/* <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button> */}

            {!isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                className="md:hidden"
              >
                Sign in
              </Button>
            )}

            <MobileMenu />
          </div>
        </div>

        {/* Search bar */}
        {/* {searchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for news..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-black"
              />
              <Button className="absolute right-1 top-1 bg-black hover:bg-gray-800">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )} */}

        {/* Secondary navigation */}
        <nav className="hidden md:flex justify-between items-center py-4 border-t border-gray-200 text-sm font-medium">
          <div className="flex space-x-8">
            <Link href="/trending" className="hover:text-gray-600">
              Trending
            </Link>
            <Link href="/latest" className="hover:text-gray-600">
              Latest
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center hover:text-gray-600">
                Personalized <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/my-feed" className="w-full">
                    My Feed
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved-articles" className="w-full">
                    Saved Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reading-history" className="w-full">
                    Reading History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/preferences" className="w-full">
                    Preferences
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap space-x-4 lg:space-x-8">
            <Link href="/world" className="hover:text-gray-600">
              World
            </Link>
            <Link href="/business" className="hover:text-gray-600">
              Business
            </Link>
            <Link href="/technology" className="hover:text-gray-600">
              Technology
            </Link>
            <Link href="/science" className="hover:text-gray-600">
              Science
            </Link>
            <Link href="/health" className="hover:text-gray-600">
              Health
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center hover:text-gray-600">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/politics" className="w-full">
                    Politics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sports" className="w-full">
                    Sports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/arts" className="w-full">
                    Arts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/books" className="w-full">
                    Books
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/food" className="w-full">
                    Food
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/travel" className="w-full">
                    Travel
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}

      {/* Top bar with date and subscription info */}
      // <div className="bg-black text-white text-xs py-2">
      //   <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
      //     <div className="mb-1 sm:mb-0">
      //       <span className="font-serif">Friday, May 3, 2025</span>
      //       <span className="mx-2 hidden sm:inline">|</span>
      //       <span className="hidden sm:inline">Today&rsquo;s Paper</span>
      //     </div>
      //     <div className="flex items-center space-x-4">
      //       <Link href="/subscribe" className="hover:underline">
      //         Subscribe for $1/week
      //       </Link>
      //       <Link href="/account" className="hover:underline flex items-center">
      //         <span className="hidden sm:inline">Daily Briefing</span>
      //       </Link>
      //     </div>
      //   </div>
      // </div>

      // {/* Main header with logo and navigation */}
      // <header className="border-b border-gray-300 bg-white relative">
      //   <div className="container mx-auto px-4">
      //     {/* Logo and primary navigation */}
      //     <div className="flex justify-between items-center py-6">
      //       <Link href="/" className="font-serif font-bold text-4xl md:text-5xl tracking-tight">
      //         Gestify
      //       </Link>
      //       <div className="flex items-center space-x-6">
      //         <Button variant="ghost" size="sm" className="hidden md:flex">
      //           <Search className="h-5 w-5" />
      //         </Button>
      //         <GoogleSignIn className="hidden md:flex" />
      //         <Button variant="ghost" size="sm" className="md:hidden">
      //           <Search className="h-5 w-5" />
      //         </Button>
      //         <GoogleSignIn className="md:hidden" />
      //         <MobileMenu />
      //       </div>
      //     </div>

      //     {/* Secondary navigation */}
      //     <nav className="hidden md:flex justify-between items-center py-4 border-t border-gray-200 text-sm font-medium">
      //       <div className="flex space-x-8">
      //         <Link href="/trending" className="hover:text-gray-600">
      //           Trending
      //         </Link>
      //         <Link href="/latest" className="hover:text-gray-600">
      //           Latest
      //         </Link>
      //         <DropdownMenu>
      //           <DropdownMenuTrigger className="flex items-center hover:text-gray-600">
      //             Personalized <ChevronDown className="ml-1 h-4 w-4" />
      //           </DropdownMenuTrigger>
      //           <DropdownMenuContent>
      //             <DropdownMenuItem>
      //               <Link href="/my-feed" className="w-full">
      //                 My Feed
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/saved-articles" className="w-full">
      //                 Saved Articles
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/reading-history" className="w-full">
      //                 Reading History
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/preferences" className="w-full">
      //                 Preferences
      //               </Link>
      //             </DropdownMenuItem>
      //           </DropdownMenuContent>
      //         </DropdownMenu>
      //       </div>
      //       <div className="flex flex-wrap space-x-4 lg:space-x-8">
      //         <Link href="/world" className="hover:text-gray-600">
      //           World
      //         </Link>
      //         <Link href="/business" className="hover:text-gray-600">
      //           Business
      //         </Link>
      //         <Link href="/technology" className="hover:text-gray-600">
      //           Technology
      //         </Link>
      //         <Link href="/science" className="hover:text-gray-600">
      //           Science
      //         </Link>
      //         <Link href="/health" className="hover:text-gray-600">
      //           Health
      //         </Link>
      //         <DropdownMenu>
      //           <DropdownMenuTrigger className="flex items-center hover:text-gray-600">
      //             More <ChevronDown className="ml-1 h-4 w-4" />
      //           </DropdownMenuTrigger>
      //           <DropdownMenuContent>
      //             <DropdownMenuItem>
      //               <Link href="/politics" className="w-full">
      //                 Politics
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/sports" className="w-full">
      //                 Sports
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/arts" className="w-full">
      //                 Arts
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/books" className="w-full">
      //                 Books
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/food" className="w-full">
      //                 Food
      //               </Link>
      //             </DropdownMenuItem>
      //             <DropdownMenuItem>
      //               <Link href="/travel" className="w-full">
      //                 Travel
      //               </Link>
      //             </DropdownMenuItem>
      //           </DropdownMenuContent>
      //         </DropdownMenu>
      //       </div>
      //     </nav>
      //   </div>
      // </header>
