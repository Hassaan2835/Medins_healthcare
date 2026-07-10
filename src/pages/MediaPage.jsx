import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import './MediaPage.css';

const articles = [
  {
    id: 1,
    title: 'Medins Healthcare Achieves WHO Pre-Qualification',
    excerpt: 'A major milestone in our journey as we receive WHO pre-qualification for select nutraceutical products, expanding our reach nationwide.',
    date: 'March 15, 2024',
    author: 'Medins Team',
    category: 'Achievement',
    emoji: '🏆'
  },
  {
    id: 2,
    title: 'Expanding Our Distribution Operations to Punjab & Sindh',
    excerpt: 'Medins Healthcare announces new partnerships with distributors across Punjab and Sindh, bringing affordable nutraceuticals to millions.',
    date: 'February 8, 2024',
    author: 'Medins Team',
    category: 'Expansion',
    emoji: '🌎'
  },
  {
    id: 3,
    title: 'New GMP-Compliant Manufacturing Facility Inaugurated',
    excerpt: 'Our state-of-the-art manufacturing facility is now fully operational with advanced quality control laboratories.',
    date: 'January 20, 2024',
    author: 'Medins Team',
    category: 'Infrastructure',
    emoji: '🏭'
  },
  {
    id: 4,
    title: 'Launch of Nutraceutical Product Line',
    excerpt: 'Introducing our new range of nutraceutical products including multivitamins, protein supplements, and wellness formulations.',
    date: 'December 5, 2023',
    author: 'Medins Team',
    category: 'Product Launch',
    emoji: '💊'
  },
  {
    id: 5,
    title: 'Medins Healthcare at Pakistan Health Exhibition',
    excerpt: 'Our team participated in the Pakistan Health Exhibition, showcasing our nutraceutical portfolio to national healthcare providers.',
    date: 'November 12, 2023',
    author: 'Medins Team',
    category: 'Event',
    emoji: '🎪'
  },
  {
    id: 6,
    title: 'Quality Assurance: Our Commitment to Patient Safety',
    excerpt: 'Understanding our rigorous quality control processes that ensure every product meets international safety standards.',
    date: 'October 28, 2023',
    author: 'Medins Team',
    category: 'Quality',
    emoji: '🔬'
  },
];

const MediaPage = () => {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <span className="section-subtitle" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}>
            News & Updates
          </span>
          <h1 className="page-hero-title">Media & <span>Latest News</span></h1>
          <p className="page-hero-description">
            Stay updated with the latest news, achievements, and events from Medins Healthcare.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container">
          <div className="media-grid">
            {articles.map((article) => (
              <article className="media-card" key={article.id}>
                <div className="media-card-image">
                  <span className="media-emoji">{article.emoji}</span>
                  <div className="media-category">{article.category}</div>
                </div>
                <div className="media-card-body">
                  <div className="media-meta">
                    <span className="media-date">
                      <FaCalendarAlt /> {article.date}
                    </span>
                    <span className="media-author">
                      <FaUser /> {article.author}
                    </span>
                  </div>
                  <h3 className="media-title">{article.title}</h3>
                  <p className="media-excerpt">{article.excerpt}</p>
                  <button className="media-read-more">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MediaPage;
