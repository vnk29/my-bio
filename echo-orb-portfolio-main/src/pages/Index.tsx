import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Journey } from '@/components/Journey';
import { TechnicalSkills } from '@/components/TechnicalSkills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Journey />
        <TechnicalSkills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
