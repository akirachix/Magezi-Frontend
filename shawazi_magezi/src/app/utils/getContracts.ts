import { fetchContractsPerMonth } from "../api/contractStatus/route";
import { ContractData } from "./types";

export const fetchContractsData = async (): Promise<ContractData[] | null> => {
  try {
    const data = await fetchContractsPerMonth();
    return data;
  } catch (error) {
    console.error("Error fetching contracts data:", error);
    return null;
  }
};
