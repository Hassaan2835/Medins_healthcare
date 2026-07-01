import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Media', path: '/media' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <a href="tel:+923001234567" className="top-bar-item">
              <FaPhoneAlt /> +92 300 1234567
            </a>
            <span className="top-bar-divider">|</span>
            <a href="mailto:info@medinshealthcare.com" className="top-bar-item">
              info@medinshealthcare.com
            </a>
          </div>
          <div className="top-bar-right">
            <a href="https://wa.me/923001234567" className="top-bar-whatsapp" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-content">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <span className="logo-cross">+</span>
            </div>
            <div className="logo-text">
              <span className="logo-name">Medins</span>
              <span className="logo-tagline">Healthcare</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
                <span className="nav-link-indicator"></span>
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary mobile-cta">
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
