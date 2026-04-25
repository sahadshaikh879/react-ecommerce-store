import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Search as SearchIcon, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../store/store';
import { logout } from '../../store/authSlice';
import { setSearchQuery } from '../../store/productSlice';

interface NavbarProps {
  forceTransparent?: boolean;
  onShopClick?: () => void;
  onCategoriesClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  forceTransparent = false, 
  onShopClick, 
  onCategoriesClick 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Defensively access state
  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const searchQuery = useSelector((state: RootState) => state.products?.searchQuery || '');
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth || { user: null, isAuthenticated: false });
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop-grid' },
    { name: 'Categories', href: '#categories' },
    { name: 'About', href: '#about' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled && !forceTransparent
        ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
        : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black text-black tracking-tighter italic select-none">
              LOREM
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.name === 'Shop') {
                      onShopClick?.();
                      setTimeout(() => {
                        document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else if (link.name === 'Categories' || link.name === 'Home') {
                      onCategoriesClick?.();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-sm font-bold transition-colors relative group ${
                    forceTransparent ? 'text-black hover:text-white' : 'text-black hover:text-primary'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    forceTransparent ? 'bg-white' : 'bg-primary'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          {/* Icons Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-subtext group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="bg-gray-100/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white w-40 lg:w-60 transition-all outline-none"
              />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-black hover:text-primary transition-colors group">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile/Auth */}
            {isAuthenticated ? (
               <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <span className="text-xs font-bold text-black uppercase tracking-widest">{user?.username}</span>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                     <LogOut size={20} />
                  </button>
               </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="p-2 text-black hover:text-primary transition-colors"
              >
                <Search size={22} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 text-black">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-1 rounded-full">{totalItems}</span>
              )}
            </Link>
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-black hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (link.name === 'Shop') {
                    onShopClick?.();
                    setTimeout(() => {
                      document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else if (link.name === 'Categories' || link.name === 'Home') {
                    onCategoriesClick?.();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-lg font-black text-black uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
          </div>
          {isAuthenticated ? (
             <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-black">{user?.username}</span>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold">
                   <LogOut size={20} /> Logout
                </button>
             </div>
          ) : (
            <button 
              onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
              className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
