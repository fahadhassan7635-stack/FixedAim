import type { Metadata } from 'next';
import GamesPage from '@/views/GamesPage';

export const metadata: Metadata = {
  title: "Free Browser Skill Games - Arcade Reflex Tests | FixedAim",
  description: "Play free browser arcade and reflex skill games on FixedAim. Challenge your spatial awareness, multi-target defense, and focus with zero signup needed.",
  alternates: {
    canonical: "https://fixedaim.com/games",
  },
  openGraph: {
    title: "Free Browser Skill Games - Arcade Reflex Tests | FixedAim",
    description: "Play free browser arcade and reflex skill games on FixedAim. Challenge your spatial awareness, multi-target defense, and focus with zero signup needed.",
    url: "https://fixedaim.com/games",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Browser Skill Games - Arcade Reflex Tests | FixedAim",
    description: "Play free browser arcade and reflex skill games on FixedAim. Challenge your spatial awareness, multi-target defense, and focus with zero signup needed.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <GamesPage />;
}
