import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/fetchUsers';

interface UserType {
  id: string;
  first_name: string;
  role: 'buyer' | 'seller' | 'lawyer';
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        console.log('Fetched Users:', fetchedUsers); 
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error in useGetUsers:', error);
        setError({ message: 'Failed to fetch users.' });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};










// import { useEffect, useState } from 'react';
// import { fetchUsers } from '../utils/fetchUsers';


// interface UserType {
//   id: string;
//   first_name: string;
//   role: 'buyer' | 'seller' | 'lawyer';
// }
// interface UsersError {
//   message: string;
// }

// export const useGetUsers = () => {
//   const [users, setUsers] = useState<UserType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const fetchedUsers = await fetchUsers();
//         console.log('Fetched Users:', fetchedUsers); 
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error('Error in useGetUsers:', error);
//         setError('Failed to fetch users.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUsers();
//   }, []);

//   return { users, loading, error };
// };






