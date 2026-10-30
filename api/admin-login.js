import { createHmac, timingSafeEqual } from 'node:crypto';

function sessionToken(secret) {
  return createHmac('sha256', secret).update('elaine-admin-session').digest('base64url');
}

function sameValue(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return response.status(503).json({ error: 'Admin password is not configured yet.' });

  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  if (!sameValue(password, secret)) return response.status(401).json({ error: 'Incorrect password.' });

  response.setHeader('Set-Cookie', `elaine_admin_session=${sessionToken(secret)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
  return response.status(200).json({ ok: true, next: request.body?.next || '/admin' });
}
