import type { Metadata } from 'next';
import './globals.css';
import { fetchSiteSettings } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  return {
    title: settings?.seoTitle || 'Rithik Sharon A — Embedded Systems Developer',
    description: settings?.seoDesc || 'Embedded Systems Developer with Full Stack capability. From bare metal to browser.',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#080C10' }}>
      <body style={{ backgroundColor: '#080C10', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
