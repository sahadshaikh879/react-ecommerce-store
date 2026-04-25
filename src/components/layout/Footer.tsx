import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-black text-white pt-24 pb-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">LOREM</h2>
            <p className="text-gray-500 text-xs leading-loose max-w-xs uppercase font-bold tracking-widest opacity-80">
              Homegrown & Proud Since 2012. Premium essentials for explorers of the modern world.
            </p>
            
            {/* SOCIAL ICONS - USING DIRECT SVGS TO PREVENT CRASH */}
            <div className="flex gap-6">
              <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">COLLECTION</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">New Arrivals</a></li>
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Men's Wardrobe</a></li>
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Women's Wardrobe</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">SUPPORT</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Shipping Policy</a></li>
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Track Order</a></li>
              <li><a href="#" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Sustainability</a></li>
            </ul>
          </div>

          {/* Join */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">NEWSLETTER</h3>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border-b border-white/20 py-3 text-[10px] font-bold tracking-widest focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[8px] font-black tracking-[0.4em] text-gray-700">
            © 2024 LOREM CLOTHING CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10 grayscale opacity-20 hover:opacity-50 transition-opacity">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2 w-auto" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 w-auto" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3 w-auto" alt="Paypal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
