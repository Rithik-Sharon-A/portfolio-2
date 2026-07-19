const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/** Absolute media URL for Strapi uploads (works with relative `/uploads/...` paths). */
export function mediaUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function getStrapiUrl() {
  return STRAPI_URL;
}

async function getJson(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Strapi ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchHero() {
  try {
    const json = await getJson('/api/heroes?populate=*&status=published');
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function fetchAbout() {
  try {
    const json = await getJson('/api/abouts?populate=*&status=published');
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function fetchProjects() {
  try {
    const json = await getJson('/api/projects?populate=*&sort=order:asc&status=published');
    return json.data || [];
  } catch {
    return [];
  }
}

export async function fetchStackItems() {
  try {
    const json = await getJson('/api/stack-items?populate=*&sort=order:asc&status=published');
    return json.data || [];
  } catch {
    return [];
  }
}

export async function fetchServices() {
  try {
    const json = await getJson('/api/services?populate=*&sort=order:asc&status=published');
    return json.data || [];
  } catch {
    return [];
  }
}

export async function fetchContact() {
  try {
    const json = await getJson('/api/contacts?populate=*&status=published');
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function fetchSiteSettings() {
  try {
    const json = await getJson('/api/site-settings?populate=*&status=published');
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}
