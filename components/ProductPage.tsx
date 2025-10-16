// Fix: Implemented the ProductPage component.
import React, { useState, useMemo } from 'react';
// Fix: Corrected module path by removing file extension.
import type { Product, Review, User } from '../types';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onBack: () => void;
  onAddReview: (productId: number, review: { rating: number; comment: string }) => void;
  currentUser: User | null;
}

const Star: React.FC<{ filled: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }> = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg key={`star-${i}`} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
      </div>
    );
};

const ReviewForm: React.FC<{ onSubmit: (review: { rating: number; comment: string }) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (rating === 0) {
        alert('Please select a star rating.');
        return;
      }
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    };
  
    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="font-bold text-lg mb-2">Write a Review</h3>
            <div className="flex items-center mb-4">
                <span className="mr-2">Your Rating:</span>
                <div className="flex" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                            key={star}
                            filled={hoverRating >= star || rating >= star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                        />
                    ))}
                </div>
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about the product..."
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                rows={4}
                required
            />
            <button type="submit" className="mt-4 py-2 px-6 bg-secondary text-white rounded-lg font-bold hover:bg-teal-600 transition-colors">
                Submit Review
            </button>
        </form>
    );
};

const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart, onBuyNow, onBack, onAddReview, currentUser }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  
  const discountAmount = 50; // Example, could be dynamic from settings

  const { averageRating, reviewCount } = useMemo(() => {
    const count = product.reviews.length;
    if (count === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return { averageRating: totalRating / count, reviewCount: count };
  }, [product.reviews]);

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 my-4 animate-fade-in text-gray-800 dark:text-gray-200">
       <button onClick={onBack} className="text-sm font-semibold text-secondary hover:underline mb-4 px-4 sm:px-0">
        &larr; Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <img src={selectedImage} alt={product.name} className="w-full h-auto aspect-square object-cover rounded-lg shadow-md" />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/30 backdrop-blur-sm p-1 rounded-full">
                {product.images.map((img, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${selectedImage === img ? 'bg-white' : 'bg-white/50'}`}
                />
                ))}
            </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{product.name}</h1>
          
          <div className="flex items-center my-2">
            <StarRating rating={averageRating} />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({reviewCount} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">Rs. {product.price.toLocaleString()}</p>
          
          {product.originalPrice && (
            <div className="flex items-center text-md">
              <p className="text-gray-500 dark:text-gray-400 line-through">PKR {product.originalPrice.toLocaleString('en-US')}</p>
              <p className="ml-2 text-red-600 font-semibold">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</p>
            </div>
          )}

          <div className="my-4 p-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-md text-sm text-yellow-800 dark:text-yellow-200 font-semibold flex items-center">
            <span>💳</span>
            <span className="ml-2">Save extra Rs. {discountAmount} on advance payment</span>
            <span className="ml-auto font-bold">&gt;&gt;&gt;</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">{product.description}</p>
        </div>
      </div>
      
      {/* Product Video */}
      {product.videoUrl && (
        <div className="p-4 mt-8">
            <h2 className="text-xl font-bold border-b dark:border-gray-700 pb-2 mb-4">Product Video</h2>
            <div className="aspect-video w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
                <video
                    src={product.videoUrl}
                    controls
                    className="w-full h-full"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="p-4 mt-8">
        <h2 className="text-xl font-bold border-b dark:border-gray-700 pb-2">Customer Reviews</h2>
        {currentUser ? (
            <ReviewForm onSubmit={(reviewData) => onAddReview(product.id, reviewData)} />
        ) : (
            <p className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">Please <a href="#" onClick={(e) => { e.preventDefault(); /* Ideally navigate to login */ alert('Redirecting to login...'); }} className="font-bold text-primary underline">log in</a> to write a review.</p>
        )}

        <div className="mt-6 space-y-6">
            {product.reviews.length > 0 ? (
                product.reviews.map(review => (
                    <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                        <div className="flex items-center mb-1">
                            <StarRating rating={review.rating} />
                            <p className="ml-4 font-bold">{review.author}</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-4">No reviews yet. Be the first to write one!</p>
            )}
        </div>
      </div>
      
       {/* Action Buttons - Sticky Footer */}
       <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t-2 border-gray-100 dark:border-gray-700 flex gap-4">
            <button
              onClick={handleAddToCartClick}
              disabled={isAdded}
              className={`flex-1 py-3 px-6 border-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${isAdded ? 'bg-green-500 border-green-500 text-white' : 'bg-white text-secondary border-secondary hover:bg-teal-50 dark:bg-gray-800 dark:text-secondary dark:border-secondary dark:hover:bg-gray-700'}`}
            >
              {isAdded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Added!
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <button
              onClick={() => onBuyNow(product, quantity)}
              className="flex-1 py-3 px-6 bg-secondary text-white rounded-lg font-bold hover:bg-teal-600 transition-colors"
            >
              Buy Now
            </button>
        </div>
    </div>
  );
};

export default ProductPage;