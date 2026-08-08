import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import VisionMission from '../components/VisionMission';
import Products from '../components/Products';

const HomePage = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.medinshealthcare.com/#website",
        "name": "Medins Healthcare",
        "alternateName": ["Medins", "Medins Pakistan", "Medins Nutraceuticals"],
        "url": "https://www.medinshealthcare.com"
      },
      {
        "@type": "Organization",
        "@id": "https://www.medinshealthcare.com/#organization",
        "name": "Medins Healthcare",
        "url": "https://www.medinshealthcare.com",
        "logo": "https://www.medinshealthcare.com/logo.png",
        "sameAs": [
          "https://www.linkedin.com/in/hassaankhanofficial/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+923325434674",
          "contactType": "sales",
          "areaServed": "PK",
          "availableLanguage": ["en", "ur"]
        }
      },
      {
        "@type": "MedicalBusiness",
        "@id": "https://www.medinshealthcare.com/#business",
        "name": "Medins Healthcare",
        "image": "https://www.medinshealthcare.com/logo.png",
        "url": "https://www.medinshealthcare.com",
        "telephone": "+923325434674",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "street#26-A, Extension Chaklala scheme III",
          "addressLocality": "Rawalpindi",
          "addressRegion": "Punjab",
          "postalCode": "46000",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 33.584333,
          "longitude": 73.090333
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "knowsAbout": ["Nutraceutical Products", "Dietary Supplements", "WHO Certified GMP Standards"]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Medins & Medins Healthcare — Official Website | Nutraceuticals"
        description="Official website of Medins & Medins Healthcare. Leading WHO-certified, GMP-compliant nutraceutical company in Pakistan delivering high-quality supplements, tablets, syrups, and sachets."
        keywords="Medins, Medins Healthcare, Medins official website, Medins Pakistan, Medins nutraceuticals, Medins products, CADRIL syrup, 3D3 STAT, OSIK2,j rex sachet, folico, calence, osik2, ossicare, Medins health care"
        canonicalUrl="https://www.medinshealthcare.com"
        schema={homeSchema}
      />
      <Hero />
      <About />
      <CoreValues />
      <Products />
      <VisionMission />
    </>
  );
};

export default HomePage;
