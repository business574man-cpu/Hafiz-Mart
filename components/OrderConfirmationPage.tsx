// Fix: Implemented the OrderConfirmationPage component.
import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Order } from '../types';

interface OrderConfirmationPageProps {
  order: Order;
  onContinueShopping: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onContinueShopping }) => {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center animate-fade-in">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800">Thank You For Your Order!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        <p className="text-gray-600">Your order ID is: <strong className="text-primary">{order.id}</strong></p>
        
        <div className="text-left bg-gray-50 p-6 rounded-md my-8 border">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2">
                {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="border-t my-4"></div>
            <div className="space-y-2 font-semibold">
                <div className="flex justify-between"><span>Subtotal</span><span>PKR {(order.total - order.shipping).toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>PKR {order.shipping.toLocaleString()}</span></div>
                <div className="flex justify-between text-lg"><span>Total</span><span>PKR {order.total.toLocaleString()}</span></div>
            </div>
        </div>
        
        <div className="text-left">
            <h3 className="font-bold">Shipping to:</h3>
            <p>{order.address.customerName}</p>
            <p>{order.address.fullAddress}, {order.address.area}, {order.address.city}</p>
            <p>{order.address.phoneNumber}</p>
        </div>
        
        <button
          onClick={onContinueShopping}
          className="mt-10 w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;