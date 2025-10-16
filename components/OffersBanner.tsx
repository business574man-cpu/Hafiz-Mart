import React from 'react';

const OffersBanner: React.FC = () => {
  return (
    <button className="w-full bg-white border-2 border-green-400 text-green-700 p-3 rounded-lg flex items-center justify-between hover:bg-green-50 transition-colors">
      <div className="flex items-center">
        <span className="text-2xl mr-3">🎁</span>
        <p className="font-bold">3 offers are available for you!</p>
      </div>
      <span className="font-bold text-xl">&gt;</span>
    </button>
  );
};

export default OffersBanner;
