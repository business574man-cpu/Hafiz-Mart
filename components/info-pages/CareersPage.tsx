
import React from 'react';
// Fix: Corrected module path by removing file extension.
import InfoPageLayout from './InfoPageLayout';

interface PageProps {
  onBack: () => void;
}

const CareersPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <InfoPageLayout title="Careers at Hafiz Mart" onBack={onBack}>
      <h2>Join Our Team!</h2>
      <p>
        At Hafiz Mart, we are always looking for passionate, talented, and innovative individuals to join our growing team. We believe that our employees are our greatest asset, and we are committed to creating a dynamic and supportive work environment where you can thrive.
      </p>
      
      <h3>Why Work With Us?</h3>
      <ul>
        <li><strong>Innovative Environment:</strong> Be at the forefront of the e-commerce industry in Pakistan.</li>
        <li><strong>Growth Opportunities:</strong> We invest in our employees' professional development and career growth.</li>
        <li><strong>Great Culture:</strong> Join a collaborative and diverse team that values creativity and hard work.</li>
      </ul>

      <h3>Current Openings</h3>
      <p>
        We do not have any open positions at the moment, but we are always interested in hearing from talented professionals. Please feel free to send your resume and a cover letter to <a href="mailto:careers@hafizmart.com">careers@hafizmart.com</a>, and we will keep it on file for future opportunities.
      </p>
    </InfoPageLayout>
  );
};

export default CareersPage;
