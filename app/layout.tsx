import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
//causes hydration, TODO: fix
import Navbar from "@/components/ui/navbar";
import { AuthProvider } from "@/providers/authprovider";
import { TopBar } from "@/components/ui/topbar";
import Footer from "./components/layout/footer";
import RouteLoader from "./components/routeloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Gestify News Aggregation - AI-Powered News Summaries",
    template: "%s | Gestify News"
  },
  description:
    "Stay informed with Gestify's intelligent news aggregation platform. Get personalized AI-powered summaries from trusted sources worldwide, curated to match your interests.",
  keywords: [
    "news aggregator",
    "AI news summaries",
    "personalized news",
    "news curation",
    "breaking news",
    "news analysis",
    "intelligent news feed",
    "news from multiple sources"
  ],
  authors: [{ name: "Gestify" }],
  creator: "Gestify",
  publisher: "Gestify",
  metadataBase: new URL("https://gestifyy.app"),
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gestifyy.app",
    siteName: "Gestify News Aggregation",
    title: "Gestify News - AI-Powered News Summaries",
    description:
      "Stay informed with personalized AI-powered news summaries from trusted sources worldwide.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Gestify News Aggregation Platform"
      }
    ]
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Gestify News - AI-Powered News Summaries",
    description:
      "Get personalized news summaries from multiple sources, powered by AI.",
    images: ["/twitter-image.png"],
    creator: "@gestify"
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  
  alternates: {
    canonical: "https://gestifyy.app"
  },
  
  category: "news"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <TopBar />
        <Navbar />
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}

        <AuthProvider>
          <RouteLoader />
          {children}
          </AuthProvider>
                  <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
