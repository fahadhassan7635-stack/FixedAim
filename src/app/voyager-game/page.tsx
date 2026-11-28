import type { Metadata } from 'next';
import VoyagerGame from '@/views/VoyagerGame';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('voyager-game', 'en');

export default function Page() {
  return <VoyagerGame />;
}
