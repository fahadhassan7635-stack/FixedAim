import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('contact', 'en');

export default function Page() {
  return <ContactPage />;
}
