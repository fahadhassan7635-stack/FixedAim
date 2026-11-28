import type { Metadata } from 'next';
import KeyVisualizerPage from '@/views/KeyVisualizerPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('key-visualizer', 'en');

export default function Page() {
  return <KeyVisualizerPage />;
}
