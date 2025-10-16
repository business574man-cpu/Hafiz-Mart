import React, { useState } from 'react';
import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
        title: 'Hafiz Mart',
        text: `Check out Hafiz Mart for amazing products! Join me for a great shopping experience. ${window.location.origin}`,
        url: window.location.origin,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareData.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    } catch (err) {
        console.error('Error sharing:', err);
        try {
            await navigator.clipboard.writeText(shareData.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (copyErr) {
            alert('Sharing is not supported on your browser.');
        }
    }
  };

  const infoLinks: { page: Page, text: string }[] = [
    { page: 'about', text: 'About Us' },
    { page: 'contact', text: 'Contact Us' },
    { page: 'careers', text: 'Careers' },
    { page: 'help', text: 'Help Center' },
    { page: 'how-to-buy', text: 'How to Buy' },
  ];

  const policyLinks: { page: Page, text: string }[] = [
    { page: 'returns', text: 'Returns & Refunds' },
    { page: 'terms', text: 'Terms & Conditions' },
    { page: 'privacy', text: 'Privacy Policy' },
    { page: 'security', text: 'Security' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 mt-8 hidden md:block">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Information</h3>
            <ul className="space-y-2">
              {infoLinks.map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-base text-gray-300 hover:text-white">{link.text}</button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Invite a Friend</h3>
            <ul className="space-y-2">
                <li>
                    <button onClick={handleShare} className="text-base text-gray-300 hover:text-white">
                      {copied ? 'Link Copied!' : 'Share with Friends'}
                    </button>
                </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Policies</h3>
            <ul className="space-y-2">
              {policyLinks.map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-base text-gray-300 hover:text-white">{link.text}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe to our newsletter</h3>
             <p className="text-base text-gray-300">The latest news, articles, and resources, sent to your inbox weekly.</p>
             <form className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Enter your email" />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button type="submit" className="w-full bg-primary border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Subscribe
                    </button>
                </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Hafiz Mart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;