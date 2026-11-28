import type { Metadata } from 'next';
import MemoryTestPage from '@/views/MemoryTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('memory-test', 'en');

export default function Page() {
  return <MemoryTestPage />;
}
