import { FaEye, FaRocket } from 'react-icons/fa';
import './VisionMission.css';

const VisionMission = () => {
  return (
    <section className="vision-mission section">
      <div className="vm-bg-decor">
        <div className="vm-circle vm-circle-1"></div>
        <div className="vm-circle vm-circle-2"></div>
      </div>
      <div className="container">
        <div className="text-center">
          <span className="section-subtitle">Vision & Mission</span>
          <h2 className="section-title">
            Driven by Purpose, <span>Guided by Values</span>
          </h2>
        </div>

        <div className="vm-grid">
          {/* Vision Card */}
          <div className="vm-card vm-vision">
            <div className="vm-card-icon-wrap">
              <FaEye className="vm-card-icon" />
            </div>
            <h3 className="vm-card-title">Our Vision</h3>
            <div className="vm-card-divider"></div>
            <p className="vm-card-text">
              To become a trusted leader in nutraceutical products, 
              recognized for uncompromising quality, continuous innovation, and delivering 
              accessible healthcare solutions that improve lives.
            </p>
            <div className="vm-card-pattern"></div>
          </div>

          {/* Mission Card */}
          <div className="vm-card vm-mission">
            <div className="vm-card-icon-wrap">
              <FaRocket className="vm-card-icon" />
            </div>
            <h3 className="vm-card-title">Our Mission</h3>
            <div className="vm-card-divider"></div>
            <p className="vm-card-text">
              To improve health standards by delivering high-quality, affordable, and reliable 
              nutraceutical products. We strive to build lasting partnerships with healthcare 
              providers, drive innovation through research, and maintain the highest standards 
              of safety and efficacy in everything we produce.
            </p>
            <div className="vm-card-pattern"></div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="vm-cta-banner">
          <div className="vm-cta-content">
            <h3>Ready to Partner With Us?</h3>
            <p>Join hundreds of distributors and healthcare providers who trust Medins Healthcare for quality nutraceutical products.</p>
          </div>
          <a href="/contact" className="btn btn-accent btn-lg">
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
