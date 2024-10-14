import React from "react";
import { UserDatas } from "@/app/utils/types";

interface UserCardDetails {
    user: Partial<UserDatas>;
    startConversation: () => void; 
}

const UserCard: React.FC<UserCardDetails> = ({ user, startConversation }) => {
    return (
        <div
            className="p-2 border-b hover:bg-gray-100 cursor-pointer" 
            onClick={startConversation} 
        >
            <div className="mr-2"> 
                <p className="font-semibold">{user.first_name}</p>
            </div>
            <div>
                <p className="text-gray-600">{user.last_name}</p> 
            </div>
        </div>
    );
};

export default UserCard;
