import type { Metadata } from 'next';
import F1ReactionPage from '@/views/F1ReactionPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('f1-reaction', lang as Lang);
}

export default function LocalizedPage() {
  return <F1ReactionPage />;
}
