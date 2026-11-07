import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Global Hall of Fame & Benchmark Records | FixedAim",
  description: "Explore top gaming benchmark records, highest CPS achievements, and elite reflex reaction scores on the FixedAim platform global hall of fame leaderboard.",
  alternates: {
    canonical: "https://fixedaim.com/benchmark",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  redirect('/benchmark');
}
