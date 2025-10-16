import React, { useState } from 'react';
// Fix: Corrected module path by removing file extension.
import type { User, Order } from '../types';

interface CustomerProfilePageProps {
  user: User;
  orders: Order[];
}

const CustomerProfilePage: React.FC<CustomerProfilePageProps> = ({ user, orders }) => {
  const [copied, setCopied] = useState(false);

  const handleShareAppLink = async () => {
    const shareData = {
        title: 'Download Hafiz Mart!',
        text: `Join me on Hafiz Mart for a seamless shopping experience with a wide variety of products. Get the app here: ${window.location.origin}`,
        url: window.location.origin,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareData.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    } catch (err) {
        console.error('Error sharing:', err);
        // Fallback for browsers that might reject the promise for other reasons
        try {
            await navigator.clipboard.writeText(shareData.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (copyErr) {
             alert('Could not share or copy the link at this time.');
        }
    }
  };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg my-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        My Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold">Account Details</h2>
          <p className="text-gray-600 mt-2"><strong>Email:</strong> {user.email}</p>
          {/* Add more user details here if available */}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold">Order History</h2>
          {orders.length > 0 ? (
            <div className="mt-4 space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Total: PKR {order.total.toLocaleString()}</p>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>{order.status}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    {order.items.map(item => (
                        <p key={item.id} className="text-gray-600">{item.name} x {item.quantity}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-500">You haven't placed any orders yet.</p>
          )}
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold">Invite a Friend</h2>
        <p className="text-gray-600 mt-2 mb-4">
          Love shopping with us? Share Hafiz Mart with your friends and family!
        </p>
        <button onClick={handleShareAppLink} className={`btn-primary w-40 text-center transition-colors ${copied ? 'bg-green-600' : ''}`}>
          {copied ? 'Link Copied!' : 'Share Invite Link'}
        </button>
      </div>

    </div>
  );
};

export default CustomerProfilePage;