import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu } from "lucide-react"
import LoginButton from "@/components/auth/login-button"
import CustomLink from "@/app/components/customlink"
import { Button } from "@/components/ui/button"

const PRIMARY_SECTIONS = [
  { href: "/trending", label: "Trending" },
  { href: "/politics", label: "Politics" },
  { href: "/feed", label: "My Feed" },
  { href: "/preferences", label: "Preferences" },
]

const MORE_SECTIONS = [
  { href: "/horoscope", label: "Horoscopes" },
  { href: "/careerjob", label: "Career & Jobs" },
  { href: "/sports/chess", label: "Chess" },
]

const TOP_LEVEL_SECTIONS = [
  { href: "/international", label: "International Affairs" },
  { href: "/tech", label: "Technology" },
  { href: "/sports/cricket", label: "Cricket" },
  { href: "/education", label: "Education" },
]

export default function Navbar() {
  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-8xl xl:max-w-9xl 2xl:max-w-none 2xl:w-[95%]">
        {/* Top Header */}
        <div className="flex justify-between items-center py-4">
          <CustomLink
            href="/"
            className="font-serif font-bold text-3xl md:text-4xl tracking-tight hover:text-gray-700 transition-colors"
          >
            📰 Gestify
          </CustomLink>
          <div className="flex items-center space-x-4">
            <LoginButton />
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-3">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6">
              {PRIMARY_SECTIONS.map(({ href, label }) => (
                <CustomLink
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-red-600 transition-colors duration-200 ease-in-out px-2 py-1 rounded hover:bg-gray-50"
                >
                  {label}
                </CustomLink>
              ))}
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              {TOP_LEVEL_SECTIONS.map(({ href, label }) => (
                <CustomLink
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-red-600 transition-colors duration-200 ease-in-out px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
                >
                  {label}
                </CustomLink>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center hover:text-red-600 transition-colors duration-200 ease-in-out"
                  >
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {MORE_SECTIONS.map(({ href, label }) => (
                    <DropdownMenuItem key={href} asChild>
                      <CustomLink href={href} className="w-full cursor-pointer hover:text-red-600">
                        {label}
                      </CustomLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  <span className="flex items-center">
                    <Menu className="h-4 w-4 mr-2" />
                    Navigation
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {/* Primary sections */}
                {PRIMARY_SECTIONS.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <CustomLink href={href} className="w-full cursor-pointer">
                      {label}
                    </CustomLink>
                  </DropdownMenuItem>
                ))}

                {/* Separator */}
                <div className="border-t border-gray-200 my-1" />

                {/* Top level sections */}
                {TOP_LEVEL_SECTIONS.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <CustomLink href={href} className="w-full cursor-pointer">
                      {label}
                    </CustomLink>
                  </DropdownMenuItem>
                ))}

                {/* More sections */}
                {MORE_SECTIONS.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <CustomLink href={href} className="w-full cursor-pointer">
                      {label}
                    </CustomLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  )
}
