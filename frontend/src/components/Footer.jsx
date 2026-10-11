import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for joining the LŪMEN Collective');
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" id="philosophy">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">L Ū M E N</div>
            <p className="footer-bio">
              Minimalist cosmetic and botanical skincare rituals designed with pure, clinical plant 
              bioactives. Mindfully made for sensitive skin, sustainable for the earth.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Rituals</h4>
            <ul className="footer-links">
              <li><a href="#shop" className="footer-link">All Products</a></li>
              <li><a href="#shop" className="footer-link">Restorative Serums</a></li>
              <li><a href="#shop" className="footer-link">Hydration Creams</a></li>
              <li><a href="#shop" className="footer-link">Lip Infusions</a></li>
              <li><a href="#shop" className="footer-link">Botanical Cleansers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Brand</h4>
            <ul className="footer-links">
              <li><a href="#philosophy" className="footer-link">Our Clean Philosophy</a></li>
              <li><a href="#philosophy" className="footer-link">Sustainable Glass Packaging</a></li>
              <li><a href="#philosophy" className="footer-link">Clinical Ingredients</a></li>
              <li><a href="#philosophy" className="footer-link">Stockists & Press</a></li>
              <li><a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noreferrer" className="footer-link" style={{ color: 'var(--accent-gold)' }}>Django Admin Portal ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">The Collective</h4>
            <p className="footer-newsletter-text">
              Subscribe for private botanical formulations and complimentary seasonal rituals.
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--accent-sage)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={16} /> Welcome to the Collective.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LŪMEN Botanicals Co. All rights reserved.</p>
          <p>Powered by Django REST Framework & React</p>
        </div>
      </div>
    </footer>
  );
}
