import type { Metadata } from 'next';
import MousePage from '@/views/MousePage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('mouse', lang as Lang);
}

export default function LocalizedMousePage() {
  return <MousePage />;
}
