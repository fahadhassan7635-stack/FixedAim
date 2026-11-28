import type { Metadata } from 'next';
import CPSTestPage from '@/views/CPSTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('cps-test', 'en');

export default function Page() {
  return <CPSTestPage />;
}
