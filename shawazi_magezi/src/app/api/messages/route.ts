import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function GET() {
  try {
    const messages = [
      { id: 1, sender: 'User1', content: 'Hello!', timestamp: new Date().toISOString() },
      { id: 2, sender: 'User2', content: 'Hi there!', timestamp: new Date().toISOString() },
    ];
    
    return NextResponse.json({ status: 'success', messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { id, sender, content, timestamp } = await request.json();

  try {
    await pusher.trigger('chat-channel', 'new-message', {
      id,
      sender,
      content,
      timestamp,
    });

    return NextResponse.json({ status: 'success', message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to send message' }, { status: 500 });
  }
}
