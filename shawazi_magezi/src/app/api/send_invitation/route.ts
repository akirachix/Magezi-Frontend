import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
    console.log('API route triggered');
    console.log('Environment variables:', process.env);
    console.log(`baseUrl: ${baseUrl}`);

    try {
        const { first_name, last_name, phone_number } = await request.json();

        console.log(`Inviting lawyer: ${first_name} ${last_name}, Phone: ${phone_number}`);


        console.log('Invitation processed successfully');

        return NextResponse.json({ message: 'Invitation sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error processing invitation:', error);
        return NextResponse.json({ message: 'Failed to send invitation' }, { status: 500 });
    }
}


