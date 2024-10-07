const baseUrl = process.env.BASE_URL;
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parcel_number = searchParams.get('parcel_number');
    const pk = searchParams.get('pk');

    if (!parcel_number && !pk) {
      return new Response(
        JSON.stringify({ error: 'Either parcel number or pk is required' }),
        {
          status: 400,
          statusText: 'Bad Request',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const params = new URLSearchParams();
    if (parcel_number) params.append('parcel_number', parcel_number);
    if (pk) params.append('pk', pk);

    const apiUrl = `${baseUrl}/api/land-detail?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.json();
      return new Response(
        JSON.stringify({ error: `HTTP error! Status: ${response.status}, Message: ${errorText}` }),
        {
          status: response.status,
          statusText: response.statusText,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
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
      }
    );
  }
};
