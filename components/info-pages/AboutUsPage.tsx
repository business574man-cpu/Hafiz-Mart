
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const AboutUsPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="About Us" onBack={onBack}>
      <p>
        Welcome to Hafiz Mart, your number one source for all things electronics, fashion, home goods, and more. We're dedicated to giving you the very best of online shopping, with a focus on dependability, customer service, and uniqueness.
      </p>
      <p>
        Founded in 2023 by Muhammad Hashir, Hafiz Mart has come a long way from its beginnings. When Hashir first started out, his passion for providing a top-tier e-commerce experience drove him to do intense research, and gave him the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over Pakistan, and are thrilled to be a part of the fair trade wing of the e-commerce industry.
      </p>
      <p>
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </p>
      <p>
        Sincerely,<br/>
        Muhammad Hashir, Founder & CEO
      </p>
    </InfoPageLayout>
  );
};

export default AboutUsPage;
