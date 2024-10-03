const baseUrl = process.env.BASE_URL;

export async function GET() {
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

    const allUsers = await response.json() as { status: string }[]; 
    const availableUsers = allUsers.filter(user => user.status === 'available');

    return new Response(JSON.stringify(availableUsers), {
      status: 200,
      statusText: 'Available Users Fetched Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
