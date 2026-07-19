import {
  hero,
  about,
  projects,
  stackItems,
  services,
  contact,
  siteSettings,
} from './portfolio-data';

export async function fetchHero() {
  return hero;
}

export async function fetchAbout() {
  return about;
}

export async function fetchProjects() {
  return projects;
}

export async function fetchStackItems() {
  return stackItems;
}

export async function fetchServices() {
  return services;
}

export async function fetchContact() {
  return contact;
}

export async function fetchSiteSettings() {
  return siteSettings;
}
