import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Button from '../common/Button';
import HeroImage from '../../assets/Saly-2.png';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white mt-[80px]">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-bg-left/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="text-primary text-xs font-bold uppercase tracking-wider">New Collection 2024</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-black leading-[1.2]">
              Experience <br />
              <span className="text-primary">Elegance</span> in <br />
              Every Detail
            </h1>
            
            <p className="text-lg text-subtext max-w-lg leading-relaxed">
              Discover a new era of shopping with our handpicked selection of premium goods. Crafted for those who appreciate quality and style.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button className="group px-8 py-5 text-lg shadow-xl hover:shadow-primary/30 transition-all rounded-full min-w-[200px]">
                Explore Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button className="flex items-center gap-3 px-6 py-4 text-black font-semibold hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
                Watch Review
              </button>
            </div>

            {/* Customer Stats */}
            <div className="pt-8 flex items-center gap-10">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                  +1k
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-black font-mono tracking-tight">Trust by 12,000+ users</p>
                <div className="flex text-amber-400 gap-0.5 mt-0.5">
                   {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative animate-in fade-in zoom-in duration-1000 pl-4">
            <div className="relative z-10 w-full max-w-[550px] mx-auto group">
              {/* Main Image */}
              <img 
                src={HeroImage} 
                alt="Hero 3D Illustration" 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-4 transition-transform duration-1000 ease-in-out"
              />

            </div>
          </div>
        </div>

        {/* Brand Scroller */}
        <div className="mt-20 lg:mt-32 pt-10 border-t border-gray-50 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-center text-xs font-bold text-subtext uppercase tracking-widest mb-10">Revered by Industry Leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24 grayscale">
             <span className="text-xl font-black italic tracking-tighter">NIKE</span>
             <span className="text-xl font-bold">adidas</span>
             <span className="text-xl font-serif font-bold italic underline underline-offset-4">VOGUE</span>
             <span className="text-xl font-mono font-bold tracking-widest uppercase">Sony</span>
             <span className="text-xl font-bold tracking-tight">PUMA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
