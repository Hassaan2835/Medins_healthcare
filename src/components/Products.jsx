import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaTablets, FaPrescriptionBottleAlt, FaVials, FaPills, FaSearch, FaTimes } from 'react-icons/fa';
import { products } from '../data/productsData';
import './Products.css';

const categories = [
  { id: 'all', name: 'All Products', icon: <FaPills /> },
  { id: 'tablets', name: 'Tablets', icon: <FaTablets /> },
  { id: 'syrups', name: 'Syrups', icon: <FaPrescriptionBottleAlt /> },
  { id: 'sachets', name: 'Sachets/Powder', icon: <FaVials /> },
];

const Products = ({ limit }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return matchesCategory;

    const matchesName = product.name.toLowerCase().includes(query);
    const matchesType = product.type.toLowerCase().includes(query);
    const matchesDescription = product.description.toLowerCase().includes(query);
    const matchesComposition = product.composition?.some(c => 
      c.ingredient.toLowerCase().includes(query) || c.strength.toLowerCase().includes(query)
    );

    return matchesCategory && (matchesName || matchesType || matchesDescription || matchesComposition);
  });

  const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section className="products section" id="products">
      <div className="container">
        <div className="text-center">
          <span className="section-subtitle">Our Products</span>
          <h2 className="section-title">
            Comprehensive <span>Product Portfolio</span>
          </h2>
          <p className="section-description">
            Explore our range of WHO-certified tablets, syrups, and sachets formulated to international standards.
          </p>
        </div>

        {/* Live Product Search Bar */}
        <div className="products-search-box">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="products-search-input"
              placeholder="Search product by name (e.g. CADRIL, 3D3, BIOMAK) or ingredient (Vitamin D3, Collagen)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products by name or ingredient"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="products-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span className="filter-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Empty Search Result State */}
        {displayProducts.length === 0 && (
          <div className="products-empty-state">
            <div className="empty-icon"><FaSearch /></div>
            <h3>No Products Found</h3>
            <p>
              We couldn't find any product matching "<strong>{searchQuery}</strong>"
              {activeCategory !== 'all' && ` under category "${categories.find(c => c.id === activeCategory)?.name}"`}.
            </p>
            <button 
              className="btn btn-primary btn-sm mt-3"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {displayProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              className="product-card" 
              key={product.id}
              itemScope 
              itemType="https://schema.org/Product"
            >
              {product.image ? (
                <div className="product-card-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.type} Supplement by Medins Healthcare`} 
                    title={`${product.name} - Medins Healthcare`}
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                    className="product-card-img" 
                    onError={(e) => {
                      // Fallback image handling
                      e.target.onerror = null;
                      e.target.src = '/images/products/3d3-stat-tablets.png';
                    }}
                  />
                  <div className="product-type-badge">{product.type}</div>
                </div>
              ) : (
                <div className="product-card-header">
                  <div className="product-type-badge">{product.type}</div>
                  <div className="product-emoji">
                    {product.category === 'tablets' && <FaPills />}
                    {product.category === 'syrups' && <FaPrescriptionBottleAlt />}
                    {product.category === 'sachets' && <FaVials />}
                  </div>
                </div>
              )}
              <div className="product-card-body">
                <h4 className="product-name" itemProp="name">{product.name}</h4>
                <p className="product-description" itemProp="description">{product.description}</p>
                <div className="product-price" itemScope itemType="https://schema.org/Offer" itemProp="offers">
                  <span className="price-currency" itemProp="priceCurrency" content="PKR">PKR</span>
                  <span className="price-amount" itemProp="price" content={product.price}>{product.price?.toLocaleString()}</span>
                  <span className="price-note">/ pack</span>
                </div>
                <div className="product-category-tag">
                  {categories.find(c => c.id === product.category)?.icon}
                  <span>{categories.find(c => c.id === product.category)?.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {limit && (
          <div className="text-center" style={{ marginTop: '48px' }}>
            <Link to="/products" className="btn btn-outline-dark btn-lg">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
