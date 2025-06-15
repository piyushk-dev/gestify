import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SavePreferencesForm from "../components/saveprefform";
import { sql } from "@/lib/postgres";
import { verifyToken } from "@/lib/auth";


export default async function PreferencesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");
  const decoded = await verifyToken(accessToken, "access");
  // Fetch saved preferences from DB
  const rows = await sql<any>`
    SELECT * FROM users 
    WHERE email = ${decoded.email}
  `;
  const bitString = rows[0].preferences;
  const consent = rows[0].preference_enabled;

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

  const savedPrefs = CATEGORIES.filter((_, idx) => bitString[idx] === "1");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold mb-10 text-center text-gray-900">
          Personalize Your News Experience
        </h1>
        <SavePreferencesForm savedPrefs={savedPrefs} savedConsent={consent} />
      </div>
    </div>
  );
}
