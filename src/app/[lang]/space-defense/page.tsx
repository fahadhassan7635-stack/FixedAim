import type { Metadata } from 'next';
import SpaceDefensePage from '@/views/SpaceDefensePage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('space-defense', lang as Lang);
}

export default function LocalizedPage() {
  return <SpaceDefensePage />;
}
