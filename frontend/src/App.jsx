import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { fetchCategories, fetchProducts } from './services/api';

export default function App() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'All Products', slug: 'all' },
  ]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const shopSectionRef = useRef(null);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts({ category: 'all' }),
        ]);

        if (cats && cats.length > 0) {
          // Ensure "All Products" is first
          const hasAll = cats.some((c) => c.slug === 'all');
          if (!hasAll) {
            setCategories([{ id: 0, name: 'All Products', slug: 'all' }, ...cats]);
          } else {
            setCategories(cats);
          }
        }
        setProducts(prods || []);
      } catch (err) {
        console.error('Initial load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter and reload products when category or sort changes
  useEffect(() => {
    let isCancelled = false;

    async function loadFilteredProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts({
          category: activeCategory,
          search: searchQuery,
          sort: sortOption,
        });
        if (!isCancelled) {
          setProducts(data);
        }
      } catch (e) {
        console.error('Filter reload error:', e);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    const timer = setTimeout(loadFilteredProducts, searchQuery ? 250 : 0);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [activeCategory, searchQuery, sortOption]);

  const handleScrollToShop = () => {
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    handleScrollToShop();
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) searchInput.focus();
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortOption('');
  };

  const featuredProduct = products.find((p) => p.is_featured) || products[0];

  return (
    <div className="app-root">
      <Navbar
        onScrollToShop={handleScrollToShop}
        onOpenSearch={handleOpenSearch}
      />

      <Hero
        onExploreClick={handleScrollToShop}
        featuredProduct={featuredProduct}
        onOpenDetail={(prod) => setSelectedProduct(prod)}
      />

      <main className="catalog-section" ref={shopSectionRef} id="shop">
        <div className="container">
          <div className="section-header">
            <p className="section-pretitle">The Botanical Dispensary</p>
            <h2 className="section-title">Clean Minimalist Formulations</h2>
            <p className="section-subtitle">
              Every formula is purposefully crafted with plant bioactives, biocompatible lipids, 
              and sensory luxury.
            </p>
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalCount={products.length}
          />

          <ProductGrid
            products={products}
            loading={loading}
            onOpenDetail={(prod) => setSelectedProduct(prod)}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setConfirmedOrder(order);
        }}
      />

      {/* Order Confirmation Receipt Modal */}
      {confirmedOrder && (
        <OrderSuccessModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
}
