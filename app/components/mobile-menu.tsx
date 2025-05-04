"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("#mobile-menu-content") && !target.closest("#mobile-menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return (

) => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
<>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden text-xl"
        id="mobile-menu-button"
        onClick={(
) => setIsOpen(true)}
      >
        ☰
      </Button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div id="mobile-menu-content" className="bg-white h-full w-4/5 max-w-sm p-4 animate-in slide-in-from-left">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif font-bold text-2xl">Gestify</span>
              <Button variant="ghost" size="sm" className="text-xl" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/trending" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Trending
              </Link>
              <Link href="/latest" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Latest
              </Link>
              <Link href="/my-feed" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                My Feed
              </Link>
              <Link href="/saved-articles" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Saved Articles
              </Link>
              <Link href="/world" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                World
              </Link>
              <Link href="/business" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Business
              </Link>
              <Link href="/technology" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Technology
              </Link>
              <Link href="/science" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Science
              </Link>
              <Link href="/health" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Health
              </Link>
              <Link href="/politics" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Politics
              </Link>
              <Link href="/sports" className="py-2 border-b" onClick={() => setIsOpen(false)}>
                Sports
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
