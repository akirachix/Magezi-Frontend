export async function GET() {
  const baseUrl = process.env.BASE_URL;
  
  console.log('BASE_URL:', baseUrl);
  
  if (!baseUrl) {
    console.error('BASE_URL is not defined in environment variables');
    return new Response('Server configuration error', { status: 500 });
  }

  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`HTTP error! Status: ${response.status}, Message: ${errorText}`, { status: response.status });
    }
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {     
    console.error('Error fetching users:', error);
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}