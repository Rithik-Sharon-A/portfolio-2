import {
  fetchHero,
  fetchAbout,
  fetchProjects,
  fetchStackItems,
  fetchServices,
  fetchContact,
  fetchSiteSettings,
} from '@/lib/strapi';
import WorkstationShell from '@/components/WorkstationShell';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import StackSection from '@/components/sections/StackSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import TerminalDock from '@/components/ChatBot/TerminalDock';
import BootLoader from '@/components/BootLoader';
import SquareWaveDivider from '@/components/svg/SquareWaveDivider';

export default async function Home() {
  const [hero, about, projects, stackItems, services, contact, settings] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchProjects(),
    fetchStackItems(),
    fetchServices(),
    fetchContact(),
    fetchSiteSettings(),
  ]);

  return (
    <WorkstationShell>
      <main
        style={{
          background: '#080C10',
          overflowX: 'hidden',
          minHeight: '100vh',
          paddingBottom: 56,
        }}
      >
        <BootLoader />
        <HeroSection data={hero} />
        <MarqueeSection line1={settings?.marqueeLine1} line2={settings?.marqueeLine2} />
        <AboutSection data={about} />
        <SquareWaveDivider color="#0EA5E9" background="#080C10" />
        <ProjectsSection
          data={projects}
          label={settings?.projectsLabel}
          heading={settings?.projectsHeading}
        />
        <SquareWaveDivider color="#00FF88" background="#080C10" flip />
        <StackSection
          data={stackItems}
          label={settings?.stackLabel}
          heading={settings?.stackHeading}
          subtitle={settings?.stackSubtitle}
        />
        <ServicesSection
          data={services}
          label={settings?.servicesLabel}
          heading={settings?.servicesHeading}
        />
        <ContactSection data={contact} />
        <TerminalDock />
      </main>
    </WorkstationShell>
  );
}
