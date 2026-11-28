import type { Metadata } from 'next';
import HzTestPage from '@/views/HzTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('hz-test', 'en');

export default function Page() {
  return <HzTestPage />;
}
