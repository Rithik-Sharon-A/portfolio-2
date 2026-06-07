import type { Metadata } from 'next';
import './globals.css';
import { fetchSiteSettings } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  return {
    title: settings?.seoTitle || 'Rithik Sharon A — Full Stack Developer',
    description: settings?.seoDesc || 'Full Stack Developer from Chennai',
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
