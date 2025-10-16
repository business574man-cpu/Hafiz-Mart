import React, { useState } from 'react';
import type { Product, Order, User, AppSettings, Category, AdminDashboardProps, OrderStatus } from '../types';
import ProductForm from './ProductForm';
import AdminSettingsPage from './AdminSettingsPage';

type AdminPage = 'dashboard' | 'products' | 'orders' | 'users' | 'settings' | 'editProduct' | 'addProduct';


const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, users, onSaveProduct, onDeleteProduct, productDeleteSuccessMessage, currentUser, settings, categories, onSaveSettings, onUpdateUser, onUpdateOrderStatus }) => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);


  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('editProduct');
  };

  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('addProduct');
  };

  const handleDeleteWithConfirmation = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      onDeleteProduct(productId);
    }
  };
  
  const handleViewOrder = (order: Order) => {
      setSelectedOrder(order);
      setIsOrderModalOpen(true);
  }

  const orderStatuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

  const renderContent = () => {
    switch (currentPage) {
      case 'products':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Manage Products ({products.length})</h2>
              <button onClick={handleAddNewProduct} className="btn-primary">Add New Product</button>
            </div>
            {productDeleteSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{productDeleteSuccessMessage}</span>
                </div>
            )}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Cost</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b">
                      <td className="px-6 py-4 font-medium">{p.name}</td>
                      <td className="px-6 py-4">PKR {p.price}</td>
                      <td className="px-6 py-4">PKR {p.cost}</td>
                      <td className="px-6 py-4">{p.isActive ? 'Active' : 'Inactive'}</td>
                      <td className="px-6 py-4 flex items-center space-x-4">
                        <button onClick={() => handleEditProduct(p)} className="font-medium text-primary hover:underline">Edit</button>
                        <button onClick={() => handleDeleteWithConfirmation(p.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'orders':
        return (
            <div>
                 <h2 className="text-2xl font-bold mb-4">All Orders ({orders.length})</h2>
                 <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b">
                                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                                    <td className="px-6 py-4 font-medium">{order.address.customerName}</td>
                                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-semibold">PKR {order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                      <select 
                                        value={order.status}
                                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                        className={`w-full p-1.5 text-xs font-semibold rounded-md border-2 ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                                            order.status === 'Cancelled' || order.status === 'Returned' ? 'bg-red-100 text-red-800 border-red-200' :
                                            'bg-yellow-100 text-yellow-800 border-yellow-200'
                                        }`}
                                      >
                                          {orderStatuses.map(status => (
                                              <option key={status} value={status}>{status}</option>
                                          ))}
                                      </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleViewOrder(order)} className="font-medium text-primary hover:underline">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        );
      case 'editProduct':
      case 'addProduct':
        return <ProductForm product={selectedProduct} categories={categories} onSave={onSaveProduct} onCancel={() => setCurrentPage('products')} />;
      case 'settings':
        return <AdminSettingsPage user={currentUser} settings={settings} categories={categories} onSaveSettings={onSaveSettings} onUpdateUser={onUpdateUser} onBack={() => setCurrentPage('dashboard')} />;
      default:
        return (
            <div>
                 <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Products</h3>
                        <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-3xl font-bold">{orders.length}</p>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-3xl font-bold">{users.length}</p>
                    </div>
                 </div>
            </div>
        );
    }
  };

  const navItems: { page: AdminPage, label: string }[] = [
      { page: 'dashboard', label: 'Dashboard' },
      { page: 'products', label: 'Products' },
      { page: 'orders', label: 'Orders' },
      { page: 'users', label: 'Users' },
      { page: 'settings', label: 'Settings' },
  ];

  return (
    <>
    <div className="flex">
      <aside className="w-48 bg-gray-800 text-white min-h-screen p-4 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul>
            {navItems.map(item => (
                 <li key={item.page}><button onClick={() => setCurrentPage(item.page)} className={`w-full text-left p-2 rounded mb-2 ${currentPage === item.page ? 'bg-primary' : 'hover:bg-gray-700'}`}>{item.label}</button></li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {renderContent()}
      </main>
    </div>
    {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Order Details: {selectedOrder.id}</h2>
                    <button onClick={() => setIsOrderModalOpen(false)} className="text-2xl">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {/* Customer Details */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-2">Customer & Shipping</h3>
                        <p><strong>Name:</strong> {selectedOrder.address.customerName}</p>
                        <p><strong>Phone:</strong> {selectedOrder.address.phoneNumber}</p>
                        <p><strong>Address:</strong> {selectedOrder.address.fullAddress}, {selectedOrder.address.area}, {selectedOrder.address.city}</p>
                    </div>
                    {/* Items */}
                    <div>
                         <h3 className="font-semibold text-lg mb-2">Products</h3>
                         <div className="space-y-2">
                             {selectedOrder.items.map(item => (
                                <div key={item.id} className="flex items-center space-x-4 border p-2 rounded-md">
                                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">PKR {(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button onClick={() => setIsOrderModalOpen(false)} className="btn-secondary">Close</button>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default AdminDashboard;