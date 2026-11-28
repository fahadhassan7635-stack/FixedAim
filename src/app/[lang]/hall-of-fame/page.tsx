import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { withLangPath, type Lang } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Global Hall of Fame & Benchmark Records | FixedAim',
  description: 'Explore top gaming benchmark records, highest CPS achievements, and elite reflex reaction scores on the FixedAim platform global hall of fame leaderboard.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LocalizedHallOfFamePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(withLangPath('/benchmark', lang as Lang));
}
