import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/postgres";
import { verifyToken } from "@/lib/auth";
import { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

// Import all mock page and loading components
import TrendingPage from "../trending/page";
import TLoading from "../trending/loading";

import PoliticsPage from "../politics/page";
import PLoading from "../politics/loading";

import HoroscopePage from "../horoscope/page";
import HLoading from "../horoscope/loading";

import JobPage from "../careerjob/page";
import JLoading from "../careerjob/loading";

import ChessPage from "../sports/chess/page";
import ChessLoading from "../sports/chess/loading";

import InternationalPage from "../international/page";
import ILoading from "../international/loading";

import TechPage from "../tech/page";
import TCLoading from "../tech/loading";

import CricketPage from "../sports/cricket/page";
import CricketLoading from "../sports/cricket/loading";

import EducationPage from "../education/page";
import EduLoading from "../education/loading";

const CATEGORIES = [
  "trending",
  "politics",
  "horoscope",
  "career and jobs",
  "sports/chess",
  "international",
  "tech",
  "sports/cricket",
  "education",
];

const PAGE_MAP:any = {
  trending: { Component: TrendingPage, Loading: TLoading },
  politics: { Component: PoliticsPage, Loading: PLoading },
  horoscope: { Component: HoroscopePage, Loading: HLoading },
  "career and jobs": { Component: JobPage, Loading: JLoading },
  "sports/chess": { Component: ChessPage, Loading: ChessLoading },
  international: { Component: InternationalPage, Loading: ILoading },
  tech: { Component: TechPage, Loading: TCLoading },
  "sports/cricket": { Component: CricketPage, Loading: CricketLoading },
  education: { Component: EducationPage, Loading: EduLoading },
};

export default async function FeedPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const decoded = await verifyToken(accessToken, "access");

  const rows = await sql<any>`
    SELECT preferences, preference_enabled
    FROM users 
    WHERE email = ${decoded.email}
  `;

  if (!rows.length) redirect("/login");

  const bitString: string = rows[0].preferences;
  const consent: boolean = rows[0].preference_enabled;

  const savedPrefs = CATEGORIES.filter((_, idx) => bitString[idx] === "1");

  if (savedPrefs.length === 0) {
    return (
      <main className="flex font-serif">
        <aside className="w-64 h-screen sticky top-0 bg-neutral-100 border-r border-gray-300 p-4 shadow-inner">
          <h2 className="font-bold text-xl mb-4">🗞️ Categories</h2>
          <ul className="space-y-3">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href="/preferences"
                  className="text-sm text-gray-800 hover:underline hover:text-black transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex-1 p-10 bg-[#fdfaf6]">
          <h1 className="text-3xl font-extrabold mb-3 border-b border-black pb-2">📰 Your Personalized Feed</h1>
          <p className="text-gray-700 text-lg italic">You haven’t selected any preferences yet.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex font-serif bg-[#fdfaf6] text-gray-900">
      <aside className="w-64 h-screen sticky top-0 bg-neutral-100 border-r border-gray-300 p-5 shadow-inner overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">🗞️ Categories</h2>
        <ul className="space-y-3">
          {savedPrefs.map((cat) => (
            <li key={cat}>
              <a
                href={`#${cat.replace(/\s+/g, "-")}`}
                className="block text-sm text-gray-800 hover:text-black hover:underline transition-colors"
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex-1 px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-8 border-b border-black pb-3">📰 Your Personalized Feed</h1>

        <Accordion type="multiple" className="space-y-6">
          {savedPrefs.map((cat) => {
            const { Component, Loading } = PAGE_MAP[cat];
            const id = cat.replace(/\s+/g, "-");
            return (
              <AccordionItem
                value={id}
                key={id}
                id={id}
                className="border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-xl font-semibold px-5 py-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg cursor-pointer transition-colors">
                  {cat.replace(/\//g, " / ")}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 border-t border-gray-200">
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
}
