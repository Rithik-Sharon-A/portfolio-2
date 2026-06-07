const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchHero() {
  const res = await fetch(`${STRAPI_URL}/api/heroes?populate=*&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data?.[0] || null;
}

export async function fetchAbout() {
  const res = await fetch(`${STRAPI_URL}/api/abouts?populate=*&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data?.[0] || null;
}

export async function fetchProjects() {
  const res = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=order:asc&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export async function fetchStackItems() {
  const res = await fetch(`${STRAPI_URL}/api/stack-items?populate=*&sort=order:asc&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export async function fetchServices() {
  const res = await fetch(`${STRAPI_URL}/api/services?populate=*&sort=order:asc&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export async function fetchContact() {
  const res = await fetch(`${STRAPI_URL}/api/contacts?populate=*&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data?.[0] || null;
}

export async function fetchSiteSettings() {
  const res = await fetch(`${STRAPI_URL}/api/site-settings?populate=*&status=published`, { cache: 'no-store' });
  const json = await res.json();
  return json.data?.[0] || null;
}
