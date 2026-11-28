import type { Metadata } from 'next';
import BlogPage from '@/views/BlogPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('blog', 'en');

export default function Page() {
  return <BlogPage />;
}
