
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const ReturnsRefundsPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Returns & Refunds" onBack={onBack}>
      <p>We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we're here to help.</p>
      
      <h3>7-Day Return Policy</h3>
      <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>

      <h3>How to Initiate a Return</h3>
      <ol>
        <li>Contact our customer support team via email at <a href="mailto:support@hafizmart.com">support@hafizmart.com</a> or call us at +92-344-5718795 with your order ID and reason for return.</li>
        <li>Our team will guide you through the return process.</li>
        <li>Once we receive your item, we will inspect it and notify you that we have received your returned item.</li>
      </ol>

      <h3>Refunds</h3>
      <p>If your return is approved, we will initiate a refund to your original method of payment (or provide store credit). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>

      <h3>Non-Returnable Items</h3>
      <p>Certain items are not eligible for return, such as perishable goods, custom products, and personal care items. Please check the product description for more details.</p>
    </InfoPageLayout>
  );
};

export default ReturnsRefundsPage;
