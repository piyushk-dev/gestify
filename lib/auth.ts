import jwt from "jsonwebtoken"

// JWT configuration
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

type TokenType = "access" | "refresh"

type UserData = {
  id: string
  email: string
  name: string
  picture?: string
}

// Generate JWT tokens
export function generateTokens(user: UserData) {
  const { exp, iat, nbf, ...cleanUser } = user as any;
  const accessToken = jwt.sign(cleanUser, JWT_ACCESS_SECRET, {
    expiresIn: "150m", // Short-lived access token
  })

  const refreshToken = jwt.sign(cleanUser, JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Longer-lived refresh token
  })

  return { accessToken, refreshToken }
}

// Verify JWT token
export function verifyToken(token: string, type: TokenType) {
  const secret = type === "access" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET
  if (!secret) {
    throw new Error("JWT secret not provided")
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown;
    return decoded as UserData & { exp: number; iat: number }
  } catch (error) {
    throw new Error("Invalid token")
  }
}

// Get user from request
// export async function getCurrentUser(request: Request) {
//   const cookieHeader = request.headers.get("cookie")
//   if (!cookieHeader) return null

//   const cookies = Object.fromEntries(
//     cookieHeader.split("; ").map((cookie) => {
//       const [name, value] = cookie.split("=")
//       return [name, value]
//     }),
//   )

//   const accessToken = cookies.accessToken

//   if (!accessToken) return null

//   try {
//     return verifyToken(accessToken, "access")
//   } catch (error) {
//     return null
//   }
// }
