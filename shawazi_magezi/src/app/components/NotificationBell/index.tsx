// 'use client';

// import { useEffect, useState } from 'react';
// import { FaBell } from 'react-icons/fa';

// interface Notification {
//   message: string;
//   created_at: string; // Adjusting to match your backend timestamp key
// }

// const SellerNotifications = ({ sellerId }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(`/api/get-notifications/${sellerId}`); // Use sellerId
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setNotifications(data.notifications);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(); // Fetch notifications on component mount

//     const intervalId = setInterval(fetchNotifications, 5000); // Poll server every 5 seconds
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   const toggleNotifications = () => {
//     setShowNotifications(prev => !prev);
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//     // Optionally, you might want to empty out the notifications on the server as well
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleNotifications} className="flex items-center">
//         <FaBell className="text-2xl" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
//             {notifications.length}
//           </span>
//         )}
//       </button>
//       {showNotifications && (
//         <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-bold">Notifications</h3>
//             <button onClick={clearNotifications} className="text-sm text-red-600">
//               Clear All
//             </button>
//           </div>
//           {notifications.length > 0 ? (
//             notifications.map((note, index) => (
//               <div key={index} className="border-b py-2">
//                 {note.message} at {new Date(note.created_at).toLocaleString()}
//               </div>
//             ))
//           ) : (
//             <p>No notifications</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellerNotifications;





















// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { FaBell } from 'react-icons/fa';

// // interface Notification {
// //   message: string;
// //   timestamp: string;
// // }

// // interface SellerNotificationsProps {
// //   phoneNumber: string;
// // }

// // const SellerNotifications: React.FC<SellerNotificationsProps> = ({ phoneNumber }) => {
// //   const [notifications, setNotifications] = useState<Notification[]>([]);
// //   const [showNotifications, setShowNotifications] = useState(false);

// //   useEffect(() => {
// //     const loadStoredNotifications = () => {
// //       const storedNotifications = localStorage.getItem('sellerNotifications');
// //       if (storedNotifications) {
// //         setNotifications(JSON.parse(storedNotifications));
// //       }
// //     };

// //     const fetchNotifications = async () => {
// //       try {
// //         const response = await fetch(`https://shawazi-6941c000049b.herokuapp.com/api/notifications/${phoneNumber}/`);
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch notifications');
// //         }
// //         const data: Notification[] = await response.json();
// //         setNotifications(data);
// //         localStorage.setItem('sellerNotifications', JSON.stringify(data));
// //       } catch (error) {
// //         console.error('Error fetching notifications:', error);
// //       }
// //     };

// //     const checkForNewNotifications = () => {
// //       const notification = localStorage.getItem('buyerNotification');
// //       if (notification) {
// //         try {
// //           const parsedNotification: Notification = JSON.parse(notification);
// //           if (parsedNotification.message && parsedNotification.timestamp) {
// //             setNotifications((prev) => {
// //               const updatedNotifications = [...prev, parsedNotification];
// //               localStorage.setItem('sellerNotifications', JSON.stringify(updatedNotifications));
// //               return updatedNotifications;
// //             });
// //           }
// //         } catch (error) {
// //           console.error('Error parsing buyer notification:', error);
// //         }
// //         localStorage.removeItem('buyerNotification');
// //       }
// //     };

// //     loadStoredNotifications(); // Load notifications on component mount
// //     fetchNotifications(); // Fetch notifications from API
// //     const intervalId = setInterval(checkForNewNotifications, 5000);
// //     return () => clearInterval(intervalId);
// //   }, [phoneNumber]);

// //   const toggleNotifications = () => {
// //     setShowNotifications((prev) => !prev);
// //   };

// //   const clearAllNotifications = () => {
// //     setNotifications([]);
// //     localStorage.removeItem('sellerNotifications');
// //   };

// //   const deleteNotification = (index: number) => {
// //     const updatedNotifications = notifications.filter((_, i) => i !== index);
// //     setNotifications(updatedNotifications);
// //     localStorage.setItem('sellerNotifications', JSON.stringify(updatedNotifications));
// //   };

// //   return (
// //     <div className="relative">
// //       <button onClick={toggleNotifications} className="flex items-center">
// //         <FaBell className="text-2xl" />
// //         {notifications.length > 0 && (
// //           <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
// //             {notifications.length}
// //           </span>
// //         )}
// //       </button>
// //       {showNotifications && (
// //         <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
// //           <div className="flex justify-between items-center mb-2">
// //             <h3 className="font-bold">Notifications</h3>
// //             <button onClick={clearAllNotifications} className="text-sm text-red-600">
// //               Clear All
// //             </button>
// //           </div>
// //           {notifications.length > 0 ? (
// //             notifications.map((note, index) => (
// //               <div key={index} className="border-b py-2 flex justify-between items-center">
// //                 <div>
// //                   {note.message} at {new Date(note.timestamp).toLocaleString()}
// //                 </div>
// //                 <button onClick={() => deleteNotification(index)} className="text-sm text-red-600 ml-2">
// //                   &times;
// //                 </button>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No notifications</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SellerNotifications;


'use client';

import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
interface Notification {
  message: string;
  timestamp: string;
}
const SellerNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
   
    const storedNotifications = localStorage.getItem('sellerNotifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
    const checkForNotifications = () => {
      const notification = localStorage.getItem('buyerNotification');
      if (notification) {
        const parsedNotification: Notification = JSON.parse(notification);
        setNotifications((prev) => {
          const updatedNotifications = [...prev, parsedNotification];
        
          localStorage.setItem('sellerNotifications', JSON.stringify(updatedNotifications));
          return updatedNotifications;
        });
        localStorage.removeItem('buyerNotification');
      }
    };
    const intervalId = setInterval(checkForNotifications, 5000);
    return () => clearInterval(intervalId);
  }, []);
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('sellerNotifications'); 
  };
  // const addNotification = (message: string) => {
  //   const newNotification: Notification = {
  //     message,
  //     timestamp: new Date().toISOString(),
  //   };
    
  //   setNotifications((prev) => {
  //     const updatedNotifications = [...prev, newNotification];
      
  //     localStorage.setItem('sellerNotifications', JSON.stringify(updatedNotifications));
  //     return updatedNotifications;
  //   });
  // };
  
  // const simulateNotification = () => {
  //   addNotification('A buyer is interested in your property!');
  // };
  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="flex items-center">
        <FaBell className="text-2xl" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
            {notifications.length}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Notifications</h3>
            <button onClick={clearNotifications} className="text-sm text-red-600">
              Clear All
            </button>
          </div>
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div key={index} className="border-b py-2">
                {note.message} at {new Date(note.timestamp).toLocaleString()}
              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}
        
        </div>
      )}
    </div>
  );
};
export default SellerNotifications;