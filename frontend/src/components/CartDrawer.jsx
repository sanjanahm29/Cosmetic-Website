import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">
            <ShoppingBag size={20} />
            <span>Your Ritual Bag</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({cartCount})
            </span>
          </h2>
          <button
            id="cart-close-btn"
            className="nav-icon-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="drawer-free-shipping">
          <div className="free-shipping-text">
            {remainingForFreeShipping === 0 ? (
              <span style={{ color: 'var(--accent-sage)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={13} /> You have unlocked complimentary express delivery!
              </span>
            ) : (
              <span>Add ₹{remainingForFreeShipping.toFixed(2)} more for free express shipping</span>
            )}
          </div>
          <div className="free-shipping-bar">
            <div
              className="free-shipping-fill"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="drawer-empty">
            <div className="drawer-empty-icon">
              <ShoppingBag size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Your bag is currently empty
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '280px' }}>
              Explore our bioactive formulations and curate your daily skin wellness ritual.
            </p>
            <button
              id="empty-cart-shop-now-btn"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
            >
              Discover Collection
            </button>
          </div>
        ) : (
          <div className="drawer-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row" id={`cart-item-${item.id}`}>
                <div className="cart-item-thumb">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/products/serum.jpg';
                    }}
                  />
                </div>
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <p className="cart-item-sub">{item.volume_or_weight}</p>
                  
                  <div className="cart-item-controls">
                    <div className="qty-stepper" style={{ padding: '0.1rem 0.4rem' }}>
                      <button
                        id={`cart-minus-btn-${item.id}`}
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span id={`cart-item-qty-${item.id}`} className="qty-val" style={{ minWidth: '24px', fontSize: '0.82rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-plus-btn-${item.id}`}
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="cart-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      id={`cart-remove-btn-${item.id}`}
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal-row">
              <span>Subtotal</span>
              <span id="cart-drawer-subtotal">₹{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="drawer-subtotal-row">
              <span>Express Delivery</span>
              <span id="cart-drawer-shipping">
                {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="drawer-total-row">
              <span>Total Estimated</span>
              <span id="cart-drawer-total">₹{cartTotal.toFixed(2)}</span>
            </div>

            <button
              id="proceed-checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
