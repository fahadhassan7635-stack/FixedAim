import type { Metadata } from 'next';
import ThreeDAimTrainerPage from '@/views/3DAimTrainer';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('3d-aim-trainer', 'en');

export default function Page() {
  return <ThreeDAimTrainerPage />;
}
