export const fetchTransactions = async () => {
  try {
    const response = await fetch('/admin/api/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchTransactions:', error);
    throw error;
  }
};
































// "use client"

// export interface TransactionData {
//   month: string;
//   count: number;
// }

// export const fetchTransactionsData = async (): Promise<TransactionData[]> => {
//   try {
//     const response = await fetch('/api/transactions', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     console.log('Raw API response:', data);
    

//     const monthlyTransactions: { [key: string]: number } = {};

//     if (Array.isArray(data)) {
//       data.forEach((transaction: any) => {
//         if (!transaction.someDateField) return;
//         const date = new Date(transaction.someDateField);
//         if (isNaN(date.getTime())) return;
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         monthlyTransactions[monthYear] = (monthlyTransactions[monthYear] || 0) + 1;
//       });

//     } else {
//       console.error('Unexpected data structure:', data);
//       return [];
//     }

//     const sortedMonths = Object.keys(monthlyTransactions).sort();
    
//     const result = sortedMonths.map(month => ({
//       month,
//       count: monthlyTransactions[month],
//     }));

//     console.log('Processed transaction data:', result);
//     return result;
//   } catch (error) {
//     console.error('Error fetching transactions data:', error);
//     throw error;
//   }
// };