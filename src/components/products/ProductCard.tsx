import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../store/cartSlice';

const ProductCard: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const cartItem = cartItems.find((item: any) => item.id === product?.id);

  if (!product) return null;

  return (
    <div className="group bg-white border border-gray-100 p-0 flex flex-col h-full transition-all duration-500 hover:border-primary/30">
      {/* Image - LINKED */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute top-0 right-0 p-3">
           <div className="bg-white/80 backdrop-blur-sm p-2 text-black border border-gray-100">
              <ShoppingCart size={16} />
           </div>
        </div>
      </Link>

      {/* Content - PARTIALLY LINKED */}
      <div className="p-5 flex-grow space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-black uppercase tracking-tight text-sm truncate hover:text-primary transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest line-clamp-2">
          {product.description}
        </p>
        
        <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-auto">
          <span className="text-xl font-black text-black tracking-tighter">${product.price}</span>
          
          {cartItem ? (
            <div className="flex items-center bg-gray-50 border border-gray-100 p-1">
              <button 
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 }))}
                className="p-1.5 hover:text-primary transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="w-8 text-center text-xs font-black">{cartItem.quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity + 1 }))}
                className="p-1.5 hover:text-primary transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => dispatch(addToCart(product))}
              className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-primary transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
