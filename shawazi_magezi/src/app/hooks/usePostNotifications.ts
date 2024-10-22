import { useState } from 'react';
import { postNotifications } from '../utils/postNotifications';
const usePostNotification = () => {
    const [message, setMessage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const submitTransaction = async (phoneNumber: string, formData: FormData) => {
        try {
            const data = await postNotifications(phoneNumber, formData);
            setMessage(`Transaction successful: ${data.message}`);
            setIsModalOpen(true);
        } catch (error) {
            const errorMessage = (error as Error).message || 'An unknown error occurred';
            setMessage(`Error: ${errorMessage}`);
            setIsErrorModalOpen(true);
        }
    };
    const closeModal = () => setIsModalOpen(false);
    const closeErrorModal = () => setIsErrorModalOpen(false);
    return { message, isModalOpen, isErrorModalOpen, submitTransaction, closeModal, closeErrorModal };
};
export default usePostNotification;