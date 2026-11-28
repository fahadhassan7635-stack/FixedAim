import type { Metadata } from 'next';
import SpeakerTestPage from '@/views/SpeakerTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('speaker-test', 'en');

export default function Page() {
  return <SpeakerTestPage />;
}
