"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 6000));
      // Replace with your actual authentication check (e.g., using context or API)
      const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true"
  
      if (!isAuthenticated && window.location.pathname !== "/login") {
        const hasSeenModal = sessionStorage.getItem("hasSeenLoginModal")
        if (!hasSeenModal) {
          setIsOpen(true)
          // Set flag to avoid showing the modal repeatedly in the same session
          sessionStorage.setItem("hasSeenLoginModal", "true")
        }
      }
      
    })();
  }, [])

  const handleLogin = () => {
    // Placeholder: replace with your authentication logic
    router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Sign in to Gestify</DialogTitle>
          <DialogDescription>
            Sign in to access personalized news, save articles, and customize your news feed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-gray-600">
            Get the most out of Gestify by signing in. It&rsquo;s free and only takes a moment.
          </p>
          <Button onClick={handleLogin} className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
          <div className="text-xs text-center text-gray-500 mt-4">
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleClose}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
