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
  const [hasMore, setHasMore] = useState<boolean>(true); // Keep track if there are more users to fetch

  const loadUsers = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const { buyers, sellers } = await fetchUsers(pageToFetch);
      console.log('Fetched Users on Page', pageToFetch, ':', { buyers, sellers });

      // Declare constant for role values
      const BUYER_ROLE: UserType['role'] = 'buyer';
      const SELLER_ROLE: UserType['role'] = 'seller';

      // Transform fetched users into UserType[]
      const usersArray: UserType[] = [
        ...Object.entries(buyers).map(([id, fullName]) => ({
          id,
          first_name: fullName,
          role: BUYER_ROLE, // Use the constant instead of type assertion
        })),
        ...Object.entries(sellers).map(([id, fullName]) => ({
          id,
          first_name: fullName,
          role: SELLER_ROLE, // Use the constant instead of type assertion
        })),
      ];

      setUsers((prevUsers) => [...prevUsers, ...usersArray]); // Append new users
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