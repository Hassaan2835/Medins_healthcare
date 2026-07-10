import Products from '../components/Products';
import './ProductsPage.css';

const ProductsPage = () => {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <span className="section-subtitle" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}>
            Our Product Range
          </span>
          <h1 className="page-hero-title">Comprehensive <span>Product Portfolio</span></h1>
          <p className="page-hero-description">
            Explore our full range of WHO-certified nutraceutical products, supplements, and medical disposables.
          </p>
        </div>
      </section>

      <Products />
    </>
  );
};

export default ProductsPage;
