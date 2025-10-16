
import React, { useState, useRef, useEffect } from 'react';
// Fix: Corrected module path.
import type { Page, Category, User, Notification, Product, Theme } from '../types';
// Fix: Corrected module path by removing file extension.
import ImageSearchModal from './ImageSearchModal';
// Fix: Corrected module path by removing file extension.
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  onCategorySelect: (category: Category) => void;
  onSearch: (query: string) => void;
  cartItemCount: number;
  categories: Category[];
  allProducts: Product[];
  user: User | null;
  onLogout: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, user, onLogout, notifications, onMarkAsRead, onMarkAllAsRead, categories, allProducts, onSearch, theme, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const prevCartCountRef = useRef(cartItemCount);

  const hasUnread = notifications.some(n => !n.read);
  
  // Animate cart icon on item add
  useEffect(() => {
    if (cartItemCount > prevCartCountRef.current) {
        setIsCartAnimating(true);
        const timer = setTimeout(() => setIsCartAnimating(false), 500); // Animation duration
        return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItemCount;
  }, [cartItemCount]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
        const lowerCaseQuery = query.toLowerCase();
        const productSuggestions = allProducts
            .filter(p => p.name.toLowerCase().includes(lowerCaseQuery))
            .map(p => p.name)
            .slice(0, 5);

        const categorySuggestions = categories
            .filter(c => c.name.toLowerCase().includes(lowerCaseQuery))
            .map(c => c.name)
            .slice(0, 3);

        const combined = [...new Set([...categorySuggestions, ...productSuggestions])].slice(0, 8);
        setSuggestions(combined);
        setIsSuggestionsOpen(combined.length > 0);
    } else {
        setSuggestions([]);
        setIsSuggestionsOpen(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setIsSuggestionsOpen(false);
  };


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearch(searchQuery);
    setIsSuggestionsOpen(false);
  };

  const handleImageSearch = (file: File) => {
    console.log("Searching for image:", file.name);
    alert(`Searching for products similar to ${file.name}.\n(This is a placeholder feature.)`);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar: Logo & Icons */}
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
                <svg className="h-8 w-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#4ADE80" />
                            <stop offset="100%" stopColor="#15803D" />
                        </linearGradient>
                    </defs>
                    <path 
                        fill="url(#logo-gradient)" 
                        d="M25,180 L25,50 Q25,20 50,20 L70,20 Q85,20 100,40 Q115,20 130,20 L150,20 Q175,20 175,50 L175,180 L145,180 L145,70 Q145,50 135,50 Q125,50 115,70 L115,180 L85,180 L85,70 Q85,50 75,50 Q65,50 55,70 L55,180 Z" 
                    />
                </svg>
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 hidden sm:block">Hafiz Mart</span>
              </button>
            </div>

            {/* Desktop Search Bar */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
              <form onSubmit={handleSearchSubmit} className="w-full flex">
                <div className="w-full flex relative items-center">
                  <span className="absolute left-4 text-gray-400">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => suggestions.length > 0 && setIsSuggestionsOpen(true)}
                    placeholder="Product Name/ Code/ Supplier"
                    className="w-full pl-12 pr-36 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 h-full flex items-center">
                    <button
                        type="button"
                        onClick={() => setIsImageSearchOpen(true)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-500"
                        aria-label="Search by image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button type="submit" className="bg-green-500 text-white h-[80%] px-6 rounded-md hover:bg-green-600 ml-1">
                        Search
                    </button>
                  </div>
                </div>
              </form>
               {isSuggestionsOpen && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-20 max-h-80 overflow-y-auto">
                        {suggestions.map((s, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(s)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm">
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* Icons and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-green-500">
                {theme === 'light' ? 
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : 
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                }
              </button>
              {user && (
                <div className="relative" ref={notificationRef}>
                  <button onClick={() => setIsNotificationsOpen(p => !p)} className="text-gray-600 dark:text-gray-300 hover:text-green-500 relative">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                      {hasUnread && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>}
                  </button>
                  {isNotificationsOpen && <NotificationDropdown notifications={notifications} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} onClose={() => setIsNotificationsOpen(false)} />}
                </div>
              )}
              <button onClick={() => onNavigate('cart')} className="relative text-gray-600 dark:text-gray-300 hover:text-green-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                {cartItemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${isCartAnimating ? 'animate-bounce-short' : ''}`}>
                    {cartItemCount}
                  </span>
                )}
              </button>
              <div className="border-l border-gray-200 dark:border-gray-600 pl-2 sm:pl-4">
                {user ? (
                    <div className="relative">
                        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 200)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-500">
                             <img src={user.profilePicUrl || 'https://i.pravatar.cc/40?u=generic'} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                        </button>
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
                                    <p className="font-semibold truncate">{user.name || user.email}</p>
                                </div>
                                <button onClick={() => { onNavigate('profile'); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</button>
                                {user.role === 'admin' && <button onClick={() => { onNavigate('admin'); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Admin Dashboard</button>}
                                <button onClick={() => { onLogout(); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => onNavigate('login')} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-green-500 whitespace-nowrap">
                        Login / Sign Up
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div ref={searchRef} className="md:hidden pb-4 relative">
             <form onSubmit={handleSearchSubmit} className="w-full flex">
                <div className="w-full flex relative items-center">
                  <span className="absolute left-4 text-gray-400">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => suggestions.length > 0 && setIsSuggestionsOpen(true)}
                    placeholder="Product Name/ Code/ Supplier"
                    className="w-full pl-12 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 h-full flex items-center">
                    <button
                        type="button"
                        onClick={() => setIsImageSearchOpen(true)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-500"
                        aria-label="Search by image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              {isSuggestionsOpen && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                    {suggestions.map((s, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(s)} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm">
                            {s}
                        </li>
                    ))}
                </ul>
               )}
          </div>
        </div>
      </header>
      
      <ImageSearchModal 
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSearch={handleImageSearch}
      />
    </>
  );
};

export default Header;
