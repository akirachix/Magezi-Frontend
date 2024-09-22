import { useState, useEffect } from 'react';
import { fetchUsersData } from '../utils/getUsers';
import { UserData } from '../utils/types';

const useUsersData = () => {
    const [usersData, setUsersData] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchUsersData();
                setUsersData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching users data:', err);
                setError('Failed to fetch users data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { usersData, loading, error };
};

export default useUsersData;
