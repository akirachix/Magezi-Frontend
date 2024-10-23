import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

const useUserData = () => {
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getCookie("userRole") as string;
    const userName = getCookie("userName") as string;
    const userId = getCookie("userId") as string;

    setCurrentUserRole(userRole);
    setCurrentUserName(userName);
    setCurrentUserId(userId);
  }, []);

  return { currentUserRole, currentUserName, currentUserId };
};

export default useUserData;