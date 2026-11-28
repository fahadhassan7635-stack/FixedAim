import type { Metadata } from 'next';
import InternetSpeedPage from '@/views/InternetSpeedPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('internet-speed', 'en');

export default function Page() {
  return <InternetSpeedPage />;
}
