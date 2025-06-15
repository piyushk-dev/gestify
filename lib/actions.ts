"use server";

import { sql } from "@/lib/postgres";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

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

export async function savePreferences(formData: FormData) {
  const selected = formData.getAll("categories") as string[];
  const consent = formData.get("dailyMailConsent") === "on";

  // Create 20-length bitstring: 1 for selected, 0 otherwise, padded with 0s
  let bitString = CATEGORIES.map((cat) => (selected.includes(cat) ? "1" : "0")).join("");
  bitString = bitString.padEnd(20, "0"); // Add trailing zeros if needed

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");

  const decoded = await verifyToken(accessToken, "access");
  const email = decoded.email;

  await sql`
    UPDATE users
    SET preferences = ${bitString}, preference_enabled = ${consent}
    WHERE email = ${email}
  `;
}
