import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
// Fix: Corrected module path by removing file extension.
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import CustomerProfilePage from './components/CustomerProfilePage';
import CategoryPage from './components/CategoryPage';
import OrdersPage from './components/OrdersPage';

import AboutUsPage from './components/info-pages/AboutUsPage';
import CareersPage from './components/info-pages/CareersPage';
import ContactUsPage from './components/info-pages/ContactUsPage';
import HelpCenterPage from './components/info-pages/HelpCenterPage';
import HowToBuyPage from './components/info-pages/HowToBuyPage';
import PrivacyPolicyPage from './components/info-pages/PrivacyPolicyPage';
import ReturnsRefundsPage from './components/info-pages/ReturnsRefundsPage';
import SecurityPage from './components/info-pages/SecurityPage';
import TermsConditionsPage from './components/info-pages/TermsConditionsPage';

import type { Page, Product, Category, User, CartItem, Order, Notification, AppSettings, Theme, Review, OrderStatus } from './types';
import { PRODUCTS, CATEGORIES, MOCK_USERS, MOCK_ORDERS, INITIAL_APP_SETTINGS } from './constants';
import ShoppingAssistant from './components/ShoppingAssistant';
import BottomNavBar from './components/BottomNavBar';

const App: React.FC = () => {
    // State management
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
    const [categories] = useState<Category[]>(CATEGORIES);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [productsCurrentPage, setProductsCurrentPage] = useState(1);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, message: 'Welcome to Hafiz Mart! Enjoy your shopping experience.', timestamp: new Date(), read: false },
        { id: 2, message: 'Your order #5225699 has been delivered.', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), read: true },
    ]);
    const [appSettings, setAppSettings] = useState<AppSettings>(INITIAL_APP_SETTINGS);
    const [theme, setTheme] = useState<Theme>('light');
    const [productDeleteSuccessMessage, setProductDeleteSuccessMessage] = useState('');
    const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null);

    const PRODUCTS_PER_PAGE = 20;

    // Effects
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        let products = allProducts;
        if (searchQuery) {
            products = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(p.id).includes(searchQuery)
            );
        } else if (selectedCategory && selectedCategory.id !== 0) { // 0 is "All"
            products = products.filter(p => p.categoryId === selectedCategory.id);
        }
        setFilteredProducts(products);
        setProductsCurrentPage(1); // Reset to first page on filter change
    }, [searchQuery, selectedCategory, allProducts]);

    // Handlers
    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        if (page === 'home') {
            setSelectedCategory(null);
            setSearchQuery('');
        }
        if(page === 'cart') {
          setIsCartOpen(true);
        }
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        setPostLoginAction(null);
        handleNavigate('home');
    };
    
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setCurrentPage('productDetail');
    };

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        setSearchQuery('');
        handleNavigate('home');
    };
    
    const handleAddToCart = (product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };
    
    const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
        } else {
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        }
    };
    
    const handleRemoveFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleLogin = (email: string, password: string) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            if (postLoginAction) {
                postLoginAction();
                setPostLoginAction(null);
            } else {
                handleNavigate('home');
            }
        } else {
            throw new Error('Invalid email or password.');
        }
    };

    const handleSignup = (email: string, password: string) => {
        if (users.some(u => u.email === email)) {
            throw new Error('An account with this email already exists.');
        }
        const newUser: User = { id: email, email, password, role: 'customer', name: email.split('@')[0] };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        if (postLoginAction) {
            postLoginAction();
            setPostLoginAction(null);
        } else {
            handleNavigate('home');
        }
    };

    const handleProceedToCheckout = () => {
        setIsCartOpen(false);
        if (currentUser) {
            setCurrentPage('checkout');
        } else {
            setPostLoginAction(() => () => setCurrentPage('checkout'));
            handleNavigate('login');
        }
    };

    const handlePlaceOrder = (order: Omit<Order, 'id' | 'date' | 'userId'>) => {
        const newOrder: Order = {
            ...order,
            id: Math.random().toString(36).substr(2, 7).toUpperCase(),
            date: new Date(),
            userId: currentUser?.id || 'guest',
        };
        setOrders(prev => [newOrder, ...prev]);
        setCurrentOrder(newOrder);
        setCart([]);
        setCurrentPage('confirmation');
    };

    const handleMarkAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };
    
    const handleSaveProduct = (product: Product) => {
        setAllProducts(prev => {
            if (product.id === 0) { // New product
                return [...prev, { ...product, id: Date.now() }];
            }
            return prev.map(p => p.id === product.id ? product : p);
        });
        setCurrentPage('admin');
    };
    
    const handleDeleteProduct = (productId: number) => {
        setAllProducts(prev => prev.filter(p => p.id !== productId));
        setProductDeleteSuccessMessage('Product deleted successfully!');
        setTimeout(() => setProductDeleteSuccessMessage(''), 3000); // Clear message after 3 seconds
    };

    const handleSaveSettings = (settings: AppSettings) => {
        setAppSettings(settings);
        alert("Settings saved!");
    };
    
    const handleUpdateUser = (user: User) => {
        setUsers(users.map(u => u.id === user.id ? user : u));
        if (currentUser?.id === user.id) {
            setCurrentUser(user);
        }
        alert("User updated!");
    };
    
    const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => {
                if (order.id === orderId) {
                    // Send a notification to the customer
                    const customerNotification: Notification = {
                        id: Date.now(),
                        message: `Your order #${orderId} has been updated to: ${newStatus}.`,
                        timestamp: new Date(),
                        read: false,
                    };
                    setNotifications(prev => [customerNotification, ...prev]);
                    return { ...order, status: newStatus };
                }
                return order;
            })
        );
    };
    
    const handleAddReview = (productId: number, review: { rating: number; comment: string }) => {
        const newReview: Review = {
            id: `${productId}-${Date.now()}`,
            author: currentUser?.name || 'Anonymous',
            rating: review.rating,
            comment: review.comment,
            date: new Date().toISOString()
        };
        const updatedProducts = allProducts.map(p => {
            if (p.id === productId) {
                return { ...p, reviews: [newReview, ...p.reviews] };
            }
            return p;
        });
        setAllProducts(updatedProducts);
        if (selectedProduct?.id === productId) {
            setSelectedProduct(prev => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : null);
        }
    };


    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (productsCurrentPage - 1) * PRODUCTS_PER_PAGE,
        productsCurrentPage * PRODUCTS_PER_PAGE
    );

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage 
                    appSettings={appSettings}
                    categories={categories} 
                    paginatedProducts={paginatedProducts} 
                    selectedCategory={selectedCategory} 
                    productsCurrentPage={productsCurrentPage} 
                    totalPages={totalPages} 
                    onCategoryClick={handleCategoryClick} 
                    onProductClick={handleProductClick} 
                    onPageChange={setProductsCurrentPage} 
                />;
            case 'productDetail':
                return selectedProduct && <ProductPage 
                    product={selectedProduct} 
                    onAddToCart={handleAddToCart}
                    onBuyNow={(product, quantity) => {
                      handleAddToCart(product, quantity);
                      handleProceedToCheckout();
                    }}
                    onBack={() => {
                        setCurrentPage('home');
                        setSelectedProduct(null);
                    }}
                    onAddReview={handleAddReview}
                    currentUser={currentUser}
                />;
            case 'checkout':
                return <CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} onBack={() => setIsCartOpen(true)} settings={appSettings.payment} />;
            case 'confirmation':
                return currentOrder && <OrderConfirmationPage order={currentOrder} onContinueShopping={() => handleNavigate('home')} />;
            case 'login':
                return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
            case 'admin':
                return currentUser?.role === 'admin' ? <AdminDashboard 
                    products={allProducts} 
                    orders={orders} 
                    users={users}
                    onSaveProduct={handleSaveProduct}
                    onDeleteProduct={handleDeleteProduct}
                    productDeleteSuccessMessage={productDeleteSuccessMessage}
                    currentUser={currentUser}
                    settings={appSettings}
                    categories={categories}
                    onSaveSettings={handleSaveSettings}
                    onUpdateUser={handleUpdateUser}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                /> : <p>Access Denied</p>;
            case 'profile':
                 return currentUser ? <CustomerProfilePage user={currentUser} orders={orders.filter(o => o.userId === currentUser.id)} /> : <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
            case 'category':
                return <CategoryPage categories={categories} onCategoryClick={(cat) => {setSelectedCategory(cat); handleNavigate('home');}}/>;
            case 'orders':
                return <OrdersPage orders={orders.filter(o => currentUser && o.userId === currentUser.id)} />;
            case 'about':
                return <AboutUsPage onBack={() => handleNavigate('home')} />;
            case 'careers':
                return <CareersPage onBack={() => handleNavigate('home')} />;
            case 'contact':
                return <ContactUsPage onBack={() => handleNavigate('home')} />;
            case 'help':
                return <HelpCenterPage onBack={() => handleNavigate('home')} />;
            case 'how-to-buy':
                return <HowToBuyPage onBack={() => handleNavigate('home')} />;
            case 'privacy':
                return <PrivacyPolicyPage onBack={() => handleNavigate('home')} />;
            case 'returns':
                return <ReturnsRefundsPage onBack={() => handleNavigate('home')} />;
            case 'security':
                return <SecurityPage onBack={() => handleNavigate('home')} />;
            case 'terms':
                return <TermsConditionsPage onBack={() => handleNavigate('home')} />;
            default:
                return <HomePage 
                    appSettings={appSettings}
                    categories={categories} 
                    paginatedProducts={paginatedProducts} 
                    selectedCategory={selectedCategory} 
                    productsCurrentPage={productsCurrentPage} 
                    totalPages={totalPages} 
                    onCategoryClick={handleCategoryClick} 
                    onProductClick={handleProductClick} 
                    onPageChange={setProductsCurrentPage} 
                />;
        }
    };

    return (
        <div className={`flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
            <Header
                onNavigate={handleNavigate}
                onCategorySelect={handleCategoryClick}
                onSearch={setSearchQuery}
                cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                categories={categories}
                allProducts={allProducts}
                user={currentUser}
                onLogout={handleLogout}
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                theme={theme}
                toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <main className="flex-grow max-w-7xl mx-auto w-full pb-20 md:pb-0">
                {renderPage()}
            </main>
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onProceedToCheckout={handleProceedToCheckout}
            />
            <Footer onNavigate={handleNavigate} />
            <ShoppingAssistant />
            <BottomNavBar onNavigate={handleNavigate} currentPage={currentPage} />
        </div>
    );
};

export default App;