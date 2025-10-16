
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Privacy Policy" onBack={onBack}>
      <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Hafiz Mart.</p>

      <h4><strong>Personal Information We Collect</strong></h4>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
      <p>When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>

      <h4><strong>How Do We Use Your Personal Information?</strong></h4>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

      <h4><strong>Your Rights</strong></h4>
      <p>You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
      
      <h4><strong>Changes</strong></h4>
      <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
    </InfoPageLayout>
  );
};

export default PrivacyPolicyPage;
