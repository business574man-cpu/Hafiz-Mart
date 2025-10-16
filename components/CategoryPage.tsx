
import React, { useState } from 'react';
// Fix: Corrected module path by removing file extension.
import { CATEGORIES, SUB_CATEGORIES } from '../constants';
// Fix: Corrected module path.
import type { Category } from '../types';

interface CategoryPageProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categories, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const subCategories = SUB_CATEGORIES[selectedCategory.id] || [];

  return (
    <div className="flex h-[calc(100vh-180px)] md:h-[calc(100vh-128px)] bg-white">
      {/* Left Sidebar */}
      <nav className="w-1/4 md:w-1/5 bg-gray-100 overflow-y-auto">
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left p-3 text-sm flex flex-col items-center justify-center text-center transition-colors duration-200 ${
                  selectedCategory.id === cat.id
                    ? 'bg-white text-green-600 font-bold border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-4">{selectedCategory.name}</h1>
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {subCategories.map((subCat) => (
              <button 
                key={subCat.id}
                onClick={() => onCategoryClick(selectedCategory)} // Navigate to product list for now
                className="flex flex-col items-center text-center group"
              >
                <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center p-1">
                  <img src={subCat.image} alt={subCat.name} className="max-w-full max-h-full object-contain" />
                </div>
                <span className="mt-2 text-xs text-gray-700 group-hover:text-green-600">{subCat.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No sub-categories found for {selectedCategory.name}.</p>
            <button onClick={() => onCategoryClick(selectedCategory)} className="mt-4 text-primary font-semibold">
              View all products in {selectedCategory.name}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
