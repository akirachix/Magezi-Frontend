"use client";
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import ChatRoom from './components/Chatroom';
const ChatRoomPage = () => {
    useEffect(() => {
        setCookie('userRole', 'buyer', { maxAge: 60 * 60 * 24 * 7 }); 
    }, []);

    return <ChatRoom />;
};

export default ChatRoomPage;




