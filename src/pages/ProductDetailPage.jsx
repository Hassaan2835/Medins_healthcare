import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/productsData';
import { FaTablets, FaPrescriptionBottleAlt, FaVials, FaPills, FaArrowLeft, FaInfoCircle, FaClipboardList, FaFilePrescription, FaShieldAlt } from 'react-icons/fa';
import './ProductDetailPage.css';

const categories = [
  { id: 'all', name: 'All Products', icon: <FaPills /> },
  { id: 'tablets', name: 'Tablets', icon: <FaTablets /> },
  { id: 'syrups', name: 'Syrups', icon: <FaPrescriptionBottleAlt /> },
  { id: 'sachets', name: 'Sachets/Powder', icon: <FaVials /> },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('composition');

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container product-not-found text-center">
        <h2 className="section-title">Product <span>Not Found</span></h2>
        <p className="section-description">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary mt-4">
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Products
        </Link>
      </div>
    );
  }

  const categoryInfo = categories.find(c => c.id === product.category);

  const handleInquiry = () => {
    navigate('/contact', { 
      state: { 
        subject: `Product Inquiry: ${product.name}`,
        message: `Hello Medins Healthcare,\n\nI would like to inquire about the product "${product.name}" (${product.type}). Please provide details regarding bulk ordering, export pricing, and availability.`
      } 
    });
  };

  return (
    <div className="product-detail-page section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link to="/products" className="back-link">
            <FaArrowLeft /> Back to Products
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Left Column: Product Image */}
          <div className="product-detail-visual">
            <div className="product-detail-img-card">
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-detail-img" />
              ) : (
                <div className="product-detail-img-placeholder">
                  <span className="placeholder-icon">{categoryInfo?.icon || <FaPills />}</span>
                  <h3>No Image Available</h3>
                </div>
              )}
            </div>
            <div className="product-detail-meta-tags">
              <div className="detail-tag category-tag">
                <span className="tag-icon">{categoryInfo?.icon}</span>
                <span>{categoryInfo?.name}</span>
              </div>
              <div className="detail-tag type-badge">
                <span>{product.type}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Tabbed Specs */}
          <div className="product-detail-content">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>

            {/* Tabs Control */}
            <div className="detail-tabs">
              <button 
                className={`tab-btn ${activeTab === 'composition' ? 'active' : ''}`}
                onClick={() => setActiveTab('composition')}
              >
                <FaClipboardList /> Composition
              </button>
              <button 
                className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                <FaFilePrescription /> Benefits
              </button>
              <button 
                className={`tab-btn ${activeTab === 'safety' ? 'active' : ''}`}
                onClick={() => setActiveTab('safety')}
              >
                <FaShieldAlt /> Usage & Safety
              </button>
              <button 
                className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                <FaInfoCircle /> Product Info
              </button>
            </div>

            {/* Tab Panels */}
            <div className="tab-content-panel">
              {/* Tab 1: Composition */}
              {activeTab === 'composition' && (
                <div className="tab-pane-content animate-fade-in">
                  <h3 className="tab-pane-title">Supplement Facts / Composition</h3>
                  <table className="composition-table">
                    <thead>
                      <tr>
                        <th>Active Ingredient</th>
                        <th>Strength / Concentration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.composition && product.composition.map((item, idx) => (
                        <tr key={idx}>
                          <td className="ingredient-name">{item.ingredient}</td>
                          <td className="ingredient-strength">{item.strength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="composition-note">* Formulated to meet international pharmacopoeia standards.</p>
                </div>
              )}

              {/* Tab 2: Benefits */}
              {activeTab === 'benefits' && (
                <div className="tab-pane-content animate-fade-in">
                  <h3 className="tab-pane-title">Indications & Health Benefits</h3>
                  <ul className="benefits-list">
                    {product.benefits && product.benefits.map((benefit, idx) => (
                      <li key={idx} className="benefit-item">
                        <span className="bullet-point">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 3: Usage & Safety */}
              {activeTab === 'safety' && (
                <div className="tab-pane-content animate-fade-in">
                  <h3 className="tab-pane-title">Directions, Dosage & Storage</h3>
                  <div className="safety-section">
                    <h4 className="safety-sub-title">Directions / Dosage</h4>
                    <p className="safety-text">{product.dosage}</p>
                  </div>
                  <div className="safety-section mt-4">
                    <h4 className="safety-sub-title">Storage Conditions</h4>
                    <p className="safety-text">{product.storage}</p>
                  </div>
                </div>
              )}

              {/* Tab 4: Product Info */}
              {activeTab === 'info' && (
                <div className="tab-pane-content animate-fade-in">
                  <h3 className="tab-pane-title">Regulatory & Packaging Specifications</h3>
                  <ul className="info-spec-list">
                    <li>
                      <strong>Packaging Size:</strong> <span>{product.packaging}</span>
                    </li>
                    <li>
                      <strong>Regulatory Status:</strong> <span>WHO-certified GMP standards</span>
                    </li>
                    {product.enlistment && (
                      <li>
                        <strong>DRAP Credentials:</strong> <span>{product.enlistment}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Action CTAs */}
            <div className="product-actions-bar">
              <button onClick={handleInquiry} className="btn btn-primary btn-lg inquire-btn">
                Inquire About Product
              </button>
              <Link to="/products" className="btn btn-outline-dark btn-lg">
                Back to Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
