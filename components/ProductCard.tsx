import React, { useMemo } from 'react';
// Fix: Corrected module path by removing file extension.
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292zM10 12.518L7.19 14.5l.54-3.22L5.4 9.1h3.28L10 6.096V12.518z"/></svg>}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  const { averageRating, reviewCount } = useMemo(() => {
    const count = product.reviews.length;
    if (count === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return { averageRating: totalRating / count, reviewCount: count };
  }, [product.reviews]);

  return (
    <div 
        onClick={() => onProductClick(product)} 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
        style={{ perspective: '1000px' }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ transform: 'translateZ(0)' }} // For perspective
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 h-10 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="mt-auto">
          <p className="text-lg font-bold text-primary">PKR {product.price.toLocaleString('en-US')}</p>
          {product.originalPrice && (
            <div className="flex items-center text-xs">
              <p className="text-gray-500 dark:text-gray-400 line-through">PKR {product.originalPrice.toLocaleString('en-US')}</p>
              <p className="ml-2 text-red-600 font-semibold">-{discount}%</p>
            </div>
          )}
          <div className="flex items-center mt-2 text-xs text-gray-600 dark:text-gray-300">
            {reviewCount > 0 ? (
                <>
                    <StarRating rating={averageRating} />
                    <span className="ml-2">({reviewCount})</span>
                </>
            ) : (
                <span className="text-gray-400 dark:text-gray-500">No reviews yet</span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.sellerLocation}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;