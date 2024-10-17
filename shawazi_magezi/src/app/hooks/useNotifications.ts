import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { LandDetails } from '../utils/types';
import { fetchUsers } from '../utils/fetchUsers';
import { createNotificationData, findCurrentUser } from '../utils/postNotifications';


export const useInterestClick = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

  const handleInterestClick = async (land: LandDetails) => {
    setLoadingStates((prev) => ({ ...prev, [land.land_details_id]: true }));

    try {
      const userPhone = Cookies.get("userPhone");
      if (!userPhone) {
        toast.error("User is not logged in!");
        return;
      }

      const users = await fetchUsers();
      const currentUser = findCurrentUser(users, userPhone);

      if (!currentUser) {
        toast.error("User not found!");
        return;
      }

      if (!currentUser.first_name || !currentUser.last_name) {
        toast.error("Invalid buyer data!");
        return;
      }

     
      const notificationData = createNotificationData(currentUser, land);
      console.log('Notification Data:', notificationData);

      
      Cookies.set('buyerNotification', JSON.stringify(notificationData), { expires: 7 });
      toast.success("Interest expressed successfully. Notification sent to seller.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("This land is already under consideration by another buyer.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [land.land_details_id]: false }));
    }
  };

  return { handleInterestClick, loadingStates };
};


