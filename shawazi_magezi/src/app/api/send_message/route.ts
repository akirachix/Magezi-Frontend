import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || '', 
    key: process.env.PUSHER_KEY || '',      
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.PUSHER_CLUSTER || '',
    useTLS: true,
});

export async function POST(req: Request) {
    try {
        const { message, recipient, sender } = await req.json();

        if (!message || !recipient || !sender) {
            return NextResponse.json({ status: 'Error', message: 'Missing fields' }, { status: 400 });
        }

        await pusher.trigger('chat-channel', 'new-message', {
            message,
            recipient,
            sender,
        });

        return NextResponse.json({ status: 'Message sent!' });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ status: 'Error', message: 'Failed to send message' }, { status: 500 });
    }
}

