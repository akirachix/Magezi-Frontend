import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { fetchNotifications } from '../utils/getNotifications';

const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotifications = async () => {
            const userPhone = Cookies.get("userPhone");
            if (!userPhone) {
                setError("User is not logged in!");
                setIsLoading(false);
                return;
            }

            try {
                const data = await fetchNotifications(userPhone);
                setNotifications(data ? data.notifications : []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        loadNotifications();
    }, []);

    return { notifications, isLoading, error };
};

export default useNotifications;