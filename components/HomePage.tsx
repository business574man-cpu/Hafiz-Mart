
import React from 'react';
// Fix: Corrected module path by removing file extension.
import HeroCarousel from './HeroCarousel';
// Fix: Corrected module path by removing file extension.
import ProductGrid from './ProductGrid';
// Fix: Corrected module path by removing file extension.
import CategoryTabs from './CategoryTabs';
// Fix: Corrected module path by removing file extension.
import ThreeDBanner from './ThreeDBanner';

// Fix: Corrected module path.
import type { AppSettings, Category, Product } from '../types';

interface HomePageProps {
    appSettings: AppSettings;
    categories: Category[];
    paginatedProducts: Product[];
    selectedCategory: Category | null;
    productsCurrentPage: number;
    totalPages: number;
    onCategoryClick: (category: Category) => void;
    onProductClick: (product: Product) => void;
    onPageChange: (page: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({
    appSettings,
    categories,
    paginatedProducts,
    selectedCategory,
    productsCurrentPage,
    totalPages,
    onCategoryClick,
    onProductClick,
    onPageChange,
}) => {
    const { threeDBanner } = appSettings;
    const linkedCategory = categories.find(c => c.id === threeDBanner.linkCategoryId);
    
    return (
        <main className="space-y-4">
            <div className="mt-4 px-4 sm:px-0">
                <HeroCarousel images={appSettings.banners.images} />
            </div>
            
            <CategoryTabs categories={categories} onCategoryClick={onCategoryClick} />
            
             <div className="px-4 sm:px-0">
                {threeDBanner.isEnabled && linkedCategory && (
                    <ThreeDBanner 
                        onCategoryClick={onCategoryClick} 
                        category={linkedCategory}
                        settings={threeDBanner}
                    />
                )}
            </div>
            
            <div className="px-4 sm:px-0">
                <ProductGrid
                    title={selectedCategory ? selectedCategory.name : "Just For You"}
                    products={paginatedProducts}
                    onProductClick={onProductClick}
                    currentPage={productsCurrentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </main>
    );
};

export default HomePage;
