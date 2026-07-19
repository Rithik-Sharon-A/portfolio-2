import type { Metadata } from 'next';
import './globals.css';
import { fetchSiteSettings } from '@/lib/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

function mediaUrl(url?: string) {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const og = mediaUrl(settings?.ogImage?.url);
  return {
    title: settings?.seoTitle,
    description: settings?.seoDesc,
    openGraph: og
      ? {
          title: settings?.seoTitle,
          description: settings?.seoDesc,
          images: [{ url: og }],
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#010509' }}>
      <body style={{ backgroundColor: '#010509', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
