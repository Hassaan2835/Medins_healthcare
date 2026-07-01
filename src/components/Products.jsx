import { useState } from 'react';
import { FaCapsules, FaTablets, FaSyringe, FaPrescriptionBottleAlt, FaPumpMedical, FaEyeDropper, FaBandAid, FaVials, FaPills } from 'react-icons/fa';
import { GiMedicines, GiPowder } from 'react-icons/gi';
import './Products.css';

const categories = [
  { id: 'all', name: 'All Products', icon: <FaPills /> },
  { id: 'tablets', name: 'Tablets', icon: <FaTablets /> },
  { id: 'capsules', name: 'Capsules', icon: <FaCapsules /> },
  { id: 'syrups', name: 'Syrups', icon: <FaPrescriptionBottleAlt /> },
  { id: 'injectables', name: 'Injectables', icon: <FaSyringe /> },
  { id: 'creams', name: 'Creams/Ointments', icon: <FaPumpMedical /> },
  { id: 'drops', name: 'Drops', icon: <FaEyeDropper /> },
  { id: 'sachets', name: 'Sachets/Powder', icon: <FaVials /> },
  { id: 'disposables', name: 'Medical Disposables', icon: <FaBandAid /> },
];

const products = [
  { id: 1, name: 'Amoxicillin 500mg', category: 'capsules', type: 'Antibiotic', description: 'Broad-spectrum antibiotic capsules' },
  { id: 2, name: 'Paracetamol 500mg', category: 'tablets', type: 'Analgesic', description: 'Pain relief & fever reducer tablets' },
  { id: 3, name: 'Omeprazole 20mg', category: 'capsules', type: 'Gastrointestinal', description: 'Proton pump inhibitor capsules' },
  { id: 4, name: 'Ceftriaxone 1g', category: 'injectables', type: 'Antibiotic', description: 'Injectable antibiotic for severe infections' },
  { id: 5, name: 'Multivitamin Syrup', category: 'syrups', type: 'Nutraceutical', description: 'Complete multivitamin syrup for all ages' },
  { id: 6, name: 'Hydrocortisone Cream', category: 'creams', type: 'Dermatology', description: 'Anti-inflammatory topical cream' },
  { id: 7, name: 'Ciprofloxacin Eye Drops', category: 'drops', type: 'Ophthalmic', description: 'Antibacterial ophthalmic solution' },
  { id: 8, name: 'ORS Sachets', category: 'sachets', type: 'Rehydration', description: 'Oral rehydration salt sachets' },
  { id: 9, name: 'Surgical Gloves', category: 'disposables', type: 'Disposable', description: 'Latex-free surgical examination gloves' },
  { id: 10, name: 'Metformin 500mg', category: 'tablets', type: 'Antidiabetic', description: 'Blood sugar management tablets' },
  { id: 11, name: 'Azithromycin 250mg', category: 'capsules', type: 'Antibiotic', description: 'Macrolide antibiotic capsules' },
  { id: 12, name: 'Cough Syrup', category: 'syrups', type: 'Respiratory', description: 'Expectorant cough syrup' },
  { id: 13, name: 'Diclofenac Gel', category: 'creams', type: 'Pain Relief', description: 'Topical anti-inflammatory gel' },
  { id: 14, name: 'Gentamicin Injection', category: 'injectables', type: 'Antibiotic', description: 'Aminoglycoside injectable antibiotic' },
  { id: 15, name: 'Vitamin C Sachets', category: 'sachets', type: 'Nutraceutical', description: 'Effervescent vitamin C sachets' },
  { id: 16, name: 'Disposable Syringes', category: 'disposables', type: 'Disposable', description: 'Sterile single-use syringes' },
  { id: 17, name: 'Ibuprofen 400mg', category: 'tablets', type: 'NSAID', description: 'Anti-inflammatory pain relief tablets' },
  { id: 18, name: 'Saline Nasal Drops', category: 'drops', type: 'ENT', description: 'Nasal saline solution drops' },
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
            Explore our extensive range of WHO-certified pharmaceutical products, 
            nutraceuticals, and medical disposables manufactured to international standards.
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
            <div className="product-card" key={product.id}>
              <div className="product-card-header">
                <div className="product-type-badge">{product.type}</div>
                <div className="product-emoji">
                  {product.category === 'tablets' && '💊'}
                  {product.category === 'capsules' && '💊'}
                  {product.category === 'syrups' && '🧴'}
                  {product.category === 'injectables' && '💉'}
                  {product.category === 'creams' && '🧴'}
                  {product.category === 'drops' && '💧'}
                  {product.category === 'sachets' && '📦'}
                  {product.category === 'disposables' && '🧤'}
                </div>
              </div>
              <div className="product-card-body">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <div className="product-category-tag">
                  {categories.find(c => c.id === product.category)?.icon}
                  <span>{categories.find(c => c.id === product.category)?.name}</span>
                </div>
              </div>
            </div>
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
