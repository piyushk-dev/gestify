import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import LoginButton from "@/components/auth/login-button"

export default function Navbar() {
  return (
    <header className="border-b border-gray-300 bg-white relative">
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
            <LoginButton />
          </div>
        </div>

        {/* Secondary navigation (desktop only) */}
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
                <DropdownMenuItem>
                  {/* <Link href="/my-feed" className="w-full">
                    My Feed
                  </Link> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/saved-articles" className="w-full">
                    Saved Articles
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/reading-history" className="w-full">
                    Reading History
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
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
                <DropdownMenuItem>
                  <Link href="/politics" className="w-full">
                    Politics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/sports" className="w-full">
                    Sports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/arts" className="w-full">
                    Arts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/books" className="w-full">
                    Books
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/food" className="w-full">
                    Food
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
  )
}
