export const fetchTransactions = async () => {
  try {
    const response = await fetch('/api/transactions', {
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

