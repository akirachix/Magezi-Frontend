import { NextResponse, NextRequest } from 'next/server';
const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    const response = await fetch(`${baseUrl}/api/agreements${userId ? `?userId=${userId}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching agreements: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: `Failed to fetch agreements: ${response.status} ${response.statusText}` }, { status: response.status });
    }

    const result = await response.json();
    if (!result || !Array.isArray(result) || result.length === 0) {
      console.warn('No agreements found in the response');
      return NextResponse.json({ error: 'No agreements found' }, { status: 404 });
    }

    
    console.log(`Successfully fetched ${result.length} agreements`);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in GET /api/agreements:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set');
    return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const requiredFields = [
      'parcel_number', 'contract_duration', 'agreed_amount',
      'down_payment', 'installment_schedule', 'penalties_interest_rate',
    ];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const response = await fetch(`${baseUrl}/api/agreements/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to create agreement. Status: ${response.status}, Error:`, errorData);
      return NextResponse.json({ error: 'Error creating agreement in backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('Error creating agreement:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to create agreement' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set');
    return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const agreementId = searchParams.get('id');

    if (!agreementId) {
      return NextResponse.json({ error: 'Agreement ID is required' }, { status: 400 });
    }

    const body = await request.json();
    console.log('Update request body:', body);

    const response = await fetch(`${baseUrl}/api/agreements/${agreementId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update agreement. Status: ${response.status}, Error:`, errorData);
      return NextResponse.json({ error: 'Error updating agreement in backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error updating agreement:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to update agreement' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set');
    return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const agreementId = searchParams.get('id');

    if (!agreementId) {
      return NextResponse.json({ error: 'Agreement ID is required' }, { status: 400 });
    }

    const body = await request.json();
    console.log('Patch request body:', body);
    const apiUrl = `${baseUrl}/api/agreements/${agreementId}/`;
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let errorData;
    if (!response.ok) {
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }
      console.error(`Failed to update agreement. Status: ${response.status}, Error:`, errorData);
      return NextResponse.json({ error: 'Error updating agreement in backend', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error updating agreement:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to update agreement', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
