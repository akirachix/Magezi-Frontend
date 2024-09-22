import { useState, useEffect } from 'react';
import { fetchPaymentsData } from '../utils/getPayments';
import { PaymentData } from '../utils/types';

const usePaymentsData = () => {
    const [paymentsData, setPaymentsData] = useState<PaymentData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchPaymentsData();
                setPaymentsData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching payments data:', err);
                setError('Failed to fetch payments data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { paymentsData, loading, error };
};

export default usePaymentsData;
