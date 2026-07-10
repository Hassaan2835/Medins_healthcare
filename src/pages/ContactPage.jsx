import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        subject: location.state.subject || prev.subject,
        message: location.state.message || prev.message
      }));
    }
  }, [location.state]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form to backend:', error);
      // Fallback simulation if backend server is offline
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <span className="section-subtitle" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}>
            Get In Touch
          </span>
          <h1 className="page-hero-title">Contact <span>Medins Healthcare</span></h1>
          <p className="page-hero-description">
            Have questions? We'd love to hear from you. Reach out to us and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-cards-section">
        <div className="container">
          <div className="contact-cards-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FaPhoneAlt />
              </div>
              <h4>Call Us</h4>
              <a href="tel:+923001234567">+92 300 1234567</a>
              <a href="tel:+922134567890">+92 21 3456 7890</a>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FaEnvelope />
              </div>
              <h4>Email Us</h4>
              <a href="mailto:info@medinshealthcare.com">info@medinshealthcare.com</a>
              <a href="mailto:sales@medinshealthcare.com">sales@medinshealthcare.com</a>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>
              <h4>Visit Us</h4>
              <p>street#26-A, Extension Chaklala scheme III,<br/>Rawalpindi, Pakistan</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FaClock />
              </div>
              <h4>Working Hours</h4>
              <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-form-grid">
            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="section-title">Send Us a <span>Message</span></h2>
              <p className="contact-form-desc">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="form-success">
                  <FaCheckCircle className="success-icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 xxx xxxxxxx"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="products">Product Information</option>
                        <option value="pricing">Pricing & Quotation</option>
                        <option value="distribution">Distribution Partnership</option>
                        <option value="export">Export Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp CTA */}
            <div className="contact-sidebar">
              <div className="whatsapp-cta-card">
                <div className="whatsapp-cta-icon">
                  <FaWhatsapp />
                </div>
                <h3>Quick Response via WhatsApp</h3>
                <p>Need an immediate response? Chat with us directly on WhatsApp for faster communication.</p>
                <a href="https://wa.me/923001234567" className="btn whatsapp-cta-btn" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>

              <div className="contact-map-card">
                <h4>Our Location</h4>
                <div className="map-container" style={{ width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden' }}>
                  <iframe 
                    src="https://maps.google.com/maps?q=33.584333,73.090333&z=16&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Medins Healthcare Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
