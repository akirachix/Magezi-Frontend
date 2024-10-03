import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;
export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }
  try {
    const { first_name, last_name, phone_number, password, role } = await request.json();
    if (!first_name || !last_name || !phone_number || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }
    const response = await fetch(`${baseUrl}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, phone_number, password, role }),
    });
    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);
    // Handle non-OK responses
    if (!response.ok) {
      return NextResponse.json(
        { error: textResponse || 'Register failed. Invalid credentials.' },
        { status: response.status }
      );
    }
    const result = JSON.parse(textResponse);
    const userRole = result.role;
    return NextResponse.json(
      { message: 'User created successfully', role: userRole },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
