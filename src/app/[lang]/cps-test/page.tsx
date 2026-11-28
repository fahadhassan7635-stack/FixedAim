import type { Metadata } from 'next';
import CPSTestPage from '@/views/CPSTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('cps-test', lang as Lang);
}

export default function LocalizedPage() {
  return <CPSTestPage />;
}
