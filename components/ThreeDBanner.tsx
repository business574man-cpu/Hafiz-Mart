import React from 'react';
// Fix: Corrected module path by removing file extension.
import type { Category, ThreeDBannerSettings } from '../types';

interface ThreeDBannerProps {
    onCategoryClick: (category: Category) => void;
    category: Category;
    settings: ThreeDBannerSettings;
}

const ThreeDBanner: React.FC<ThreeDBannerProps> = ({ onCategoryClick, category, settings }) => {
    return (
        <div style={{ perspective: '1000px' }} className="group my-8">
            <div
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-cyan-500/20"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div 
                    className="absolute inset-0 opacity-10 dark:opacity-5"
                    // Fix: Replaced custom class and non-standard <style jsx> tag with inline styles.
                    style={{
                        transform: 'translateZ(-1px)',
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                ></div>

                <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 h-full min-h-[300px]">
                    {/* Text Content */}
                    <div className="text-white text-center md:text-left z-10 max-w-md">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400">{settings.headline}</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold mt-2 leading-tight" dangerouslySetInnerHTML={{ __html: settings.title.replace('<br />', '<br/>') }}>
                        </h3>
                        <p className="mt-4 text-gray-300">
                           {settings.description}
                        </p>
                        <button
                            onClick={() => onCategoryClick(category)}
                            className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105"
                        >
                            {settings.buttonText}
                        </button>
                    </div>

                    {/* Image */}
                    <div 
                        className="relative w-64 h-64 md:w-80 md:h-80 mt-8 md:mt-0"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <img
                            src={settings.imageUrl}
                            alt="Featured Product"
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                            style={{ transform: 'translateZ(60px) rotateY(-20deg)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreeDBanner;