'use server';
import { SignJWT, jwtVerify } from 'jose';

const JWT_ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

type TokenType = 'access' | 'refresh';

export type UserData = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

// Generate JWT tokens
export async function generateTokens(user: UserData) {
  const accessToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setNotBefore('0s')
    .setExpirationTime('150m') // 150 minutes
    .sign(JWT_ACCESS_SECRET);

  const refreshToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setNotBefore('0s')
    .setExpirationTime('7d') // 7 days
    .sign(JWT_REFRESH_SECRET);

  return { accessToken, refreshToken };
}

// Verify JWT token
export async function verifyToken(token: string, type: TokenType): Promise<UserData & { exp: number; iat: number }> {
  const secret = type === 'access' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as UserData & { exp: number; iat: number };
  } catch (error) {
    throw new Error('Invalid token');
  }
}
