'use client'
interface Notification {
  message: string;
  timestamp: string;
}

import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
const SellerNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); 
  const [showNotifications, setShowNotifications] = useState(false);
  const checkForNotifications = () => {
      const notification = localStorage.getItem("buyerNotification");
      if (notification) {
          const parsedNotification: Notification = JSON.parse(notification);
          setNotifications((prev) => [...prev, parsedNotification]);
          localStorage.removeItem("buyerNotification"); 
      }
  };
  useEffect(() => {
      const intervalId = setInterval(checkForNotifications, 5000); 
      return () => clearInterval(intervalId); 
  }, []);
  const toggleNotifications = () => {
      setShowNotifications((prev) => !prev);
  };
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
                  <h3 className="font-bold">Notifications</h3>
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