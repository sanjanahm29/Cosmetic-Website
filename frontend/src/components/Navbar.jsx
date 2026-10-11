import React from 'react';
import { ShoppingBag, Search, Sparkles, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onScrollToShop, onOpenSearch }) {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      <div className="announcement-bar">
        <span>Complimentary Express Shipping on Orders Over ₹999</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>100% Certified Botanical & Leaping Bunny Cruelty-Free</span>
      </div>

      <header className="navbar">
        <div className="container nav-container">
          <ul className="nav-links">
            <li>
              <button onClick={onScrollToShop} className="nav-link">
                Collection
              </button>
            </li>
            <li>
              <a href="#philosophy" className="nav-link">
                Philosophy
              </a>
            </li>
            <li>
              <a href="#rituals" className="nav-link">
                Rituals
              </a>
            </li>
          </ul>

          <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="brand-title">L Ū M E N</span>
            <span className="brand-subtitle">Botanical Cosmetics</span>
          </div>

          <div className="nav-actions">
            <button 
              id="search-btn"
              onClick={onOpenSearch} 
              className="nav-icon-btn" 
              title="Search collection"
              aria-label="Search collection"
            >
              <Search size={19} strokeWidth={1.7} />
            </button>

            <button
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="nav-icon-btn"
              title="View shopping bag"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} strokeWidth={1.7} />
              {cartCount > 0 && (
                <span id="cart-counter-badge" className="cart-badge">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
