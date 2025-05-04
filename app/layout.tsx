import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/app/components/layout/header"
import Footer from "@/app/components/layout/footer"
import LoginModal from "@/app/components/auth/login-modal"
import PreferencesModal from "@/app/components/auth/preferences-modal"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Gestify - AI-Powered News Aggregation",
  description: "Get personalized news summaries from multiple sources, powered by AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
          <Header />
          {children}
          <LoginModal />
          {/* <PreferencesModal userId="lol" hasPreferences={false}/> */}
          <Footer />
      </body>
    </html>
)
}
