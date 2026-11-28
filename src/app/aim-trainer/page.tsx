import type { Metadata } from 'next';
import AimTrainerPage from '@/views/AimTrainerPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('aim-trainer', 'en');

export default function Page() {
  return <AimTrainerPage />;
}
