"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(data.loggedIn);
          setUser(data.user);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const response = await fetch("/api/auth/google");
    const { url } = await response.json();
    window.location.href = url;
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setLoggedIn(false);
      location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loggedIn === null) {
    // Placeholder to prevent layout shift during auth check
    return (
      <>
        <div className="h-9 w-9 md:hidden" />
        <div className="h-10 w-40 hidden md:block" />
      </>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex items-center space-x-4">
        {loggedIn && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-8 w-8">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/preferences">Preferences</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="mr-2">Loading...</span>
            ) : (
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Sign in with Google
          </Button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Search className="h-4 w-4 mr-2" />
              Search
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/trending">Trending</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/latest">Latest</Link>
            </DropdownMenuItem>
            {loggedIn && (
              <>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem asChild><Link href="/my-feed">My Feed</Link></DropdownMenuItem> */}
                <DropdownMenuItem asChild><Link href="/saved-articles">Saved Articles</Link></DropdownMenuItem>
                {/* <DropdownMenuItem asChild><Link href="/reading-history">Reading History</Link></DropdownMenuItem> */}
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/world">World</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/business">Business</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/technology">Technology</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/science">Science</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/health">Health</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/politics">Politics</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/sports">Sports</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/arts">Arts</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/books">Books</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/food">Food</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/travel">Travel</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            {loggedIn && user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/preferences">Preferences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleGoogleLogin} disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign in with Google"}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}