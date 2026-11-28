import type { Metadata } from 'next';
import AccuracyTestPage from '@/views/AccuracyTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('accuracy', 'en');

export default function Page() {
  return <AccuracyTestPage />;
}
