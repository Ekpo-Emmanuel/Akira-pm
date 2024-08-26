import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthed) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Paths that should not be accessible if authenticated
  if (isAuthed && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};