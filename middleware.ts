// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, generateTokens } from "@/lib/auth";

const protectedRoutes = [
  "/preferences",
  "/feed",
  "/profile",
  "/newsletter",
];

function isProtected(path: string) {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  console.log("🔐 Pathname:", pathname);

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const redirectToLogin = () => NextResponse.redirect(new URL("/login", request.url));

  if (accessToken) {
    try {
      console.log("🔐 Verifying access token");
      console.log("🔐 Access Token:", accessToken);
      await verifyToken(accessToken, "access");
      return NextResponse.next();
    } catch (err) {
      console.log("🔐 Access token verification failed, trying refresh token", err);
      // fallthrough to refresh token check
    }
  }

  if (!refreshToken) {
    console.log("🔐 No refresh token found, redirecting to login");
    return redirectToLogin();
  }

  try {
    const decoded = await verifyToken(refreshToken, "refresh");

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(decoded);

    const response = NextResponse.next();

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 150 * 60,
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
  } catch (err) {
    console.log("🔐 Refresh token verification failed, redirecting to login", err);

    const response = redirectToLogin();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/preferences",
    "/feed",
    "/profile",
    "/newsletter",
    // other protected paths
  ],
};
