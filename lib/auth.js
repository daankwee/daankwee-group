import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const TOKEN_NAME = 'token';

export function signAuthToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export function verifyAuthToken(token) {
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch { return null; }
}

export function getTokenFromReq(req) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  return cookies[TOKEN_NAME] || null;
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60*60*24,
  }));
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }));
}

export function getUserFromReq(req) {
  const token = getTokenFromReq(req);
  if (!token) return null;
  return verifyAuthToken(token);
}