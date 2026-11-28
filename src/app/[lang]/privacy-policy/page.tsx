import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('privacy-policy', lang as Lang);
}

export default function LocalizedPage() {
  return <PrivacyPolicy />;
}
