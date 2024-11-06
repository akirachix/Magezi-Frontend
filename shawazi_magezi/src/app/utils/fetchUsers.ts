import { User } from "./types";

export const fetchUsers = async (page: number = 1, limit: number = 100): Promise<{ buyers: Record<string, string>, sellers: Record<string, string> }> => {
  try {

    const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    
    const users = await response.json();

    const buyerMap: Record<string, string> = {};
    const sellerMap: Record<string, string> = {};

    users.forEach((user: User) => {
      if (user.role === "buyer") {
        buyerMap[String(user.id)] = `${user.first_name} ${user.last_name}`;
      } else if (user.role === "seller") {
        sellerMap[String(user.id)] = `${user.first_name} ${user.last_name}`;
      }
    });

    return { buyers: buyerMap, sellers: sellerMap }; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};