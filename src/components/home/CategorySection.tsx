import React from 'react';
import AnimeLogo from '../../assets/anime.webp';
import WomenImg from '../../assets/women.webp';
import MenImg from '../../assets/gender-men-1766398718.png';

interface CategorySectionProps {
  onSelect: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onSelect }) => {
  return (
    <section className="relative min-h-[700px] md:min-h-[800px] pt-24 md:pt-32 pb-0 overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E48700] via-[#E48700] to-white" />
      
      {/* Small Sharp Diamond Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="diamondGridSmall" width="45" height="45" patternUnits="userSpaceOnUse" overflow="visible">
              <path d="M 45 0 L 0 45 M 0 0 L 45 45" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamondGridSmall)" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center z-10 box-border">
        {/* Heading - SMALLER */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-[1000] text-black tracking-tighter uppercase leading-none">
            SHOP FOR
          </h2>
        </div>
        
        {/* Category Cards - REFINED PRODUCT CARD UI */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-8 px-4">
          {/* Men Card */}
          <div 
            onClick={onSelect}
            className="relative w-full max-w-[200px] md:max-w-[240px] cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={MenImg} 
                alt="Men" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-x-0 bottom-4 px-4">
                 <button className="w-full bg-primary text-white py-3 font-black italic tracking-widest text-sm uppercase">
                    MEN
                 </button>
              </div>
            </div>
          </div>

          {/* Women Card */}
          <div 
            onClick={onSelect}
            className="relative w-full max-w-[200px] md:max-w-[240px] cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={WomenImg} 
                alt="Women" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-x-0 bottom-4 px-4">
                 <button className="w-full bg-primary text-white py-3 font-black italic tracking-widest text-sm uppercase">
                    WOMEN
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline Content - LIFTED */}
        <div className="relative z-20 pt-2 mb-16 px-4">
          <p className="text-2xl md:text-3xl font-[1000] text-black leading-[0.9] uppercase tracking-tighter">
             ALL EY<span className="text-white">ES</span> <br /> 
             ON YOU
          </p>
          <div className="mt-2">
             <p className="text-[7px] md:text-[8px] font-black text-black tracking-[0.3em] opacity-40 uppercase">Homegrown & Proud Since 2012</p>
          </div>
        </div>
      </div>

      {/* FULL WIDTH CHARACTER BANNER */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none translate-y-2 overflow-hidden">
         <img 
            src={AnimeLogo} 
            alt="Anime Collection Banner" 
            className="w-full h-auto object-contain block" 
         />
      </div>
    </section>
  );
};

export default CategorySection;
