import { FaHeartbeat, FaTruck, FaFlask, FaAward, FaUsers, FaGlobeAmericas, FaBoxOpen, FaCalendarCheck, FaCheckCircle, FaCertificate, FaIndustry, FaHandshake } from 'react-icons/fa';
import './AboutPage.css';

const timeline = [
  { year: '2015', title: 'Company Founded', description: 'Medins Healthcare established with a vision to deliver quality nutraceutical products.' },
  { year: '2016', title: 'GMP Certification', description: 'Achieved Good Manufacturing Practice certification, meeting quality standards.' },
  { year: '2018', title: 'Distribution Expansion', description: 'Expanded distribution network across Pakistan.' },
  { year: '2020', title: 'Product Line Growth', description: 'Portfolio expanded to include nutraceuticals and medical disposables.' },
  { year: '2022', title: 'WHO Pre-Qualification', description: 'Achieved WHO pre-qualification status for select nutraceutical products.' },
  { year: '2024', title: 'Growing Products', description: 'Reached milestone of certified nutraceutical products serving Pakistan.' },
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
            A decade of commitment to delivering quality nutraceutical products and improving healthcare outcomes across Pakistan.
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
                <strong>Medins Healthcare</strong> is a premier nutraceutical manufacturing and 
                distribution company based in Pakistan. Since our establishment in 2015, we have 
                grown into a recognized healthcare solutions provider.
              </p>
              <p>
                We specialize in the manufacturing and distribution of a comprehensive range 
                of nutraceutical products including tablets, capsules, syrups, 
                creams, ointments, and medical disposables. Our products 
                are manufactured in state-of-the-art GMP-compliant facilities and meet the 
                highest quality standards.
              </p>
              <p>
                With our distribution network spanning across Pakistan, we have established ourselves 
                as a reliable partner for hospitals, pharmacies, clinics, and distributors nationwide.
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

      {/* Pakistan Presence */}
      <section className="section export-section">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Our Reach</span>
            <h2 className="section-title">Serving <span>All Regions</span> Across Pakistan</h2>
            <p className="section-description">
              Our nutraceutical products reach healthcare providers, pharmacies, and clinics in every province of Pakistan, making quality supplements accessible nationwide.
            </p>
          </div>
          <div className="export-regions">
            <div className="region-card">
              <div className="region-emoji">🏛️</div>
              <h4>Punjab & Islamabad</h4>
              <p>Lahore, Faisalabad, Rawalpindi, Multan, Gujranwala, Sargodha, Bahawalpur, Sialkot, Islamabad</p>
            </div>
            <div className="region-card">
              <div className="region-emoji">🌊</div>
              <h4>Sindh & Balochistan</h4>
              <p>Karachi, Hyderabad, Sukkur, Larkana, Mirpurkhas, Quetta, Gwadar, Turbat, Khuzdar</p>
            </div>
            <div className="region-card">
              <div className="region-emoji">⛰️</div>
              <h4>KPK & Northern Areas</h4>
              <p>Peshawar, Mardan, Abbottabad, Swat, Kohat, Gilgit, Muzaffarabad, Mirpur</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
