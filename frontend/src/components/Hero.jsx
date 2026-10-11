import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export default function Hero({ onExploreClick, featuredProduct, onOpenDetail }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-tagline">
              <Sparkles size={13} />
              <span>Bioactive Clean Formula • Pure Luxury</span>
            </div>

            <h1 className="hero-title">
              Pure botanical <em>intelligence.</em><br />
              Effortless everyday rituals.
            </h1>

            <p className="hero-description">
              Formulated with clinical plant peptides, cold-pressed seed oils, and bioactive squalane. 
              Designed to nourish your natural skin barrier with uncompromising minimalist elegance.
            </p>

            <div className="hero-cta-group">
              <button id="hero-explore-btn" onClick={onExploreClick} className="btn-primary">
                <span>Shop The Collection</span>
                <ArrowRight size={16} />
              </button>

              {featuredProduct && (
                <button
                  id="hero-featured-btn"
                  onClick={() => onOpenDetail(featuredProduct)}
                  className="btn-secondary"
                >
                  Featured Hero
                </button>
              )}
            </div>

            <div className="hero-badges">
              <div className="badge-item">
                <span className="badge-dot"></span>
                <span>Dermatologist Approved</span>
              </div>
              <div className="badge-item">
                <span className="badge-dot"></span>
                <span>100% Vegan & Non-Toxic</span>
              </div>
              <div className="badge-item">
                <span className="badge-dot"></span>
                <span>Recyclable Frosted Glass</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="/products/serum.jpg"
                alt="LUMEN Amber Rose Peptide Serum"
                loading="eager"
              />
            </div>

            <div className="hero-floating-card">
              <div className="floating-icon">
                <Leaf size={22} />
              </div>
              <div>
                <p className="floating-label">Hero Concentrate</p>
                <p className="floating-val">Amber Rose Peptide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
