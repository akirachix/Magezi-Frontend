
export const postTransaction = async (formData: FormData) => {
    try {
            const response = await fetch('https://shawazi-6941c000049b.herokuapp.com/api/transactions/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit transaction');
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to post transaction:', (error as Error).message);
        throw new Error('Failed to post transaction');
    }
};