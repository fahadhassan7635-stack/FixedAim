import type { Metadata } from 'next';
import TypingTestPage from '@/views/TypingTestPage';
import { buildLocalizedMetadata } from '@/lib/seo-i18n';

export const metadata: Metadata = buildLocalizedMetadata('typing-test', 'en');

export default function Page() {
  return <TypingTestPage />;
}
