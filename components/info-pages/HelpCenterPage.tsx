
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const HelpCenterPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Help Center" onBack={onBack}>
      <h2>Frequently Asked Questions (FAQ)</h2>

      <h4><strong>1. How do I place an order?</strong></h4>
      <p>You can place an order by browsing our products, adding items to your cart, and clicking the "Proceed to Checkout" button. Follow the on-screen instructions to complete your purchase.</p>

      <h4><strong>2. What payment methods do you accept?</strong></h4>
      <p>We accept Cash on Delivery (COD) and advance payments through Easypaisa. More payment options will be added soon.</p>

      <h4><strong>3. How can I track my order?</strong></h4>
      <p>Once your order is shipped, you will receive an email with a tracking number and a link to the courier's website where you can track your package.</p>
      
      <h4><strong>4. What is your return policy?</strong></h4>
      <p>We offer a 7-day return policy for most items. Please visit our 'Returns & Refunds' page for detailed information.</p>

      <p>If you can't find the answer to your question here, please feel free to <a href="/contact">contact our customer support team</a>.</p>
    </InfoPageLayout>
  );
};

export default HelpCenterPage;
