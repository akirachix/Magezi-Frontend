import { useState, useEffect } from 'react';
import { fetchUsers} from '../utils/getUsers';

const useUsersData = () => {
  const [usersData, setUsersData] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsersData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setUsersData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { usersData, loading, error };
};

export default useUsersData;