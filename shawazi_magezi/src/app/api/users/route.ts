import {NextResponse } from 'next/server';
const baseUrl = process.env.BASE_URL;

export async function GET() {
  if (!baseUrl) {
    console.error('BASE_URL is not defined in the environment variables.');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching users:', errorData.detail || 'Network response was not ok');
      return NextResponse.json({ error: errorData.detail || 'Network response was not ok' }, { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'Fetched Successfully',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          'Content-Type': 'application/json',
        },
});
}
}







