import { useEffect } from 'react';

const SEO = ({ title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, schema }) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title;
    }

    // Helper to set meta tags
    const setMetaTag = (name, property, value) => {
      if (!value) return;
      let selector = '';
      if (name) selector = `meta[name="${name}"]`;
      if (property) selector = `meta[property="${property}"]`;
      
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', value);
      } else {
        const meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        meta.content = value;
        document.head.appendChild(meta);
      }
    };

    // 2. Update meta tags
    setMetaTag('description', null, description);
    setMetaTag('keywords', null, keywords);
    setMetaTag('robots', null, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Update OpenGraph and Twitter image tags
    setMetaTag(null, 'og:title', ogTitle || title);
    setMetaTag(null, 'og:description', ogDescription || description);
    setMetaTag('twitter:card', null, 'summary_large_image');
    setMetaTag('twitter:title', null, ogTitle || title);
    setMetaTag('twitter:description', null, ogDescription || description);

    if (ogImage) {
      setMetaTag(null, 'og:image', ogImage);
      setMetaTag(null, 'og:image:secure_url', ogImage);
      setMetaTag(null, 'og:image:width', '1200');
      setMetaTag(null, 'og:image:height', '630');
      setMetaTag(null, 'og:image:alt', title || 'Medins Healthcare Product Image');
      setMetaTag('twitter:image', null, ogImage);
    }

    // 4. Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = canonicalUrl;
        document.head.appendChild(canonicalLink);
      }
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // 5. Update JSON-LD structured schemas (AEO / GEO)
    const existingSchema = document.getElementById('seo-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup schemas and links on component unmount to prevent duplicate tags
    return () => {
      const activeSchema = document.getElementById('seo-schema');
      if (activeSchema) {
        activeSchema.remove();
      }
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, schema]);

  return null;
};

export default SEO;
