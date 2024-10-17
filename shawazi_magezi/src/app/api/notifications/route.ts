import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL;

interface NotificationData {
  message: string;
  timestamp: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

export async function POST(request: NextRequest, { params }: { params: { landId: string } }) {
  const landId = params.landId;
  const notificationData: NotificationData = await request.json();

  try {
    const postResponse = await fetch(`${BASE_URL}/api/notify-seller/${landId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });

    if (!postResponse.ok) {
      const errorMessage = await postResponse.text();
      console.error("Error response:", errorMessage);
      return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phoneNumber = searchParams.get('phoneNumber');

  if (!phoneNumber) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${BASE_URL}/api/notifications/${phoneNumber}`);
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    const notifications: { notifications: Notification[] } = await response.json();
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}