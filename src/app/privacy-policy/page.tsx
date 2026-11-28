import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('privacy-policy', 'en');

export default function Page() {
  return <PrivacyPolicy />;
}
