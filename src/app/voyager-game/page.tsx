import type { Metadata } from 'next';
import VoyagerGame from '@/views/VoyagerGame';

export const metadata: Metadata = {
  title: "Voyager Game - Space Endurance Arcade & CPS Trainer | FixedAim",
  description: "Navigate the Voyager spaceship through cosmic asteroid fields. Boost your CPS and reflex endurance with power-ups, boss battles, and unlockable achievements.",
  keywords: [
    "voyager game", "voyager space game", "asteroid dodge game", "space endurance game",
    "cps trainer game", "clicks per second game", "spacebar cps game", "mouse clicking game",
    "online space arcade", "free browser game", "endurance clicker game", "fixedaim voyager",
    "boost clicking game", "peak cps tracker", "dodge asteroid game", "cps improvement game",
  ],
  alternates: {
    canonical: "https://fixedaim.com/voyager-game",
  },
  openGraph: {
    title: "Voyager Game - Space Endurance Arcade & CPS Trainer | FixedAim",
    description: "Navigate the Voyager spaceship through cosmic asteroid fields. Boost your CPS and reflex endurance with power-ups, boss battles, and unlockable achievements.",
    url: "https://fixedaim.com/voyager-game",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyager Game - Space Endurance Arcade & CPS Trainer | FixedAim",
    description: "Navigate the Voyager spaceship through cosmic asteroid fields. Boost your CPS and reflex endurance with power-ups, boss battles, and unlockable achievements.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <VoyagerGame />;
}
