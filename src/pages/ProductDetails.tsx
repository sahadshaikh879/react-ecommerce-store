import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../store/cartSlice';
import { toggleFavorite } from '../store/productSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const cartItem = cartItems.find((item: any) => item.id === Number(id));
  const quantity = cartItem ? cartItem.quantity : 0;

  const favorites = useSelector((state: any) => state.products?.favorites || []);
  const isFavorite = favorites.includes(Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-primary font-bold hover:underline">Back to Store</Link>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-subtext hover:text-black transition-colors mb-10 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="text-xs font-black uppercase tracking-widest">Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Image Section (Gallery Style) */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-[#FBFBFB] overflow-hidden border border-gray-100 flex items-center justify-center group/img">
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.title} 
                  key={currentImageIndex}
                  className="w-full h-full object-contain p-8 mix-blend-multiply animate-in fade-in duration-700"
                />
              </div>
              
              {/* Thumbnails - GRID STYLE */}
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square border-2 transition-all p-2 ${idx === currentImageIndex ? 'border-primary' : 'border-gray-50 bg-gray-50'}`}
                  >
                    <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Content Section */}
            <div className="flex flex-col">
              {/* Badges & Stock */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <span className="bg-primary px-3 py-1 text-[10px] font-black text-white uppercase tracking-[0.2em]">NEW</span>
                  <span className="bg-black px-3 py-1 text-[10px] font-black text-white uppercase tracking-[0.2em]">{product.category}</span>
                </div>
                <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {product.stock || 25} IN STOCK
                </span>
              </div>

              {/* Title & Favorite */}
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter uppercase leading-[0.95] max-w-sm">
                  {product.title}
                </h1>
                <button 
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className={`p-4 transition-all border ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-300 hover:text-black'}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>

              {/* Price */}
              <div className="text-3xl font-black text-primary tracking-tighter mb-10">
                ${product.price}
              </div>

              {/* Stats Grid (Based on your RN weight/origin layout) */}
              <div className="border-t border-gray-100 pt-8 mt-4 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-black">Specs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Weight</p>
                      <p className="font-bold text-black">{product.weight || 1}kg</p>
                    </div>
                    <div className="bg-gray-50 p-4 border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Dimensions</p>
                      <p className="font-bold text-black">{product.dimensions?.width}x{product.dimensions?.height}cm</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-black border-b border-gray-100 pb-4">Description</h3>
                  <p className="text-sm text-subtext leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY FOOTER (Matches your RN ProductPurchaseFooter) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 p-4 md:p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-2xl font-black text-black tracking-tighter">${(product.price * (quantity || 1)).toFixed(2)}</p>
          </div>

          <div className="flex flex-1 md:flex-none items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-50 border border-gray-100 p-1 min-w-[120px] justify-between">
              <button 
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
                className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-primary transition-all text-black"
                disabled={quantity === 0}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/></svg>
              </button>
              <span className="font-black text-lg w-8 text-center">{quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-primary transition-all text-black"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>

            {/* Main Action Button */}
            <button 
              onClick={() => quantity === 0 ? dispatch(addToCart(product)) : navigate('/cart')}
              className="flex-grow md:flex-none md:min-w-[240px] bg-black text-white h-12 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all active:scale-95"
            >
              {quantity === 0 ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Add to Bag
                </>
              ) : (
                'View in Bag'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
