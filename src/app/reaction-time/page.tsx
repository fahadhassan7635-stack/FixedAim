import type { Metadata } from 'next';
import ReactionTimePage from '@/views/ReactionTimePage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('reaction-time', 'en');

export default function Page() {
  return <ReactionTimePage />;
}
