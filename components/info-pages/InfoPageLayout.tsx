import React from 'react';

interface InfoPageLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ title, onBack, children }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-4 animate-fade-in">
      <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline mb-6">
        &larr; Back to Home
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b pb-4">
        {title}
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default InfoPageLayout;