import React from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onOpenDetail }) {
  const { addToCart } = useCart();

  const handleCardClick = () => {
    onOpenDetail(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formattedPrice = Number(product.price).toFixed(2);
  const formattedOrigPrice = product.original_price ? Number(product.original_price).toFixed(2) : null;
  const imageSrc = product.image || '/products/serum.jpg';

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      <div className="product-image-container" onClick={handleCardClick}>
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/products/serum.jpg';
          }}
        />

        {product.is_best_seller && (
          <span className="card-tag bestseller">Bestseller</span>
        )}
        {!product.is_best_seller && product.is_featured && (
          <span className="card-tag">Curated</span>
        )}

        <div className="quick-action-overlay">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="quick-btn"
          >
            Quick Ritual View
          </button>
        </div>
      </div>

      <div className="product-meta">
        <div className="product-category-row">
          <span>{product.category_name || 'Botanical'}</span>
          <div className="product-rating">
            <Star size={12} fill="#C49F67" color="#C49F67" />
            <span>{product.rating || '4.9'}</span>
          </div>
        </div>

        <h3 className="product-name" onClick={handleCardClick}>
          {product.name}
        </h3>

        <p className="product-volume">{product.volume_or_weight || '50 ml'}</p>

        <div className="product-pricing">
          <span className="current-price">₹{formattedPrice}</span>
          {formattedOrigPrice && (
            <span className="original-price">₹{formattedOrigPrice}</span>
          )}
        </div>

        <button
          id={`add-to-cart-btn-${product.id}`}
          onClick={handleAddToCart}
          className="add-cart-btn"
        >
          <Plus size={15} />
          <span>Add to Bag</span>
        </button>
      </div>
    </article>
  );
}
