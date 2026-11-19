import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const visitor = req.cookies.get('lw_visitor')?.value;
  if (visitor) {
    return NextResponse.next();
  }
  return req.nextUrl.pathname.startsWith('/api/')
    ? NextResponse.json({ error: { code: 'UNAUTHORIZED' } }, { status: 401 })
    : NextResponse.redirect(new URL('/', req.url));
}

export const config = { matcher: ['/world/:path*', '/api/world/:path*'] };

