import { useState, useEffect } from 'react';
import { dummyData } from '../utils/types';
// import { fetchUsersPerMonth, fetchContractsPerMonth, fetchNewContractsPerMonth, fetchOngoingPaymentsPerMonth } from '../api';

const useDashboardData = () => {
  const [usersData, setUsersData] = useState<Array<{ month: string; sellers: number; buyers: number }> | null>(null);
  const [contractsData, setContractsData] = useState<Array<{ month: string; completed: number; ongoing: number }> | null>(null);
  const [newContractsData, setNewContractsData] = useState<Array<{ month: string; contracts: number }> | null>(null);
  const [paymentsData, setPaymentsData] = useState<Array<{ month: string; ongoing: number; completed: number }> | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
    
        // const users = await fetchUsersPerMonth();
        // const contracts = await fetchContractsPerMonth();
        // const newContracts = await fetchNewContractsPerMonth();
        // const payments = await fetchOngoingPaymentsPerMonth();

        // Using dummy data for now
        const users = dummyData.usersPerMonth.map(({ month, sellers, buyers }) => ({
          month,
          sellers, 
          buyers, 
        }));

        const contracts = dummyData.contractsPerMonth; 
        const newContracts = dummyData.newContractsPerMonth;
        const payments = dummyData.ongoingPaymentsPerMonth;

        setUsersData(users);
        setContractsData(contracts);
        setNewContractsData(newContracts);
        setPaymentsData(payments);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { usersData, contractsData, newContractsData, paymentsData, loading, error };
};

export default useDashboardData;
