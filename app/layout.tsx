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
  title: "Gestify News Aggregation",
  description:
    "Get personalized news summaries from multiple sources, powered by AI.",
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
