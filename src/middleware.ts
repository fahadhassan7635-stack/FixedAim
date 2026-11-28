import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals, API routes, and static files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split('/');
  const maybeLocale = parts[1];

  // Redirect /en or /en/... to root /... (canonical English URLs)
  if (maybeLocale === 'en') {
    const rest = '/' + parts.slice(2).join('/');
    const url = req.nextUrl.clone();
    url.pathname = rest === '' ? '/' : rest;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
