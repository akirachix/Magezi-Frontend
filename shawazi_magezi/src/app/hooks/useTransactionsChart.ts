import { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/getTransactions';

const useTransactionsData = () => {
  const [transactionsData, setTransactionsData] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        console.log({data});
        
        setTransactionsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setTransactionsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { transactionsData, loading, error };
};

export default useTransactionsData;