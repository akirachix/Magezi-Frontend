import React, { useState } from 'react';

interface InviteLawyerModalProps {
    isOpen: boolean; 
    onClose: () => void;
    onSubmit: (first_name: string, last_name: string, phone_number: string) => Promise<void>;
}

const InviteLawyerModal: React.FC<InviteLawyerModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            if (typeof onSubmit !== 'function') {
                throw new Error('Submit function is not defined.');
            }

            console.log('Sending invitation with details:', { first_name, last_name, phone_number });

            // Attempt to send the invitation using the provided onSubmit prop.
            await onSubmit(first_name, last_name, phone_number);
            
            // Close the modal on success.
            onClose(); 
        } catch (error) {
            console.error('Error during invitation submission:', error);
            setErrorMessage('Failed to send the invitation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null; // Don't render anything if the modal is not open.

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-[600px]">
                <h2 className="text-xl mb-4">Invite a Lawyer</h2>
                
                {errorMessage && (
                    <div className="mb-4 text-red-500">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-300 p-2 rounded"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="submit" 
                            className="bg-green-700 text-white p-2 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Invitation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteLawyerModal;










// import React, { useState } from 'react';

// interface InviteLawyerModalProps {
//     isOpen: boolean; 
//     onClose: () => void;
//     onSubmit: (first_name: string, last_name: string, phone_number: string) => Promise<void>;
// }

// const InviteLawyerModal: React.FC<InviteLawyerModalProps> = ({ isOpen, onClose, onSubmit }) => {
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (typeof onSubmit !== 'function') {
//             console.error('onSubmit prop is not a function:', onSubmit);
//             return;
//         }

//         try {
//             console.log('BASE_URL:', process.env.BASE_URL); 
//             await onSubmit(first_name, last_name, phone_number);
//             onClose(); 
//         } catch (error) {
//             console.error('Error during invitation submission:', error);
//         }
//     };

//     if (!isOpen) return null; 

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded shadow-md w-[600px]">
//                 <h2 className="text-xl mb-4">Invite a Lawyer</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block mb-2" htmlFor="firstName">First Name</label>
//                         <input
//                             type="text"
//                             id="firstName"
//                             value={first_name}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-2" htmlFor="lastName">Last Name</label>
//                         <input
//                             type="text"
//                             id="lastName"
//                             value={last_name}
//                             onChange={(e) => setLastName(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-2" htmlFor="phoneNumber">Phone Number</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             value={phone_number}
//                             onChange={(e) => setPhoneNumber(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div className="flex justify-between">
//                         <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
//                         <button type="submit" className="bg-green-700 text-white p-2 rounded">Send Invitation</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default InviteLawyerModal;
