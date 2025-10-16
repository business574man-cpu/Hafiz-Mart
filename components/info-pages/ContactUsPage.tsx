
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const ContactUsPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Contact Us" onBack={onBack}>
      <p>
        We're here to help! Whether you have a question about our products, an issue with your order, or just want to give some feedback, we'd love to hear from you.
      </p>

      <h3>Customer Service</h3>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:support@hafizmart.com">support@hafizmart.com</a> (We reply within 24 hours)</li>
        <li><strong>Phone / WhatsApp:</strong> +92-344-5718795 (Mon-Sat, 9am - 6pm)</li>
      </ul>

      <h3>Our Address</h3>
      <p>
        Hafiz Mart Headquarters<br/>
        Office 123, Business Avenue<br/>
        Karachi, Pakistan
      </p>

      <h3>Follow Us</h3>
      <p>
        Stay connected with us through our social media channels for the latest updates, promotions, and new arrivals!
        (Links are in the footer below)
      </p>
    </InfoPageLayout>
  );
};

export default ContactUsPage;
