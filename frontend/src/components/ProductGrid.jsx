import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function ProductGrid({ products, loading, onOpenDetail, onResetFilters }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
        <Sparkles size={28} style={{ animation: 'spin 2s linear infinite', marginBottom: '1rem' }} />
        <p>Curating clean formulations...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
          No rituals match your selection
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Try clearing your search query or choosing another botanical category.
        </p>
        <button onClick={onResetFilters} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={15} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid" id="product-grid-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
