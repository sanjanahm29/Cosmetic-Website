import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShieldCheck, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState('ingredients');

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const formattedPrice = (Number(product.price) * quantity).toFixed(2);
  const unitPrice = Number(product.price).toFixed(2);
  const imageSrc = product.image || '/products/serum.jpg';

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          id="detail-close-btn"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close detail view"
        >
          <X size={18} />
        </button>

        <div className="product-detail-grid">
          <div className="detail-gallery">
            <div className="detail-main-img">
              <img
                src={imageSrc}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/products/serum.jpg';
                }}
              />
            </div>
          </div>

          <div className="detail-info">
            <p className="detail-category">
              {product.category_name || 'Botanical Formula'}
            </p>

            <h2 className="detail-title">{product.name}</h2>

            <div className="detail-rating-row">
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#C49F67" color="#C49F67" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {product.rating || '4.95'}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                ({product.review_count || 120} verified reviews)
              </span>
            </div>

            <div className="detail-price-row">
              <span className="detail-price">₹{unitPrice}</span>
              {product.original_price && (
                <span className="original-price" style={{ fontSize: '1.1rem' }}>
                  ₹{Number(product.original_price).toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                {product.volume_or_weight || '50 ml / 1.7 fl. oz.'}
              </span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-accordion">
              {/* Ingredients */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleSection('ingredients')}
                >
                  <span>Active Botanicals & Ingredients</span>
                  {openSection === 'ingredients' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'ingredients' && (
                  <div className="accordion-content">
                    {product.ingredients || 'Damask Rose Distillate, Botanical Squalane, Multi-weight Hyaluronic Acid, Niacinamide, Pure Tocopherol.'}
                  </div>
                )}
              </div>

              {/* Ritual Guide */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleSection('ritual')}
                >
                  <span>How to Ritualize</span>
                  {openSection === 'ritual' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'ritual' && (
                  <div className="accordion-content">
                    {product.how_to_use || 'Dispense a measured dose onto clean palms. Press into face and neck using slow, upward sweeps. Inhale the delicate botanical aroma before sealing with cream.'}
                  </div>
                )}
              </div>

              {/* Clean Promise */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleSection('promise')}
                >
                  <span>Clean Formulation Standards</span>
                  {openSection === 'promise' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'promise' && (
                  <div className="accordion-content">
                    Formulated without parabens, phthalates, synthetic fragrance, sulfates, or microplastics. Vegan, cruelty-free, and dermatologically vetted for reactive skin.
                  </div>
                )}
              </div>
            </div>

            <div className="quantity-add-row">
              <div className="qty-stepper">
                <button
                  id="detail-qty-minus"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span id="detail-qty-val" className="qty-val">{quantity}</span>
                <button
                  id="detail-qty-plus"
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                id="detail-add-to-cart-submit"
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Add to Bag — ₹{formattedPrice}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
