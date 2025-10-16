import React from 'react';
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const SecurityPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Security" onBack={onBack}>
      <p>
        At Hafiz Mart, we take your security very seriously. We are committed to protecting your personal and payment information.
      </p>

      <h3><strong>Data Encryption</strong></h3>
      <p>
        All transactions on our website are protected with Secure Sockets Layer (SSL) encryption, the standard for secure online transactions. This means that your personal information, including your credit card number, name, and address, is encrypted so that it cannot be read as the information travels over the Internet.
      </p>

      <h3><strong>Payment Security</strong></h3>
      <p>
        We partner with trusted and secure payment gateways to process your payments. We do not store your full credit card information on our servers. When you enter your credit card information, it is sent directly to our payment processor and is never stored by us.
      </p>
      
       <h3><strong>Account Security</strong></h3>
      <p>
        We encourage you to use a strong, unique password for your Hafiz Mart account. A strong password includes a mix of letters, numbers, and symbols. Do not share your password with anyone. We will never ask you for your password in an email or over the phone.
      </p>
      
      <h3><strong>Phishing & Scams</strong></h3>
      <p>
        Be aware of "phishing" emails that may look like they are from Hafiz Mart but are actually attempts to steal your personal information. We will never ask you to confirm your password or payment details via email. If you receive a suspicious email, please do not click on any links and forward it to our support team immediately.
      </p>

      <p>
        Your trust is important to us. If you have any security concerns, please do not hesitate to contact us.
      </p>
    </InfoPageLayout>
  );
};

export default SecurityPage;
