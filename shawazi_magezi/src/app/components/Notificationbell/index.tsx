'use client';

import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Cookies from 'js-cookie';

interface Notification {
  message: string;
  timestamp: string;
}

const SellerNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    const userPhone = Cookies.get("userPhone");
    setPhoneNumber(userPhone || null);
  }, []);

  const fetchNotifications = async () => {
    if (!phoneNumber) {
      console.error('Phone number not available');
      return;
    }

    try {
      const response = await fetch(`/api/notifications/${phoneNumber}`);
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    if (phoneNumber) {
      fetchNotifications();

      const intervalId = setInterval(() => {
        fetchNotifications();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [phoneNumber]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  if (!phoneNumber) {
    return null;
  }

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