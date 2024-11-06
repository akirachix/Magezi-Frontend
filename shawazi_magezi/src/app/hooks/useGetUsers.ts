import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/fetchUsers';

interface UserType {
  id: string;
  first_name: string;
  role: 'buyer' | 'seller' | 'lawyer';
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const loadUsers = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const { buyers, sellers } = await fetchUsers(pageToFetch);
      console.log('Fetched Users on Page', pageToFetch, ':', { buyers, sellers });

      const BUYER_ROLE: UserType['role'] = 'buyer';
      const SELLER_ROLE: UserType['role'] = 'seller';

      const usersArray: UserType[] = [
        ...Object.entries(buyers).map(([id, fullName]) => ({
          id,
          first_name: fullName,
          role: BUYER_ROLE,
        })),
        ...Object.entries(sellers).map(([id, fullName]) => ({
          id,
          first_name: fullName,
          role: SELLER_ROLE, 
        })),
      ];

      setUsers((prevUsers) => [...prevUsers, ...usersArray]); 
      setHasMore(usersArray.length > 0); 

    } catch (error) {
      console.error('Error in useGetUsers:', error);
      setError({ message: 'Failed to fetch users.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadMoreUsers = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { users, loading, error, loadMoreUsers, hasMore };
};