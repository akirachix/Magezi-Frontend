"use client";

import { useState, useEffect } from "react";
import { fetchParcelNumber } from "../utils/getParcelNumber";

const useParcelNumber = () => {
  const [landPlotsData, setLandPlotsData] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchParcelNumber();
        setLandPlotsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLandPlotsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { landPlotsData, loading, error };
};

export default useParcelNumber;