import type { Metadata } from 'next';
import SpaceWavesGame from '@/views/SpaceWavesGame';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('space-waves', 'en');

export default function Page() {
  return <SpaceWavesGame />;
}
