import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Category } from '../types';

interface CategoryShowcaseProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  title: string;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories, onCategoryClick, title }) => {
  return (
    <div className="py-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {categories.map((category) => (
          <button 
            key={category.id} 
            onClick={() => onCategoryClick(category)} 
            className="flex flex-col items-center group focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg"
          >
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              {category.image ? 
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" /> :
                <span className="text-3xl">{category.icon}</span>
              }
            </div>
            <span className="mt-2 text-xs text-center md:text-sm text-gray-700 group-hover:text-green-600">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;