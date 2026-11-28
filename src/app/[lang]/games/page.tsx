import type { Metadata } from 'next';
import GamesPage from '@/views/GamesPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('games', lang as Lang);
}

export default function LocalizedGamesPage() {
  return <GamesPage />;
}
