

export const fetchTransaction = async () => {
    try {
        // const response = await fetch(`${baseURL}/api/transactions/`);
        const response = await fetch('https://shawazi-6941c000049b.herokuapp.com/api/transactions/');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch transactions:', (error as Error).message);
        throw new Error('Failed to fetch transactions');
    }
};