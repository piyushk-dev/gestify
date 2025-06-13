import { NextResponse } from "next/server"

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
const REDIRECT_URI = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api/auth/google/callback`
  : "http://localhost:3000/api/auth/google/callback"

// Generate Google OAuth URL
export async function GET() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {   
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"].join(
      " ",
    ),
  }

  const queryString = new URLSearchParams(options).toString()
  const url = `${rootUrl}?${queryString}`

  return NextResponse.json({ url })
}
