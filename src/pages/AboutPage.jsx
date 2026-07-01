import { FaHeartbeat, FaTruck, FaFlask, FaAward, FaUsers, FaGlobeAmericas, FaBoxOpen, FaCalendarCheck, FaCheckCircle, FaCertificate, FaIndustry, FaHandshake } from 'react-icons/fa';
import './AboutPage.css';

const timeline = [
  { year: '2015', title: 'Company Founded', description: 'Medins Healthcare established with a vision to deliver quality pharmaceutical products globally.' },
  { year: '2016', title: 'GMP Certification', description: 'Achieved Good Manufacturing Practice certification, meeting international quality standards.' },
  { year: '2018', title: 'Export Expansion', description: 'Expanded export operations to 15+ countries across Africa, Asia, and Latin America.' },
  { year: '2020', title: 'Product Line Growth', description: 'Portfolio expanded to 300+ products including nutraceuticals and medical disposables.' },
  { year: '2022', title: 'WHO Pre-Qualification', description: 'Achieved WHO pre-qualification status for select pharmaceutical products.' },
  { year: '2024', title: '500+ Products', description: 'Reached milestone of 500+ certified products serving 30+ countries worldwide.' },
];

const certifications = [
  { icon: <FaCertificate />, name: 'WHO-GMP Certified' },
  { icon: <FaCheckCircle />, name: 'ISO 9001:2015' },
  { icon: <FaIndustry />, name: 'cGMP Compliant' },
  { icon: <FaAward />, name: 'DRAP Licensed' },
];

const AboutPage = () => {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <span className="section-subtitle" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}>
            About Medins Healthcare
          </span>
          <h1 className="page-hero-title">Our Story of <span>Healthcare Excellence</span></h1>
          <p className="page-hero-description">
            A decade of commitment to delivering quality pharmaceutical products and improving healthcare outcomes worldwide.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content">
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">A Trusted Name in <span>Healthcare</span></h2>
              <p>
                <strong>Medins Healthcare</strong> is a premier pharmaceutical manufacturing and 
                exporting company based in Pakistan. Since our establishment in 2015, we have 
                grown from a small trading firm into a globally recognized healthcare solutions 
                provider.
              </p>
              <p>
                We specialize in the manufacturing, trading, and export of a comprehensive range 
                of pharmaceutical products including tablets, capsules, syrups, injectables, 
                creams, ointments, ophthalmic preparations, and medical disposables. Our products 
                are manufactured in state-of-the-art GMP-compliant facilities and meet the 
                highest international quality standards.
              </p>
              <p>
                With exports spanning over 30 countries across Africa, Asia, Latin America, 
                and the Caribbean, we have established ourselves as a reliable partner for 
                hospitals, pharmacies, distributors, and government health agencies worldwide.
              </p>
            </div>
            <div className="about-story-certs">
              <h3>Our Certifications</h3>
              <div className="certs-grid">
                {certifications.map((cert, idx) => (
                  <div className="cert-card" key={idx}>
                    <div className="cert-icon">{cert.icon}</div>
                    <span className="cert-name">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">Milestones in Our <span>Growth Story</span></h2>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
            <div className="timeline-line"></div>
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="section export-section">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Global Presence</span>
            <h2 className="section-title">Serving <span>30+ Countries</span> Worldwide</h2>
            <p className="section-description">
              Our pharmaceutical products reach healthcare providers across Africa, Asia, 
              Latin America, and the Caribbean, making quality medicine accessible worldwide.
            </p>
          </div>
          <div className="export-regions">
            <div className="region-card">
              <div className="region-emoji">🌍</div>
              <h4>Africa</h4>
              <p>South Africa, Nigeria, Kenya, Tanzania, Somalia, Sierra Leone, Togo, Senegal, Sudan</p>
            </div>
            <div className="region-card">
              <div className="region-emoji">🌏</div>
              <h4>Asia</h4>
              <p>Pakistan, Afghanistan, Myanmar, Sri Lanka, Central Asian States</p>
            </div>
            <div className="region-card">
              <div className="region-emoji">🌎</div>
              <h4>Americas</h4>
              <p>Bahamas, Trinidad, Barbados, Guyana, Belize, Mexico, Peru, Colombia, Brazil</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
