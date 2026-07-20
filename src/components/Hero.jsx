import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay, FaShieldAlt, FaCertificate, FaGlobeAsia, FaCapsules, FaDna, FaBriefcaseMedical, FaMicroscope, FaHospital } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
        <div className="hero-grid-pattern"></div>
        <div className="hero-float-pill pill-1"><FaCapsules /></div>
        <div className="hero-float-pill pill-2"><FaDna /></div>
        <div className="hero-float-pill pill-3"><FaBriefcaseMedical /></div>
        <div className="hero-float-pill pill-4"><FaMicroscope /></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-fadeInDown">
            <HiSparkles className="hero-badge-icon" />
            <span>Trusted Healthcare Partner Since 2015</span>
          </div>

          <h1 className="hero-title animate-fadeInUp">
            <span style={{ display: 'block', fontSize: '0.45em', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600' }}>
              Medins Healthcare
            </span>
            Your Trusted Partner in{' '}
            <span className="hero-title-gradient">Healthcare</span>{' '}
            <span className="hero-title-gradient">Excellence</span>
          </h1>

          <p className="hero-description animate-fadeInUp delay-2">
            Leading nutraceutical company delivering
            WHO-certified, high-quality healthcare products all over Pakistan. We care for your health.
          </p>
          
          <div className="hero-buttons animate-fadeInUp delay-3">
            <Link to="/products" className="btn btn-primary btn-lg hero-btn-primary">
              Explore Products
              <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg hero-btn-outline">
              <FaPlay className="btn-icon-play" />
              Get In Touch
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust animate-fadeInUp delay-4">
            <div className="hero-trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>WHO Certified</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <FaCertificate className="trust-icon" />
              <span>GMP Compliant</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <FaGlobeAsia className="trust-icon" />
              <span>Made in Pakistan</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fadeInRight delay-2">
          <div className="hero-visual-wrapper">
            {/* Main Card */}
            <div className="hero-card hero-card-main">
              <div className="hero-card-icon"><FaHospital /></div>
              <div className="hero-card-info">
                <h4>Nutraceutical Products</h4>
                <p>9+ certified products</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="hero-stat hero-stat-1 animate-float">
              <div className="hero-stat-number">9+</div>
              <div className="hero-stat-label">Products</div>
            </div>

            <div className="hero-stat hero-stat-2 animate-float-slow">
              <div className="hero-stat-number">Pakistan</div>
              <div className="hero-stat-label">Country</div>
            </div>

            <div className="hero-stat hero-stat-3 animate-float">
              <div className="hero-stat-number">10+</div>
              <div className="hero-stat-label">Years</div>
            </div>

            {/* Central Visual Element */}
            <div className="hero-center-visual">
              <div className="hero-dna-ring ring-1"></div>
              <div className="hero-dna-ring ring-2"></div>
              <div className="hero-dna-ring ring-3"></div>
              <div className="hero-center-icon">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
