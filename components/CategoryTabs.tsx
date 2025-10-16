import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, onCategoryClick }) => {
    const mainCategories = [{id: 0, name: "All", icon: <span>🏠</span>}, ...categories];
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 overflow-x-auto py-2 no-scrollbar">
                {mainCategories.map((category) => (
                    <button 
                        key={category.id} 
                        onClick={() => onCategoryClick(category)} 
                        className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default CategoryTabs;