import Hero from '../components/Hero';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import VisionMission from '../components/VisionMission';
import Products from '../components/Products';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <CoreValues />
      <Products limit={6} />
      <VisionMission />
    </>
  );
};

export default HomePage;
