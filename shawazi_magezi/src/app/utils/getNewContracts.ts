import { fetchNewContractsPerMonth } from "../api/newContracts/route";
import { NewContractData } from "./types";

export const fetchNewContractsData = async (): Promise<
  NewContractData[] | null
> => {
  try {
    const data = await fetchNewContractsPerMonth();
    return data;
  } catch (error) {
    console.error("Error fetching new contracts data:", error);
    return null;
  }
};
