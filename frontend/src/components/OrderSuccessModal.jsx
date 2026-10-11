import React from 'react';
import { Check, Sparkles, ArrowRight, PackageCheck } from 'lucide-react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-success-card" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-ring">
          <Check size={36} strokeWidth={2.4} />
        </div>

        <h2 className="order-success-title">Order Confirmed</h2>
        <div className="order-id-badge" id="confirmed-order-id-badge">
          Order Reference #{order.id}
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          Thank you, <strong>{order.customer_name}</strong>. Your clean beauty ritual has been 
          confirmed and successfully recorded in our system. A confirmation receipt has been sent to{' '}
          <strong>{order.customer_email}</strong>.
        </p>

        <div className="receipt-box" id="order-receipt-box">
          <div className="receipt-row">
            <span>Recipient:</span>
            <span>{order.customer_name}</span>
          </div>
          <div className="receipt-row">
            <span>Contact Phone:</span>
            <span>{order.customer_phone}</span>
          </div>
          <div className="receipt-row">
            <span>Shipping Address:</span>
            <span>{order.delivery_address} {order.city ? `, ${order.city}` : ''} {order.postal_code || ''}</span>
          </div>

          {order.items && order.items.length > 0 && (
            <div style={{ margin: '0.75rem 0', padding: '0.75rem 0', borderTop: '1px solid var(--border-mid)', borderBottom: '1px solid var(--border-mid)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Items Ordered:
              </p>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>{item.quantity}× {item.product_name}</span>
                  <span>₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="receipt-row bold">
            <span>Total Paid:</span>
            <span>₹{Number(order.total_amount).toFixed(2)}</span>
          </div>
          <div className="receipt-row" style={{ marginTop: '0.4rem', color: 'var(--accent-sage)', fontWeight: 500 }}>
            <span>Estimated Delivery:</span>
            <span>2 – 4 Business Days</span>
          </div>
        </div>

        <button
          id="order-success-continue-btn"
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
