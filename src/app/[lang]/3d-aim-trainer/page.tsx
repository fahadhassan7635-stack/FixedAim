import type { Metadata } from 'next';
import ThreeDAimTrainerPage from '@/views/3DAimTrainer';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('3d-aim-trainer', lang as Lang);
}

export default function LocalizedPage() {
  return <ThreeDAimTrainerPage />;
}
