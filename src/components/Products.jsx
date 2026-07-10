import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTablets, FaPrescriptionBottleAlt, FaVials, FaPills } from 'react-icons/fa';
import { products } from '../data/productsData';
import './Products.css';

const categories = [
  { id: 'all', name: 'All Products', icon: <FaPills /> },
  { id: 'tablets', name: 'Tablets', icon: <FaTablets /> },
  { id: 'syrups', name: 'Syrups', icon: <FaPrescriptionBottleAlt /> },
  { id: 'sachets', name: 'Sachets/Powder', icon: <FaVials /> },
];

const Products = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

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
            Explore our range of WHO-certified tablets, syrups, and sachets manufactured to international standards.
          </p>
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

        {/* Products Grid */}
        <div className="products-grid">
          {displayProducts.map((product) => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              {product.image ? (
                <div className="product-card-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-card-img" />
                  <div className="product-type-badge">{product.type}</div>
                </div>
              ) : (
                <div className="product-card-header">
                  <div className="product-type-badge">{product.type}</div>
                  <div className="product-emoji">
                    {product.category === 'tablets' && '💊'}
                    {product.category === 'syrups' && '🧴'}
                    {product.category === 'sachets' && '📦'}
                  </div>
                </div>
              )}
              <div className="product-card-body">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
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
            <a href="/products" className="btn btn-outline-dark btn-lg">
              View All Products
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
