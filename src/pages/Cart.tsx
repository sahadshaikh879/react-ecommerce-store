import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import type { RootState } from '../store/store';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const renderEmptyCart = () => (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag size={40} className="text-gray-300" />
      </div>
      <h1 className="text-4xl font-black text-black tracking-tighter mb-4 uppercase">YOUR BAG IS EMPTY</h1>
      <p className="text-subtext mb-10 max-w-md">Looks like you haven't added anything to your cart yet. Let's find something amazing for you!</p>
      <Link to="/">
        <Button className="px-10 py-5 rounded-2xl shadow-xl font-bold">
          START SHOPPING
        </Button>
      </Link>
    </div>
  );

  const renderCartItems = () => (
    <div className="pt-32 pb-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-8 group cursor-pointer">
         <Link to="/" className="flex items-center gap-2 text-subtext hover:text-black transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Store</span>
         </Link>
      </div>

      <h1 className="text-5xl font-black text-black tracking-tighter mb-12 uppercase leading-none">
        MY SHOPPING <br /> <span className="text-primary italic">BAG</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500 group">
              <div className="w-full sm:w-40 aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="flex-grow space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-xs text-subtext line-clamp-1">{item.description}</p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-subtext uppercase tracking-widest">Price</span>
                     <span className="text-lg font-black text-black">${item.price}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1 shadow-inner">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-2 hover:bg-white hover:text-primary transition-all rounded-xl">
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-black">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-2 hover:bg-white hover:text-primary transition-all rounded-xl">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col items-center sm:items-end">
                     <span className="text-xs font-bold text-subtext uppercase tracking-widest">Total</span>
                     <span className="text-lg font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50/50 border border-gray-100 p-8 rounded-[2rem] sticky top-32">
             <h2 className="text-xl font-black mb-10 tracking-widest uppercase italic">Order Summary</h2>
             <div className="space-y-5">
               <div className="flex justify-between items-center text-sm">
                 <span className="font-bold text-subtext uppercase tracking-widest">Subtotal</span>
                 <span className="font-black text-black">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="font-bold text-subtext uppercase tracking-widest">Shipping</span>
                 <span className={`font-black ${shipping === 0 ? "text-green-600" : "text-black"}`}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
               </div>
               <div className="pt-8 mt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-8">
                     <span className="text-xs font-black text-black uppercase tracking-[0.2em] opacity-60">Total Amount</span>
                     <span className="text-3xl font-black text-black tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                  <Button fullWidth className="py-5 shadow-2xl font-black uppercase tracking-widest rounded-2xl">PROCEED TO CHECKOUT</Button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
