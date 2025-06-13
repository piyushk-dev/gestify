import { type NextRequest, NextResponse } from "next/server";
import { generateTokens } from "@/lib/auth";
import { db } from "@/lib/db";
// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api/auth/google/callback`
  : "http://localhost:3000/api/auth/google/callback";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=No code provided", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange error:", tokenData);
      return NextResponse.redirect(
        new URL("/login?error=Token exchange failed", request.url)
      );
    }

    // Get user info with access token
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error("User info error:", userData);
      return NextResponse.redirect(
        new URL("/login?error=Failed to get user info", request.url)
      );
    }

    const userId = userData.id || userData.sub;
    // 3. Insert or update user in database (UPSERT)
    try {
      const { rows } = await db.query(
        `
    INSERT INTO users (email, name, picture)
    VALUES ($1, $2, $3)
    ON CONFLICT (email)
    DO UPDATE SET
      name = EXCLUDED.name,
      picture = EXCLUDED.picture,
      updated_at = NOW()
    RETURNING id;
    `,
        [userData.email, userData.name, userData.picture]
      );

      const userId = rows[0].id;
      // Use userId as needed from here on
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.redirect(
        new URL("/login?error=Database error", request.url)
      );
    }

    console.log("User data:", userData);
    // Generate our own JWT tokens
    const { accessToken, refreshToken } = generateTokens({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    });

    // Set cookies
    const response = NextResponse.redirect(new URL("/", request.url));

    // Set HTTP-only cookies for security
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 600, // 150 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/login?error=Authentication failed", request.url)
    );
  }
}
