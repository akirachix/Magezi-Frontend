import { useState, useEffect } from 'react';
import { fetchContractsData } from '../utils/getContracts';
import { ContractData } from '../utils/types';


const useContractsData = () => {
    const [contractsData, setContractsData] = useState<ContractData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchContractsData();
                setContractsData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching contracts data:', err);
                setError('Failed to fetch contracts data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { contractsData, loading, error };
};

export default useContractsData;
