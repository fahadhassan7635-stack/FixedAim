import type { Metadata } from 'next';
import SpaceWavesGame from '@/views/SpaceWavesGame';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('space-waves', lang as Lang);
}

export default function LocalizedPage() {
  return <SpaceWavesGame />;
}
