const protectedPaths = new Set(['/admin', '/admin/', '/admin.html']);

function toBase64Url(bytes) {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sessionToken(secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('elaine-admin-session'));
  return toBase64Url(new Uint8Array(signature));
}

function cookieValue(request, name) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.split(';').map(value => value.trim()).find(value => value.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}

export default async function middleware(request) {
  const { pathname, search } = new URL(request.url);
  if (!protectedPaths.has(pathname)) return;

  const secret = process.env.ADMIN_PASSWORD;
  const valid = secret && cookieValue(request, 'elaine_admin_session') === await sessionToken(secret);
  if (valid) return;

  const next = encodeURIComponent(`${pathname}${search}`);
  const location = new URL(`/admin-login.html?next=${next}${secret ? '' : '&error=config'}`, request.url);
  return Response.redirect(location, 302);
}

export const config = {
  runtime: 'edge',
};
