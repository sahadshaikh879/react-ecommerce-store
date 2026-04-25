import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/products/ProductGrid';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Get the current view from the URL (?view=store or ?view=portal)
  const view = searchParams.get('view') || 'portal';

  const productsState = useSelector((state: any) => state.products || {});
  const searchQuery = productsState.searchQuery || '';

  const setView = (newView: 'portal' | 'store') => {
    setSearchParams({ view: newView });
  };

  // If there is an active search, force the view to store
  useEffect(() => {
    if (searchQuery && view !== 'store') {
      setView('store');
    }
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar 
        forceTransparent={view === 'portal'} 
        onShopClick={() => setView('store')} 
        onCategoriesClick={() => setView('portal')}
      />
      
      {view === 'portal' ? (
        <CategorySection onSelect={() => setView('store')} />
      ) : (
        <>
          {!searchQuery && <Hero />}
          <ProductGrid />
          <Footer />
        </>
      )}
    </main>
  );
};

export default HomePage;
