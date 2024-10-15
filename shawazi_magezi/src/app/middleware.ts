import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req: NextRequest) {
  const isLoggedIn = getCookie('isLoggedIn', { req });
  const userRole = getCookie('userRole', { req });
  const phoneNumber = getCookie('userPhone', { req });

  console.log('isLoggedIn:', isLoggedIn);
  console.log('userPhone:', phoneNumber);
  console.log('userRole:', userRole);

  if (isLoggedIn) {
    // Redirect users who are logged in from the root page
    if (req.nextUrl.pathname === '/') {
      let redirectUrl = '/';
      
      // Determine redirect URL based on user role
      switch (userRole) {
        case 'lawyer':
          redirectUrl = '/draft-contract';
          break;
        case 'buyer':
          redirectUrl = '/buyer/land-display';
          break;
        case 'seller':
          redirectUrl = '/seller-page';
          break;
        default:
          console.error('Unknown user role:', userRole);
          return NextResponse.next();
      }

      // Redirect the user to their appropriate page
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  // If the user is not logged in or accessing a different page, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Match only the root page
};
