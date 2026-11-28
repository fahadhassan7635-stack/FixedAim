import type { Metadata } from 'next';
import ScrollTestPage from '@/views/ScrollTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('scroll-test', 'en');

export default function Page() {
  return <ScrollTestPage />;
}
