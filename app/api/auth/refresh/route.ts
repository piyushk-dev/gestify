import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, generateTokens } from "@/lib/auth"


export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token not provided" }, { status: 401 })
  }

  try {
    // Verify the refresh token
    const decoded = await verifyToken(refreshToken, "refresh")

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    })

    // Set new cookies
    const response = NextResponse.json({ success: true })

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    })

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
  }
}
