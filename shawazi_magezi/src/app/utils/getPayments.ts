import { fetchPaymentsPerMonth } from "../api/paymentStatus/route";
import { PaymentData } from "./types";

export const fetchPaymentsData = async (): Promise<PaymentData[] | null> => {
  try {
    const data = await fetchPaymentsPerMonth();
    return data;
  } catch (error) {
    console.error("Error fetching payments data:", error);
    return null;
  }
};
