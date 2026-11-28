import type { Metadata } from 'next';
import SpaceDefensePage from '@/views/SpaceDefensePage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('space-defense', 'en');

export default function Page() {
  return <SpaceDefensePage />;
}
