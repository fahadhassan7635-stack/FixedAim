import type { Metadata } from 'next';
import MouseAccuracyPage from '@/views/MouseAccuracyPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('mouse-accuracy', 'en');

export default function Page() {
  return <MouseAccuracyPage />;
}
