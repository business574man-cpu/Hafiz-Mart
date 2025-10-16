
import React from 'react';
// Fix: Corrected module path by removing file extension.
import ProductCard from './ProductCard';
// Fix: Corrected module path by removing file extension.
import Pagination from './Pagination';
// Fix: Corrected module path.
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  title: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, title, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {products.length > 0 ? (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
