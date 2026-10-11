import React from 'react';
import { Search } from 'lucide-react';

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalCount,
}) {
  return (
    <div className="catalog-controls">
      <div className="category-pills">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              id={`cat-pill-${cat.slug}`}
              onClick={() => onSelectCategory(cat.slug)}
              className={`pill-btn ${isActive ? 'active' : ''}`}
            >
              <span>{cat.name}</span>
              {cat.product_count !== undefined && (
                <span className="pill-count">({cat.product_count})</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="catalog-actions">
        <div className="search-input-box">
          <Search size={15} className="search-icon" />
          <input
            id="product-search-input"
            type="text"
            placeholder="Search botanical rituals..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          id="product-sort-select"
          className="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Featured Curations</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="popular">Most Loved</option>
        </select>
      </div>
    </div>
  );
}
