import { useState, useEffect } from 'react';
import { fetchNewContractsData } from '../utils/getNewContracts';
import { NewContractData } from '../utils/types';

const useNewContractsData = () => {
    const [newContractsData, setNewContractsData] = useState<NewContractData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchNewContractsData();
                setNewContractsData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching new contracts data:', err);
                setError('Failed to fetch new contracts data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { newContractsData, loading, error };
};

export default useNewContractsData;
