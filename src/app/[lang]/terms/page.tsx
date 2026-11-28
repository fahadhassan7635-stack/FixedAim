import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('terms', lang as Lang);
}

export default function LocalizedPage() {
  return <TermsPage />;
}
