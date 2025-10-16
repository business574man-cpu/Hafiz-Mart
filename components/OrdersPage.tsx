import React, { useState, useMemo } from 'react';
// Fix: Corrected module path by removing file extension.
import type { Order, OrderStatus } from '../types';

interface OrdersPageProps {
  orders: Order[];
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const statusTextMap: Record<OrderStatus, string> = {
        Pending: 'Pending Confirmation',
        Processing: 'Currently Processing',
        Shipped: 'On its way',
        Delivered: 'Successfully Delivered',
        Cancelled: 'Order Cancelled',
        Returned: 'Order return hogaya',
    };

    const statusColorMap: Record<OrderStatus, string> = {
        Pending: 'bg-yellow-500',
        Processing: 'bg-blue-500',
        Shipped: 'bg-indigo-500',
        Delivered: 'bg-green-500',
        Cancelled: 'bg-red-500',
        Returned: 'bg-cyan-500',
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <header className="bg-blue-900 text-white p-3 flex justify-between items-center">
                <div>
                    <h3 className="font-bold">Order ID : {order.id} (1/1)</h3>
                    <p className="text-xs">Order Date : {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <button className="underline font-semibold text-sm">Track</button>
            </header>
            
            <div className="p-3 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Status</span>
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${statusColorMap[order.status]}`}>
                        {statusTextMap[order.status]}
                    </span>
                </div>
                
                <div className="flex">
                    <div className="w-4 mr-4 flex flex-col items-center">
                        <div className="w-3 h-3 bg-white border-2 border-gray-400 rounded-full mt-1"></div>
                        <div className="flex-grow w-px bg-gray-400"></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Supplier</p>
                            <p className="font-bold text-gray-800">{order.supplierName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Customer</p>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-800">{order.address.customerName}</p>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{order.address.fullAddress}</p>
                                </div>
                                <a href={`https://wa.me/${order.address.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.344l-.244 1.326z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {order.deliveryPartner && (
                    <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Delivery Partner</span>
                        <div className="flex items-center space-x-2">
                            <div className="bg-yellow-400 p-1 rounded-md">
                                <img src={order.deliveryPartner.logo} alt={order.deliveryPartner.name} className="h-5"/>
                            </div>
                            <span className="font-bold">{order.deliveryPartner.name}</span>
                        </div>
                    </div>
                )}

                {order.items.map(item => (
                    <div key={item.id} className="border-t pt-3 flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                            <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                            <div className="text-sm">
                                <p className="text-gray-500">Item ID : {item.id}</p>
                                <p className="font-bold text-gray-800">{item.name}</p>
                                {item.size && <p className="text-gray-600">Size: {item.size}</p>}
                                {item.profit && <p className="text-gray-600">Profit: {item.profit}</p>}
                            </div>
                        </div>
                        <span className="font-bold text-lg text-gray-700">x{item.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Fix: Define a new type for filter values that includes custom group names.
type FilterOption = OrderStatus | 'All' | 'In-progress' | 'Out for Delivery';

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  // Fix: Use the new FilterOption type for the active filter state.
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fix: Use the new FilterOption type for the filters array to allow custom values.
  const filters: (FilterOption)[] = ['All', 'In-progress', "Shipped", 'Out for Delivery', 'Delivered', 'Returned'];
  const filterMap: {[key: string]: OrderStatus[]} = {
      'In-progress': ['Pending', 'Processing'],
      'Shipped': ['Shipped'],
      'Out for Delivery': ['Shipped'], // Assuming this is a subset of shipped
      'Delivered': ['Delivered'],
      'Returned': ['Returned'],
  }


  const filteredOrders = useMemo(() => {
    let tempOrders = orders;
    if (activeFilter !== 'All') {
        const statuses = filterMap[activeFilter] || [activeFilter];
        tempOrders = tempOrders.filter(order => (statuses as OrderStatus[]).includes(order.status));
    }
    if (searchQuery) {
        tempOrders = tempOrders.filter(order => order.id.includes(searchQuery) || order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    return tempOrders;
  }, [orders, activeFilter, searchQuery]);


  return (
    <div className="p-2 md:p-4 bg-gray-50 min-h-screen">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
            {filters.map(filter => (
                <button 
                    key={filter} 
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full border whitespace-nowrap ${activeFilter === filter ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                    {filter}
                </button>
            ))}
        </div>

        <div className="relative my-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </span>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Returned"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>

        {filteredOrders.length > 0 ? (
            <div className="space-y-4">
                {filteredOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
        ) : (
             <div className="text-center py-10">
                <p className="text-gray-500">No orders found.</p>
            </div>
        )}
         <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default OrdersPage;