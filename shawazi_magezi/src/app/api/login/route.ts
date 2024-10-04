import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.BASE_URL;
export async function POST(request: NextRequest) {
  console.log('Received POST request at /api/login');
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }
  try {
    const { phone_number, password } = await request.json();
    if (!phone_number || !password) {
      console.error('Validation failed: Missing phone_number or password');
      return NextResponse.json(
        { error: 'Phone number and password are required.' },
        { status: 400 }
      );
    }
    const response = await fetch(`${baseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.warn('Backend responded with an error:', errorData.message || 'Unknown error');
      return NextResponse.json(
        { error: errorData.message || 'Login failed. Invalid credentials.' },
        { status: response.status }
      );
    }
    const result = await response.json();
    console.log('Login successful:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('An error occurred during login process:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
