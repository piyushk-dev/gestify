import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import LoginButton from "@/components/auth/login-button";
import CustomLink from "@/app/components/customlink";

const PRIMARY_SECTIONS = [
  { href: "/trending", label: "Trending" },
  { href: "/politics", label: "Politics" },
  { href: "/feed", label: "My Feed" },
  { href: "/preferences", label: "Preferences" },
];

const MORE_SECTIONS = [
  { href: "/horoscope", label: "Horoscopes" },
  { href: "/careerjob", label: "Career & Jobs" },
  { href: "/sports/chess", label: "Chess" }, 
];

const TOP_LEVEL_SECTIONS = [
  { href: "/international", label: "International Affairs" },
  { href: "/tech", label: "Technology" },
  { href: "/sports/cricket", label: "Cricket" },
  { href: "/education", label: "Education" },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-300 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          <CustomLink
            href="/"
            className="font-serif font-bold text-4xl md:text-5xl tracking-tight"
          >
            Gestify
          </CustomLink>
          <div className="flex items-center space-x-6">
            <LoginButton />
          </div>
        </div>

        <nav className="hidden md:flex justify-between items-center py-4 border-t border-gray-200 text-sm font-medium">
          <div className="flex space-x-8">
            {PRIMARY_SECTIONS.map(({ href, label }) => (
              <CustomLink
                key={href}
                href={href}
                className="hover:text-gray-600 transition-colors duration-200 ease-in-out"
              >
                {label}
              </CustomLink>
            ))}
          </div>

          <div className="flex flex-wrap space-x-4 lg:space-x-8">
            {TOP_LEVEL_SECTIONS.map(({ href, label }) => (
              <CustomLink
                key={href}
                href={href}
                className="hover:text-gray-600 transition-colors duration-200 ease-in-out"
              >
                {label}
              </CustomLink>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center hover:text-gray-600 transition-colors duration-200 ease-in-out cursor-pointer">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {MORE_SECTIONS.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <CustomLink
                      href={href}
                      className="w-full block px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                    >
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
  );
}
