import { useState, useEffect } from "react";

import { Dayjs } from "dayjs";
import { fetchAgreements } from "../utils/getAgreement";

const useAgreementsData = () => {
  const [agreementsData, setAgreementsData] = useState<
    {
      date_created: string | number | Date | Dayjs | null | undefined;
      date: string | number | Date;
      month: string;
      totalContracts: number;
    }[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAgreements();
        setAgreementsData(data);
      } catch {
        setError("Failed to fetch agreements data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { agreementsData, loading, error };
};

export default useAgreementsData;















