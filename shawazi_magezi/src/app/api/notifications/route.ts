import { NextResponse } from 'next/server';
import { NotificationData } from "@/app/utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request, { params }: { params: { landId: string } }) {
  if (!BASE_URL) {
    console.error('BASE_URL is not defined in the environment variables.');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const notificationData: NotificationData = await req.json();

  try {
    const response = await fetch(`${BASE_URL}/api/notify-seller/${params.landId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending notification:', errorData.detail || 'Network response was not ok');
      return NextResponse.json({ error: errorData.detail || 'Network response was not ok' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
