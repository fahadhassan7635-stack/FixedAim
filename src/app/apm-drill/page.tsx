import type { Metadata } from 'next';
import ApmDrillPage from '@/views/ApmDrillPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('apm-drill', 'en');

export default function Page() {
  return <ApmDrillPage />;
}
