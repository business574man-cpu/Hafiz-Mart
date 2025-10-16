import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceedToCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full text-gray-800 dark:text-gray-200">
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">My Cart</h2>
            <button onClick={onClose} className="text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">&times;</button>
          </header>

          {/* Items */}
          <main className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <span className="text-4xl mb-4">🛒</span>
                <p>Your cart is empty.</p>
                <p className="text-sm">Looks like you haven't added anything yet.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md border dark:border-gray-700" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-primary font-bold">PKR {item.price.toLocaleString('en-US')}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="border dark:border-gray-600 px-2 rounded-l">-</button>
                        <span className="border-t border-b dark:border-gray-600 px-4">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="border dark:border-gray-600 px-2 rounded-r">+</button>
                        <button onClick={() => onRemoveItem(item.id)} className="ml-auto text-xs text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </main>

          {/* Footer */}
          {items.length > 0 && (
            <footer className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-xl font-bold text-primary">PKR {subtotal.toLocaleString('en-US')}</span>
              </div>
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;