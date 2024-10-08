import { useEffect, useState } from 'react';
import { FormData } from '../utils/types';
import { fetchData } from '../utils/newpostAgreements';

export const useNewAgreements = () => {
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAgreements = async () => {
      setLoading(true);
      try {
        const response = await fetchData();
        console.log({ response });
        setData(response.agreements);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    getAgreements();
  }, []);

  return { data, loading, error };
};
