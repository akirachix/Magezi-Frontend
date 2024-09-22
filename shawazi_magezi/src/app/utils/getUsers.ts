import { fetchUsersPerMonth } from "../api/users/route";
import { UserData } from "./types";

export const fetchUsersData = async (): Promise<UserData[] | null> => {
  try {
    const data = await fetchUsersPerMonth();
    return data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return null;
  }
};
