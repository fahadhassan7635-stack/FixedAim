import type { Metadata } from 'next';
import DeadPixelTestPage from '@/views/DeadPixelTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('dead-pixel-test', 'en');

export default function Page() {
  return <DeadPixelTestPage />;
}
