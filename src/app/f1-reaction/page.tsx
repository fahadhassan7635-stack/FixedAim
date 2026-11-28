import type { Metadata } from 'next';
import F1ReactionPage from '@/views/F1ReactionPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('f1-reaction', 'en');

export default function Page() {
  return <F1ReactionPage />;
}
