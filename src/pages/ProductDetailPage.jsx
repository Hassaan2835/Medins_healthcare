import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/productsData';
import { FaTablets, FaPrescriptionBottleAlt, FaVials, FaPills, FaArrowLeft, FaInfoCircle, FaClipboardList, FaFilePrescription, FaShieldAlt, FaTimes } from 'react-icons/fa';
import './ProductDetailPage.css';

import SEO from '../components/SEO';

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

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

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://medinshealthcare.com/product/${product.id}#product`,
        "name": product.name,
        "image": `https://medinshealthcare.com${product.image}`,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": "Medins Healthcare"
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "PKR",
          "availability": "https://schema.org/InStock",
          "url": `https://medinshealthcare.com/product/${product.id}`
        },
        "category": product.category,
        "manufacturer": {
          "@type": "Organization",
          "name": "Medins Healthcare",
          "url": "https://medinshealthcare.com"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "DRAP Credentials",
            "value": product.enlistment || "WHO-GMP Certified"
          },
          {
            "@type": "PropertyValue",
            "name": "Packaging",
            "value": product.packaging
          }
        ]
      },
      {
        "@type": "ImageObject",
        "@id": `https://medinshealthcare.com/product/${product.id}#image`,
        "url": `https://medinshealthcare.com${product.image}`,
        "caption": `${product.name} - ${product.type} by Medins Healthcare`
      },
      {
        "@type": "FAQPage",
        "@id": `https://medinshealthcare.com/product/${product.id}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is ${product.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${product.name} is a high-grade ${product.type} formulation manufactured by Medins Healthcare under WHO-certified and cGMP-compliant standards.`
            }
          },
          {
            "@type": "Question",
            "name": `What are the active ingredients in ${product.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The composition of ${product.name} features: ${product.composition.map(c => `${c.ingredient} (${c.strength})`).join(', ')}.`
            }
          },
          {
            "@type": "Question",
            "name": `What are the health benefits of ${product.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Primary health benefits include: ${product.benefits.slice(0, 3).join('. ')}.`
            }
          }
        ]
      }
    ]
  };

  const seoTitle = `${product.name} — ${product.type} | Medins Healthcare`;
  let seoDescription = `${product.description} Packaged in ${product.packaging}.`;
  if (seoDescription.length > 155) {
    seoDescription = seoDescription.substring(0, 152) + '...';
  }
  const seoKeywords = `${product.name}, ${product.type}, ${product.category}, Medins products, DRAP certified, ingredients: ${product.composition.map(c => c.ingredient).join(', ')}`;

  return (
    <article className="product-detail-page section">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`https://medinshealthcare.com/product/${product.id}`}
        ogImage={`https://medinshealthcare.com${product.image}`}
        schema={productSchema}
      />
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
            <div className="product-detail-img-card" onClick={() => setIsLightboxOpen(true)} style={{ cursor: 'pointer' }}>
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={`${product.name} - ${product.type} by Medins Healthcare`} 
                  title={`${product.name} - Packaging: ${product.packaging}`}
                  loading="eager"
                  className="product-detail-img" 
                />
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

            {product.price && (
              <div className="product-detail-price">
                <span className="detail-price-label">Price</span>
                <div className="detail-price-value">
                  <span className="detail-price-currency">PKR</span>
                  <span className="detail-price-amount">{product.price.toLocaleString()}</span>
                  <span className="detail-price-note">/ pack</span>
                </div>
              </div>
            )}

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
                  <div className="composition-table-wrapper">
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
                  </div>
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

        {/* AEO/GEO Optimized Informative Article & FAQ Section */}
        <hr className="detail-section-divider" style={{ margin: '60px 0 40px 0', opacity: 0.15 }} />
        
        <section className="aeo-faq-article" aria-label="Product Insights and FAQ">
          <header className="aeo-article-header">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
              Frequently Asked Questions &amp; <span>Product Insights</span>
            </h2>
            <p className="section-description" style={{ margin: '0 0 40px 0', textAlign: 'left', maxWidth: '800px' }}>
              Expert information and detailed guidance on the clinical utility, composition, and correct administration of {product.name}.
            </p>
          </header>

          <div className="aeo-faq-grid" style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="faq-item-card" style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #143068' }}>
              <h3 style={{ fontSize: '18px', color: '#143068', marginBottom: '12px', fontWeight: '600' }}>What is {product.name}?</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>
                {product.name} is a high-grade {product.type} formulation manufactured by Medins Healthcare. 
                It is designed to support patient health by delivering precise therapeutic strengths of active ingredients, 
                adhering to WHO-certified and cGMP-compliant manufacturing specifications.
              </p>
            </div>

            <div className="faq-item-card" style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #143068' }}>
              <h3 style={{ fontSize: '18px', color: '#143068', marginBottom: '12px', fontWeight: '600' }}>What are the active ingredients in {product.name}?</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>
                The composition of {product.name} features:
                <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                  {product.composition.map((comp, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      <strong>{comp.ingredient}</strong> ({comp.strength})
                    </li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="faq-item-card" style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #143068' }}>
              <h3 style={{ fontSize: '18px', color: '#143068', marginBottom: '12px', fontWeight: '600' }}>What are the primary health benefits of {product.name}?</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>
                Key therapeutic benefits include:
                <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                  {product.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{benefit}</li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="faq-item-card" style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #143068' }}>
              <h3 style={{ fontSize: '18px', color: '#143068', marginBottom: '12px', fontWeight: '600' }}>How should {product.name} be administered?</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>
                {product.dosage} Always consult your doctor or registered medical practitioner for advice tailormade to your physical profile. 
                Store the product {product.storage.toLowerCase()}.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Overlay Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}>
          <button className="lightbox-close" onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}>
            <FaTimes />
          </button>
          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={product.image} 
              alt={product.name} 
              className={`lightbox-img ${isZoomed ? 'zoomed' : ''}`} 
              onClick={() => setIsZoomed(!isZoomed)}
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductDetailPage;
