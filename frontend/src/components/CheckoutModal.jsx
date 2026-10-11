import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';

export default function CheckoutModal({ isOpen, onClose, onOrderSuccess }) {
  const { cart, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    city: '',
    postal_code: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validations
    if (!formData.customer_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.customer_email.trim() || !formData.customer_email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.customer_phone.trim()) {
      setErrorMessage('Please enter a telephone number for delivery confirmation.');
      return;
    }
    if (!formData.delivery_address.trim()) {
      setErrorMessage('Please provide a delivery street address.');
      return;
    }
    if (cart.length === 0) {
      setErrorMessage('Your bag is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_phone: formData.customer_phone.trim(),
        delivery_address: formData.delivery_address.trim(),
        city: formData.city.trim(),
        postal_code: formData.postal_code.trim(),
        notes: formData.notes.trim(),
        total_amount: cartTotal.toFixed(2),
        items_data: cart.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: Number(item.price).toFixed(2),
        })),
      };

      const createdOrder = await submitOrder(payload);
      clearCart();
      onClose();
      onOrderSuccess(createdOrder);
    } catch (err) {
      console.error('Order creation error:', err);
      let errorText = 'Failed to submit order. Please check your connection and try again.';
      if (err.data) {
        if (typeof err.data === 'object') {
          errorText = Object.entries(err.data)
            .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
            .join(' | ');
        }
      }
      setErrorMessage(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Left: Checkout Form */}
        <div className="checkout-form-side">
          <div className="checkout-header">
            <button
              id="checkout-close-btn"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>
            <h2 className="checkout-title">Express Checkout</h2>
            <p className="checkout-subtitle">
              Enter your shipping details below to complete your order.
            </p>
          </div>

          {errorMessage && (
            <div
              id="checkout-error-banner"
              style={{
                backgroundColor: '#FDF2F0',
                border: '1px solid #F5C6CB',
                color: 'var(--accent-terracotta)',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ShieldAlert size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="customer_name">
                Full Name *
              </label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                className="form-input"
                placeholder="e.g. Julianne Moore"
                value={formData.customer_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="customer_email">
                  Email Address *
                </label>
                <input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  className="form-input"
                  placeholder="julianne@example.com"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="customer_phone">
                  Phone Number *
                </label>
                <input
                  id="customer_phone"
                  name="customer_phone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="delivery_address">
                Street Delivery Address *
              </label>
              <textarea
                id="delivery_address"
                name="delivery_address"
                rows="2"
                className="form-input"
                placeholder="Apartment, suite, unit, building, street..."
                value={formData.delivery_address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Mumbai, Bengaluru"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="postal_code">
                  Postal / PIN Code
                </label>
                <input
                  id="postal_code"
                  name="postal_code"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 560038"
                  value={formData.postal_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="notes">
                Delivery Instructions (Optional)
              </label>
              <input
                id="notes"
                name="notes"
                type="text"
                className="form-input"
                placeholder="Leave with front desk concierge..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button
              id="submit-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="checkout-btn"
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Lock size={15} />
              <span>
                {isSubmitting
                  ? 'Confirming Order with Database...'
                  : `Place Order — ₹${cartTotal.toFixed(2)}`}
              </span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-summary-side">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-items-list">
            {cart.map((item) => (
              <div key={item.id} className="summary-item-card">
                <div>
                  <p style={{ fontWeight: 600 }}>{item.name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                  </p>
                </div>
                <span style={{ fontWeight: 600 }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-breakdown">
            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="breakdown-total">
              <span>Total Amount</span>
              <span id="checkout-summary-total">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="trust-badges">
            <p>🔒 256-Bit SSL Encrypted & Protected</p>
            <p>🌱 100% Carbon-Neutral Shipping</p>
            <p>✨ 30-Day Happiness Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
