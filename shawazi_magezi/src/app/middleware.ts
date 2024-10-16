import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req: NextRequest) {
  const isLoggedIn = getCookie('isLoggedIn', { req });
  const userRole = getCookie('userRole', { req });

  if (isLoggedIn) {
    let redirectUrl = '/';
    
    switch (userRole) {
      case 'lawyer':
        redirectUrl = '/lawyer/draft-contract';
        break;
      case 'buyer':
        redirectUrl = '/buyer/land-display';
        break;
      case 'seller':
        redirectUrl = '/seller/seller-page';
        break;
      default:
        console.error('Unknown user role:', userRole);
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};