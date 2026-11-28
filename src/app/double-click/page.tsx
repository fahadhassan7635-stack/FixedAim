import type { Metadata } from 'next';
import DoubleClickPage from '@/views/DoubleClickPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('double-click', 'en');

export default function Page() {
  return <DoubleClickPage />;
}
