import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const secret = process.env.JWT_SECRET || 'stratedge-dev-secret-change-before-production';
const sessions = new Map();

const sign = (payload) =>
  createHmac('sha256', secret).update(payload).digest('base64url');

export const createToken = (admin) => {
  const payload = JSON.stringify({
    sub: admin.id,
    username: admin.username,
    nonce: randomBytes(12).toString('hex'),
    exp: Date.now() + 1000 * 60 * 60 * 4,
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const token = `${encodedPayload}.${sign(encodedPayload)}`;
  sessions.set(token, true);
  return token;
};

export const verifyToken = (token) => {
  if (!token || !sessions.has(token) || !token.includes('.')) return null;
  const [encodedPayload, signature] = token.split('.');
  const expected = sign(encodedPayload);
  if (signature.length !== expected.length) return null;
  const valid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return null;

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
  if (payload.exp < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return payload;
};

export const revokeToken = (token) => {
  sessions.delete(token);
};
