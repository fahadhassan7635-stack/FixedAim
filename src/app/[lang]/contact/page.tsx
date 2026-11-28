import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('contact', lang as Lang);
}

export default function LocalizedPage() {
  return <ContactPage />;
}
