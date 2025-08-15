import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import TechStack from '@/components/sections/TechStack';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <Testimonials />
      <TechStack />
      <ContactForm />
      <Footer />
    </main>
  );
}