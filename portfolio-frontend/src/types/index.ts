export interface Hero {
  id: number;
  heroWordLine1: string;
  heroWordLine2: string;
  bioLeft: string;
  bioRight: string;
  counterValue: string;
  counterLabel: string;
  badgeOuterText: string;
  badgeInnerText: string;
  bottomLabel: string;
  bottomName: string;
  bottomLocation: string;
}

export interface About {
  id: number;
  sectionLabel: string;
  heading: string;
  para1: string;
  para2: string;
  para3: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'Client' | 'Personal';
  description: string;
  techStack: string;
  liveUrl: string;
  order: number;
  col1Image1?: { url: string };
  col1Image2?: { url: string };
  col2Image?: { url: string };
}

export interface StackItem {
  id: number;
  name: string;
  cricketRole: string;
  order: number;
  icon?: { url: string };
}

export interface Service {
  id: number;
  number: string;
  name: string;
  description: string;
  order: number;
}

export interface Contact {
  id: number;
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  availabilityText: string;
  footerCopyright: string;
  footerStatus: string;
  footerTagline: string;
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  ctaText: string;
}

export interface SiteSettings {
  id: number;
  seoTitle: string;
  seoDesc: string;
  logoText: string;
  marqueeLine1: string;
  marqueeLine2: string;
  projectsLabel: string;
  projectsHeading: string;
  stackLabel: string;
  stackHeading: string;
  stackSubtitle: string;
  servicesLabel: string;
  servicesHeading: string;
  chatButtonLabel: string;
  chatGreeting: string;
}
