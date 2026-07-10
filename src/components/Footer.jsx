import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1440 100" fill="none">
            <path d="M0 40L60 35C120 30 240 20 360 25C480 30 600 50 720 55C840 60 960 50 1080 40C1200 30 1320 20 1380 15L1440 10V100H0V40Z" fill="var(--dark)" />
          </svg>
        </div>

        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              {/* Company Info */}
              <div className="footer-col footer-about">
                <div className="footer-logo">
                  <img
                    src="/logo.png"
                    alt="Medins Healthcare"
                    className="logo-img"
                    onLoad={() => setLogoLoaded(true)}
                    onError={(e) => { e.target.style.display = 'none'; setLogoLoaded(false); }}
                    style={{ display: logoLoaded ? 'block' : 'none', height: '60px' }}
                  />
                  {!logoLoaded && (
                    <>
                      <div className="footer-logo-icon">
                        <span>+</span>
                      </div>
                      <div className="footer-logo-text">
                        <span className="footer-logo-name">Medins</span>
                        <span className="footer-logo-tagline">Healthcare</span>
                      </div>
                    </>
                  )}
                </div>
                <p className="footer-description">
                  Leading pharmaceutical manufacturer and exporter, delivering WHO-certified
                  healthcare products to 30+ countries. Quality, trust, and innovation at the
                  heart of everything we do.
                </p>
                <div className="footer-socials">
                  <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className="social-link" aria-label="YouTube"><FaYoutube /></a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-col">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/media">Media</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              {/* Products */}
              <div className="footer-col">
                <h4 className="footer-heading">Products</h4>
                <ul className="footer-links">
                  <li><Link to="/products">Tablets & Capsules</Link></li>
                  <li><Link to="/products">Syrups & Suspensions</Link></li>
                  <li><Link to="/products">Injectable Drugs</Link></li>
                  <li><Link to="/products">Creams & Ointments</Link></li>
                  <li><Link to="/products">Medical Disposables</Link></li>
                  <li><Link to="/products">Nutraceuticals</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-col">
                <h4 className="footer-heading">Contact Us</h4>
                <ul className="footer-contact">
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Suite 305, Business Plaza,<br />Shahrah-e-Faisal, Karachi, Pakistan</span>
                  </li>
                  <li>
                    <FaPhoneAlt className="contact-icon" />
                    <a href="tel:+923001234567">+92 300 1234567</a>
                  </li>
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:info@medinshealthcare.com">info@medinshealthcare.com</a>
                  </li>
                </ul>

                {/* Newsletter */}
                <div className="footer-newsletter">
                  <h5>Subscribe to Newsletter</h5>
                  <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Your email address" />
                    <button type="submit" className="newsletter-btn">→</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Medins Healthcare. All Rights Reserved.</p>
            <p className="footer-made">Made by <FaHeart className="heart-icon" /> Hassaan in Pakistan</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/923001234567" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <FaWhatsapp />
      </a>

      {/* Scroll to Top */}
      <button
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default Footer;
