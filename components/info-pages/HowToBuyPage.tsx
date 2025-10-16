
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const HowToBuyPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="How to Buy" onBack={onBack}>
      <h3>A Simple Step-by-Step Guide</h3>
      <ol>
        <li>
          <strong>Browse Products:</strong> Navigate through our categories or use the search bar to find the products you're looking for.
        </li>
        <li>
          <strong>View Product Details:</strong> Click on any product to see more details, images, and specifications.
        </li>
        <li>
          <strong>Add to Cart:</strong> Once you've found a product you like, click the "Add to Cart" button. You can add multiple items to your cart.
        </li>
        <li>
          <strong>Review Your Cart:</strong> Click on the cart icon at the top right corner of the page to review the items you've selected. You can adjust quantities or remove items here.
        </li>
        <li>
          <strong>Proceed to Checkout:</strong> When you're ready, click "Proceed to Checkout".
        </li>
        <li>
          <strong>Enter Shipping Details:</strong> Fill in your name, address, and contact number. Ensure all information is correct to avoid delivery delays.
        </li>
        <li>
          <strong>Choose Payment Method:</strong> Select your preferred payment method (Cash on Delivery or Easypaisa).
        </li>
        <li>
          <strong>Place Order:</strong> Review your order summary and click "Place Order" to complete your purchase. You will receive an order confirmation via email.
        </li>
      </ol>
      <p>Happy Shopping!</p>
    </InfoPageLayout>
  );
};

export default HowToBuyPage;
