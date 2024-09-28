import { UserData } from "@/hooks/useGetUsers";
import React from "react";
interface UserCardDetails {
    user: UserData;
    startConversation: () => void; 
}

const UserCard = ({ user, startConversation }: UserCardDetails) => {
    return (
        <div
            className=" p-2 border-b hover:bg-gray-100 cursor-pointer" 
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
