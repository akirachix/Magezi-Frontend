const baseURL = process.env.BASE_URL;

export async function POST(request: Request) {
    const requestData = await request.json();
    console.log('Received data:', requestData);
    try {
        const response = await fetch(`${baseURL}/api/transactions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 201,
        });
    } catch (error) {
        const errors = (error as Error).message;
        console.error({ errors });
        return new Response(errors, {
            status: 500,
        });
    }
}

export async function GET() {
    try {
        const response = await fetch(`${baseURL}/api/transactions/`);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
}

