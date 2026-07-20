import SEO from '../components/SEO';
import Products from '../components/Products';
import { products } from '../data/productsData';
import './ProductsPage.css';

const ProductsPage = () => {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Certified Nutraceutical Products | Medins Healthcare",
    "url": "https://www.medinshealthcare.com/products",
    "description": "Explore the full portfolio of WHO-certified and GMP-compliant health supplements distributed by Medins Healthcare.",
    "about": {
      "@type": "Organization",
      "name": "Medins Healthcare"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((product, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": `https://www.medinshealthcare.com/product/${product.id}`,
          "image": `https://www.medinshealthcare.com${product.image}`,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "Medins Healthcare"
          },
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "PKR",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    }
  };

  return (
    <>
      <SEO 
        title="Product Portfolio — Certified Nutraceuticals | Medins Healthcare"
        description="Browse our portfolio of WHO-certified and GMP-compliant health supplements, chewable tablets, syrups, and sachets distributed by Medins Healthcare."
        keywords="nutraceutical products, dietary supplements list, CADRIL syrup, 3D3 STAT, CALENCE, FOLICO tablets, J-REX, OSSICARE, vitamin D3 Pakistan, multivitamin syrup"
        canonicalUrl="https://www.medinshealthcare.com/products"
        schema={collectionSchema}
      />
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
