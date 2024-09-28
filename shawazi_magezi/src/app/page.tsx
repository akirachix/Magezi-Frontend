"use client";
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import ChatRoom from './components/chatroom/ChatRoom';


const ChatRoomPage = () => {
    useEffect(() => {
        setCookie('userRole', 'seller', { maxAge: 60 * 60 * 24 * 7 }); 
    }, []);

    return <ChatRoom />;
};

export default ChatRoomPage;




