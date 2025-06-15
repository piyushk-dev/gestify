import { type NextRequest, NextResponse } from "next/server";
import { verifyToken, generateTokens } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken, "access");
      return NextResponse.json({
        loggedIn: true,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture ?? null,
        },
      });
    }
  } catch (err) {
    // continue to refresh fallback
  }

  if (!refreshToken) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  try {
    const decoded =await  verifyToken(refreshToken, "refresh");
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(decoded);

    const response = NextResponse.json({
      loggedIn: true,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture ?? null,
      },
    });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 10, // 150 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh failed in /check:", error);
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
