import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const baseUrl = process.env.BASE_URL;
  
  // Debug logging
  console.log('Starting API request. Base URL:', baseUrl);
  
  if (!baseUrl) {
    console.error('BASE_URL is not defined in environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' }, 
      { status: 500 }
    );
  }

  try {
    // Get auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const csrfToken = cookieStore.get('csrftoken')?.value;

    console.log('Auth tokens retrieved:', { 
      hasToken: !!token,
      hasCsrfToken: !!csrfToken 
    });

    // Prepare headers with authentication
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }

    console.log('Making request to:', `${baseUrl}/api/users`);
    console.log('With headers:', headers);

    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { error: errorData?.detail || 'Failed to fetch users' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successful response data length:', Array.isArray(data) ? data.length : 'Not an array');
    
    return NextResponse.json(data, {
      status: 200,
      statusText: 'Fetched Successfully'
    });

  } catch (error) {
    console.error('Exception in users API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

















// import { NextResponse } from 'next/server';
// const baseUrl = process.env.BASE_URL;

// export async function GET() {
//   if (!baseUrl) {
//     console.error('BASE_URL is not defined in the environment variables.');
//     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
//   }

//   try {
//     const response = await fetch(`${baseUrl}/api/users`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error fetching users:', errorData.detail || 'Network response was not ok');
//       return NextResponse.json({ error: errorData.detail || 'Network response was not ok' }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data, {
//       status: 200,
//       statusText: 'Fetched Successfully',
//     });

//   } catch (error) {     
//     console.error('Error fetching users:', error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }
