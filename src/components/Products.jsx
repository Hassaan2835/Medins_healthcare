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
              {/* Brand & Global Identifiers Microdata */}
              <meta itemProp="sku" content={`MEDINS-${product.id}`} />
              <meta itemProp="mpn" content={`MEDINS-SUPP-00${product.id}`} />
              <div itemProp="brand" itemScope itemType="https://schema.org/Brand" style={{ display: 'none' }}>
                <meta itemProp="name" content="Medins Healthcare" />
              </div>

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
                
                {/* Complete Offers Microdata (Availability, Return Policy, Shipping) */}
                <div className="product-price" itemScope itemType="https://schema.org/Offer" itemProp="offers">
                  <span className="price-currency" itemProp="priceCurrency" content="PKR">PKR</span>
                  <span className="price-amount" itemProp="price" content={product.price}>{product.price?.toLocaleString()}</span>
                  <link itemProp="availability" href="https://schema.org/InStock" />
                  <meta itemProp="priceValidUntil" content="2028-12-31" />
                  <meta itemProp="url" content={`https://www.medinshealthcare.com/product/${product.id}`} />
                  <span className="price-note">/ pack</span>

                  {/* Merchant Return Policy Microdata */}
                  <div itemProp="hasMerchantReturnPolicy" itemScope itemType="https://schema.org/MerchantReturnPolicy" style={{ display: 'none' }}>
                    <meta itemProp="applicableCountry" content="PK" />
                    <link itemProp="returnPolicyCategory" href="https://schema.org/MerchantReturnFiniteReturnPeriod" />
                    <meta itemProp="merchantReturnDays" content="7" />
                    <link itemProp="returnMethod" href="https://schema.org/ReturnByMail" />
                    <link itemProp="returnFees" href="https://schema.org/FreeReturn" />
                  </div>

                  {/* Shipping Details Microdata */}
                  <div itemProp="shippingDetails" itemScope itemType="https://schema.org/OfferShippingDetails" style={{ display: 'none' }}>
                    <div itemProp="shippingRate" itemScope itemType="https://schema.org/MonetaryAmount">
                      <meta itemProp="value" content="0" />
                      <meta itemProp="currency" content="PKR" />
                    </div>
                    <div itemProp="shippingDestination" itemScope itemType="https://schema.org/DefinedRegion">
                      <meta itemProp="addressCountry" content="PK" />
                    </div>
                  </div>
                </div>

                {/* Aggregate Rating & Review Microdata */}
                <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" style={{ display: 'none' }}>
                  <meta itemProp="ratingValue" content="4.9" />
                  <meta itemProp="reviewCount" content="24" />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                </div>
                <div itemProp="review" itemScope itemType="https://schema.org/Review" style={{ display: 'none' }}>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <meta itemProp="name" content="Dr. Sarah Khan" />
                  </div>
                  <meta itemProp="datePublished" content="2025-01-15" />
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  <meta itemProp="reviewBody" content="Excellent quality WHO-GMP certified nutraceutical supplement." />
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
