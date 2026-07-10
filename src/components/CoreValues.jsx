import { FaEye, FaBullseye, FaHandshake, FaLeaf } from 'react-icons/fa';
import './CoreValues.css';

const values = [
  {
    icon: <FaHandshake />,
    title: 'Integrity',
    description: 'We conduct business with the highest ethical standards, ensuring transparency and trust in every interaction with our partners and clients.',
    color: '#143068'
  },
  {
    icon: <FaLeaf />,
    title: 'Quality First',
    description: 'Every product undergoes rigorous quality testing. We never compromise on the standards that protect patient health and well-being.',
    color: '#e14d4d'
  },
  {
    icon: <FaBullseye />,
    title: 'Innovation',
    description: 'We invest in cutting-edge research and technology to develop better nutraceutical solutions that address evolving healthcare needs.',
    color: '#1c4490'
  },
  {
    icon: <FaEye />,
    title: 'Customer Focus',
    description: 'Our clients are at the heart of everything we do. We provide personalized service, competitive pricing, and reliable delivery across Pakistan.',
    color: '#f27878'
  }
];

const CoreValues = () => {
  return (
    <section className="core-values section">
      <div className="core-values-bg">
        <div className="cv-pattern"></div>
      </div>
      <div className="container">
        <div className="text-center">
          <span className="section-subtitle">Our Core Values</span>
          <h2 className="section-title">
            The Principles That <span>Guide Us</span>
          </h2>
          <p className="section-description">
            At Medins Healthcare, our core values define who we are and shape every decision 
            we make in delivering healthcare excellence.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card" key={index} style={{ '--accent-color': value.color }}>
              <div className="value-card-number">0{index + 1}</div>
              <div className="value-icon-circle">
                {value.icon}
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
              <div className="value-card-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
