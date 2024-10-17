
import { useEffect, useState } from 'react';
import { fetchTransaction } from '../utils/fetchTransaction';

interface Transaction {
  buyer: boolean;
    name: string;
    date: string; 
    status: string;
    amount: number; 
    buyerUploaded?:boolean;
    sellerUploaded?:boolean
    buyerImageUrl?: string; 
  sellerImageUrl?: string; 
}
  

const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransaction();
                setTransactions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        loadTransactions();
    }, []);

    return { transactions, isLoading, error };
};

export default useTransactions;