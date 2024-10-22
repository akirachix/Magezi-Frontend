export const fetchNotifications = async (landId: string | undefined) => {
    try {
        const response = await fetch(`/api/notify-seller/${landId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in fetchNotifications:', error);
        throw error;
    }
};