import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { filteredItems, loading, error } = useSelector((state: any) => state.products || { filteredItems: [], loading: false, error: null });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading && filteredItems.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading collection</p>
      </div>
    );
  }

  return (
    <section id="shop-grid" className="max-w-7xl mx-auto px-4 py-20 pb-40">
      <div className="mb-16">
        <p className="text-primary text-sm font-black uppercase tracking-widest mb-2">Trending Now</p>
        <h2 className="text-5xl font-black text-black tracking-tighter uppercase leading-none">Top Picks <br /> <span className="text-gray-300">For You</span></h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredItems.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
