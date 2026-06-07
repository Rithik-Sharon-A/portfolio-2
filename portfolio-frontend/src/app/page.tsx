import { fetchHero, fetchAbout, fetchProjects, fetchStackItems, fetchServices, fetchContact } from '@/lib/strapi';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import StackSection from '@/components/sections/StackSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import ChatBubble from '@/components/ChatBot/ChatBubble';

export default async function Home() {
  const [hero, about, projects, stackItems, services, contact] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchProjects(),
    fetchStackItems(),
    fetchServices(),
    fetchContact(),
  ]);

  return (
    <main style={{ background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection data={hero} />
      <MarqueeSection />
      <AboutSection data={about} />
      <ProjectsSection data={projects} />
      <StackSection data={stackItems} />
      <ServicesSection data={services} />
      <ContactSection data={contact} />
      <ChatBubble />
    </main>
  );
}
