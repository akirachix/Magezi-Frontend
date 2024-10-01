import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/fetchUsers';
import { User } from '../utils/types';


export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        console.log('Fetched Users:', fetchedUsers); 
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error in useGetUsers:', error);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};






