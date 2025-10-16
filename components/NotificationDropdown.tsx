import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Notification } from '../types';

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

// Function to calculate relative time
const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};


const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const unreadNotifications = notifications.filter(n => !n.read);
    const readNotifications = notifications.filter(n => n.read);
    
    return (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Notifications</h3>
                {unreadNotifications.length > 0 && (
                    <button onClick={onMarkAllAsRead} className="text-sm text-primary hover:underline">Mark all as read</button>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No notifications yet.</p>
                ) : (
                    <>
                        {unreadNotifications.length > 0 && <h4 className="px-4 pt-3 pb-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Unread</h4>}
                        {unreadNotifications.map(n => (
                            <div key={n.id} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-primary">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                                    <p className="text-xs text-blue-500 mt-1">{timeSince(n.timestamp)}</p>
                                </div>
                                <button onClick={() => onMarkAsRead(n.id)} title="Mark as read" className="w-2.5 h-2.5 bg-primary rounded-full ml-4 mt-1 flex-shrink-0 hover:bg-blue-700"></button>
                            </div>
                        ))}
                        {readNotifications.length > 0 && <h4 className="px-4 pt-3 pb-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Read</h4>}
                         {readNotifications.map(n => (
                            <div key={n.id} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{n.message}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{timeSince(n.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;