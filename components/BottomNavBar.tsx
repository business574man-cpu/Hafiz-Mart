import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Page } from '../types';

interface BottomNavBarProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

const NavIcon: React.FC<{ icon: Page, isActive: boolean }> = ({ icon, isActive }) => {
    const color = isActive ? '#16a34a' : '#4b5563'; // green-600 or gray-600

    const icons: { [key in Page]?: React.ReactNode } = {
        home: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.164V21h4.5v-6a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v6h4.5v-8.836M21.75 12.164L12 2.414 2.25 12.164" />
                <path d="M9.5 15c.667.8 2.333.8 3 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        category: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75A2.25 2.25 0 0115.75 13.5h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
            </svg>
        ),
        explore: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
        ),
        orders: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.548 15.31A1.12 1.12 0 018.428 14.25h-2.857a1.12 1.12 0 01-1.12-1.125V6.375a1.12 1.12 0 011.12-1.125h11.428a1.12 1.12 0 011.12 1.125v9.75a1.12 1.12 0 01-1.12 1.125h-5.996a1.12 1.12 0 01-1.008-.69zM7.5 10.5h9M7.5 7.5h9" />
            </svg>
        ),
        profile: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        )
    };

    return icons[icon] || null;
}


const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavigate, currentPage }) => {
    const navItems = [
        { page: 'home', label: 'Home' },
        { page: 'category', label: 'Category' },
        { page: 'explore', label: 'Explore' },
        { page: 'orders', label: 'Orders' },
        { page: 'profile', label: 'Profile' },
    ] as const;
    
    const getIsActive = (page: Page) => {
        const activePagesMap: { [key in Page]?: Page[] } = {
            home: ['home'],
            category: ['category'],
            explore: ['explore'],
            orders: ['orders'],
            profile: ['profile', 'login', 'admin'],
        };

        // Find which group the current page belongs to
        const activeGroup = navItems.find(item => activePagesMap[item.page]?.includes(currentPage));

        // Check if the button's page matches the active group's page
        if (activeGroup) {
            return activeGroup.page === page;
        }

        // Default to home if no other group matches
        if (!Object.values(activePagesMap).flat().includes(currentPage) && page === 'home') {
            return true;
        }
        
        return false;
    }


    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-40">
            <div className="flex justify-around">
                {navItems.map(item => {
                    const isActive = getIsActive(item.page);
                    return (
                        <button
                            key={item.page}
                            onClick={() => onNavigate(item.page)}
                            className="flex flex-col items-center justify-center py-2 px-1 w-full text-center transition-colors duration-200"
                        >
                            <NavIcon icon={item.page} isActive={isActive} />
                            <span className={`text-xs font-medium ${
                                isActive 
                                    ? 'text-green-600 dark:text-green-400' 
                                    : 'text-gray-700 dark:text-gray-400'
                            }`}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default BottomNavBar;