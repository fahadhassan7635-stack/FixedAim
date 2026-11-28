import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('terms', 'en');

export default function Page() {
  return <TermsPage />;
}
