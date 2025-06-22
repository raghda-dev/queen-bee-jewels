// client/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isProtected = request.nextUrl.pathname.startsWith('/home');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/?mode=login', request.url));
  }

  return NextResponse.next();
}

// ✅ Match all routes under /home (e.g., /home, /home/cart, etc.)
export const config = {
  matcher: ['/home/:path*'],
};
