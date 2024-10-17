import { UserDatas, LandDetails } from './types';

export const findCurrentUser = (users: UserDatas[], userPhone: string): UserDatas | undefined => {
  return users.find((user) => user.phone_number === userPhone);
};

export const createNotificationData = (currentUser: UserDatas, land: LandDetails) => {
  const buyerName = `${currentUser.first_name} ${currentUser.last_name}`;
  return {
    message: `A buyer named ${buyerName} is interested in your land in ${land.location_name}!`,
    timestamp: new Date().toISOString(),
  };
};