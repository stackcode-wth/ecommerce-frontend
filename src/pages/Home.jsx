import Hero from '../components/Hero';
import Features from '../components/Features';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import OfferBanner from '../components/OfferBanner';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <Hero />
      <Features />
      <Categories />
      <BestSelling />
      <OfferBanner />
      <Testimonials />
    </div>
  );
}

export default Home;