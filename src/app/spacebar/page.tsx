import type { Metadata } from 'next';
import SpacebarPage from '@/views/SpacebarPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('spacebar', 'en');

export default function Page() {
  return <SpacebarPage />;
}
