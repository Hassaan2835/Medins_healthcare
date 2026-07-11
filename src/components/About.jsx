import { useEffect, useRef, useState } from 'react';
import { FaHeartbeat, FaTruck, FaFlask, FaAward, FaUsers, FaGlobeAmericas, FaBoxOpen, FaCalendarCheck, FaIndustry, FaCapsules } from 'react-icons/fa';
import './About.css';

const stats = [
  { icon: <FaCalendarCheck />, number: 10, suffix: '+', label: 'Years Experience' },
  { icon: <FaBoxOpen />, number: 9, suffix: '+', label: 'Products' },
  { icon: <FaGlobeAmericas />, value: 'Pakistan', label: 'Country' },
  { icon: <FaUsers />, number: 1000, suffix: '+', label: 'Happy Clients' },
];

const features = [
  {
    icon: <FaHeartbeat />,
    title: 'Premium Quality',
    description: 'All products manufactured under strict GMP guidelines with WHO certification ensuring the highest quality standards.'
  },
  {
    icon: <FaTruck />,
    title: 'Nationwide Distribution',
    description: 'Reliable supply chain delivering healthcare products to hospitals, pharmacies, and distributors all over Pakistan.'
  },
  {
    icon: <FaFlask />,
    title: 'R&D Innovation',
    description: 'Continuous research and development to bring cutting-edge nutraceutical products to market.'
  },
  {
    icon: <FaAward />,
    title: 'Certified Excellence',
    description: 'ISO certified facilities with rigorous quality control testing on every batch before distribution.'
  }
];

const CounterNumber = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        {/* Stats Bar */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div className="about-stat-item" key={index}>
              <div className="about-stat-icon">{stat.icon}</div>
              <div className="about-stat-number">
                {stat.value ? stat.value : <CounterNumber target={stat.number} suffix={stat.suffix} />}
              </div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="about-grid">
          <div className="about-text">
            <span className="section-subtitle">About Medins Healthcare</span>
            <h2 className="section-title">
              Delivering <span>Quality Healthcare</span> Solutions Across Pakistan
            </h2>
            <p className="about-description">
              Established in 2015, <strong>Medins Healthcare</strong> is a leading nutraceutical 
              company specializing in the manufacturing and distribution of high-quality 
              healthcare products. We are committed to improving health standards by providing 
              affordable, WHO-certified nutraceuticals and supplements.
            </p>
            <p className="about-description">
              Our nutraceuticals and supplements are manufactured in our state-of-the-art 
              GMP-compliant facility in Pakistan. With our growing portfolio spanning 
              tablets, capsules, syrups, injectables, creams, and medical disposables, we serve 
              hospitals, pharmacies, clinics, and distributors all over Pakistan.
            </p>

            <div className="about-highlights">
              <div className="about-highlight-item">
                <div className="highlight-dot"></div>
                <span>WHO-GMP Certified Manufacturing</span>
              </div>
              <div className="about-highlight-item">
                <div className="highlight-dot"></div>
                <span>ISO 9001:2015 Quality Standards</span>
              </div>
              <div className="about-highlight-item">
                <div className="highlight-dot"></div>
                <span>Distribution Across Pakistan</span>
              </div>
              <div className="about-highlight-item">
                <div className="highlight-dot"></div>
                <span>9+ Nutraceutical Products</span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image-grid">
              <div className="about-img-card about-img-1">
                <div className="about-img-placeholder">
                  <span><FaIndustry /></span>
                  <p>Manufacturing Facility</p>
                </div>
              </div>
              <div className="about-img-card about-img-2">
                <div className="about-img-placeholder">
                  <span><FaCapsules /></span>
                  <p>Quality Products</p>
                </div>
              </div>
              <div className="about-img-card about-img-3">
                <div className="about-img-placeholder">
                  <span><FaGlobeAmericas /></span>
                  <p>Global Reach</p>
                </div>
              </div>
            </div>
            <div className="about-experience-badge">
              <div className="experience-number">10+</div>
              <div className="experience-text">Years of<br/>Excellence</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="about-features">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title">What Makes Us <span>Different</span></h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card glass-card" key={index}>
                <div className="feature-icon-wrap">
                  {feature.icon}
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
