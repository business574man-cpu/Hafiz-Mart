
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const TermsConditionsPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Terms & Conditions" onBack={onBack}>
      <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Hafiz Mart website (the "Service") operated by Hafiz Mart ("us", "we", or "our").</p>
      
      <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>

      <h4><strong>Accounts</strong></h4>
      <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

      <h4><strong>Intellectual Property</strong></h4>
      <p>The Service and its original content, features and functionality are and will remain the exclusive property of Hafiz Mart and its licensors. The Service is protected by copyright, trademark, and other laws of both Pakistan and foreign countries.</p>

      <h4><strong>Links To Other Web Sites</strong></h4>
      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Hafiz Mart. Hafiz Mart has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>
      
      <h4><strong>Governing Law</strong></h4>
      <p>These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.</p>
      
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
    </InfoPageLayout>
  );
};

export default TermsConditionsPage;
