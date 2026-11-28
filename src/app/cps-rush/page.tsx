import type { Metadata } from 'next';
import CpsRush from '@/views/CpsRush';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('cps-rush', 'en');

export default function Page() {
  return <CpsRush />;
}
