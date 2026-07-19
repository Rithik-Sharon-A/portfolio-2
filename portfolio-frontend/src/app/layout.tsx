import type { Metadata } from 'next';
import './globals.css';
import { fetchSiteSettings, mediaUrl } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const og = mediaUrl(settings?.ogImage?.url) || undefined;
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
