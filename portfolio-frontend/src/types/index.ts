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
  statusTags: string;
  roleSubtitle: string;
  typedLines: string;
  profileStatus: string;
  profileRows: string;
  badgeTitle: string;
  badgeSubtitle: string;
  avatarInitials: string;
}

export interface About {
  id: number;
  sectionLabel: string;
  heading: string;
  name: string;
  para1: string;
  para2: string;
  para3: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  philosophy: string;
  focus: string;
  learning: string;
}

export interface MediaRef {
  url: string;
}

export interface Project {
  documentId: string;
  title: string;
  category: 'Client' | 'Personal';
  description: string;
  techStack: string;
  liveUrl: string;
  order: number;
  overview?: string;
  hardwareUsed?: string;
  architecture?: string;
  protocols?: string;
  challenges?: string;
  decisions?: string;
  firmwareFeatures?: string;
  lessonsLearned?: string;
  repoUrl?: string;
  docsUrl?: string;
  col1Image1?: MediaRef;
  col1Image2?: MediaRef;
  col2Image?: MediaRef;
  blockDiagram?: MediaRef;
  schematic?: MediaRef;
  video?: MediaRef;
}

export type StackDomain =
  | 'Firmware'
  | 'Protocols'
  | 'MCU'
  | 'Tools'
  | 'RTOS'
  | 'Cloud'
  | 'AI'
  | 'Testing';

export interface StackItem {
  documentId: string;
  name: string;
  cricketRole: string;
  order: number;
  domain?: StackDomain;
  icon?: MediaRef;
}

export interface Service {
  documentId: string;
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
