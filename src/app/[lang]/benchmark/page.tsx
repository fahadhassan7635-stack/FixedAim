import type { Metadata } from 'next';
import BenchmarkPage from '@/views/BenchmarkPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';
import type { Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildLocalizedMetadata('benchmark', lang as Lang);
}

export default function LocalizedBenchmarkPage() {
  return <BenchmarkPage />;
}
