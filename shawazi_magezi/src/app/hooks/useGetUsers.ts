import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/fetchUsers';
import { User } from '@/utils/types';


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









// export interface UserData{
// id:number;
// first_name:string;
// last_name:string;
// phone_number:string;
// }

// export const useGetUsers = () => {
//   const [users, setUsers] = useState<UserData[]>([]);
//   // const [data, setData] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   useEffect(() => {
//     const getUsers = async () => {
//       setLoading(true);
//       try {
//         const data= await fetchUsers();
//         console.log(data);
//         setUsers(users);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getUsers();
//   }, []);
//   return { users, loading, error };
// };






